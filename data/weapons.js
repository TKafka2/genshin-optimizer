// Genshin Optimizer — built-in weapon reference data.
//
// Weapon TYPE (Sword/Claymore/Polearm/Bow/Catalyst), rarity, and `icon` keys below
// come from EnkaNetwork's public community game-data mirror (raw.githubusercontent.com/
// EnkaNetwork/API-docs), which is authoritative game data, not a wiki scrape. An earlier
// version of this file trusted a genshin.gg listing page that turned out to have scrambled
// weapon-type headings for ~25 entries (e.g. Light of Foliar Incision and Xiphos' Moonlight
// are Swords, not Catalysts; Staff of the Scarlet Sands is a Polearm, not a Claymore) —
// all fixed here. `icon` is the EnkaNetwork UI icon key; when present the app loads
// https://enka.network/ui/{icon}.png with a fallback to the emoji glyph if it fails to load.
//
// Exact base ATK / secondary-stat VALUE numbers are still only rarity-tier approximations
// (see TIER_* below) except for a couple dozen well-known weapons marked "hand-verified" —
// neither data source above exposes exact Level 90 numbers. Edit the real numbers in when
// you add a weapon to your inventory.
window.GENSHIN_DATA = window.GENSHIN_DATA || {};

const TIER_BASE_ATK = { 5: 608, 4: 454, 3: 401 };
const TIER_SUBSTAT_VALUE = {
  5: { critRate: 33.1, critDmg: 66.2, atkPercent: 33.1, er: 55.1, em: 132.4, hpPercent: 33.1, defPercent: 41.3, physicalDmg: 33.1, atkFlat: 60, hpFlat: 900 },
  4: { critRate: 27.6, critDmg: 55.1, atkPercent: 41.3, er: 45.9, em: 55.2, hpPercent: 41.3, defPercent: 51.7, physicalDmg: 41.3, atkFlat: 40, hpFlat: 600 },
  3: { critRate: 31.0, critDmg: 62.0, atkPercent: 41.3, er: 45.9, em: 44.1, hpPercent: 41.3, defPercent: 51.7, physicalDmg: 41.3, atkFlat: 35, hpFlat: 500 },
};
function tierWeapon(id, name, type, rarity, subStat, icon) {
  const w = { id, name, type, rarity, baseAtk: TIER_BASE_ATK[rarity], subStat, subStatValue: TIER_SUBSTAT_VALUE[rarity][subStat] };
  if (icon) w.icon = icon;
  return w;
}

