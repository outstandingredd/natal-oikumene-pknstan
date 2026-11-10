// Membaca dan memeriksa CEK_STATUS_URL (URL Web App Google Apps Script).
//
// - URL yang valid dikembalikan APA ADANYA (hanya spasi/kutip di ujung yang dibuang).
// - URL yang salah bentuk (misalnya berakhiran ".../execnpm") TIDAK dipakai, supaya peserta
//   tidak dibawa ke alamat rusak. Halaman /cek-status lalu menampilkan "belum aktif".
//
// Bentuk yang dianggap valid:
//   https://script.google.com/macros/s/<id>/exec
//   https://script.google.com/a/macros/<domain>/s/<id>/exec   (akun Google Workspace)
// Query di belakang /exec (?...) boleh. Tidak ada karakter lain setelah /exec.

const VALID_URL = /^https:\/\/script\.google\.com\/(?:a\/macros\/[^/\s]+|macros)\/s\/[\w-]+\/exec(?:\?\S*)?$/;

export function readCekStatusUrl(
  value: string | undefined,
  warn: (message: string) => void = console.error,
): string | undefined {
  // Vercel kadang menyimpan kutip, atau ada spasi/baris baru yang ikut tertempel.
  const url = value?.trim().replace(/^(["'])(.*)\1$/, "$2").trim();
  if (!url) return undefined;

  if (VALID_URL.test(url)) return url;

  // Yang dicetak hanya ujung URL (bukan seluruhnya) supaya kesalahannya terlihat tanpa membocorkan URL.
  warn(
    `[cek-status] CEK_STATUS_URL tidak dipakai karena bentuknya salah (berakhir "…${url.slice(-10)}"). ` +
      "URL harus berbentuk https://script.google.com/macros/s/<kode>/exec dan berakhir persis di /exec.",
  );
  return undefined;
}
