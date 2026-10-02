
import { categories, products, url } from "@/data/site";

function picture(p: { image?: string; asin?: string }) {
  if (p.image) return p.image;
  if (p.asin) return `/products/${p.asin}.jpg`;
  return "";
}

import { notFound } from "next/navigation";
export function generateStaticParams() { return categories.map(c => ({ slug: c.slug })); }
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) notFound();
  const list = products.filter(p => p.category === slug);
  return <div><h1>{cat.name}</h1><p className="note">{cat.desc}</p><div className="grid">{list.map(p => <a key={p.slug} className="card" href={url(p)}>{picture(p) && <img src={picture(p)} alt={p.name}/>}<span className="badge">{p.verdict}</span><h3>{p.name}</h3><p className="note">{p.tagline}</p><strong>{p.price}</strong></a>)}</div></div>;
}