// --- Hand-verified (higher-confidence Level 90 numbers) ---
const HAND_VERIFIED_WEAPONS = [
  // Swords
  { id: 'mistsplitter', name: "Mistsplitter's Emblem", type: 'Sword', rarity: 5, baseAtk: 674, subStat: 'critDmg', subStatValue: 44.1, icon: 'UI_EquipIcon_Sword_Narukami' },
  { id: 'freedom_sworn', name: 'Freedom-Sworn', type: 'Sword', rarity: 5, baseAtk: 542, subStat: 'critDmg', subStatValue: 44.1 },
  { id: 'primordial_jade_cutter', name: 'Primordial Jade Cutter', type: 'Sword', rarity: 5, baseAtk: 542, subStat: 'critRate', subStatValue: 22.1, icon: 'UI_EquipIcon_Sword_Morax' },
  { id: 'skyward_blade', name: 'Skyward Blade', type: 'Sword', rarity: 5, baseAtk: 674, subStat: 'er', subStatValue: 22.9, icon: 'UI_EquipIcon_Sword_Dvalin' },
  { id: 'aquila_favonia', name: 'Aquila Favonia', type: 'Sword', rarity: 5, baseAtk: 674, subStat: 'physicalDmg', subStatValue: 25.0, icon: 'UI_EquipIcon_Sword_Falcon' },
  { id: 'summit_shaper', name: 'Summit Shaper', type: 'Sword', rarity: 5, baseAtk: 674, subStat: 'defPercent', subStatValue: 27.6, icon: 'UI_EquipIcon_Sword_Kunwu' },
  { id: 'favonius_sword', name: 'Favonius Sword', type: 'Sword', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Sword_Zephyrus' },
  { id: 'sacrificial_sword', name: 'Sacrificial Sword', type: 'Sword', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Sword_Fossil' },
  { id: 'the_black_sword', name: 'The Black Sword', type: 'Sword', rarity: 4, baseAtk: 454, subStat: 'critRate', subStatValue: 20.7 },
  { id: 'iron_sting', name: 'Iron Sting', type: 'Sword', rarity: 4, baseAtk: 454, subStat: 'em', subStatValue: 55.2 },
  { id: 'dark_iron_sword', name: 'Dark Iron Sword', type: 'Sword', rarity: 3, baseAtk: 401, subStat: 'em', subStatValue: 44.1 },
  { id: 'thrilling_tales_of_dragon_slayers', name: 'Thrilling Tales of Dragon Slayers', type: 'Sword', rarity: 3, baseAtk: 401, subStat: 'hpPercent', subStatValue: 41.3 },

  // Claymores
  { id: 'wolfs_gravestone', name: "Wolf's Gravestone", type: 'Claymore', rarity: 5, baseAtk: 608, subStat: 'atkPercent', subStatValue: 33.1 },
  { id: 'redhorn_stonethresher', name: 'Redhorn Stonethresher', type: 'Claymore', rarity: 5, baseAtk: 542, subStat: 'critDmg', subStatValue: 88.2, icon: 'UI_EquipIcon_Claymore_Itadorimaru' },
  { id: 'song_of_broken_pines', name: 'Song of Broken Pines', type: 'Claymore', rarity: 5, baseAtk: 608, subStat: 'physicalDmg', subStatValue: 33.1 },
  { id: 'skyward_pride', name: 'Skyward Pride', type: 'Claymore', rarity: 5, baseAtk: 674, subStat: 'er', subStatValue: 22.9 },
  { id: 'serpent_spine', name: 'Serpent Spine', type: 'Claymore', rarity: 4, baseAtk: 454, subStat: 'critRate', subStatValue: 27.6, icon: 'UI_EquipIcon_Claymore_Kione' },
  { id: 'rainslasher', name: 'Rainslasher', type: 'Claymore', rarity: 4, baseAtk: 454, subStat: 'em', subStatValue: 55.2, icon: 'UI_EquipIcon_Claymore_Perdue' },
  { id: 'favonius_greatsword', name: 'Favonius Greatsword', type: 'Claymore', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9 },
  { id: 'sacrificial_greatsword', name: 'Sacrificial Greatsword', type: 'Claymore', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Claymore_Fossil' },
  { id: 'white_iron_greatsword', name: 'White Iron Greatsword', type: 'Claymore', rarity: 3, baseAtk: 401, subStat: 'defPercent', subStatValue: 51.7, icon: 'UI_EquipIcon_Claymore_Tin' },

  // Polearms
  { id: 'staff_of_homa', name: 'Staff of Homa', type: 'Polearm', rarity: 5, baseAtk: 608, subStat: 'critDmg', subStatValue: 66.2 },
  { id: 'engulfing_lightning', name: 'Engulfing Lightning', type: 'Polearm', rarity: 5, baseAtk: 608, subStat: 'er', subStatValue: 55.1, icon: 'UI_EquipIcon_Pole_Narukami' },
  { id: 'primordial_jade_winged_spear', name: 'Primordial Jade Winged-Spear', type: 'Polearm', rarity: 5, baseAtk: 674, subStat: 'critRate', subStatValue: 22.1, icon: 'UI_EquipIcon_Pole_Morax' },
  { id: 'skyward_spine', name: 'Skyward Spine', type: 'Polearm', rarity: 5, baseAtk: 674, subStat: 'critRate', subStatValue: 12.4 },
  { id: 'calamity_queller', name: 'Calamity Queller', type: 'Polearm', rarity: 5, baseAtk: 741, subStat: 'atkPercent', subStatValue: 24.0, icon: 'UI_EquipIcon_Pole_Santika' },
  { id: 'dragons_bane', name: "Dragon's Bane", type: 'Polearm', rarity: 4, baseAtk: 454, subStat: 'em', subStatValue: 55.2 },
  { id: 'favonius_lance', name: 'Favonius Lance', type: 'Polearm', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Pole_Zephyrus' },
  { id: 'black_tassel', name: 'Black Tassel', type: 'Polearm', rarity: 3, baseAtk: 401, subStat: 'hpPercent', subStatValue: 41.3, icon: 'UI_EquipIcon_Pole_Noire' },

  // Bows
  { id: 'thundering_pulse', name: 'Thundering Pulse', type: 'Bow', rarity: 5, baseAtk: 542, subStat: 'critDmg', subStatValue: 44.1 },
  { id: 'amos_bow', name: "Amos' Bow", type: 'Bow', rarity: 5, baseAtk: 608, subStat: 'atkPercent', subStatValue: 33.1, icon: 'UI_EquipIcon_Bow_Amos' },
  { id: 'polar_star', name: 'Polar Star', type: 'Bow', rarity: 5, baseAtk: 674, subStat: 'critRate', subStatValue: 22.1 },
  { id: 'skyward_harp', name: 'Skyward Harp', type: 'Bow', rarity: 5, baseAtk: 674, subStat: 'critRate', subStatValue: 22.1, icon: 'UI_EquipIcon_Bow_Dvalin' },
  { id: 'elegy_for_the_end', name: 'Elegy for the End', type: 'Bow', rarity: 5, baseAtk: 542, subStat: 'er', subStatValue: 30.6 },
  { id: 'a_thousand_floating_dreams', name: 'A Thousand Floating Dreams', type: 'Bow', rarity: 5, baseAtk: 542, subStat: 'em', subStatValue: 132.4 },
  { id: 'favonius_warbow', name: 'Favonius Warbow', type: 'Bow', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Bow_Zephyrus' },
  { id: 'the_stringless', name: 'The Stringless', type: 'Bow', rarity: 4, baseAtk: 454, subStat: 'em', subStatValue: 55.2 },
  { id: 'sacrificial_bow', name: 'Sacrificial Bow', type: 'Bow', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9 },
  { id: 'slingshot', name: 'Slingshot', type: 'Bow', rarity: 3, baseAtk: 401, subStat: 'critRate', subStatValue: 31.0 },

  // Catalysts
  { id: 'lost_prayer_to_the_sacred_winds', name: 'Lost Prayer to the Sacred Winds', type: 'Catalyst', rarity: 5, baseAtk: 542, subStat: 'critRate', subStatValue: 33.1 },
  { id: 'kagura_verity', name: "Kagura's Verity", type: 'Catalyst', rarity: 5, baseAtk: 674, subStat: 'atkPercent', subStatValue: 24.0 },
  { id: 'skyward_atlas', name: 'Skyward Atlas', type: 'Catalyst', rarity: 5, baseAtk: 674, subStat: 'atkPercent', subStatValue: 33.1, icon: 'UI_EquipIcon_Catalyst_Dvalin' },
  { id: 'key_of_khaj_nisut', name: 'Key of Khaj-Nisut', type: 'Sword', rarity: 5, baseAtk: 542, subStat: 'hpPercent', subStatValue: 41.3, icon: 'UI_EquipIcon_Sword_Deshret' },
  { id: 'sacrificial_fragments', name: 'Sacrificial Fragments', type: 'Catalyst', rarity: 4, baseAtk: 454, subStat: 'em', subStatValue: 55.2 },
  { id: 'favonius_codex', name: 'Favonius Codex', type: 'Catalyst', rarity: 4, baseAtk: 454, subStat: 'er', subStatValue: 45.9, icon: 'UI_EquipIcon_Catalyst_Zephyrus' },
  { id: 'the_widsith', name: 'The Widsith', type: 'Catalyst', rarity: 4, baseAtk: 454, subStat: 'critDmg', subStatValue: 41.3, icon: 'UI_EquipIcon_Catalyst_Troupe' },
  { id: 'dawning_frost', name: 'Dawning Frost', type: 'Catalyst', rarity: 4, baseAtk: 510, subStat: 'critDmg', subStatValue: 55.1 },
];

// --- Everything else, rarity-tier approximate numbers ---
const GENERATED_WEAPONS = [
  // Swords
  tierWeapon('a_teaspoon_of_transcendence', 'A Teaspoon of Transcendence', 'Sword', 5, 'critDmg'),
  tierWeapon('absolution', 'Absolution', 'Sword', 5, 'critDmg', 'UI_EquipIcon_Sword_Estoc'),
  tierWeapon('athame_artis', 'Athame Artis', 'Sword', 5, 'critRate', 'UI_EquipIcon_Sword_Motsognir'),
  tierWeapon('azurelight', 'Azurelight', 'Sword', 5, 'critRate'),
  tierWeapon('crimson_moons_semblance', "Crimson Moon's Semblance", 'Sword', 5, 'critRate'),
  tierWeapon('exaiphanes_blade', 'Exaiphanes Blade', 'Sword', 4, 'critRate'),
  tierWeapon('festering_desire', 'Festering Desire', 'Sword', 4, 'er', 'UI_EquipIcon_Sword_Magnum'),
  tierWeapon('haran_geppaku_futsu', 'Haran Geppaku Futsu', 'Sword', 5, 'critRate'),
  tierWeapon('mistsplitter_reforged', 'Mistsplitter Reforged', 'Sword', 5, 'critDmg', 'UI_EquipIcon_Sword_Narukami'),
  tierWeapon('solar_pearl', 'Solar Pearl', 'Sword', 4, 'critRate'),
  tierWeapon('the_alley_flash', 'The Alley Flash', 'Sword', 4, 'em', 'UI_EquipIcon_Sword_Outlaw'),
  tierWeapon('the_flute', 'The Flute', 'Sword', 4, 'atkFlat', 'UI_EquipIcon_Sword_Troupe'),
  tierWeapon('windblume_ode', 'Windblume Ode', 'Bow', 4, 'em', 'UI_EquipIcon_Bow_Fleurfair'),
  tierWeapon('cool_steel', 'Cool Steel', 'Sword', 3, 'atkPercent', 'UI_EquipIcon_Sword_Steel'),
  tierWeapon('fillet_blade', 'Fillet Blade', 'Sword', 3, 'atkPercent'),
  tierWeapon('harbinger_of_dawn', 'Harbinger of Dawn', 'Sword', 3, 'critDmg'),
  tierWeapon('otherworldly_story', 'Otherworldly Story', 'Catalyst', 3, 'er', 'UI_EquipIcon_Catalyst_Lightnov'),
  tierWeapon('skyrider_sword', 'Skyrider Sword', 'Sword', 3, 'er'),
  tierWeapon('sword_of_descension', 'Sword of Descension', 'Sword', 4, 'atkPercent'),
  tierWeapon('sword_of_narzissenkreuz', 'Sword of Narzissenkreuz', 'Sword', 4, 'atkFlat'),
  tierWeapon('travelers_handy_sword', "Traveler's Handy Sword", 'Sword', 3, 'defPercent'),
  tierWeapon('twin_nephrite', 'Twin Nephrite', 'Sword', 3, 'critRate'),
  tierWeapon('calamity_of_eshu', 'Calamity of Eshu', 'Sword', 4, 'atkPercent', 'UI_EquipIcon_Sword_SacrificialNgombe'),
  tierWeapon('finale_of_the_deep', 'Finale of the Deep', 'Sword', 4, 'atkPercent', 'UI_EquipIcon_Sword_Vorpal'),
  tierWeapon('fleuve_cendre_ferryman', 'Fleuve Cendre Ferryman', 'Sword', 4, 'er', 'UI_EquipIcon_Sword_Machination'),
  tierWeapon('flute_of_ezpitzal', 'Flute of Ezpitzal', 'Sword', 4, 'defPercent', 'UI_EquipIcon_Sword_Isikhulu'),
  tierWeapon('light_of_foliar_incision', 'Light of Foliar Incision', 'Sword', 5, 'critDmg', 'UI_EquipIcon_Sword_Ayus'),
  tierWeapon('peak_patrol_song', 'Peak Patrol Song', 'Sword', 5, 'defPercent', 'UI_EquipIcon_Sword_XochitlsTube'),
  tierWeapon('serenitys_call', "Serenity's Call", 'Sword', 4, 'er', 'UI_EquipIcon_Sword_Ilmarinen'),
  tierWeapon('xiphos_moonlight', "Xiphos' Moonlight", 'Sword', 4, 'em', 'UI_EquipIcon_Sword_Pleroma'),
  tierWeapon('lions_roar', "Lion's Roar", 'Sword', 4, 'atkPercent'),
  tierWeapon('prototype_rancour', 'Prototype Rancour', 'Sword', 4, 'atkPercent', 'UI_EquipIcon_Sword_Proto'),
  tierWeapon('the_dockhands_assistant', "The Dockhand's Assistant", 'Sword', 4, 'hpPercent'),
  tierWeapon('kagotsurube_isshin', 'Kagotsurube Isshin', 'Sword', 4, 'critDmg', 'UI_EquipIcon_Sword_Youtou'),
  tierWeapon('blackcliff_longsword', 'Blackcliff Longsword', 'Sword', 4, 'critDmg', 'UI_EquipIcon_Sword_Blackrock'),
  tierWeapon('toukabou_shigure', 'Toukabou Shigure', 'Sword', 4, 'em', 'UI_EquipIcon_Sword_Kasabouzu'),
  tierWeapon('moonweavers_dawn', "Moonweaver's Dawn", 'Sword', 4, 'critRate'),

  // Claymores
  tierWeapon('a_thousand_blazing_suns', 'A Thousand Blazing Suns', 'Claymore', 5, 'critRate', 'UI_EquipIcon_Claymore_RadianceSword'),
  tierWeapon('disaster_and_remorse', 'Disaster and Remorse', 'Claymore', 5, 'critRate'),
  tierWeapon('the_daybreak_chronicles', 'The Daybreak Chronicles', 'Claymore', 5, 'critDmg'),
  tierWeapon('the_unforged', 'The Unforged', 'Claymore', 5, 'atkPercent', 'UI_EquipIcon_Claymore_Kunwu'),
  tierWeapon('blackcliff_slasher', 'Blackcliff Slasher', 'Claymore', 4, 'critDmg', 'UI_EquipIcon_Claymore_Blackrock'),
  tierWeapon('prototype_archaic', 'Prototype Archaic', 'Claymore', 4, 'atkPercent', 'UI_EquipIcon_Claymore_Proto'),
  tierWeapon('the_viridescent_hunt', 'The Viridescent Hunt', 'Claymore', 4, 'critRate'),
  tierWeapon('whiteblind', 'Whiteblind', 'Claymore', 4, 'defPercent'),
  tierWeapon('bloodtainted_greatsword', 'Bloodtainted Greatsword', 'Claymore', 3, 'em', 'UI_EquipIcon_Claymore_Siegfry'),
  tierWeapon('debate_club', 'Debate Club', 'Claymore', 3, 'atkFlat'),
  tierWeapon('skyrider_greatsword', 'Skyrider Greatsword', 'Claymore', 3, 'physicalDmg'),
  tierWeapon('fractured_halo', 'Fractured Halo', 'Polearm', 5, 'critDmg', 'UI_EquipIcon_Pole_Perdix'),
  tierWeapon('staff_of_the_scarlet_sands', 'Staff of the Scarlet Sands', 'Polearm', 5, 'critRate', 'UI_EquipIcon_Pole_Deshret'),
  tierWeapon('symphonist_of_scents', 'Symphonist of Scents', 'Polearm', 5, 'critDmg', 'UI_EquipIcon_Pole_Trident'),
  tierWeapon('vortex_vanquisher', 'Vortex Vanquisher', 'Polearm', 5, 'atkPercent', 'UI_EquipIcon_Pole_Kunwu'),
  tierWeapon('master_key', 'Master Key', 'Claymore', 4, 'er', 'UI_EquipIcon_Claymore_Ilmarinen'),
  tierWeapon('the_bell', 'The Bell', 'Claymore', 4, 'hpPercent', 'UI_EquipIcon_Claymore_Troupe'),
  tierWeapon('katsuragikiri_nagamasa', 'Katsuragikiri Nagamasa', 'Claymore', 4, 'er', 'UI_EquipIcon_Claymore_Bakufu'),
  tierWeapon('fruitful_hook', 'Fruitful Hook', 'Claymore', 4, 'atkPercent', 'UI_EquipIcon_Claymore_Umpakati'),
  tierWeapon('tulaytullahs_remembrance', "Tulaytullah's Remembrance", 'Catalyst', 5, 'critDmg', 'UI_EquipIcon_Catalyst_Alaya'),
  tierWeapon('uraku_misugiri', 'Uraku Misugiri', 'Sword', 5, 'critDmg', 'UI_EquipIcon_Sword_Needle'),
  tierWeapon('vivid_notions', 'Vivid Notions', 'Catalyst', 5, 'critDmg', 'UI_EquipIcon_Catalyst_VaresaTransformer'),
  tierWeapon('the_first_great_magic', 'The First Great Magic', 'Bow', 5, 'critDmg', 'UI_EquipIcon_Bow_Pledge'),
  tierWeapon('sacrificial_jade', 'Sacrificial Jade', 'Catalyst', 4, 'er'),
  tierWeapon('wine_and_song', 'Wine and Song', 'Catalyst', 4, 'atkPercent', 'UI_EquipIcon_Catalyst_Outlaw'),
  tierWeapon('luxurious_sea_lord', 'Luxurious Sea Lord', 'Claymore', 4, 'hpPercent', 'UI_EquipIcon_Claymore_MillenniaTuna'),
  tierWeapon('snow_tombed_starsilver', 'Snow-Tombed Starsilver', 'Claymore', 4, 'physicalDmg'),
  tierWeapon('portable_power_saw', 'Portable Power Saw', 'Claymore', 4, 'defPercent', 'UI_EquipIcon_Claymore_Mechanic'),
  tierWeapon('lithic_blade', 'Lithic Blade', 'Claymore', 4, 'atkPercent', 'UI_EquipIcon_Claymore_Lapis'),
  tierWeapon('ferrous_shadow', 'Ferrous Shadow', 'Claymore', 3, 'hpPercent'),

  // Polearms
  tierWeapon('angelos_heptades', "Angelos' Heptades", 'Polearm', 5, 'atkFlat'),
  tierWeapon('fang_of_the_mountain_king', 'Fang of the Mountain King', 'Polearm', 5, 'critRate'),
  tierWeapon('halberd', 'Halberd', 'Polearm', 4, 'atkPercent'),
  tierWeapon('chain_breaker', 'Chain Breaker', 'Polearm', 4, 'atkPercent'),
  tierWeapon('cinnabar_spindle', 'Cinnabar Spindle', 'Polearm', 4, 'defPercent'),
  tierWeapon('crescent_pike', 'Crescent Pike', 'Polearm', 4, 'physicalDmg'),
  tierWeapon('deathmatch', 'Deathmatch', 'Polearm', 4, 'critRate'),
  tierWeapon('dragonspine_spear', 'Dragonspine Spear', 'Polearm', 4, 'physicalDmg', 'UI_EquipIcon_Pole_Everfrost'),
  tierWeapon('earth_shaker', 'Earth Shaker', 'Polearm', 4, 'atkPercent'),
  tierWeapon('kitain_cross_spear', 'Kitain Cross Spear', 'Polearm', 4, 'em'),
  tierWeapon('lithic_spear', 'Lithic Spear', 'Polearm', 4, 'atkPercent', 'UI_EquipIcon_Pole_Lapis'),
  tierWeapon('missive_windspear', 'Missive Windspear', 'Polearm', 4, 'atkPercent', 'UI_EquipIcon_Pole_Windvane'),
  tierWeapon('moonpiercer', 'Moonpiercer', 'Polearm', 4, 'em'),
  tierWeapon('prototype_starglitter', 'Prototype Starglitter', 'Polearm', 4, 'er', 'UI_EquipIcon_Pole_Proto'),
  tierWeapon('royal_spear', 'Royal Spear', 'Polearm', 4, 'atkPercent'),
  tierWeapon('white_tassel', 'White Tassel', 'Polearm', 3, 'critRate', 'UI_EquipIcon_Pole_Ruby'),
  tierWeapon('lumidouce_elegy', 'Lumidouce Elegy', 'Polearm', 5, 'critRate', 'UI_EquipIcon_Pole_Muguet'),
  tierWeapon('bloodsoaked_ruins', 'Bloodsoaked Ruins', 'Polearm', 5, 'critRate', 'UI_EquipIcon_Pole_TummaLyhty'),
  tierWeapon('blackcliff_pole', 'Blackcliff Pole', 'Polearm', 4, 'critDmg', 'UI_EquipIcon_Pole_Blackrock'),

  // Bows
  tierWeapon('aqua_simulacra', 'Aqua Simulacra', 'Bow', 5, 'critDmg', 'UI_EquipIcon_Bow_Kirin'),
  tierWeapon('astral_vultures_crimson_plumage', "Astral Vulture's Crimson Plumage", 'Bow', 5, 'critDmg'),
  tierWeapon('beacon_of_the_reed_sea', 'Beacon of the Reed Sea', 'Claymore', 5, 'critRate', 'UI_EquipIcon_Claymore_Deshret'),
  tierWeapon('cranes_echoing_call', "Crane's Echoing Call", 'Catalyst', 5, 'atkPercent', 'UI_EquipIcon_Catalyst_MountainGale'),
  tierWeapon('flower_wreathed_feathers', 'Flower-Wreathed Feathers', 'Bow', 4, 'atkPercent', 'UI_EquipIcon_Bow_Umpakati'),
  tierWeapon('hunters_path', "Hunter's Path", 'Bow', 5, 'critRate', 'UI_EquipIcon_Bow_Ayus'),
  tierWeapon('rainbow_serpents_rain_bow', "Rainbow Serpent's Rain Bow", 'Bow', 4, 'er', 'UI_EquipIcon_Bow_ElegguaBow'),
  tierWeapon('alley_hunter', 'Alley Hunter', 'Bow', 4, 'critRate', 'UI_EquipIcon_Bow_Outlaw'),
  tierWeapon('ballad_of_the_boundless_blue', 'Ballad of the Boundless Blue', 'Catalyst', 4, 'er', 'UI_EquipIcon_Catalyst_DandelionPoem'),
  tierWeapon('ballad_of_the_fjords', 'Ballad of the Fjords', 'Bow', 4, 'critRate'),
  tierWeapon('blackcliff_warbow', 'Blackcliff Warbow', 'Bow', 4, 'critDmg'),
  tierWeapon('compound_bow', 'Compound Bow', 'Bow', 4, 'physicalDmg', 'UI_EquipIcon_Bow_Exotic'),
  tierWeapon('fading_twilight', 'Fading Twilight', 'Bow', 4, 'er', 'UI_EquipIcon_Bow_Fallensun'),
  tierWeapon('prototype_crescent', 'Prototype Crescent', 'Bow', 4, 'atkPercent'),
  tierWeapon('rust', 'Rust', 'Bow', 4, 'atkFlat', 'UI_EquipIcon_Bow_Recluse'),
  tierWeapon('scion_of_the_blazing_sun', 'Scion of the Blazing Sun', 'Bow', 4, 'critRate', 'UI_EquipIcon_Bow_Gurabad'),
  tierWeapon('mouuns_moon', "Mouun's Moon", 'Bow', 4, 'atkPercent', 'UI_EquipIcon_Bow_Maria'),
  tierWeapon('wavebreakers_fin', "Wavebreaker's Fin", 'Bow', 5, 'atkFlat'),
  tierWeapon('messenger', 'Messenger', 'Bow', 3, 'critDmg'),
  tierWeapon('raven_bow', 'Raven Bow', 'Bow', 3, 'em', 'UI_EquipIcon_Bow_Crowfeather'),
  tierWeapon('recurve_bow', 'Recurve Bow', 'Bow', 3, 'hpPercent', 'UI_EquipIcon_Bow_Curve'),
  tierWeapon('sharpshooters_oath', "Sharpshooter's Oath", 'Bow', 3, 'critDmg', 'UI_EquipIcon_Bow_Arjuna'),
  tierWeapon('song_of_stillness', 'Song of Stillness', 'Bow', 4, 'atkPercent', 'UI_EquipIcon_Bow_Vorpal'),
  tierWeapon('end_of_the_line', 'End of the Line', 'Bow', 4, 'er', 'UI_EquipIcon_Bow_Fin'),
  tierWeapon('golden_frostbound_oath', 'Golden Frostbound Oath', 'Bow', 5, 'critDmg'),
  tierWeapon('ibis_piercer', 'Ibis Piercer', 'Bow', 4, 'critRate'),

  // Catalysts
  tierWeapon('lightbearing_moonshard', 'Lightbearing Moonshard', 'Catalyst', 5, 'critDmg'),
  tierWeapon('memory_of_dust', 'Memory of Dust', 'Catalyst', 5, 'atkPercent'),
  tierWeapon('nightweavers_looking_glass', "Nightweaver's Looking Glass", 'Catalyst', 5, 'em', 'UI_EquipIcon_Catalyst_MenulisRing'),
  tierWeapon('nocturnes_curtain_call', "Nocturne's Curtain Call", 'Catalyst', 5, 'critDmg'),
  tierWeapon('reliquary_of_truth', 'Reliquary of Truth', 'Catalyst', 5, 'critDmg', 'UI_EquipIcon_Catalyst_Sistrum'),
  tierWeapon('silvershower_heartstrings', 'Silvershower Heartstrings', 'Catalyst', 5, 'hpFlat'),
  tierWeapon('splendor_of_tranquil_waters', 'Splendor of Tranquil Waters', 'Catalyst', 5, 'critDmg'),
  tierWeapon('starcallers_watch', "Starcaller's Watch", 'Catalyst', 5, 'em', 'UI_EquipIcon_Catalyst_Figurines'),
  tierWeapon('sunny_morning_sleep_in', 'Sunny Morning Sleep-In', 'Catalyst', 5, 'em'),
  tierWeapon('surfs_up', "Surf's Up", 'Catalyst', 5, 'critDmg', 'UI_EquipIcon_Catalyst_MechaPufferfish'),
  tierWeapon('tome_of_the_eternal_flow', 'Tome of the Eternal Flow', 'Catalyst', 5, 'critDmg'),
  tierWeapon('blackmarrow_lantern', 'Blackmarrow Lantern', 'Catalyst', 4, 'em', 'UI_EquipIcon_Catalyst_Ilmarinen'),
  tierWeapon('blackcliff_agate', 'Blackcliff Agate', 'Catalyst', 4, 'critDmg'),
  tierWeapon('cloudforged', 'Cloudforged', 'Catalyst', 4, 'em'),
  tierWeapon('dodoco_tales', 'Dodoco Tales', 'Catalyst', 4, 'atkPercent'),
  tierWeapon('etherlight_spindlelute', 'Etherlight Spindlelute', 'Catalyst', 4, 'er', 'UI_EquipIcon_Catalyst_SeeliesLute'),
  tierWeapon('eye_of_perception', 'Eye of Perception', 'Catalyst', 4, 'atkFlat'),
  tierWeapon('flame_forged_insight', 'Flame-Forged Insight', 'Catalyst', 4, 'em'),
  tierWeapon('forest_regalia', 'Forest Regalia', 'Catalyst', 4, 'er'),
  tierWeapon('forged_by_the_golden_melody', 'Forged by the Golden Melody', 'Catalyst', 4, 'critRate'),
  tierWeapon('frostbearer', 'Frostbearer', 'Catalyst', 4, 'atkPercent', 'UI_EquipIcon_Catalyst_Everfrost'),
  tierWeapon('frostbreath', 'Frostbreath', 'Catalyst', 4, 'er'),
  tierWeapon('fruit_of_fulfillment', 'Fruit of Fulfillment', 'Catalyst', 4, 'er', 'UI_EquipIcon_Catalyst_Arakalari'),
  tierWeapon('hakushin_ring', 'Hakushin Ring', 'Catalyst', 4, 'er', 'UI_EquipIcon_Catalyst_Bakufu'),
  tierWeapon('jade_vista', 'Jade Vista', 'Catalyst', 4, 'critRate'),
  tierWeapon('kings_squire', "King's Squire", 'Catalyst', 4, 'atkPercent'),
  tierWeapon('mailed_flower', 'Mailed Flower', 'Catalyst', 4, 'em'),
  tierWeapon('makhaira_aquamarine', 'Makhaira Aquamarine', 'Catalyst', 4, 'em'),
  tierWeapon('mappa_mare', 'Mappa Mare', 'Catalyst', 4, 'em', 'UI_EquipIcon_Catalyst_Exotic'),
  tierWeapon('prototype_amber', 'Prototype Amber', 'Catalyst', 4, 'hpPercent', 'UI_EquipIcon_Catalyst_Proto'),
  tierWeapon('royal_grimoire', 'Royal Grimoire', 'Catalyst', 4, 'atkPercent'),
  tierWeapon('sapwood_blade', 'Sapwood Blade', 'Catalyst', 4, 'er'),
  tierWeapon('snare_hook', 'Snare Hook', 'Catalyst', 4, 'er'),
  tierWeapon('song_of_the_vigil', 'Song of the Vigil', 'Catalyst', 4, 'em'),
  tierWeapon('tidal_shadow', 'Tidal Shadow', 'Catalyst', 4, 'atkPercent'),
  tierWeapon('the_catch', 'The Catch', 'Catalyst', 4, 'er'),
  tierWeapon('ultimate_overlords_mega_magic_sword', "Ultimate Overlord's Mega Magic Sword", 'Catalyst', 4, 'er'),
  tierWeapon('wandering_evenstar', 'Wandering Evenstar', 'Catalyst', 4, 'em'),
  tierWeapon('waveriding_whirl', 'Waveriding Whirl', 'Catalyst', 4, 'er', 'UI_EquipIcon_Catalyst_Umpakati'),
  tierWeapon('emerald_orb', 'Emerald Orb', 'Catalyst', 3, 'em', 'UI_EquipIcon_Catalyst_Jade'),
  tierWeapon('magic_guide', 'Magic Guide', 'Catalyst', 3, 'em', 'UI_EquipIcon_Catalyst_Intro'),
  tierWeapon('oathsworn_eye', 'Oathsworn Eye', 'Catalyst', 4, 'atkPercent'),
  tierWeapon('everlasting_moonglow', 'Everlasting Moonglow', 'Catalyst', 5, 'er'),
];

GENSHIN_DATA.weapons = HAND_VERIFIED_WEAPONS.concat(GENERATED_WEAPONS);
GENSHIN_DATA.weaponTypes = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
