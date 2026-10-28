import { meta, BreadcrumbLd, ItemListLd } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getTopPicks, PICKS, PICK_NOTE, CATEGORY_NOTE } from "@/data/top10";
import { Picks } from "@/components/Picks";
import { ProductBlock } from "@/components/ProductBlock";

const lc = (n: string) => n.toLowerCase();
export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const list = getTopPicks(slug);
  const pk = PICKS[slug];
  const role = (s: string) => (s === pk?.best ? "Best Overall" : s === pk?.premium ? "Premium Pick" : s === pk?.value ? "Value Pick" : undefined);
  const label = (s: string) => { const r = role(s); return r && PICK_NOTE[s] ? `${r} · ${PICK_NOTE[s]}` : r; };
  return <div>
    <BreadcrumbLd trail={[[cat.name, `/categories/${cat.slug}`]]} />
    <ItemListLd name={`Top ${list.length} ${lc(cat.name)}`} items={list.map((p) => ({ name: p.name, path: `/categories/${cat.slug}#${p.slug}` }))} />
    <h1>{cat.name}</h1>
    <p className="note">{cat.desc}</p>
    <p className="giftlink">Holiday gift guide: <Link href="/guides/gifts-for-drivers">Gifts for drivers →</Link></p>
    {CATEGORY_NOTE[slug] && <p className="note">{CATEGORY_NOTE[slug]}</p>}
    <Picks category={slug} />
    <h2>Top {list.length}: {cat.name.toLowerCase()}</h2>
    <div className="list">{list.map((p) => <ProductBlock key={p.slug} p={p} label={label(p.slug)} />)}</div>
  </div>;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return meta({ path: `/categories/${slug}`, title: `Best ${lc(cat.name)}: Top 10`, description: `The Top 10 ${lc(cat.name)} worth buying: ${cat.desc} Best Overall, Premium and Value picks with budget tiers, no prices.` });
}
