// Google Analytics 4 helper.
// Set NEXT_PUBLIC_GA_ID in .env.local (see .env.example). With no ID set,
// nothing loads and every track() call is a no-op, so local dev stays clean.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Set to false if you would rather not log what students typed into search.
export const TRACK_SEARCH_TERMS = true;

export function track(event, params = {}) {
  if (!GA_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
