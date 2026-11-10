# Panduan: Cek Status lewat Google Apps Script

Alur baru:

```
Peserta menekan "Cek Status Pendaftaran" di website
        ↓  (website mengalihkan ke URL Apps Script)
Halaman Cek Status (dilayani Google Apps Script)
        ↓  peserta mengisi nomor HP/WhatsApp
Apps Script membaca Google Sheets → menampilkan nama + NIM + status di halaman itu juga
```

Website Next.js tidak lagi memeriksa data. Ia hanya mengarahkan peserta ke halaman Apps Script. Tombol **Daftar Sekarang** langsung membuka Google Form.

Google Sheets dan Apps Script project yang sudah kamu buat **dipakai lagi**. Tidak ada yang perlu disiapkan ulang.

## File yang terlibat

| File | Salin ke mana |
|---|---|
| `apps-script/Code.gs` | Ganti isi `Code.gs` di editor Apps Script |
| `apps-script/Index.html` | File baru bernama `Index` di editor Apps Script |
| `apps-script/Style.html` | File baru bernama `Style` |
| `apps-script/Script.html` | File baru bernama `Script` |

## Sebelum mulai

1. **Salin dulu nilai `SHEET_NAME` dari `Code.gs` lama-mu** (nama tab sheet yang sudah kamu isi). `Code.gs` baru berisi placeholder lagi, jadi kamu akan mengisinya ulang di Langkah 2. Nilai lain (Spreadsheet ID dan nama kolom) sudah terisi benar.
2. Pastikan spreadsheet **tidak dibagikan ke publik**: klik **Bagikan** di Google Sheets dan lihat "Akses umum". Kalau tertulis *Siapa saja yang memiliki link*, ubah menjadi **Dibatasi**. Apps Script tetap bisa membaca karena berjalan sebagai kamu.

## Langkah 1: Buka proyek Apps Script yang sudah ada

Di Google Sheets respons: **Ekstensi → Apps Script**.

## Langkah 2: Ganti `Code.gs`

1. Klik file `Code.gs` di daftar file (kiri), hapus semua isinya.
2. Buka `apps-script/Code.gs` dari proyek website, salin seluruhnya, lalu tempel.
3. Di bagian `KONFIGURASI`, ganti:
   ```js
   const SHEET_NAME = '[GANTI: nama tab sheet respons]';
   ```
   dengan nama tab yang kamu catat (misalnya `'Form Responses 1'`).
4. Biarkan `WEBSITE_URL` dulu. Diisi di Langkah 8.
5. Klik ikon disket (**Simpan**).

> Fungsi `doPost` dan secret dari versi lama sudah dihapus karena tidak diperlukan lagi. Script Property `SECRET` boleh dihapus (Project Settings → Script Properties).

## Langkah 3: Tambah tiga file HTML

Lakukan untuk **Index**, **Style**, lalu **Script**:

1. Klik tanda **+** di samping "Files" → pilih **HTML**.
2. Ketik namanya **tanpa `.html`**: `Index` (lalu `Style`, lalu `Script`). Huruf besar-kecilnya harus persis.
3. Hapus isi bawaan, lalu tempel isi file yang sesuai dari folder `apps-script/`.
4. Simpan.

Setelah selesai, daftar file berisi: `Code.gs`, `Index.html`, `Style.html`, `Script.html`.

## Langkah 4: Periksa konfigurasi (belum deploy)

1. Pilih fungsi **`cekKonfigurasi`** di dropdown atas editor, lalu **Run**.
2. Kalau Google meminta izin, klik **Review permissions** → akunmu → **Advanced** → **Go to … (unsafe)** → **Allow**. Ini normal untuk script buatan sendiri.
3. Execution log yang benar:
   ```
   Tab yang ada: "Form Responses 1"
   Judul kolom: Timestamp | Email | Nama | Nomor WhatsApp | NIM | Prodi
   OK: kolom ditemukan (Nomor HP=4, NIM=5, Nama=3)
   ```
   Baris `GAGAL` berisi petunjuk perbaikannya.

## Langkah 5: Uji pencarian (opsional, belum deploy)

1. Di `Code.gs`, fungsi `ujiCari`: ganti `[GANTI: nomor HP yang sudah terdaftar]` dengan satu nomor yang ada di sheet.
2. Pilih **`ujiCari`** → **Run**. Log harus menampilkan `{"status":"found","name":"…","nim":"…"}`.
3. Kembalikan teks placeholder-nya dan jangan simpan nomor asli di kode.

## Langkah 6: Deploy sebagai Web App

