import "server-only"; // error saat build kalau file ini tidak sengaja diimpor ke kode browser
import type { StatusResult } from "@/types";

// ============================================================
// SERVICE: menghubungi Google Apps Script.
//
// KONTRAK dengan Apps Script (yang nanti kamu buat di Tahap 5):
//
//   Permintaan  (POST, JSON):  { "phone": "6281234567890", "secret": "..." }
//   Balasan ditemukan:         { "status": "found", "name": "Nama Lengkap", "nim": "12345678" }
//   Balasan tidak ada:         { "status": "not_found" }
//
// Implementasi Apps Script-nya ada di apps-script/Code.gs (panduan: docs/integrasi-apps-script.md).
// Code.gs menolak permintaan tanpa secret yang benar, jadi APPS_SCRIPT_SECRET wajib diisi
// di website DAN di Script properties Apps Script.
// Apps Script hanya membalas satu peserta. Isi Sheets tidak boleh dikirim ke sini.
// Balasan lain dari Apps Script ({"status":"invalid"} atau {"status":"error"}) tampil sebagai error.
//
// Konfigurasi (file .env.local, lihat .env.example):
//   APPS_SCRIPT_URL      URL Web App. Kosong = layanan dianggap belum aktif.
//   APPS_SCRIPT_SECRET   Kata sandi bersama (opsional tapi disarankan).
// ============================================================

const TIMEOUT_MS = 10_000;

export async function checkRegistration(phone: string): Promise<StatusResult> {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return { status: "unavailable" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, secret: process.env.APPS_SCRIPT_SECRET }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[cek-status] Apps Script membalas HTTP ${res.status}. Periksa APPS_SCRIPT_URL.`);
      return { status: "error" };
    }

    let data: unknown;
    try {
      data = JSON.parse(await res.text());
    } catch {
      console.error(
        `[cek-status] Balasan Apps Script bukan JSON (content-type: ${res.headers.get("content-type")}). ` +
          'Biasanya: akses Web App belum "Anyone", URL tidak berakhiran /exec, atau belum membuat New version.',
      );
      return { status: "error" };
    }

    const result = parseReply(data);
    if (result.status === "error") {
      const got = (data as { status?: unknown } | null)?.status;
      console.error(
        `[cek-status] Apps Script membalas status "${String(got).slice(0, 20)}". ` +
          "Periksa SECRET, SHEET_NAME, dan judul kolom; lihat menu Executions di Apps Script.",
      );
    }
    return result;
  } catch (err) {
    // Catatan ini tidak memuat nomor HP, nama, atau NIM.
    console.error(`[cek-status] Gagal menghubungi Apps Script: ${err instanceof Error ? err.message : err}`);
    return { status: "error" };
  }
}

// Hanya field yang kita kenal yang diteruskan ke browser. Selebihnya dibuang.
function parseReply(data: unknown): StatusResult {
  if (typeof data !== "object" || data === null) return { status: "error" };
  const reply = data as Record<string, unknown>;

  if (reply.status === "not_found") return { status: "not_found" };

  if (
    reply.status === "found" &&
    typeof reply.name === "string" &&
    typeof reply.nim === "string" &&
    reply.name.trim() !== "" &&
    reply.nim.trim() !== ""
  ) {
    return { status: "found", name: reply.name.trim(), nim: reply.nim.trim() };
  }

  return { status: "error" };
}
