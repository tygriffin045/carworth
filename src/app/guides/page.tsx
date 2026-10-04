import Link from "next/link";
import { guides } from "@/data/guides";
import { products, SITE } from "@/data/site";

export const metadata = {
  title: "Buying guides",
  description: `${SITE} buying guides: ranked picks with pros, cons, and who each one is for.`,
  alternates: { canonical: "/guides" },
};

export default function Page() {
  return <div>
    <p className="note">Buying guides</p>
    <h1>Guides</h1>
    <p>Ranked picks from products already on this site, with the tradeoffs spelled out.</p>
    <div className="grid">{guides.map((g) => {
      const lead = products.find((p) => p.slug === g.picks[0]?.slug);
      return <Link key={g.slug} className="card" href={`/guides/${g.slug}`}>
        {lead?.image && <img src={lead.image} alt={lead.name}/>}
        <span className="badge">{g.picks.length} picks · {g.readingTime}</span>
        <h3>{g.title}</h3>
        <p className="note">{g.description}</p>
      </Link>;
    })}</div>
  </div>;
}
