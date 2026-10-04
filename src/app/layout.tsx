import "./globals.css";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteHeader, Mark } from "@/components/SiteHeader";

const sans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif", display: "swap" });
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader mark={MARK} />
        <main className="wrap"><p className="note-top">We may earn a commission from qualifying purchases.</p>{children}</main>
        <footer>
          <div className="wrap foot">
            <div>
              <p className="mark light"><Mark />{MARK}<span>Worth</span></p>
              <p className="note">{DESC}</p>
            </div>
            <div>
              <p className="label">The Worth Guide family</p>
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
