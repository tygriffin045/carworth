
import { products, url } from "@/data/site";
export default function Page() {
  return <div><h1>All products</h1><div className="grid">{products.map(p => <a key={p.slug} className="card" href={url(p)}>{p.image && <img src={p.image} alt=""/>}<span className="badge">{p.verdict}</span><h3>{p.name}</h3><span className="cta">Check price on Amazon</span></a>)}</div></div>;
}
