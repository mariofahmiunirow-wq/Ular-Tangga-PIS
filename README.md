# 🎲 Ular Tangga Pengantar Ilmu Sosial (PIS)

Game edukasi interaktif berbasis web yang memadukan permainan klasik **Ular Tangga (Snakes & Ladders)** dengan materi perkuliahan komprehensif **Pengantar Ilmu Sosial (11 Bab)**.

---

## 🌟 Fitur Utama

- **Papan 10x10 Simetris & Responsif**: 100 petak yang terbagi rata, dilengkapi dengan dukungan mode *Full Viewport* dan *Fullscreen Mode*.
- **Tantangan Kuis Tangga Pembelajaran**: Setiap kali mendarat di pangkal tangga, pemain harus menjawab pertanyaan berbasis HOTS (*Higher Order Thinking Skills*) dari 11 Bab materi Pengantar Ilmu Sosial.
- **Pengacakan Opsi Jawaban Dinamis (Fisher-Yates Shuffle)**: Urutan pilihan jawaban (A, B, C, D) diacak setiap kali kuis muncul dengan pelacakan kunci jawaban 100% presisi.
- **Zona Antigravity ("Loncatan Pengetahuan")**: Mendarat di Kotak #14, #38, #64, atau #86 memberikan *Perisai Pengetahuan* yang otomatis mem-bypass jebakan ular.
- **Aturan Bonus Dadu 6**: Melempar angka 6 memberikan hak 1 kali giliran lempar dadu tambahan.
- **Mode Permainan Ganda**:
  - *Single Player vs AI Bot* (dengan kepribadian sosiolog, ekonom, dan antropolog).
  - *Local Multiplayer Pass & Play* (2–4 pemain dengan kustomisasi nama, warna, dan avatar).
- **Buku Saku PIS & Glosarium Digital**: Akses ringkasan materi 11 Bab dan kamus istilah sosial A–Z langsung di dalam game.
- **Efek Suara Sintetis (Web Audio API)**: Sound effect procedural dinamis tanpa file audio eksternal.

---

## 📚 Cakupan Materi 11 Bab

1. **Bab 1**: Ilmu Sosial sebagai Jendela ke Dunia yang Tak Terlihat (*Imajinasi Sosiologis, Gig Economy*)
2. **Bab 2**: Konsep dan Karakteristik Dasar Ilmu Sosial (*Fungsi Eksplanatif, Prediktif, Dimensi Etis*)
3. **Bab 3**: Objek dan Ruang Lingkup Kajian (*Objek Material vs Formal, 6 Dimensi*)
4. **Bab 4**: Masyarakat dan Budaya (*Fakta Sosial Durkheim, Relativisme Budaya, Etnografi*)
5. **Bab 5**: Kekuasaan, Sumber Daya, dan Individu (*Konformitas Asch, Eksternalitas, Invisible Hand*)
6. **Bab 6**: Waktu, Ruang, dan Konteks Manusia (*Longue Durée Braudel, Space vs Place Massey, SIG*)
7. **Bab 7**: Metodologi Penelitian Sosial (*Informed Consent, Kuantitatif, Kualitatif, Mixed Methods*)
8. **Bab 8**: Akar Paradigma Ilmu Sosial (*'Asabiyyah Khaldun, Positivisme Comte, Marx, Weber Verstehen*)
9. **Bab 9**: Perubahan Sosial, Konflik, dan Kearifan Lokal (*Perdamaian Positif Galtung, Subak Bali UNESCO*)
10. **Bab 10**: Teknologi, Media, dan Masa Depan (*Network Society Castells, Surveillance Capitalism Zuboff*)
11. **Bab 11**: Etika dan Karir Ilmu Sosial (*Etika Riset Pasca-Tuskegee, Tanggung Jawab Intelektual*)

---

## 🚀 Teknologi yang Digunakan

- **Frontend**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual FX**: Canvas Confetti & SVG Procedural Geometry
- **Audio**: Web Audio API Synthesizer
- **Styling**: Vanilla Modern CSS (Glassmorphism & Cyber-Academic Theme)

---

## 💻 Cara Menjalankan di Komputer Lokal

### 1. Prasyarat
- Pastikan sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas).

### 2. Clone atau Unduh Repositori
```bash
git clone https://github.com/USERNAME_ANDA/ular-tangga-pis.git
cd ular-tangga-pis
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di `http://localhost:3000` (atau port yang tertera pada terminal).

### 5. Build untuk Produksi
```bash
npm run build
```
File siap rilis akan tersedia di folder `dist/`.

---

## 🌐 Panduan Deploy ke Layar Publik (Gratis)

### Opsi A: Deploy ke Vercel (Paling Mudah)
1. Push proyek ini ke repositori GitHub Anda.
2. Buka [Vercel](https://vercel.com/) dan login dengan akun GitHub Anda.
3. Klik **"Add New Project"** dan pilih repositori `ular-tangga-pis`.
4. Klik **"Deploy"** (Vercel otomatis mendeteksi Vite). Game Anda langsung online dengan domain publik!

### Opsi B: Deploy ke Netlify
1. Buka [Netlify](https://www.netlify.com/) dan login.
2. Hubungkan dengan akun GitHub dan pilih repositori ini.
3. Set build command: `npm run build` dan publish directory: `dist`.
4. Klik **"Deploy site"**.

---

## 📄 Lisensi
Proyek ini dibuat untuk tujuan edukasi dan pembelajaran interaktif. Silakan gunakan dan kembangkan secara bebas.