**Kalau kamu sudah pernah deploy** (dari panduan sebelumnya), perbarui deployment yang sama. URL-nya tidak berubah:

1. **Deploy → Manage deployments**.
2. Klik ikon pensil pada deployment yang ada.
3. **Version** → pilih **New version** → **Deploy**.

**Kalau belum pernah deploy:**

1. **Deploy → New deployment** → ikon roda gigi → **Web app**.
2. Isi **Execute as: Me** dan **Who has access: Anyone**.
3. Klik **Deploy** dan izinkan akses kalau diminta.

Pengaturan wajib: **Execute as: Me** dan **Who has access: Anyone**. Kalau "Anyone" tidak dipilih, peserta diminta login Google dan halaman tidak bisa dibuka. Pengaturan ini tidak membuka spreadsheet-mu, hanya halaman Cek Status.

> Setiap kali mengubah kode di editor, ulangi **New version**. Menyimpan saja tidak memperbarui halaman yang sudah online.

## Langkah 7: Ambil dan uji URL Web App

1. Di kotak **Web app** setelah deploy (atau **Deploy → Manage deployments**), salin **URL**. Bentuknya `https://script.google.com/macros/s/<kode-panjang>/exec`. Harus berakhiran **`/exec`**, bukan `/dev`.
2. Buka URL itu di **jendela incognito** (supaya terlihat seperti peserta). Halaman "Cek Status Pendaftaran" bernuansa hijau-krem dengan lampu Natal harus tampil.
3. Coba satu nomor yang sudah terdaftar (muncul nama, NIM, dan lencana "Terdaftar") dan satu yang belum (muncul tombol Daftar Sekarang).

Google bisa menampilkan pita abu-abu di atas halaman bertuliskan aplikasi ini dibuat oleh pengguna Apps Script. Itu peringatan bawaan Google untuk akun biasa dan tidak bisa dihilangkan dari kode.

## Langkah 8: Isi `WEBSITE_URL` (setelah website online)

Agar peserta bisa kembali ke website dari halaman Cek Status:

1. Di `Code.gs`, isi `WEBSITE_URL` dengan alamat website di Vercel, misalnya `'https://nama-proyek.vercel.app'`.
2. Simpan, lalu **Deploy → Manage deployments → New version → Deploy** (Langkah 6). Selama belum diisi, tautan "Kembali ke website" disembunyikan.

## Langkah 9: Sambungkan URL ke website Next.js

URL Apps Script yang kamu salin **sama** dengan yang dulu dipakai, tetapi namanya di website sekarang **`CEK_STATUS_URL`**.

**Di komputermu:**
1. Buka `.env.local` di folder proyek (kalau belum ada, salin dari `.env.example`).
2. Tambahkan:
   ```
   CEK_STATUS_URL=https://script.google.com/macros/s/<kode-panjang>/exec
   ```
   Baris `APPS_SCRIPT_URL` dan `APPS_SCRIPT_SECRET` lama boleh dihapus.
3. Restart server (`Ctrl+C`, lalu `npm run dev`).

**Di Vercel:**
1. Proyek → **Settings → Environment Variables** → tambahkan `CEK_STATUS_URL` dengan nilai yang sama (Production, dan Preview kalau mau).
2. **Deployments → titik tiga pada deployment terbaru → Redeploy.** Pengalihan dihitung saat build, jadi tanpa redeploy variabel baru belum berlaku.

Selama `CEK_STATUS_URL` kosong, `/cek-status` di website menampilkan "Layanan pengecekan belum aktif".

## Langkah 10: Mengganti link Google Form

Ganti di **dua tempat** supaya konsisten:

1. **Website:** file `data/event.ts`, baris `registrationUrl: "…"`. Satu perubahan ini mengubah semua tombol Daftar (navbar, beranda, footer) dan pengalihan `/daftar`. Deploy ulang ke Vercel.
2. **Apps Script:** `Code.gs`, baris `const FORM_URL = '…';` (dipakai tombol Daftar di halaman Cek Status). Lakukan **New version** setelahnya.

## Langkah 11: Pengujian sebelum deploy ke Vercel

Jalankan `npm run dev` dan buka http://localhost:3000.

