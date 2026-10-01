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
  ["CarWorth", "https://car.theworthguide.com/"],
];

export const metadata = {
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
            <Link href="/" className="mark">{MARK}<span>Worth</span></Link>
            <nav>
              <Link href="/products">Products</Link>
              <Link href="/compare">Vs reviews</Link>
              <Link href="/categories/dash-cams">Dash cams</Link>
              <Link href="https://theworthguide.com/">The Worth Guide</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer>
          <div className="wrap foot">
            <div>
              <p className="mark light">{MARK}<span>Worth</span></p>
              <p className="note">{DESC}</p>
            </div>
            <div>
              <p className="label">The family</p>
              <ul>
                {family.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <p className="note">As an Amazon Associate we earn from qualifying purchases. Honest picks, no invented scores.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
