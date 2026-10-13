import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { AffiliateButton } from "@/components/AffiliateButton";
import { TierBadge } from "@/components/TierBadge";
export default function Page() {
  return <div><h1>All products</h1>{categories.map((c) => <section key={c.slug}><h2>{c.name}</h2><div className="grid">{products.filter((p) => p.category === c.slug).map((p) => <article key={p.slug} className="card">{p.imageUrl && <img src={p.imageUrl} alt={p.name} />}<h3><a href={`/categories/${c.slug}#${p.slug}`}>{p.name}</a> <TierBadge tier={p.tier} /></h3><p className="note">{p.tagline}</p><AffiliateButton asin={p.amazonAsin} name={p.name} /></article>)}</div></section>)}</div>;
}
export const metadata = { alternates: { canonical: "/products" } };
