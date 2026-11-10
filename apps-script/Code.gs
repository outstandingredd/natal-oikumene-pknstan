/**
 * CEK STATUS PENDAFTARAN: Natal Oikumene (Google Apps Script)
 *
 * File ini menjadi backend SEKALIGUS penyaji halaman Cek Status.
 * Cara pakai: salin isi file ini ke Code.gs di editor Apps Script, lalu tambahkan
 * tiga file HTML (Index, Style, Script). Lihat docs/integrasi-apps-script.md.
 *
 * Alur:
 *   Peserta membuka URL Web App  ->  doGet() menampilkan halaman (Index.html)
 *   Peserta mengisi nomor HP     ->  halaman memanggil cekStatus(phone) lewat google.script.run
 *   cekStatus() membaca Google Sheets  ->  membalas HANYA satu peserta: nama + NIM + email (dari baris yang sama)
 *
 * Tidak ada secret atau API key di sisi browser. Spreadsheet ID hanya ada di file ini (server).
 */

// ============================================================
// KONFIGURASI: ganti sesuai kebutuhan
// ============================================================

// ID spreadsheet respons Google Forms.
const SPREADSHEET_ID = '1GlL_fkFwzfdv1QsZhYqM_Pg7WRcxEyJzNUANygCWUZs';

// Nama TAB sheet yang berisi respons (lihat bagian bawah Google Sheets). Tulis PERSIS sama.
// Biasanya "Form Responses 1" atau "Tanggapan formulir 1".
const SHEET_NAME = '[GANTI: nama tab sheet respons]';

// Judul kolom di baris pertama sheet (huruf besar/kecil dan spasi di ujung diabaikan).
const COL_PHONE = 'Nomor WhatsApp';
const COL_NIM = 'NIM';
const COL_NAME = 'Nama';
const COL_EMAIL = 'Email'; // opsional: kalau judul kolom ini tidak ada, email tidak ditampilkan (fitur lain tetap jalan)

// Link Google Form pendaftaran (untuk tombol "Daftar Sekarang" saat nomor belum terdaftar).
const FORM_URL = 'https://forms.gle/cWsxKrxgnP8wQ9SU6';

// Alamat website di Vercel, untuk tautan "Kembali ke website". Isi setelah website online,
// contoh 'https://nama-proyek.vercel.app'. Selama belum diisi, tautan itu disembunyikan.
const WEBSITE_URL = '[GANTI: alamat website di Vercel]';

// Batas jumlah pengecekan per menit untuk SELURUH pengunjung.
// shortcut: batasnya global, bukan per pengunjung, karena Apps Script tidak bisa melihat IP.
// Fungsinya menghalangi tebakan massal ke data peserta. Naikkan kalau peserta sering melihat
// pesan "sedang ramai" saat acara.
const MAX_CHECKS_PER_MINUTE = 30;

// ============================================================
// HALAMAN
// ============================================================

function doGet() {
  const page = HtmlService.createTemplateFromFile('Index');
  page.formUrl = FORM_URL;
  page.websiteUrl = /^https?:\/\//.test(WEBSITE_URL) ? WEBSITE_URL : '';
  const output = page
    .evaluate()
    .setTitle('Cek Status Pendaftaran | Natal Oikumene')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  // Ikon tab browser memakai logo dari website (hanya kalau WEBSITE_URL sudah diisi).
  if (page.websiteUrl) output.setFaviconUrl(page.websiteUrl.replace(/\/$/, '') + '/icon.png');
  return output;
}

// Dipakai Index.html untuk menyisipkan file Style dan Script.
function include(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}

// ============================================================
// FUNGSI YANG DIPANGGIL HALAMAN (google.script.run.cekStatus)
// ============================================================

// Balasan selalu salah satu dari:
//   { status: 'found', name, nim, email }  |  (email '' jika tidak ada)
//     { status: 'not_found' }  |  { status: 'invalid' }
//   { status: 'rate_limited' }      |  { status: 'error' }
function cekStatus(phone) {
  try {
    const normalized = String(phone === null || phone === undefined ? '' : phone).length > 30
      ? null
      : normalizePhone_(phone);
    if (!normalized) return { status: 'invalid' };

    if (!allowRequest_()) return { status: 'rate_limited' };

    return findByPhone_(normalized);
  } catch (err) {
    // Detail error hanya masuk log Apps Script (menu Executions), tidak dikirim ke pengunjung.
    console.error('cekStatus gagal: ' + err.message);
    return { status: 'error' };
  }
}

// ============================================================
// LOGIKA INTI
// ============================================================

function findByPhone_(phone) {
  const sheet = openSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { status: 'not_found' }; // baru ada baris judul

  const cols = getColumns_(sheet);

  // Baca HANYA kolom nomor HP dulu. Data lain dibaca hanya untuk baris yang cocok.
  const phones = sheet.getRange(2, cols.phone, lastRow - 1, 1).getDisplayValues();

  // Cari dari baris paling bawah: kalau satu nomor mendaftar dua kali, yang terbaru dipakai.
  for (let i = phones.length - 1; i >= 0; i--) {
    if (normalizePhone_(phones[i][0]) === phone) {
      const row = i + 2; // +1 karena indeks mulai 0, +1 karena baris 1 adalah judul
      const name = String(sheet.getRange(row, cols.name).getDisplayValue()).trim();
      const nim = String(sheet.getRange(row, cols.nim).getDisplayValue()).trim();
      if (!name || !nim) return { status: 'error' }; // baris ketemu tapi datanya tidak lengkap
      // Email diambil dari BARIS YANG SAMA dengan nomor yang cocok, tidak pernah dari baris lain.
      const email = cols.email ? String(sheet.getRange(row, cols.email).getDisplayValue()).trim() : '';
      return { status: 'found', name: name, nim: nim, email: email };
    }
  }
  return { status: 'not_found' };
}

