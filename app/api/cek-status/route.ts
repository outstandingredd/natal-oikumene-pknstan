import type { NextRequest } from "next/server";
import { normalizePhone } from "@/lib/phone";
import { checkRateLimit } from "@/lib/rate-limit";
import { checkRegistration } from "@/lib/registration";
import type { StatusResult } from "@/types";

// Satu-satunya pintu antara browser dan Apps Script.
// Browser kirim nomor HP ke sini, server yang menghubungi Apps Script,
// dan browser hanya menerima status SATU peserta (StatusResult).

function reply(body: StatusResult, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export async function POST(request: NextRequest) {
  // Di Vercel, IP pengunjung ada di header x-forwarded-for (yang pertama).
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return reply({ status: "rate_limited" }, 429, {
      "Retry-After": String(limit.retryAfterSec),
    });
  }

  let phone: string | null = null;
  try {
    const body: unknown = await request.json();
    if (typeof body === "object" && body !== null && "phone" in body) {
      const raw = (body as { phone: unknown }).phone;
      if (typeof raw === "string" && raw.length <= 30) phone = normalizePhone(raw);
    }
  } catch {
    // body bukan JSON: dianggap tidak valid
  }
  if (!phone) return reply({ status: "invalid" }, 400);

  const result = await checkRegistration(phone);
  const httpStatus = result.status === "unavailable" ? 503 : result.status === "error" ? 502 : 200;
  return reply(result, httpStatus);
}
