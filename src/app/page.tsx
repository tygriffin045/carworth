import Link from "next/link";
import { categories, products, compares, url, DESC } from "@/data/site";
import { guides } from "@/data/guides";

function picture(p: { image?: string; asin?: string }) {
  if (p.image) return p.image;
  if (p.asin) return `/products/${p.asin}.jpg`;
  return "";
}

const lanes = [
  { key: "pick", label: "Worth Guide pick", slugs: ["viofo", "noco", "blue", "fanttik"] },
  { key: "value", label: "Value pick", slugs: ["galphi-4k-dash-cam-front", "gooloo-a3-12v-3000a-portable-jump", "ancel-ad310-classic-enhanced-universal-obd", "astroai-l7-tire-inflator-portable-air"] },
  { key: "glovebox", label: "Glovebox essential", slugs: ["tender", "iottie", "resqme-the-original-compact-emergency-keychain", "rainx"] },
];

export default function Page() {
  return <div>
    <p className="note">Independent reviews</p>
    <h1>Keep the kit that earns the trunk.</h1>
    <p>{DESC}</p>
    {lanes.map((lane) => (
      <section key={lane.key}>
        <h2>{lane.label}</h2>
        <div className="grid">{products.filter((p) => lane.slugs.includes(p.slug)).map((p) => (
          <a key={p.slug} className="card" href={url(p)}>{picture(p) && <img src={picture(p)} alt={p.name}/>}<span className="badge">{lane.label}</span><h3>{p.name}</h3><p className="note">{p.tagline}</p><strong>{p.price}</strong></a>
        ))}</div>
      </section>
    ))}
    <h2>Top 10 by job</h2>
    <div className="grid">{categories.map((c) => <Link key={c.slug} className="card" href={"/categories/"+c.slug}><h3>{c.name}</h3><p className="note">{c.desc}</p><strong>Top {Math.min(10, products.filter((p) => p.category === c.slug).length)}</strong></Link>)}</div>
    <h2>Buying guides</h2>
    <div className="grid">{guides.map((g) => <Link key={g.slug} className="card" href={"/guides/"+g.slug}><h3>{g.title}</h3><p className="note">{g.description}</p><strong>{g.picks.length} picks</strong></Link>)}</div>
    <h2>Vs reviews</h2>
    <div className="grid">{compares.map((c) => <Link key={c.slug} className="card" href={"/compare/"+c.slug}><h3>{c.title}</h3><p className="note">{c.verdict}</p></Link>)}</div>
  </div>;
}
