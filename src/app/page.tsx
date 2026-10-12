import Link from "next/link";
import { categories, compares, DESC } from "@/data/site";
import { guides } from "@/data/guides";
import { getHomeTop10 } from "@/data/top10";
import { AffiliateButton } from "@/components/AffiliateButton";
import { TierBadge } from "@/components/TierBadge";

const ROLE = { best: "Best Overall", premium: "Premium Pick", value: "Value Pick" } as const;

export default function Page() {
  const top = getHomeTop10();
  return <div>
    <p className="note">Independent picks</p>
    <h1>Keep the kit that earns the trunk.</h1>
    <p>{DESC}</p>
    <h2>Top 10 worth buying</h2>
    <p className="note">The Best Overall from each category, plus four picks chosen on purpose. Budget tiers: $ budget · $$ mid-range · $$$ premium.</p>
    <div className="compact">{top.map(({ category, role, p }) => {
      const cat = categories.find((c) => c.slug === category)!;
      return <article key={category + role} className="card">
        {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
        <div>
          <span className="badge">{cat.name} · {ROLE[role]}</span>
          <h3><Link href={`/categories/${category}#${p.slug}`}>{p.name}</Link> <TierBadge tier={p.tier} /></h3>
          <p className="note">{p.tagline}</p>
          <AffiliateButton asin={p.amazonAsin} name={p.name} />
        </div>
      </article>;
    })}</div>
    <h2>Browse by category</h2>
    <div className="grid">{categories.map((c) => <Link key={c.slug} className="card" href={"/categories/" + c.slug}><h3>{c.name}</h3><p className="note">{c.desc}</p></Link>)}</div>
    <h2>Buying guides</h2>
    <div className="grid">{guides.map((g) => <Link key={g.slug} className="card" href={"/guides/" + g.slug}><h3>{g.title}</h3><p className="note">{g.description}</p><strong>{g.picks.length} picks</strong></Link>)}</div>
    <h2>Vs reviews</h2>
    <div className="grid">{compares.map((c) => <Link key={c.slug} className="card" href={"/compare/" + c.slug}><h3>{c.title}</h3><p className="note">{c.verdict}</p></Link>)}</div>
  </div>;
}

export const metadata = { alternates: { canonical: "/" } };
