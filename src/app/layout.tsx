
import "./globals.css";
import Link from "next/link";
import { SITE, DOMAIN, DESC } from "@/data/site";
export const metadata = { title: SITE, description: DESC, metadataBase: new URL(DOMAIN) };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <header><div className="wrap"><Link href="/" style={{fontWeight:700,fontSize:22,textDecoration:"none",color:"#1c1917"}}>{SITE}</Link>
      <nav><Link href="/products">Products</Link><Link href="/compare">Vs reviews</Link><Link href="https://theworthguide.com/">The Worth Guide</Link></nav>
    </div></header>
    <main className="wrap" style={{paddingTop:32,paddingBottom:40}}>{children}</main>
    <footer style={{borderTop:"1px solid #e7e1d6"}}><div className="wrap note">As an Amazon Associate we earn from qualifying purchases. <Link href="https://desk.theworthguide.com/">DeskWorth</Link> · <Link href="https://brew.theworthguide.com/">BrewWorth</Link> · <Link href="https://sleep.theworthguide.com/">SleepWorth</Link> · <Link href="https://pet.theworthguide.com/">PetWorth</Link> · <Link href="https://tech.theworthguide.com/">TechWorth</Link> · <Link href="https://car.theworthguide.com/">CarWorth</Link></div></footer>
  </body></html>;
}
