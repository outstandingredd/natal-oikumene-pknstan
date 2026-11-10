// Menyeragamkan nomor HP Indonesia ke bentuk "628xxxxxxxxx".
// Dipakai di form (supaya pesan error cepat) DAN di server (supaya aman).
//
// Semua bentuk ini menjadi 6281234567890:
//   081234567890, +6281234567890, 6281234567890, 81234567890, 0812-3456-7890
// Bentuk "81234567890" (tanpa 0) disertakan karena Google Sheets sering
// menghapus angka 0 di depan nomor yang tersimpan sebagai angka.

export function normalizePhone(input: string): string | null {
  let digits = input.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (!/^\d+$/.test(digits)) return null;

  if (digits.startsWith("62")) {
    // sudah berformat 62...
  } else if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  } else if (digits.startsWith("8")) {
    digits = "62" + digits;
  } else {
    return null;
  }

  // Nomor seluler Indonesia: 62 + 8xx + total 9-12 angka setelah 62.
  return /^628\d{8,11}$/.test(digits) ? digits : null;
}
