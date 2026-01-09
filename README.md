# 👕 CocokGak! — Review & Visualisasi Outfit Berbasis AI

## 👥 Identitas Kelompok

**Dikembangkan Oleh**

- **Muhammad Gyan Kaushal**
- **Fergie Alpandi Pramadhani**

---

## 📝 Deskripsi Proyek

**CocokGak!** adalah aplikasi **berbasis web** yang membantu pengguna menilai kecocokan outfit berdasarkan **gaya berpakaian** (casual, sporty, formal, streetwear) menggunakan **AI analisis visual**.

Pengguna cukup mengunggah beberapa foto outfit, memilih gaya yang diinginkan, lalu sistem akan:

- Menganalisis keselarasan outfit
- Memberikan rating objektif (0–5)
- Menyajikan review dan saran perbaikan
- Menampilkan visualisasi manekin AI yang mengenakan outfit tersebut

Proyek ini dikembangkan sebagai **Tugas Besar Mata Kuliah Sistem Multimedia**.

---

## 🎯 Tujuan Proyek

- Mengimplementasikan konsep **Sistem Multimedia** pada aplikasi web
- Mengintegrasikan media gambar, animasi, dan AI
- Memberikan pengalaman interaktif dalam evaluasi gaya berpakaian
- Memanfaatkan AI untuk analisis visual dan image generation

---

## 🛠️ Teknologi yang Digunakan

- **Front-End**: React.js, HTML5, CSS3
- **Animasi**: Framer Motion
- **Icon**: Lucide React
- **AI API**: Google Gemini Vision & Image Generation API
- **Image Handling**: HTML5 File API (Base64)
- **Platform**: Web

---

## 📂 Struktur Folder

```
CocokGak/
│── src/
│   ├── components/
│   │   ├── StyleSelector.jsx
│   │   ├── FileUpload.jsx
│   │   ├── ProcessView.jsx
│   │   ├── ResultView.jsx
│   │   └── Layout.jsx
│   ├── services/
│   │   └── gemini.js
│   ├── styles/
│   │   └── variables.css
│   └── main.jsx
│── public/
│── README.md
```

---

## ⚙️ Fitur Utama

- ✅ Upload hingga 5 foto outfit
- ✅ Pemilihan gaya berpakaian (Casual, Sporty, Formal, Streetwear)
- ✅ Analisis outfit menggunakan AI
- ✅ Rating kecocokan outfit (0–5 bintang)
- ✅ Review dan saran otomatis
- ✅ Visualisasi manekin AI
- ✅ UI interaktif dengan animasi

---

## ▶️ Cara Menjalankan Program

1. Clone repository

   ```bash
   git clone https://github.com/GyanLaper/CocokGak.git
   ```

2. Masuk ke direktori proyek

   ```bash
   cd CocokGak
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Tambahkan API Key Gemini

   ```bash
   VITE_GOOGLE_API_KEY=API_KEY_ANDA
   ```

5. Jalankan aplikasi

   ```bash
   npm run dev
   ```

6. Buka browser di `http://localhost:5173`

---

## 📸 Alur Aplikasi

1. Pengguna mengunggah foto outfit
2. Memilih gaya berpakaian
3. Sistem memproses data dengan AI
4. AI memberikan rating, review, dan saran
5. Manekin virtual ditampilkan sebagai visualisasi

---

## 📚 Referensi

- Modul Sistem Multimedia
- Dokumentasi Google Gemini API
- React.js Documentation
- Framer Motion Documentation

---

## 📄 Lisensi

Proyek ini dibuat **khusus untuk keperluan akademik** dan tidak digunakan untuk tujuan komersial.

---

## ✨ Catatan Tambahan

Proyek ini menekankan integrasi **media visual, interaksi pengguna, dan kecerdasan buatan** sebagai penerapan nyata konsep Sistem Multimedia dalam aplikasi modern berbasis web.
