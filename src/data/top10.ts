import type { Product } from "./types";
import { products } from "./products";

/** Ordered Top 10 per category. Best Overall is #1. */
export const TOP10: Record<string, string[]> = {
  "dash-cams": ["viofo", "viofo-a229-plus-dash-cam-front", "galphi-4k-dash-cam-front", "rove-r2-4k-dual-dash-cam", "70mai-4k-dash-cam-front-and", "garmin-dash-cam-mini-3", "redtiger-4k-starvis-2-dashcam-front", "terunsoul-4k-4k-1080p-3-channel", "zmopo-360-view-4-channel-dash"],
  "roadside": ["noco", "gooloo-a3-12v-3000a-portable-jump", "astroai-l7-tire-inflator-portable-air", "fanttik", "tender", "s-zevzo-et03-car-jump-starter", "oxilam-jump-starter-6000a-for-all", "noco-genius2d-2a-12v-onboard-battery"],
  "cabin": ["iottie", "wekefon-for-magsafe-car-mount-charger", "lamicall-2026-wider-clamp-metal-hook", "kenhao-67w-3-port-super-fast", "andery-compact-foldable-car-phone-holder", "vanmass-car-phone-holder-2026-ultimate", "lisen-retractable-car-charger", "junvang-usb-c-car-charger"],
  "diagnostics": ["blue", "obdlink-mx-obd2-bluetooth-scanner-for", "ancel-ad310-classic-enhanced-universal-obd", "ancel-ad410-enhanced-obd2-scanner", "veepeak-obdcheck-ble-bluetooth-obd-ii", "fixd-bluetooth-obd2-scanner", "obdlink-ex-forscan-obd-adapter"],
  "cleaning": ["chemical-guys-streak-free-glass-window", "astroai-21-extra-long-windshield-cleaner", "usanooks-microfiber-cleaning-cloth-grey-12", "invisible-glass-auto-glass-cleaner-foaming", "armor-all-multi-purpose-car-cleaner", "sycoodeal-car-vacuum-cleaner-mini-vacuum"],
  "safety": ["resqme-the-original-compact-emergency-keychain", "everlit-survival-car-emergency-kit", "amazon-basics-emergency-escape-tool", "nealia-magnetic-wireless-beacon-light", "swiss-safe-2-in-1-348", "mcbazel-4-pcs-wireless-rechargeable-magnetic", "sinsen-car-safety-hammer-set-of", "smosun-safehammer-2026-upgraded-safe-hammer", "lianxin-car-roadside-emergency-kit-with"],
};

/** Short Top lists (7-9) allowed only with a recorded reason. PENDING Maya's acceptance (spec exception). */
export const TOP10_SHORT: Record<string, string> = {
  "dash-cams": "9 items: dropped the REDTIGER F7NP as a near-duplicate 4K front+rear kit (accepted by Maya, car review)",
  roadside: "8 items: dropped a duplicate GOOLOO A3 listing and the near-twin Battery Tender Junior 750mA; no other verified roadside listing on file (accepted by Maya)",
  cabin: "8 items: dropped a near-duplicate 67W charger and the WeatherTech liner (fits 2007-13 Wranglers only); no universal-fit liner on file (accepted by Maya)",
  diagnostics: "7 items: dropped the three radar detectors (not diagnostics; legal restrictions) (accepted by Maya)",
  cleaning: "6 items: dropped Griot's/Rain-X (no listing data) and two near-duplicate microfiber packs (accepted by Maya, allowed to shrink)",
  safety: "9 items: dropped the Aukmak strobe 4-pack as a near-duplicate of the Mcbazel set (accepted by Maya)",
};
/** Lowest accepted list length per category when below 7 (Maya: short lists may shrink after dedupe). */
export const TOP10_MIN: Record<string, number> = { cleaning: 6 };

/** Extra pick labels shown next to the role (Maya's calls). */
export const PICK_NOTE: Record<string, string> = {
  "astroai-l7-tire-inflator-portable-air": "add-on inflator",
  "gooloo-a3-12v-3000a-portable-jump": "2-in-1 pick",
};

/** Category-page notes (hedged rules reminders). */
export const CATEGORY_NOTE: Record<string, string> = {
  "dash-cams": "Windshield-mounting rules vary by state. Some states, such as California and Minnesota, limit where a camera can go on the windshield, so check your state's rules before you mount one.",
};

export const PICKS: Record<string, { best: string; premium?: string; value: string }> = {
  "dash-cams": { best: "viofo", premium: "viofo-a229-plus-dash-cam-front", value: "galphi-4k-dash-cam-front" },
  "roadside": { best: "noco", premium: "gooloo-a3-12v-3000a-portable-jump", value: "astroai-l7-tire-inflator-portable-air" },
  "cabin": { best: "iottie", value: "lamicall-2026-wider-clamp-metal-hook" },
  "diagnostics": { best: "blue", premium: "obdlink-mx-obd2-bluetooth-scanner-for", value: "ancel-ad310-classic-enhanced-universal-obd" },
  "cleaning": { best: "chemical-guys-streak-free-glass-window", value: "usanooks-microfiber-cleaning-cloth-grey-12" },
  "safety": { best: "resqme-the-original-compact-emergency-keychain", premium: "everlit-survival-car-emergency-kit", value: "amazon-basics-emergency-escape-tool" },
};

const find = (s: string) => products.find((p) => p.slug === s);
export function getTopPicks(category: string): Product[] {
  return (TOP10[category] ?? []).map(find).filter((p): p is Product => Boolean(p));
}
export function getPicks(category: string) {
  const m = PICKS[category];
  if (!m) return null;
  const best = find(m.best), value = find(m.value), premium = m.premium ? find(m.premium) : undefined;
  if (!best || !value) return null;
  return { best, premium, value };
}

/** Homepage Top 10: each category's Best Overall, plus four deliberate extras: the dash cam and roadside
 * Premium picks (the two biggest-ticket buys), the roadside Value add-on inflator, and the safety Premium kit. */
export const HOME_TOP10: { category: string; role: "best" | "premium" | "value" }[] = [
  { category: "dash-cams", role: "best" },
  { category: "roadside", role: "best" },
  { category: "cabin", role: "best" },
  { category: "diagnostics", role: "best" },
  { category: "cleaning", role: "best" },
  { category: "safety", role: "best" },
  { category: "dash-cams", role: "premium" },
  { category: "roadside", role: "premium" },
  { category: "roadside", role: "value" },
  { category: "safety", role: "premium" },
];
export function getHomeTop10() {
  return HOME_TOP10.map((h) => ({ ...h, p: find(PICKS[h.category][h.role] as string) })).filter((x): x is typeof x & { p: Product } => Boolean(x.p));
}