function openSheet_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Tab sheet tidak ditemukan: ' + SHEET_NAME);
  return sheet;
}

// Mencari nomor kolom (mulai dari 1) berdasarkan judulnya, jadi urutan kolom boleh berubah.
function getColumns_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const find = function (title, optional) {
    const wanted = String(title).trim().toLowerCase();
    for (let i = 0; i < headers.length; i++) {
      if (String(headers[i]).trim().toLowerCase() === wanted) return i + 1;
    }
    if (optional) return 0; // 0 = tidak ada
    throw new Error('Kolom tidak ditemukan: ' + title);
  };
  return { phone: find(COL_PHONE), nim: find(COL_NIM), name: find(COL_NAME), email: find(COL_EMAIL, true) };
}

// ============================================================
// BATAS PERMINTAAN
// ============================================================

// Menghitung pengecekan dalam menit berjalan. Kunci cache berganti tiap menit.
// LockService mencegah dua permintaan bersamaan membaca hitungan yang sama.
function allowRequest_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) return false;
  try {
    const cache = CacheService.getScriptCache();
    const key = 'rl_' + Math.floor(Date.now() / 60000);
    const count = Number(cache.get(key) || 0);
    if (count >= MAX_CHECKS_PER_MINUTE) return false;
    cache.put(key, String(count + 1), 120);
    return true;
  } finally {
    lock.releaseLock();
  }
}

// ============================================================
// VALIDASI NOMOR HP
// ============================================================

// Semua bentuk ini menjadi 6281234567890: 081234567890, +6281234567890, 81234567890, 0812-3456-7890
// Bentuk tanpa 0 ikut dikenali karena Google Sheets sering menghapus 0 di depan nomor.
function normalizePhone_(input) {
  let d = String(input === null || input === undefined ? '' : input).replace(/[\s\-().]/g, '');
  if (d.charAt(0) === '+') d = d.slice(1);
  if (!/^\d+$/.test(d)) return null;

  if (d.indexOf('62') === 0) {
    // sudah berformat 62...
  } else if (d.charAt(0) === '0') {
    d = '62' + d.slice(1);
  } else if (d.charAt(0) === '8') {
    d = '62' + d;
  } else {
    return null;
  }
  return /^628\d{8,11}$/.test(d) ? d : null;
}

// ============================================================
// ALAT BANTU: dijalankan manual dari editor (pilih fungsi > Run). Bukan bagian halaman.
// Fungsi-fungsi ini tidak mengembalikan data apa pun ke pengunjung.
// ============================================================

// Jalankan ini PERTAMA. Memeriksa nama tab dan judul kolom. Tidak menampilkan data peserta.
function cekKonfigurasi() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('Tab yang ada: ' + ss.getSheets().map(function (s) { return '"' + s.getName() + '"'; }).join(', '));

  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log('GAGAL: tab "' + SHEET_NAME + '" tidak ada. Isi SHEET_NAME dengan salah satu nama tab di atas.');
    return;
  }
  Logger.log('Judul kolom: ' + sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0].join(' | '));
  try {
    const cols = getColumns_(sheet);
    Logger.log('OK: kolom ditemukan (Nomor HP=' + cols.phone + ', NIM=' + cols.nim + ', Nama=' + cols.name + ', Email=' + (cols.email || 'TIDAK ADA') + ')');
    if (!cols.email) Logger.log('Catatan: kolom "' + COL_EMAIL + '" tidak ditemukan, jadi email tidak akan tampil. Samakan COL_EMAIL dengan judul kolom di atas.');
  } catch (err) {
    Logger.log('GAGAL: ' + err.message + '. Samakan COL_PHONE / COL_NIM / COL_NAME dengan judul kolom di atas.');
  }
  Logger.log(/^https?:\/\//.test(WEBSITE_URL)
    ? 'OK: WEBSITE_URL sudah diisi.'
    : 'Catatan: WEBSITE_URL belum diisi, tautan "Kembali ke website" disembunyikan.');
}

// Menguji pencarian tanpa membuka halaman. Ganti NOMOR_UJI dengan nomor yang SUDAH terdaftar,
// lalu Run. Hasilnya muncul di Execution log (hanya terlihat olehmu di editor).
function ujiCari() {
  const NOMOR_UJI = '[GANTI: nomor HP yang sudah terdaftar]';
  const phone = normalizePhone_(NOMOR_UJI);
  if (!phone) {
    Logger.log('Isi NOMOR_UJI dengan nomor HP yang valid dulu.');
    return;
  }
  Logger.log(JSON.stringify(findByPhone_(phone)));
}
