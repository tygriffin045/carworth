import type { Product } from "@/data/types";
import { AffiliateButton } from "./AffiliateButton";
import { TierBadge } from "./TierBadge";
export function ProductBlock({ p, label }: { p: Product; label?: string }) {
  return (
    <article className="card prod" id={p.slug}>
      {label && <span className="badge">{label}</span>}
      {p.imageUrl && <img src={p.imageUrl} alt={p.name} loading="lazy" />}
      <h3>{p.name} <TierBadge tier={p.tier} /></h3>
      <p className="note">{p.tagline}</p>
      <p>{p.summary}</p>
      <div className="pc">
        <div><strong>Pros</strong><ul>{p.pros.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div><strong>Cons</strong><ul>{p.cons.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
      <p className="note"><strong>Who it&apos;s for:</strong> {p.whoItsFor}</p>
      <AffiliateButton asin={p.amazonAsin} name={p.name} />
    </article>
  );
}
