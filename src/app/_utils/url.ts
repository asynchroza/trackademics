import { headers as getHeaders } from "next/headers";

export function getFirstSubdomainFromHeaders() {
  const headers = getHeaders();

  const origin =
    headers.get("referer") ??
    headers.get("origin") ??
    headers.get("host") ??
    "";
  const cleanedUrl = origin.replace(/^(https?:\/\/)?(www\.)?/i, "");
  const subdomain = cleanedUrl.split(".")[0];

  return subdomain ?? "";
}

// export function getFirstSubdomainFromUrl(url: string) {
//   const cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/i, "");
//   const subdomain = cleanedUrl.split(".")[0];

//   return subdomain ?? "";
// }
