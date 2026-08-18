// Genshin Optimizer — community best-weapon-for-character data.
// Sourced from GameWith's character weapon guide and Game8's weapon tier list
// (both Aug 2026), cross-checked against each other and against confirmed
// character weapon-types to catch mismatches between the two sources.
// Values are weapon ids from data/weapons.js, ranked best-first. The Weapon
// Optimizer treats a listed weapon as strictly better than any unlisted one for
// that character, then falls back to the stat-priority heuristic (a) among
// ranked entries as a tiebreak on refinement/level, and (b) for any character
// or weapon not covered here.
window.GENSHIN_DATA = window.GENSHIN_DATA || {};

GENSHIN_DATA.preferredWeapons = {
  // Swords
  albedo: ['uraku_misugiri', 'summit_shaper'],
  alhaitham: ['light_of_foliar_incision', 'freedom_sworn', 'primordial_jade_cutter'],
  ayaka: ['mistsplitter_reforged', 'mistsplitter', 'haran_geppaku_futsu', 'primordial_jade_cutter'],
  ayato: ['haran_geppaku_futsu', 'freedom_sworn', 'primordial_jade_cutter'],
  bennett: ['primordial_jade_cutter', 'aquila_favonia', 'sacrificial_sword'],
  chiori: ['uraku_misugiri', 'primordial_jade_cutter'],
  clorinde: ['absolution', 'primordial_jade_cutter'],
  furina: ['splendor_of_tranquil_waters', 'primordial_jade_cutter'],
  jean: ['freedom_sworn', 'aquila_favonia', 'favonius_sword'],
  kaeya: ['freedom_sworn', 'the_black_sword'],
  kaedehara_kazuha: ['freedom_sworn', 'iron_sting'],
  keqing: ['mistsplitter_reforged', 'aquila_favonia', 'primordial_jade_cutter'],
  kirara: ['key_of_khaj_nisut', 'favonius_sword'],
  kuki_shinobu: ['xiphos_moonlight', 'key_of_khaj_nisut', 'favonius_sword'],
  layla: ['key_of_khaj_nisut', 'favonius_sword'],
  lynette: ['freedom_sworn', 'sacrificial_sword'],
  nilou: ['key_of_khaj_nisut', 'primordial_jade_cutter'],
  qiqi: ['sacrificial_sword', 'favonius_sword'],
  xilonen: ['peak_patrol_song', 'summit_shaper'],
  traveler: ['freedom_sworn', 'primordial_jade_cutter'],
  xingqiu: ['sacrificial_sword', 'favonius_sword'],

  // Polearms
  arlecchino: ['crimson_moons_semblance', 'staff_of_homa'],
  candace: ['black_tassel', 'favonius_lance'],
  chevreuse: ['rightful_reward', 'favonius_lance'],
  cyno: ['staff_of_the_scarlet_sands', 'calamity_queller'],
  emilie: ['lumidouce_elegy', 'primordial_jade_winged_spear'],
  hu_tao: ['staff_of_homa'],
  kachina: ['footprint_of_the_rainbow', 'favonius_lance'],
  mika: ['dialogues_of_the_desert_sages', 'favonius_lance'],
  raiden_shogun: ['engulfing_lightning', 'dragons_bane'],
  rosaria: ['primordial_jade_winged_spear', 'engulfing_lightning'],
  shenhe: ['calamity_queller', 'engulfing_lightning'],
  thoma: ['dragons_bane', 'favonius_lance'],
  xiangling: ['staff_of_the_scarlet_sands', 'dragons_bane'],
  xiao: ['primordial_jade_winged_spear', 'staff_of_homa'],
  yaoyao: ['rightful_reward', 'favonius_lance'],
  yun_jin: ['favonius_lance', 'black_tassel'],
  zhongli: ['black_tassel', 'staff_of_homa'],

  // Catalysts
  yumemizuki_mizuki: ['sunny_morning_sleep_in'],
  baizhu: ['thrilling_tales_of_dragon_slayers', 'jadefalls_splendor'],
  barbara: ['a_thousand_floating_dreams', 'thrilling_tales_of_dragon_slayers'],
  charlotte: ['skyward_atlas', 'favonius_codex'],
  citlali: ['starcallers_watch', 'favonius_codex'],
  klee: ['lost_prayer_to_the_sacred_winds', 'skyward_atlas'],
  sangonomiya_kokomi: ['everlasting_moonglow'],
  lisa: ['kagura_verity', 'a_thousand_floating_dreams'],
  mona: ['skyward_atlas', 'lost_prayer_to_the_sacred_winds'],
  mualani: ['surfs_up'],
  nahida: ['a_thousand_floating_dreams'],
  neuvillette: ['tome_of_the_eternal_flow'],
  ningguang: ['lost_prayer_to_the_sacred_winds', 'skyward_atlas'],
  heizou: ['skyward_atlas', 'favonius_codex'],
  sucrose: ['sacrificial_fragments'],
  wanderer: ['tulaytullahs_remembrance', 'skyward_atlas'],
  xianyun: ['cranes_echoing_call'],
  wriothesley: ['tome_of_the_eternal_flow', 'skyward_atlas'],
  yae_miko: ['kagura_verity'],
  yanfei: ['lost_prayer_to_the_sacred_winds', 'favonius_codex'],

  // Claymores
  beidou: ['wolfs_gravestone', 'the_unforged'],
  chongyun: ['wolfs_gravestone', 'favonius_greatsword'],
  dehya: ['beacon_of_the_reed_sea', 'wolfs_gravestone'],
  diluc: ['beacon_of_the_reed_sea', 'wolfs_gravestone'],
  dori: ['sacrificial_greatsword', 'favonius_greatsword'],
  eula: ['song_of_broken_pines', 'wolfs_gravestone'],
  freminet: ['song_of_broken_pines', 'beacon_of_the_reed_sea'],
  gaming: ['beacon_of_the_reed_sea', 'wolfs_gravestone'],
  kinich: ['fang_of_the_mountain_king', 'wolfs_gravestone'],
  arataki_itto: ['redhorn_stonethresher', 'wolfs_gravestone'],
  kaveh: ['mailed_flower', 'wolfs_gravestone'],
  mavuika: ['a_thousand_blazing_suns', 'wolfs_gravestone'],
  navia: ['verdict', 'wolfs_gravestone'],
  noelle: ['redhorn_stonethresher', 'favonius_greatsword'],
  razor: ['song_of_broken_pines', 'rainslasher'],
  sayu: ['favonius_greatsword', 'sacrificial_greatsword'],
};
