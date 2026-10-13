import { compares, products } from "@/data/site";
import { notFound } from "next/navigation";
import { AffiliateButton } from "@/components/AffiliateButton";
export function generateStaticParams() { return compares.map((c) => ({ slug: c.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = compares.find((x) => x.slug === slug);
  if (!c) notFound();
  const sides = c.products.map((s) => products.find((p) => p.slug === s)!);
  return <div><h1>{c.title}</h1><p>{c.verdict}</p>
    <div className="grid">{sides.map((p) => <article key={p.slug} className="card"><h3>{p.name}</h3><p className="note">{p.tagline}</p><AffiliateButton asin={p.amazonAsin} name={p.name} /></article>)}</div>
    <table><tbody>{c.rows.map((r) => <tr key={r[0]}><th>{r[0]}</th>{r.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { alternates: { canonical: `/compare/${slug}` } }; }
