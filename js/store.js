// Genshin Optimizer — persistence layer. Everything lives in localStorage,
// entirely on this machine; nothing is sent anywhere.
const STORAGE_KEY = 'genshin-optimizer-data-v1';

function defaultState() {
  return {
    roster: {},        // characterId -> { owned: true, priorityOverride: {stat: weight} | null, targetSets: [setId, setId] }
    customCharacters: [], // same shape as GENSHIN_DATA.characters entries
    weapons: [],        // { instanceId, weaponId, name, type, refinement, level, baseAtk, subStat, subStatValue, assignedTo }
    artifacts: [],       // { instanceId, setId, slot, rarity, level, mainStat, mainStatValue, substats: [{type, value}] }
  };
}

const Store = {
  state: null,

  // Detects a browser/mode that silently discards localStorage (private
  // browsing, "clear on close" settings, storage blocked for file:// pages).
  testPersistence() {
    try {
      const testKey = '__genshin_optimizer_test__';
      localStorage.setItem(testKey, '1');
      const ok = localStorage.getItem(testKey) === '1';
      localStorage.removeItem(testKey);
      return ok;
    } catch (e) {
      return false;
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.state = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
    } catch (e) {
      console.error('Failed to load saved data, starting fresh.', e);
      this.state = defaultState();
    }
    this._repair();
    return this.state;
  },

  // Fixes shape corruption from a bad import (e.g. a field that should be an
  // array getting overwritten with an object) without discarding good fields.
  _repair() {
    const d = defaultState();
    let dirty = false;
    if (!Array.isArray(this.state.weapons)) { this.state.weapons = d.weapons; dirty = true; }
    if (!Array.isArray(this.state.artifacts)) { this.state.artifacts = d.artifacts; dirty = true; }
    if (!Array.isArray(this.state.customCharacters)) { this.state.customCharacters = d.customCharacters; dirty = true; }
    if (!this.state.roster || typeof this.state.roster !== 'object' || Array.isArray(this.state.roster)) { this.state.roster = d.roster; dirty = true; }
    // Re-sync catalog weapons (weaponId set, i.e. not a custom entry) against the current
    // reference data, so corrections to data/weapons.js (e.g. a fixed weapon type) reach
    // gear you already added, not just new additions.
    if (Array.isArray(this.state.weapons) && typeof GENSHIN_DATA !== 'undefined') {
      this.state.weapons.forEach((w) => {
        if (!w.weaponId) return;
        const def = GENSHIN_DATA.weapons.find((x) => x.id === w.weaponId);
        if (!def) return;
        if (w.type !== def.type || w.subStat !== def.subStat) {
          w.type = def.type;
          w.subStat = def.subStat;
          dirty = true;
        }
      });
    }
    if (dirty) {
      console.warn('Repaired corrupted saved data (some fields were reset to empty).');
      this.save();
    }
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  },

  exportJson() {
    return JSON.stringify(this.state, null, 2);
  },

  importJson(json) {
    const parsed = JSON.parse(json);
    this.state = Object.assign(defaultState(), parsed);
    this._repair();
    this.save();
  },

  reset() {
    this.state = defaultState();
    this.save();
  },

  // --- Characters (built-in + custom combined) ---
  allCharacters() {
    return GENSHIN_DATA.characters.concat(this.state.customCharacters);
  },

  getCharacter(id) {
    return this.allCharacters().find((c) => c.id === id);
  },

  addCustomCharacter(char) {
    this.state.customCharacters.push(char);
    this.save();
  },

  // --- Roster ---
  setOwned(characterId, owned) {
    const entry = this.state.roster[characterId] || { owned: false, priorityOverride: null, targetSets: [] };
    entry.owned = owned;
    this.state.roster[characterId] = entry;
    this.save();
  },

  getRosterEntry(characterId) {
    return this.state.roster[characterId] || { owned: false, priorityOverride: null, targetSets: [] };
  },

  setPriorityOverride(characterId, overrideObj) {
    const entry = this.state.roster[characterId] || { owned: true, priorityOverride: null, targetSets: [] };
    entry.priorityOverride = overrideObj;
    this.state.roster[characterId] = entry;
    this.save();
  },

  setRosterMeta(characterId, meta) {
    const entry = this.state.roster[characterId] || { owned: true, priorityOverride: null, targetSets: [] };
    Object.assign(entry, meta);
    this.state.roster[characterId] = entry;
    this.save();
  },

  setTargetSets(characterId, setIds) {
    const entry = this.state.roster[characterId] || { owned: true, priorityOverride: null, targetSets: [] };
    entry.targetSets = setIds;
    this.state.roster[characterId] = entry;
    this.save();
  },

  ownedCharacters() {
    return this.allCharacters().filter((c) => this.getRosterEntry(c.id).owned);
  },

  // Effective stat-priority weights for a character (override or default).
  effectivePriority(character) {
    const entry = this.getRosterEntry(character.id);
    return entry.priorityOverride || character.statPriority || {};
  },

  // --- Weapons ---
  addWeapon(weapon) {
    weapon.instanceId = 'w_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    weapon.assignedTo = null;
    this.state.weapons.push(weapon);
    this.save();
    return weapon;
  },

  removeWeapon(instanceId) {
    this.state.weapons = this.state.weapons.filter((w) => w.instanceId !== instanceId);
    this.save();
  },

  // --- Artifacts ---
  addArtifact(artifact) {
    artifact.instanceId = 'a_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    this.state.artifacts.push(artifact);
    this.save();
    return artifact;
  },

  removeArtifact(instanceId) {
    this.state.artifacts = this.state.artifacts.filter((a) => a.instanceId !== instanceId);
    this.save();
  },
};
