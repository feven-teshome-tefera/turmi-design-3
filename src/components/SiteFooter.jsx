"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function SiteFooter() {
  const { isAmharic } = useLanguage();
  return (
    <footer id="partner" className="site-footer">
      <div className="footer-main">
        <p className="footer-summary">
          {isAmharic ? "ለጠንካራ የግብርና ድጋፍ አስተማማኝ የመስክ መረጃ።" : "Reliable field data for stronger agricultural support."}
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about">{isAmharic ? "ስለ እኛ" : "About"}</Link>
          <Link href="/solutions">{isAmharic ? "መፍትሔዎች" : "Solutions"}</Link>
          <Link href="/how-it-works">{isAmharic ? "እንዴት እንደሚሰራ" : "How it works"}</Link>
          <Link href="/partner">{isAmharic ? "ከቱርሚ ጋር ይተባበሩ" : "Partner with Turmi"}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Turmi. {isAmharic ? "መብቱ በሕግ የተጠበቀ ነው።" : "All rights reserved."}</p>
        <p>{isAmharic ? "ለእያንዳንዱ መስክ የተገነባ።" : "Built for every field."}</p>
      </div>
    </footer>
  );
}
