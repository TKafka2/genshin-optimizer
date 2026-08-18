// Genshin Optimizer — character face-icon key mapping.
// Values are EnkaNetwork UI icon keys (from raw.githubusercontent.com/EnkaNetwork/API-docs),
// loaded at runtime as https://enka.network/ui/UI_AvatarIcon_{key}.png. EnkaNetwork
// hosts these specifically for third-party community tools to use — this is the same
// asset CDN behind most Genshin build-card/damage-calc sites, not a private art dump.
// If a character has no entry here (or the image 404s), the UI falls back to a
// colored initials avatar — never a broken image.
window.GENSHIN_DATA = window.GENSHIN_DATA || {};

GENSHIN_DATA.characterIcons = {
  albedo: 'Albedo', alhaitham: 'Alhatham', amber: 'Ambor', arataki_itto: 'Itto',
  arlecchino: 'Arlecchino', ayaka: 'Ayaka', ayato: 'Ayato', baizhu: 'Baizhuer',
  barbara: 'Barbara', beidou: 'Beidou', bennett: 'Bennett', chasca: 'Chasca',
  chiori: 'Chiori', chongyun: 'Chongyun', clorinde: 'Clorinde', collei: 'Collei',
  cyno: 'Cyno', diluc: 'Diluc', diona: 'Diona', eula: 'Eula', faruzan: 'Faruzan',
  fischl: 'Fischl', furina: 'Furina', gaming: 'Gaming', ganyu: 'Ganyu', gorou: 'Gorou',
  hu_tao: 'Hutao', jean: 'Qin', kaedehara_kazuha: 'Kazuha', kaeya: 'Kaeya',
  kirara: 'Momoka', klee: 'Klee', kujou_sara: 'Sara', kuki_shinobu: 'Shinobu',
  lisa: 'Lisa', mavuika: 'Mavuika', mona: 'Mona', nahida: 'Nahida', navia: 'Navia',
  neuvillette: 'Neuvillette', nilou: 'Nilou', ningguang: 'Ningguang', noelle: 'Noel',
  qiqi: 'Qiqi', raiden_shogun: 'Shougun', razor: 'Razor', rosaria: 'Rosaria',
  sangonomiya_kokomi: 'Kokomi', sayu: 'Sayu', shenhe: 'Shenhe', sucrose: 'Sucrose',
  tartaglia: 'Tartaglia', thoma: 'Tohma', tighnari: 'Tighnari', venti: 'Venti',
  wanderer: 'Wanderer', xiangling: 'Xiangling', xiao: 'Xiao', xilonen: 'Xilonen',
  xingqiu: 'Xingqiu', xinyan: 'Xinyan', yae_miko: 'Yae', yanfei: 'Feiyan',
  yelan: 'Yelan', yoimiya: 'Yoimiya', yun_jin: 'Yunjin', zhongli: 'Zhongli',
  traveler: 'PlayerBoy', aloy: 'Aloy', kinich: 'Kinich', iansan: 'Iansan', ifa: 'Ifa',
  lan_yan: 'Lanyan', dahlia: 'Dahlia', jahoda: 'Jahoda', illuga: 'Illuga', aino: 'Aino',
  alyosha: 'Alyosha', kachina: 'Kachina', yumemizuki_mizuki: 'Mizuki', candace: 'Candace',
  charlotte: 'Charlotte', dori: 'Dori', freminet: 'Freminet', heizou: 'Heizo',
  kaveh: 'Kaveh', layla: 'Layla', lynette: 'Linette', mika: 'Mika', sethos: 'Sethos',
  yaoyao: 'Yaoyao', columbina: 'Columbina', nicole: 'Nicole', prune: 'Prune',
  keqing: 'Keqing', dehya: 'Dehya', chevreuse: 'Chevreuse', emilie: 'Emilie',
  citlali: 'Citlali', mualani: 'Mualani', wriothesley: 'Wriothesley',
};
