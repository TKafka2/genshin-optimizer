// Genshin Optimizer — built-in artifact set reference data.
// Bonus text is a short summary for display only; it is not simulated
// numerically (the optimizer scores substats and treats "which set(s) you
// complete" as a preference you choose, not a calculated damage bonus).
window.GENSHIN_DATA = window.GENSHIN_DATA || {};

GENSHIN_DATA.artifactSets = [
  { id: 'gladiators_finale', name: "Gladiator's Finale", twoPc: 'ATK +18%', fourPc: 'If wielding Sword/Claymore/Polearm: Normal Attack DMG +35%.' },
  { id: 'wanderers_troupe', name: "Wanderer's Troupe", twoPc: 'Elemental Mastery +80', fourPc: 'If wielding Catalyst/Bow: Charged Attack DMG +35%.' },
  { id: 'noblesse_oblige', name: 'Noblesse Oblige', twoPc: 'Elemental Burst DMG +20%', fourPc: 'Using Elemental Burst increases all party members\' ATK by 20% for 12s.' },
  { id: 'bloodstained_chivalry', name: 'Bloodstained Chivalry', twoPc: 'Physical DMG +25%', fourPc: 'After a Plunging Attack kill, Normal ATK CRIT Rate +100% and DMG +50% for 10s.' },
  { id: 'viridescent_venerer', name: 'Viridescent Venerer', twoPc: 'Anemo DMG +15%', fourPc: 'Swirl DMG +60%; lowers opponent RES to the swirled element by 40% for 10s.' },
  { id: 'crimson_witch_of_flames', name: 'Crimson Witch of Flames', twoPc: 'Pyro DMG +15%', fourPc: 'Overloaded/Burning/Vaporize/Melt DMG +40%; using Elemental Skill grants 2pc bonus x1.5 for 10s (stacks 3x).' },
  { id: 'thundersoothers', name: 'Thundersoothing', twoPc: 'DMG taken from Electro-charged/Overloaded/Superconduct reduced 35%', fourPc: 'While affected by Electro, DMG +35%.' },
  { id: 'thundering_fury', name: 'Thundering Fury', twoPc: 'Electro DMG +15%', fourPc: 'Overloaded/Electro-Charged/Superconduct DMG +40%; reduces skill CD 1s on reaction trigger.' },
  { id: 'maiden_beloved', name: 'Maiden Beloved', twoPc: 'Healing Bonus +15%', fourPc: 'Increases healing received and the healing this character grants by 20% for 10s after using Elemental Skill/Burst.' },
  { id: 'heart_of_depth', name: 'Heart of Depth', twoPc: 'Hydro DMG +15%', fourPc: 'After using Elemental Skill: Normal/Charged Attack DMG +30% for 15s.' },
  { id: 'blizzard_strayer', name: 'Blizzard Strayer', twoPc: 'Cryo DMG +15%', fourPc: 'Vs Frozen/Cryo-affected enemies: CRIT Rate +20%, +40% more if target is Frozen.' },
  { id: 'lavawalker', name: 'Lavawalker', twoPc: 'DMG taken from Pyro reduced 35%', fourPc: 'Vs Burning/affected-by-Pyro enemies, DMG +35%.' },
  { id: 'archaic_petra', name: 'Archaic Petra', twoPc: 'Geo DMG +15%', fourPc: 'Crystallize shield grants +35% DMG of matching element for 10s.' },
  { id: 'retracing_bolide', name: 'Retracing Bolide', twoPc: 'Shield Strength +40%', fourPc: 'While protected by a shield: Normal/Charged Attack DMG +40%.' },
  { id: 'tenacity_of_the_millelith', name: 'Tenacity of the Millelith', twoPc: 'HP +20%', fourPc: 'Using Elemental Skill increases party ATK 20% and Shield Strength 30% for 3s.' },
  { id: 'pale_flame', name: 'Pale Flame', twoPc: 'Physical DMG +25%', fourPc: 'Skill hits grant ATK +9% and Physical DMG +25% for 7s (stacks 2x); at max stacks, ATK bonus doubled.' },
  { id: 'shimenawas_reminiscence', name: "Shimenawa's Reminiscence", twoPc: 'ATK +18%', fourPc: 'On skill hit (costing 15 energy) ATK +50% and Normal/Charged/Plunge DMG +50% for 10s.' },
  { id: 'emblem_of_severed_fate', name: 'Emblem of Severed Fate', twoPc: 'Energy Recharge +20%', fourPc: 'Elemental Burst DMG increased by 25% of ER over 100%, up to 75%.' },
  { id: 'husk_of_opulent_dreams', name: 'Husk of Opulent Dreams', twoPc: 'DEF +30%', fourPc: 'On Geo hit gains a stack (+6% DEF, +6% Geo DMG, max 4) for 6s (extends on Geo damage).' },
  { id: 'ocean_hued_clam', name: 'Ocean-Hued Clam', twoPc: 'Healing Bonus +15%', fourPc: 'Healing triggers a bubble that deals DMG based on healing amount and character ATK.' },
  { id: 'vermillion_hereafter', name: 'Vermillion Hereafter', twoPc: 'ATK +18%', fourPc: 'After Burst, gain Nascent Light: ATK boost that scales down over 16s; consuming energy after refreshes it.' },
  { id: 'echoes_of_an_offering', name: 'Echoes of an Offering', twoPc: 'ATK +18%', fourPc: 'Normal Attacks have a chance to trigger Valley Rite, dealing bonus DMG.' },
  { id: 'deepwood_memories', name: 'Deepwood Memories', twoPc: 'Dendro DMG +15%', fourPc: "After Elemental Skill/Burst, target's Dendro RES -30% for 8s." },
  { id: 'gilded_dreams', name: 'Gilded Dreams', twoPc: 'Elemental Mastery +80', fourPc: 'On elemental reaction trigger, gains ATK or EM bonus based on party elemental variety for 8s.' },
  { id: 'desert_pavilion_chronicle', name: 'Desert Pavilion Chronicle', twoPc: 'Anemo DMG +15%', fourPc: 'After Charged Attack, Normal/Charged ATK Speed +10% and DMG +40% for 15s.' },
  { id: 'flower_of_paradise_lost', name: 'Flower of Paradise Lost', twoPc: 'Elemental Mastery +80', fourPc: 'Bloom/Hyperbloom/Burgeon DMG boosted based on EM; Elemental Skill further boosts for 10s.' },
  { id: 'nymphs_dream', name: "Nymph's Dream", twoPc: 'Hydro DMG +15%', fourPc: 'Normal/Charged/Skill/Burst DMG +7% per stack (up to 4) after Hydro-related actions.' },
  { id: 'vourukashas_glow', name: "Vourukasha's Glow", twoPc: 'HP +20%', fourPc: 'When HP increases or character takes DMG, ATK +8% for 5s (stacks up to 4).' },
  { id: 'marechaussee_hunter', name: 'Marechaussee Hunter', twoPc: 'CRIT Rate +12%', fourPc: 'On Normal/Charged hit, CRIT Rate +30% for 5s if HP ≥ 50%.' },
  { id: 'golden_troupe', name: 'Golden Troupe', twoPc: 'Elemental Skill DMG +20%', fourPc: 'While not on field, Elemental Skill DMG +25% more; also affects Geo constructs.' },
  { id: 'song_of_days_past', name: 'Song of Days Past', twoPc: 'Healing Bonus +15%', fourPc: 'Healing grants a stackable shield-like DMG bonus (Yearning) consumed for bonus DMG.' },
  { id: 'nighttime_whispers_in_the_echoing_woods', name: 'Nighttime Whispers in the Echoing Woods', twoPc: 'DEF +30%', fourPc: 'Using Elemental Burst grants a shield and boosts Normal Attack DMG based on DEF for 12s.' },
  { id: 'fragment_of_harmonic_whimsy', name: 'Fragment of Harmonic Whimsy', twoPc: 'All DMG +10%', fourPc: 'Using Elemental Skill/Burst grants a stacking Harmonic Whimsy DMG bonus.' },
  { id: 'unfinished_reverie', name: 'Unfinished Reverie', twoPc: 'ATK +18%', fourPc: 'After a rotation with Elemental Skill/Burst then Normal Attack, DMG +50% for 6s.' },
];
