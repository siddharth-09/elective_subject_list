// Google Analytics 4 helper.
// The measurement ID below is the live property for this site. It is public by
// nature (it ships in the page source), so keeping it here means analytics work
// on any host without extra setup. NEXT_PUBLIC_GA_ID overrides it if set.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-KKNCBME6S0";

// Set to false if you would rather not log what students typed into search.
export const TRACK_SEARCH_TERMS = true;

export function track(event, params = {}) {
  if (!GA_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
