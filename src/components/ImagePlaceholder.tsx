/**
 * WorthGuide image placeholder (shared across subsites).
 * Shown when a product has no `imageUrl` yet. Real images will be added later via PA-API:
 * set `imageUrl` on the product and this card disappears automatically. No photos are rehosted.
 */
import type { CSSProperties } from "react";

const ICONS: Record<string, string> = {
  bed: "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M7 10V7a1 1 0 0 1 1-1h3v4M13 10V6h3a1 1 0 0 1 1 1v3M3 18v2M21 18v2",
  curtain: "M3 3h18M5 3v18c2-3 3-9 3-18M19 3v18c-2-3-3-9-3-18M8 3c0 6 1 12 4 18M16 3c0 6-1 12-4 18",
  light: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z",
  sound: "M11 5 6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13",
  camera: "M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3zM12 9v4M12 16h.01",
  car: "M5 16h14M3 16v-4l2-5h14l2 5v4M3 16v3h3v-3M18 16v3h3v-3M7 13h.01M17 13h.01",
  screen: "M3 4h18v12H3zM8 20h8M12 16v4",
  paw: "M12 13c-3 0-5 3-5 5 0 1.5 1.5 2 2.5 2 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c1 0 2.5-.5 2.5-2 0-2-2-5-5-5zM6 11a1.5 2 0 1 0 0-.01zM9.5 7a1.5 2 0 1 0 0-.01zM14.5 7a1.5 2 0 1 0 0-.01zM18 11a1.5 2 0 1 0 0-.01z",
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
  box: "M3 7l9-4 9 4v10l-9 4-9-4V7zM3 7l9 4 9-4M12 11v10",
};
const MATCH: [RegExp, string][] = [
  [/flea|tick|safety/, "shield"], [/fountain|water/, "drop"], [/pillow|topper|sheet|bed|mattress|blanket/, "bed"],
  [/curtain|blackout|mask/, "curtain"], [/light|lamp/, "light"], [/noise|earplug|speaker|headphone|sound/, "sound"],
  [/dash|webcam|camera/, "camera"], [/power|roadside|charger|battery/, "bolt"], [/diagnos|tool/, "wrench"],
  [/clean|groom/, "sparkle"], [/cabin|car/, "car"], [/monitor|device|input|storage/, "screen"],
  [/pet|dog|cat|puppy|kitten|toy|feeder|training|leash/, "paw"],
];
function iconFor(category: string) {
  const c = category.toLowerCase();
  for (const [re, k] of MATCH) if (re.test(c)) return ICONS[k];
  return ICONS.box;
}

export default function ImagePlaceholder({
  name, category, className, fill, compact, style,
}: { name: string; category: string; className?: string; fill?: boolean; compact?: boolean; style?: CSSProperties }) {
  const base: CSSProperties = {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
    boxSizing: "border-box", padding: compact ? 6 : 12, textAlign: "center",
    background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
    color: "#475569", overflow: "hidden",
    ...(fill ? { position: "absolute", inset: 0 } : { width: "100%", aspectRatio: "1 / 1", border: "1px solid #e2e8f0", borderRadius: 10 }),
    ...style,
  };
  return (
    <div className={`wg-ph ${className ?? ""}`} style={base} role="img" aria-label={`${name}: product photo coming soon`} data-image-placeholder>
      <svg viewBox="0 0 24 24" width={compact ? 28 : 44} height={compact ? 28 : 44} fill="none" stroke="currentColor"
        strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ opacity: 0.75, flex: "none" }}>
        <path d={iconFor(category)} />
      </svg>
      {!compact && (
        <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1.3, fontWeight: 600, color: "#334155", maxWidth: "90%",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{name}</span>
      )}
      {!compact && <span aria-hidden="true" style={{ fontSize: 11, color: "#64748b" }}>Photo coming soon</span>}
    </div>
  );
}
