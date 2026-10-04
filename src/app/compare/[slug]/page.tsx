
import { compares, products, url } from "@/data/site";
import { notFound } from "next/navigation";
export function generateStaticParams() { return compares.map(c => ({ slug: c.slug })); }
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const c = compares.find(x => x.slug === slug);
  if (!c) notFound();
  const sides = c.products.map(s => products.find(p => p.slug === s)!);
  return <div><h1>{c.title}</h1><p>{c.verdict}</p><div className="grid">{sides.map(p => <a key={p.slug} className="card" href={url(p)}><h3>{p.name}</h3><p className="note">{p.tagline}</p><span className="cta">Check price on Amazon</span></a>)}</div><table><tbody>{c.rows.filter(r => !r.some(cell => cell.includes("$"))).map(r => <tr key={r[0]}><th>{r[0]}</th>{r.slice(1).map(cell => <td key={cell}>{cell}</td>)}</tr>)}<tr><th>Price</th>{sides.map(p => <td key={p.slug}><a href={url(p)} rel="nofollow sponsored noopener" target="_blank">Check price on Amazon</a></td>)}</tr></tbody></table></div>;
}
