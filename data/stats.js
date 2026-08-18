// Genshin Optimizer — artifact slot/stat reference data.
window.GENSHIN_DATA = window.GENSHIN_DATA || {};

GENSHIN_DATA.artifactSlots = [
  { id: 'flower', name: 'Flower of Life', fixedMainStat: 'hpFlat' },
  { id: 'plume', name: 'Plume of Death', fixedMainStat: 'atkFlat' },
  { id: 'sands', name: 'Sands of Eon', mainStatOptions: ['hpPercent', 'atkPercent', 'defPercent', 'em', 'er'] },
  { id: 'goblet', name: 'Goblet of Eonothem', mainStatOptions: ['hpPercent', 'atkPercent', 'defPercent', 'em', 'elementalDmg', 'physicalDmg'] },
  { id: 'circlet', name: 'Circlet of Logos', mainStatOptions: ['hpPercent', 'atkPercent', 'defPercent', 'em', 'critRate', 'critDmg', 'healingBonus'] },
];

// Substats a piece can roll (never main-stat-only stats like elemental/physical DMG or healing bonus).
GENSHIN_DATA.substatKeys = ['hpFlat', 'hpPercent', 'atkFlat', 'atkPercent', 'defFlat', 'defPercent', 'em', 'er', 'critRate', 'critDmg'];

// Reference values at 5-star / level 20 (main stat) or a single max roll (substat) — used only to prefill forms.
GENSHIN_DATA.mainStatMaxValue = {
  hpFlat: 4780, atkFlat: 311, hpPercent: 46.6, atkPercent: 46.6, defPercent: 58.3,
  em: 187, er: 51.8, elementalDmg: 46.6, physicalDmg: 58.3, critRate: 31.1, critDmg: 62.2, healingBonus: 35.9,
};

GENSHIN_DATA.substatMaxRoll = {
  hpFlat: 298.75, atkFlat: 19.45, defFlat: 23.15, hpPercent: 5.83, atkPercent: 5.83,
  defPercent: 7.29, em: 23.31, er: 6.48, critRate: 3.89, critDmg: 7.77,
};
