// Genshin Optimizer — scoring + assignment logic.
//
// IMPORTANT: this is a rule-of-thumb "stat value" scorer, not a full damage
// simulator. It converts every stat into a rough common unit (roughly:
// "equivalent % ATK") using standard community heuristics (1 CRIT Rate% ~=
// 2 CRIT DMG%, flat stats converted via an assumed baseline total, etc.),
// then weights that by how much each character cares about each stat. It's
// good for comparing your own options against each other — it is not a
// substitute for a real rotation-level damage calculator.

const WEIGHT_KEY_MAP = { hpFlat: 'hpPercent', atkFlat: 'atkPercent', defFlat: 'defPercent' };
const FLAT_EQUIV = { hpFlat: 0.005, atkFlat: 0.05, defFlat: 0.07 };

function genericValue(type, value) {
  if (!value) return 0;
  switch (type) {
    case 'critRate': return value * 2;
    case 'em': return value * 0.2;
    case 'er': return value * 0.5;
    case 'hpFlat': return value * FLAT_EQUIV.hpFlat;
    case 'atkFlat': return value * FLAT_EQUIV.atkFlat;
    case 'defFlat': return value * FLAT_EQUIV.defFlat;
    default: return value; // hpPercent, atkPercent, defPercent, critDmg, elementalDmg, physicalDmg, healingBonus
  }
}

function weightFor(type, weights) {
  const key = WEIGHT_KEY_MAP[type] || type;
  return weights[key] || 0;
}

function statScore(type, value, weights) {
  return weightFor(type, weights) * genericValue(type, value);
}

function scoreArtifact(artifact, weights) {
  let score = statScore(artifact.mainStat, artifact.mainStatValue, weights);
  (artifact.substats || []).forEach((ss) => {
    if (ss.type && ss.value) score += statScore(ss.type, ss.value, weights);
  });
  return score;
}

function weaponScoreForCharacter(weapon, weights) {
  let score = statScore('atkFlat', weapon.baseAtk, weights);
  score += statScore(weapon.subStat, weapon.subStatValue, weights);
  const refinement = weapon.refinement || 1;
  score *= (1 + (refinement - 1) * 0.03); // rough: each refinement ~+3% overall value
  return score;
}

