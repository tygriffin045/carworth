import { getPicks } from "@/data/top10";
import type { Product } from "@/data/types";
import { AffiliateButton } from "./AffiliateButton";
import { TierBadge } from "./TierBadge";
const LBL = { best: "Best Overall", premium: "Premium Pick", value: "Value Pick" } as const;
export function Picks({ category }: { category: string }) {
  const k = getPicks(category);
  if (!k) return null;
  const rows: [keyof typeof LBL, Product][] = [["best", k.best], ...(k.premium ? [["premium", k.premium] as [keyof typeof LBL, Product]] : []), ["value", k.value]];
  return (
    <section className="picks" data-badge-picks>
      <h2>{rows.length === 3 ? "Our three picks" : "Our two picks"}</h2>
      <p className="note">Chosen from the Top 10 below. Budget tiers: $ budget · $$ mid-range · $$$ premium.</p>
      <div className="grid">{rows.map(([kind, p]) => (
        <article key={kind} className="card" data-pick={kind}>
          <span className="badge">{LBL[kind]}</span>
          {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
          <h3><a href={`#${p.slug}`}>{p.name}</a> <TierBadge tier={p.tier} /></h3>
          <p className="note">{p.tagline}</p>
          <AffiliateButton asin={p.amazonAsin} name={p.name} />
        </article>
      ))}</div>
    </section>
  );
}
