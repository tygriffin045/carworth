export const MARK = "Car";
export const SITE = "CarWorth";
export const DOMAIN = "https://car.theworthguide.com";
export const TAG = "carworth20-20";
export const TITLE = "CarWorth — Honest picks for the car";
export const DESC = "A Top 10 per category of car gear people already buy, with clear picks and no prices.";
export { products } from "./products";
export { categories } from "./categories";
import type { Product } from "./types";
import { affiliateUrl } from "@/lib/affiliate";
export type { Product };
export const compares = [{ slug: "noco-vs-gooloo", title: "NOCO GB40 vs GOOLOO A3", verdict: "A3 if you need an inflator. GB40 if you already have one.", products: ["noco", "gooloo-a3-12v-3000a-portable-jump"], rows: [["Air compressor", "No", "Yes"], ["Peak rating (per the listing)", "1000A", "3000A"]] }];
export function url(p: Product) { return affiliateUrl(p.amazonAsin); }
