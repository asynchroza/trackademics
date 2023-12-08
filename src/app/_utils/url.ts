import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function getFirstSubdomainFromHeaders(headers: ReadonlyHeaders) {
  const origin =
    headers.get("referer") ??
    headers.get("origin") ??
    headers.get("host") ??
    "";
  const cleanedUrl = origin.replace(/^(https?:\/\/)?(www\.)?/i, "");
  const subdomain = cleanedUrl.split(".")[0];

  return subdomain ?? "";
}
