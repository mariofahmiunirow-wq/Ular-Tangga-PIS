// Konfigurasi Papan 10x10 Ular Tangga Pengantar Ilmu Sosial (PIS) - Golden Balanced Edition

export const BOARD_SIZE = 10;
export const TOTAL_TILES = 100;

// Tangga Emas (Golden Ladders: 10 Tangga Terdistribusi Merata 1 per Baris)
// Desain proporsional & estetis: Tidak saling silang bertumpuk, tempo permainan ideal, dan kuis bermakna.
export const LADDERS = [
  {
    start: 4,
    end: 25,
    name: 'Imajinasi Sosiologis',
    desc: 'Menghubungkan masalah pribadi dengan isu publik (C. Wright Mills)',
    chapter: 1
  },
  {
    start: 12,
    end: 34,
    name: 'Seeing the General',
    desc: 'Melihat pola umum dari kasus khusus (Peter L. Berger)',
    chapter: 2
  },
  {
    start: 22,
    end: 43,
    name: 'Objek Formal Multidisiplin',
    desc: 'Sudut pandang disiplin membedah realitas sosial',
    chapter: 3
  },
  {
    start: 27,
    end: 53,
    name: 'Fakta Sosial & Relativisme',
    desc: 'Menghargai kebudayaan dan norma institusional',
    chapter: 4
  },
  {
    start: 36,
    end: 58,
    name: 'Regulasi Publik & Keadilan',
    desc: 'Kebijakan mengatasi eksternalitas dan konformitas',
    chapter: 5
  },
  {
    start: 49,
    end: 71,
    name: 'Longue Durée Sejarah',
    desc: 'Memahami perubahan struktural jangka panjang berabad-abad',
    chapter: 6
  },
  {
    start: 57,
    end: 77,
    name: 'Informed Consent & Etika',
    desc: 'Metodologi penelitian yang menjunjung martabat manusia',
    chapter: 7
  },
  {
    start: 62,
    end: 83,
    name: 'Solidaritas Asabiyyah',
    desc: 'Membangun kohesi sosial peradaban ala Ibnu Khaldun',
    chapter: 8
  },
  {
    start: 74,
    end: 93,
    name: 'Kearifan Lokal Subak & Damai',
    desc: 'Tata kelola ekologis UNESCO dan perdamaian positif',
    chapter: 9
  },
  {
    start: 84,
    end: 97,
    name: 'Masyarakat Jaringan & Karir',
    desc: 'Ketahanan literasi digital dan dedikasi agen perubahan',
    chapter: 10
  }
];

// Ular (Snake: Head -> Tail) bertema "Jebakan / Isu Sosial Destruktif"
export const SNAKES = [
  {
    head: 28,
    tail: 10,
    name: 'Prasangka Akal Sehat',
    desc: 'Terjebak asumsi tanpa bukti empiris ilmiah',
    chapter: 1
  },
  {
    head: 48,
    tail: 18,
    name: 'Etnosentrisme Sempit',
    desc: 'Menghakimi budaya lain dengan standar sepihak',
    chapter: 4
  },
  {
    head: 66,
    tail: 44,
    name: 'Eksternalitas Polusi',
    desc: 'Dampak limbah diabaikan tanpa regulasi',
    chapter: 5
  },
  {
    head: 80,
    tail: 59,
    name: 'Polarisasi Identitas',
    desc: 'Politisasi SARA merusak kohesi masyarakat',
    chapter: 9
  },
  {
    head: 92,
    tail: 68,
    name: 'Kapitalisme Pengawasan',
    desc: 'Manipulasi data & pelanggaran privasi digital',
    chapter: 10
  },
  {
    head: 98,
    tail: 78,
    name: 'Pelanggaran Etika Riset',
    desc: 'Mengorbankan martabat manusia demi eksperimen',
    chapter: 11
  }
];

// Antigravity Zones ("Loncatan Pengetahuan" - Melayang Bypass Ular & Bonus)
export const ANTIGRAVITY_ZONES = [
  {
    tile: 14,
    name: 'Zona Antigravity #1 (Lensa Epistemologi)',
    desc: 'Mematahkan gravitasi dogma akal sehat! Dapatkan Perisai Pengetahuan.',
    bonusPoints: 50
  },
  {
    tile: 38,
    name: 'Zona Antigravity #2 (Dimensi Multidisipliner)',
    desc: 'Sintesis Sosiologi, Antropologi & Politik! Bebas meluncur dari jebakan ular.',
    bonusPoints: 50
  },
  {
    tile: 64,
    name: 'Zona Antigravity #3 (Masyarakat Jaringan)',
    desc: 'Kekuatan konektivitas global melontarkan wawasan Anda melampaui gravitasi!',
    bonusPoints: 75
  },
  {
    tile: 86,
    name: 'Zona Antigravity #4 (Pencerahan Masa Depan)',
    desc: 'Visi masa depan & keadilan sosial membentengi langkah Anda menuju puncak!',
    bonusPoints: 100
  }
];

// Peta Konsep Kunci per Kotak Tertentu untuk Tooltip/Edu-Badge
export const TILE_CONCEPTS = {
  1: { title: 'Mulai', badge: 'Start', desc: 'Awal langkah mahasiswa menjadi agen perubahan' },
  8: { title: 'Common Sense', badge: 'Bab 1', desc: 'Keterbatasan prasangka tanpa uji ilmiah' },
  15: { title: 'Seeing General', badge: 'Bab 2', desc: 'Melihat pola umum dari kasus khusus (Berger)' },
  20: { title: 'Objek Formal', badge: 'Bab 3', desc: 'Sudut pandang disiplin membedah realitas' },
  30: { title: 'Fakta Sosial', badge: 'Bab 4', desc: 'Kekuatan eksternal yang mengarahkan individu (Durkheim)' },
  40: { title: 'Relativisme Budaya', badge: 'Bab 4', desc: 'Menghargai keragaman konteks budaya (Tylor)' },
  52: { title: 'Invisible Hand', badge: 'Bab 5', desc: 'Mekanisme pasar dan insentif (Adam Smith)' },
  58: { title: 'Konformitas', badge: 'Bab 5', desc: 'Dinamika tekanan kelompok (Solomon Asch)' },
  60: { title: 'Longue Durée', badge: 'Bab 6', desc: 'Perubahan struktural skala panjang abad ke abad' },
  70: { title: 'Informed Consent', badge: 'Bab 7', desc: 'Etika persetujuan sukarela dalam riset' },
  77: { title: 'Muqaddimah', badge: 'Bab 8', desc: 'Karya agung historiografi Ibnu Khaldun' },
  85: { title: 'Subak Bali', badge: 'Bab 9', desc: 'Kearifan lokal sosio-ekologis warisan UNESCO' },
  90: { title: 'Network Society', badge: 'Bab 10', desc: 'Transformasi ruang siber oleh Manuel Castells' },
  95: { title: 'Social Responsibility', badge: 'Bab 11', desc: 'Intelektual yang melayani kesejahteraan publik' },
  100: { title: 'Gelar Agen Perubahan', badge: 'Victory', desc: 'Puncak pencapaian ilmuwan sosial berintegritas!' }
};

// Dapatkan info ladder/snake/antigravity pada kotak tertentu
export function getTileFeature(tileNumber) {
  const ladder = LADDERS.find(l => l.start === tileNumber);
  const snake = SNAKES.find(s => s.head === tileNumber);
  const antigravity = ANTIGRAVITY_ZONES.find(a => a.tile === tileNumber);

  return {
    ladder,
    snake,
    antigravity,
    concept: TILE_CONCEPTS[tileNumber] || null
  };
}