// --- Hungarian algorithm (minimize cost), rows <= cols required. ---
function hungarianMinimize(costMatrix) {
  const n = costMatrix.length;
  const m = costMatrix[0].length;
  const INF = Infinity;
  const u = new Array(n + 1).fill(0);
  const v = new Array(m + 1).fill(0);
  const p = new Array(m + 1).fill(0);
  const way = new Array(m + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array(m + 1).fill(INF);
    const used = new Array(m + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF, j1 = -1;
      for (let j = 1; j <= m; j++) {
        if (!used[j]) {
          const cur = costMatrix[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
          if (minv[j] < delta) { delta = minv[j]; j1 = j; }
        }
      }
      for (let j = 0; j <= m; j++) {
        if (used[j]) { u[p[j]] += delta; v[j] -= delta; }
        else { minv[j] -= delta; }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }
  const result = new Array(n).fill(-1);
  for (let j = 1; j <= m; j++) {
    if (p[j] > 0) result[p[j] - 1] = j - 1;
  }
  return result;
}

// scoreMatrix[i][j] = value of matching row i to column j. Returns assignment[i] = j or -1.
function maxWeightBipartiteMatching(scoreMatrix) {
  const n = scoreMatrix.length;
  if (n === 0) return [];
  const m = scoreMatrix[0].length;
  if (m === 0) return new Array(n).fill(-1);

  if (n <= m) {
    const cost = scoreMatrix.map((row) => row.map((v) => -v));
    return hungarianMinimize(cost);
  }
  // transpose so rows <= cols
  const transposed = [];
  for (let j = 0; j < m; j++) {
    transposed.push([]);
    for (let i = 0; i < n; i++) transposed[j].push(scoreMatrix[i][j]);
  }
  const cost = transposed.map((row) => row.map((v) => -v));
  const assignTByRow = hungarianMinimize(cost); // assignTByRow[weaponIdx] = characterIdx
  const result = new Array(n).fill(-1);
  for (let r = 0; r < m; r++) {
    const c = assignTByRow[r];
    if (c >= 0) result[c] = r;
  }
  return result;
}

function computeWeaponAssignment(characters, weapons) {
  const byType = {};
  GENSHIN_DATA.weaponTypes.forEach((t) => { byType[t] = { chars: [], weapons: [] }; });
  characters.forEach((c) => { if (byType[c.weaponType]) byType[c.weaponType].chars.push(c); });
  weapons.forEach((w) => { if (byType[w.type]) byType[w.type].weapons.push(w); });

  const assignments = [];
  const unassignedCharacters = [];
  const leftoverWeapons = [];

  GENSHIN_DATA.weaponTypes.forEach((type) => {
    const { chars, weapons: typeWeapons } = byType[type];
    if (chars.length === 0) { leftoverWeapons.push(...typeWeapons); return; }
    if (typeWeapons.length === 0) { unassignedCharacters.push(...chars); return; }

    const matrix = chars.map((c) => {
      const weights = Store.effectivePriority(c);
      return typeWeapons.map((w) => weaponScoreForCharacter(w, weights));
    });
    const assign = maxWeightBipartiteMatching(matrix);
    const usedWeaponIdx = new Set();
    assign.forEach((weaponIdx, charIdx) => {
      if (weaponIdx >= 0) {
        assignments.push({ character: chars[charIdx], weapon: typeWeapons[weaponIdx], score: matrix[charIdx][weaponIdx] });
        usedWeaponIdx.add(weaponIdx);
      } else {
        unassignedCharacters.push(chars[charIdx]);
      }
    });
    typeWeapons.forEach((w, idx) => { if (!usedWeaponIdx.has(idx)) leftoverWeapons.push(w); });
  });

  return { assignments, unassignedCharacters, leftoverWeapons };
}

// --- Artifact build optimizer ---
function combinations(arr, k) {
  const results = [];
  function helper(start, combo) {
    if (combo.length === k) { results.push(combo.slice()); return; }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }
  helper(0, []);
  return results;
}

const ARTIFACT_SLOTS = ['flower', 'plume', 'sands', 'goblet', 'circlet'];

function bestInSlot(options, weights) {
  let bestArt = null, bestScore = -Infinity;
  for (const a of options) {
    const s = scoreArtifact(a, weights);
    if (s > bestScore) { bestScore = s; bestArt = a; }
  }
  return { art: bestArt, score: bestScore };
}

function solveNoSetPlan(bySlot, weights) {
  const chosen = {};
  let total = 0;
  for (const slot of ARTIFACT_SLOTS) {
    if (bySlot[slot].length === 0) return null;
    const { art, score } = bestInSlot(bySlot[slot], weights);
    chosen[slot] = art;
    total += score;
  }
  return { chosen, total, setBonus: 'No set bonus (best available substats)' };
}

function solveFourPiecePlan(setId, bySlot, weights) {
  let planBest = null;
  for (const freeSlot of ARTIFACT_SLOTS) {
    let ok = true;
    const chosen = {};
    let total = 0;
    for (const slot of ARTIFACT_SLOTS) {
      const options = slot === freeSlot ? bySlot[slot] : bySlot[slot].filter((a) => a.setId === setId);
      if (options.length === 0) { ok = false; break; }
      const { art, score } = bestInSlot(options, weights);
      chosen[slot] = art;
      total += score;
    }
    if (ok && (!planBest || total > planBest.total)) planBest = { chosen, total };
  }
  if (!planBest) return null;
  const setName = (GENSHIN_DATA.artifactSets.find((s) => s.id === setId) || {}).name || setId;
  return { chosen: planBest.chosen, total: planBest.total, setBonus: `4pc ${setName}` };
}

function solveTwoPieceTwoPiecePlan(setA, setB, bySlot, weights) {
  const twoOfFive = combinations(ARTIFACT_SLOTS, 2);
  let planBest = null;
  for (const groupA of twoOfFive) {
    const remaining = ARTIFACT_SLOTS.filter((s) => !groupA.includes(s));
    const twoOfThree = combinations(remaining, 2);
    for (const groupB of twoOfThree) {
      const freeSlot = remaining.find((s) => !groupB.includes(s));
      let ok = true;
      const chosen = {};
      let total = 0;
      for (const slot of ARTIFACT_SLOTS) {
        let options;
        if (groupA.includes(slot)) options = bySlot[slot].filter((a) => a.setId === setA);
        else if (groupB.includes(slot)) options = bySlot[slot].filter((a) => a.setId === setB);
        else options = bySlot[slot];
        if (options.length === 0) { ok = false; break; }
        const { art, score } = bestInSlot(options, weights);
        chosen[slot] = art;
        total += score;
      }
      if (ok && (!planBest || total > planBest.total)) planBest = { chosen, total };
    }
  }
  if (!planBest) return null;
  const nameA = (GENSHIN_DATA.artifactSets.find((s) => s.id === setA) || {}).name || setA;
  const nameB = (GENSHIN_DATA.artifactSets.find((s) => s.id === setB) || {}).name || setB;
  return { chosen: planBest.chosen, total: planBest.total, setBonus: `2pc ${nameA} + 2pc ${nameB}` };
}

function bestArtifactBuild(character, artifacts) {
  const weights = Store.effectivePriority(character);
  const bySlot = { flower: [], plume: [], sands: [], goblet: [], circlet: [] };
  artifacts.forEach((a) => { if (bySlot[a.slot]) bySlot[a.slot].push(a); });

  const setIds = Array.from(new Set(artifacts.map((a) => a.setId)));
  const candidates = [];

  const none = solveNoSetPlan(bySlot, weights);
  if (none) candidates.push(none);

  setIds.forEach((sid) => {
    const plan = solveFourPiecePlan(sid, bySlot, weights);
    if (plan) candidates.push(plan);
  });

  for (let i = 0; i < setIds.length; i++) {
    for (let j = i + 1; j < setIds.length; j++) {
      const plan = solveTwoPieceTwoPiecePlan(setIds[i], setIds[j], bySlot, weights);
      if (plan) candidates.push(plan);
    }
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.total - a.total);
  return { best: candidates[0], runnerUps: candidates.slice(1, 4) };
}
