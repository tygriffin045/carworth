import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getTopPicks, PICKS } from "@/data/top10";
import { Picks } from "@/components/Picks";
import { ProductBlock } from "@/components/ProductBlock";

export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const list = getTopPicks(slug);
  const pk = PICKS[slug];
  const label = (s: string) => (s === pk?.best ? "Best Overall" : s === pk?.premium ? "Premium Pick" : s === pk?.value ? "Value Pick" : undefined);
  return <div>
    <h1>{cat.name}</h1>
    <p className="note">{cat.desc}</p>
    <Picks category={slug} />
    <h2>Top {list.length}: {cat.name.toLowerCase()}</h2>
    <div className="list">{list.map((p) => <ProductBlock key={p.slug} p={p} label={label(p.slug)} />)}</div>
  </div>;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  return { title: cat ? `Best ${cat.name.toLowerCase()}` : undefined, description: cat?.desc, alternates: { canonical: `/categories/${slug}` } };
}
