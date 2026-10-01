
import Link from "next/link";
import { compares } from "@/data/site";
export default function Page() { return <div><h1>Vs reviews</h1><div className="grid">{compares.map(c => <Link key={c.slug} className="card" href={"/compare/"+c.slug}><h3>{c.title}</h3><p className="note">{c.verdict}</p></Link>)}</div></div>; }
