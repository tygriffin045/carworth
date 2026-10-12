import type { Product } from "./types";
import { products } from "./products";

/** Ordered Top 10 per category. Best Overall is #1. */
export const TOP10: Record<string, string[]> = {
  "dash-cams": ["viofo", "viofo-a229-plus-dash-cam-front", "galphi-4k-dash-cam-front", "rove-r2-4k-dual-dash-cam", "redtiger-f7np-4k-dash-cam-front", "70mai-4k-dash-cam-front-and", "garmin-dash-cam-mini-3", "redtiger-4k-starvis-2-dashcam-front", "terunsoul-4k-4k-1080p-3-channel", "zmopo-360-view-4-channel-dash"],
  "roadside": ["noco", "gooloo-a3-12v-3000a-portable-jump", "astroai-l7-tire-inflator-portable-air", "fanttik", "tender", "s-zevzo-et03-car-jump-starter", "oxilam-jump-starter-6000a-for-all", "noco-genius2d-2a-12v-onboard-battery"],
  "cabin": ["iottie", "wekefon-for-magsafe-car-mount-charger", "lamicall-2026-wider-clamp-metal-hook", "kenhao-67w-3-port-super-fast", "andery-compact-foldable-car-phone-holder", "vanmass-car-phone-holder-2026-ultimate", "lisen-retractable-car-charger", "junvang-usb-c-car-charger", "weather"],
  "diagnostics": ["blue", "obdlink-mx-obd2-bluetooth-scanner-for", "ancel-ad310-classic-enhanced-universal-obd", "ancel-ad410-enhanced-obd2-scanner", "veepeak-obdcheck-ble-bluetooth-obd-ii", "fixd-bluetooth-obd2-scanner", "obdlink-ex-forscan-obd-adapter", "r7", "cobra-rad-480i-laser-radar-detector", "uniden-r8w-new-model-extreme-long"],
  "cleaning": ["chemical-guys-streak-free-glass-window", "astroai-21-extra-long-windshield-cleaner", "usanooks-microfiber-cleaning-cloth-grey-12", "invisible-glass-auto-glass-cleaner-foaming", "armor-all-multi-purpose-car-cleaner", "sycoodeal-car-vacuum-cleaner-mini-vacuum", "amazon-basics-microfiber-cleaning-cloths", "homexcel-microfiber-cleaning-cloth-12-pack"],
  "safety": ["resqme-the-original-compact-emergency-keychain", "everlit-survival-car-emergency-kit", "amazon-basics-emergency-escape-tool", "nealia-magnetic-wireless-beacon-light", "swiss-safe-2-in-1-348", "mcbazel-4-pcs-wireless-rechargeable-magnetic", "aukmak-upgraded-4leds-4pcs-wireless-led", "sinsen-car-safety-hammer-set-of", "smosun-safehammer-2026-upgraded-safe-hammer", "lianxin-car-roadside-emergency-kit-with"],
};

/** Short Top lists (7-9) allowed only with a recorded reason. PENDING Maya's acceptance (spec exception). */
export const TOP10_SHORT: Record<string, string> = {
  roadside: "8 items: dropped a duplicate GOOLOO A3 listing and the near-twin Battery Tender Junior 750mA; no other priced, verified roadside listing on file",
  cabin: "9 items: dropped a near-duplicate 67W 3-port charger; no other priced, verified cabin listing on file",
  cleaning: "8 items: dropped Griot's and Rain-X, which have no listing data on file; no other priced, verified cleaning listing on file",
};

export const PICKS: Record<string, { best: string; premium?: string; value: string }> = {
  "dash-cams": { best: "viofo", premium: "viofo-a229-plus-dash-cam-front", value: "galphi-4k-dash-cam-front" },
  "roadside": { best: "noco", premium: "gooloo-a3-12v-3000a-portable-jump", value: "astroai-l7-tire-inflator-portable-air" },
  "cabin": { best: "iottie", premium: "wekefon-for-magsafe-car-mount-charger", value: "lamicall-2026-wider-clamp-metal-hook" },
  "diagnostics": { best: "blue", premium: "obdlink-mx-obd2-bluetooth-scanner-for", value: "ancel-ad310-classic-enhanced-universal-obd" },
  "cleaning": { best: "chemical-guys-streak-free-glass-window", premium: "astroai-21-extra-long-windshield-cleaner", value: "usanooks-microfiber-cleaning-cloth-grey-12" },
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
 * Premium picks (the two biggest-ticket buys), the roadside Value inflator, and the safety Premium kit. */
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