| Uji | Hasil yang benar |
|---|---|
| Tombol **Daftar Sekarang** di navbar, di hero, di bagian bawah beranda, di footer, dan di menu mobile | Setiap tombol membuka Google Form (`forms.gle/cWsxKrxgnP8wQ9SU6`) di tab baru |
| Buka http://localhost:3000/daftar | Langsung dialihkan ke Google Form |
| Menu **Cek Status Pendaftaran** | Pindah ke halaman Apps Script |
| Di halaman Apps Script: nomor terdaftar, ditulis `08…` | Nama lengkap, NIM, lencana **Terdaftar**, "Silakan cek emailmu" |
| Nomor yang sama ditulis `+62…` | Hasil sama |
| Nomor yang belum terdaftar | "Nomor ini belum terdaftar" dan tombol Daftar Sekarang ke Google Form |
| Isi `abc` atau `12345` | "Nomor HP tidak valid" muncul seketika |
| Tekan **Cek Status** | Tombol berubah "Memeriksa…" lalu hasil muncul |
| Buka halaman Apps Script di HP (lebar sempit) | Tidak ada teks terpotong atau geser ke samping |
| Kosongkan `CEK_STATUS_URL`, restart | `/cek-status` menampilkan "Layanan pengecekan belum aktif" |

Uji privasi:
1. Tekan `Ctrl+U` (lihat sumber) di halaman Apps Script. Tidak boleh ada Spreadsheet ID atau data peserta lain. Yang terlihat hanya kode halaman.
2. Coba nomor acak yang tidak terdaftar berkali-kali. Hanya pesan "belum terdaftar" yang muncul, tidak ada daftar peserta.

## Pemecahan masalah

| Gejala | Penyebab dan solusi |
|---|---|
| Halaman Apps Script meminta login Google | **Who has access** belum **Anyone** (Langkah 6) |
| Halaman tampil lama (lebih dari 5 detik) pertama kali | Normal, Apps Script butuh waktu "bangun" |
| "Pengecekan gagal" untuk semua nomor | `SHEET_NAME` belum diganti atau judul kolom berbeda. Jalankan `cekKonfigurasi`, lalu lihat **Executions** (ikon jam) di Apps Script |
| Mengubah kode tetapi tampilan lama | Lupa **New version** (Langkah 6) |
| "Sedang ramai" | Lebih dari 30 pengecekan dalam satu menit di seluruh pengunjung. Tunggu semenit, atau naikkan `MAX_CHECKS_PER_MINUTE` |
| Nomor ada di sheet tapi "belum terdaftar" | Nomor di sheet bukan nomor seluler Indonesia yang valid. Cek barisnya |
| Menu Cek Status menampilkan "belum aktif" padahal sudah diisi | `CEK_STATUS_URL` belum ada di Vercel, atau belum Redeploy |
| Font terlihat berbeda di halaman Apps Script | Google Fonts gagal dimuat, browser memakai font cadangan. Tidak memengaruhi fungsi |

## Yang perlu kamu tahu

- **Nama dan NIM tampil kepada siapa pun yang tahu nomor HP terdaftar** (pilihanmu: opsi B). Kalau nanti ingin melindungi lebih jauh, NIM bisa disamarkan di `findByPhone_` pada `Code.gs`.
- **Batas pengecekan bersifat global**, bukan per pengunjung, karena Apps Script tidak bisa melihat IP. Batas ini menghalangi tebakan massal, tetapi tidak membedakan satu orang dari yang lain.
- **File website yang tidak dipakai lagi** (boleh dihapus kapan saja, tidak memengaruhi fitur lain): `app/api/cek-status/route.ts`, `components/status-form.tsx`, `lib/registration.ts`, `lib/rate-limit.ts`, `lib/phone.ts`, dan tipe `StatusResult` di `types/index.ts`. Tanpa `APPS_SCRIPT_URL`, endpoint `/api/cek-status` tidak aktif (membalas 503) dan tidak membuka data.
- Kuota Apps Script akun Google gratis terbatas, tetapi cukup untuk acara kampus.

---

## Pembaruan: email pendaftaran, logo, dan warna baru

**Email di hasil Cek Status.** `Code.gs` kini membaca kolom `Email` (konstanta `COL_EMAIL`) dari **baris yang sama** dengan nomor HP yang cocok. Judul kolom di Google Sheets harus persis `Email`. Kalau kolom itu tidak ada, pengecekan tetap jalan, hanya email yang tidak tampil. Jalankan `cekKonfigurasi` untuk memeriksanya.

**Salin ulang 4 file ke Apps Script:** `Code.gs`, `Index.html`, `Style.html`, `Script.html`. Pertahankan nilai `SHEET_NAME` dan `WEBSITE_URL` milikmu.

**Wajib deploy ulang (versi baru):** Deploy → Manage deployments → ikon pensil → Version: **New version** → Deploy. URL `/exec` tidak berubah, jadi `CEK_STATUS_URL` tidak perlu diganti.

Isi `WEBSITE_URL` dengan alamat Vercel agar ikon tab halaman Cek Status memakai logo.
