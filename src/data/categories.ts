import type { Category } from "./types";
export const categories: Category[] = [
  { slug: "dash-cams", name: "Dash cams", desc: "Front, front-and-rear and multi-channel cameras." },
  { slug: "roadside", name: "Roadside", desc: "Jump packs, tire inflators and battery maintainers." },
  { slug: "cabin", name: "Cabin", desc: "Phone mounts and car chargers." },
  { slug: "diagnostics", name: "Diagnostics", desc: "OBD2 scanners and code readers." },
  { slug: "cleaning", name: "Cleaning", desc: "Glass cleaners, cloths and interior tools." },
  { slug: "safety", name: "Safety", desc: "Escape tools, warning lights and emergency kits." },
];
export function getCategory(slug: string) { return categories.find((c) => c.slug === slug); }
