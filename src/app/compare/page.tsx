import { meta, BreadcrumbLd } from "@/lib/seo";

import Link from "next/link";
import { compares } from "@/data/site";
export default function Page() { return <div><BreadcrumbLd trail={[["Compare", "/compare"]]} /><h1>Vs reviews</h1><div className="grid">{compares.map(c => <Link key={c.slug} className="card" href={"/compare/"+c.slug}><h3>{c.title}</h3><p className="note">{c.verdict}</p></Link>)}</div></div>; }

export const metadata = meta({ path: "/compare", title: "Vs reviews", description: "Head-to-head car gear comparisons: which of two popular picks fits you, with a one-line verdict and a side-by-side table." });
