
import Link from "next/link";
import { categories, products, compares, url, DESC } from "@/data/site";
export default function Page() {
  return <div>
    <p className="note">Independent reviews</p>
    <h1>{DESC}</h1>
    <h2>Top picks</h2>
    <div className="grid">{products.slice(0,8).map(p => <a key={p.slug} className="card" href={url(p)}>{p.image && <img src={p.image} alt={p.name}/>}<span className="badge">{p.verdict}</span><h3>{p.name}</h3><p className="note">{p.tagline}</p><strong>{p.price}</strong></a>)}</div>
    <h2>Categories</h2>
    <div className="grid">{categories.map(c => <Link key={c.slug} className="card" href={"/categories/"+c.slug}><h3>{c.name}</h3><p className="note">{c.desc}</p></Link>)}</div>
    <h2>Vs reviews</h2>
    <div className="grid">{compares.map(c => <Link key={c.slug} className="card" href={"/compare/"+c.slug}><h3>{c.title}</h3><p className="note">{c.verdict}</p></Link>)}</div>
  </div>;
}
