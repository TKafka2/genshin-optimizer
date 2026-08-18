// Genshin Optimizer — cross-device sync via a private GitHub Gist.
//
// GitHub Pages is static hosting with no backend, so "cloud sync" here means:
// your own GitHub personal access token (entered once per device, kept only in
// that device's localStorage) talks directly from the browser to api.github.com
// and reads/writes one secret Gist holding your exported app data. Nothing
// passes through any server we control, and the token is never bundled into
// the app's code or committed to the repo.
const CloudSync = {
  PAT_KEY: 'genshin-optimizer-github-pat',
  GIST_ID_KEY: 'genshin-optimizer-gist-id',
  GIST_DESCRIPTION: 'genshin-optimizer-sync-data (do not rename/delete — used by the Genshin Optimizer app)',
  GIST_FILENAME: 'genshin-optimizer-data.json',
  AUTO_PUSH_DELAY_MS: 4000,
  _pushTimer: null,
  // Optional (msg, isError) => void hook set by app.js so the UI can reflect
  // background sync activity without cloudSync.js touching the DOM directly.
  onStatus: null,

  getPat() {
    return localStorage.getItem(this.PAT_KEY) || '';
  },
  setPat(pat) {
    if (pat) localStorage.setItem(this.PAT_KEY, pat);
    else localStorage.removeItem(this.PAT_KEY);
  },
  getCachedGistId() {
    return localStorage.getItem(this.GIST_ID_KEY) || '';
  },
  setCachedGistId(id) {
    if (id) localStorage.setItem(this.GIST_ID_KEY, id);
    else localStorage.removeItem(this.GIST_ID_KEY);
  },

  async apiRequest(path, options) {
    const pat = this.getPat();
    if (!pat) throw new Error('No GitHub token saved yet — paste one above and click "Save token" first.');
    const res = await fetch('https://api.github.com' + path, Object.assign({
      headers: {
        Authorization: 'token ' + pat,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }, options));
    if (!res.ok) {
      if (res.status === 401) throw new Error('GitHub rejected that token (401). Check it was copied correctly and has the "gist" scope.');
      if (res.status === 404) throw new Error('Not found (404).');
      const body = await res.text().catch(() => '');
      throw new Error(`GitHub API error ${res.status}: ${body.slice(0, 200)}`);
    }
    return res.status === 204 ? null : res.json();
  },

  async findGist() {
    const cached = this.getCachedGistId();
    if (cached) return cached;
    const gists = await this.apiRequest('/gists?per_page=100', { method: 'GET' });
    const match = gists.find((g) => g.description === this.GIST_DESCRIPTION);
    if (match) this.setCachedGistId(match.id);
    return match ? match.id : null;
  },

  async push() {
    const content = Store.exportJson();
    let gistId = await this.findGist();
    if (gistId) {
      await this.apiRequest('/gists/' + gistId, {
        method: 'PATCH',
        body: JSON.stringify({ files: { [this.GIST_FILENAME]: { content } } }),
      });
    } else {
      const created = await this.apiRequest('/gists', {
        method: 'POST',
        body: JSON.stringify({
          description: this.GIST_DESCRIPTION,
          public: false,
          files: { [this.GIST_FILENAME]: { content } },
        }),
      });
      gistId = created.id;
      this.setCachedGistId(gistId);
    }
    return gistId;
  },

  async pull() {
    const gistId = await this.findGist();
    if (!gistId) throw new Error('No cloud data found yet for this token — push from a device that has your data first.');
    const gist = await this.apiRequest('/gists/' + gistId, { method: 'GET' });
    const file = gist.files[this.GIST_FILENAME];
    if (!file) throw new Error('Cloud gist exists but is missing the expected data file.');
    return file.content;
  },

  // Debounced background push — call this after every local change. Waits for
  // a quiet period so a burst of edits (e.g. dragging a slider) becomes one
  // API call instead of dozens.
  scheduleAutoPush() {
    if (!this.getPat()) return;
    clearTimeout(this._pushTimer);
    this._pushTimer = setTimeout(() => {
      this.push()
        .then(() => this.onStatus && this.onStatus('Auto-synced to cloud just now.'))
        .catch((err) => this.onStatus && this.onStatus('Auto-sync failed: ' + err.message, true));
    }, this.AUTO_PUSH_DELAY_MS);
  },

  // Called once on startup: if the cloud copy is strictly newer than this
  // device's local copy, pull it in. Last-write-wins — if you edit the same
  // data on two devices before either syncs, whichever pushes last wins and
  // the other device's un-pushed edit is silently lost. Fine for one person
  // switching between their own devices, not a real multi-writer sync.
  async autoPullIfNewer() {
    if (!this.getPat()) return false;
    try {
      const content = await this.pull();
      const remote = JSON.parse(content);
      if ((remote.lastModified || 0) > (Store.state.lastModified || 0)) {
        Store.importJson(content);
        return true;
      }
      this.onStatus && this.onStatus('Checked cloud on load — this device already has the latest data.');
    } catch (err) {
      console.warn('Cloud auto-pull skipped:', err.message);
      this.onStatus && this.onStatus('Auto-pull on load failed: ' + err.message, true);
    }
    return false;
  },
};
