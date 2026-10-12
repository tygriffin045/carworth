export type CategorySlug = "dash-cams" | "roadside" | "cabin" | "diagnostics" | "cleaning" | "safety";
export type BudgetTier = "$" | "$$" | "$$$";
export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  tagline: string;
  summary: string;
  /** Budget tier from internal per-category thresholds. Never show prices. */
  tier: BudgetTier;
  pros: string[];
  cons: string[];
  whoItsFor: string;
  amazonAsin: string;
  imageUrl?: string;
}
export interface Category { slug: CategorySlug; name: string; desc: string }
