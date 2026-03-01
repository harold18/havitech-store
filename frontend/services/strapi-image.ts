const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base = STRAPI_URL.endsWith("/")
    ? STRAPI_URL.slice(0, -1)
    : STRAPI_URL;

  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

