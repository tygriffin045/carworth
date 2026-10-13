import type { BudgetTier } from "@/data/types";
const LABEL: Record<BudgetTier, string> = { $: "Budget", $$: "Mid-range", $$$: "Premium" };
export function TierBadge({ tier }: { tier: BudgetTier }) {
  return <span className="tier" title={`${LABEL[tier]} tier`} aria-label={`${LABEL[tier]} budget tier`}>{tier}</span>;
}
