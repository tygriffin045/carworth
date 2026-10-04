import "./globals.css";
import Link from "next/link";
import { SITE, DOMAIN, DESC, MARK } from "@/data/site";

const family = [
  ["The Worth Guide", "https://theworthguide.com/"],
  ["DeskWorth", "https://desk.theworthguide.com/"],
  ["BrewWorth", "https://brew.theworthguide.com/"],
  ["SleepWorth", "https://sleep.theworthguide.com/"],
  ["PetWorth", "https://pet.theworthguide.com/"],
  ["TechWorth", "https://tech.theworthguide.com/"],
  ["KitchenWorth", "https://kitchen.theworthguide.com/"],
  ["CleanWorth", "https://clean.theworthguide.com/"],
  ["ToolWorth", "https://tool.theworthguide.com/"],
  ["YardWorth", "https://yard.theworthguide.com/"],
  ["BagWorth", "https://bag.theworthguide.com/"],
  ["GroomWorth", "https://groom.theworthguide.com/"],
  ["FitWorth", "https://fit.theworthguide.com/"],
  ["BathWorth", "https://bath.theworthguide.com/"],
  ["TravelWorth", "https://travel.theworthguide.com/"],
  ["WatchWorth", "https://watch.theworthguide.com/"],
];

export const metadata = {
  verification: { google: "FN6qrZKJIgH6gtQS2rIEQe-jjDmKVIUoBq3DwQUX8yk" },
  title: { default: SITE, template: "%s · " + SITE },
  description: DESC,
  metadataBase: new URL(DOMAIN),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="wrap bar">
            <Link href="/" className="mark"><svg aria-hidden viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="#d4af37" stroke-width="1.8"/><path d="M7.5 12.2 10.6 15.3 16.5 8.8" fill="none" stroke="#d4af37" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>{MARK}<span>Worth</span></Link>
            <nav>
              <Link href="/products">Products</Link>
              <Link href="/compare">Vs reviews</Link>
              <Link href="/guides">Guides</Link>
              <Link href="https://theworthguide.com/">The Worth Guide</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer>
          <div className="wrap foot">
            <div>
              <p className="mark light"><svg aria-hidden viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="#d4af37" stroke-width="1.8"/><path d="M7.5 12.2 10.6 15.3 16.5 8.8" fill="none" stroke="#d4af37" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>{MARK}<span>Worth</span></p>
              <p className="note">{DESC}</p>
            </div>
            <div>
              <p className="label">The family</p>
              <ul className="sites">
                {family.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <p className="note small">We may earn a commission when you buy through links on this site. As an Amazon Associate I earn from qualifying purchases.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
