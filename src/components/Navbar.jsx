"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, chooseLanguage: setSiteLanguage, isAmharic } = useLanguage();

  const chooseLanguage = (value) => {
    setSiteLanguage(value);
    setLanguageOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <Link className="navbar-logo" href="/" aria-label="Turmi home">
          <Image src="/turmi-logo.png" alt="" width={34} height={34} priority />
          <span>Turmi</span>
        </Link>

        <button
          className="navbar-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div
          id="navbar-menu"
          className={`navbar-menu${menuOpen ? " is-open" : ""}`}
        >
          <div className="navbar-links">
            <Link href="/about" onClick={() => setMenuOpen(false)}>{isAmharic ? "ስለ እኛ" : "About"}</Link>
            <Link href="/solutions" onClick={() => setMenuOpen(false)}>{isAmharic ? "መፍትሔዎች" : "Solutions"}</Link>
            <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>{isAmharic ? "እንዴት እንደሚሰራ" : "How it works"}</Link>
          </div>

          <div className="navbar-actions">
            <div className="language-picker">
              <button
                className="navbar-utility"
                type="button"
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((open) => !open)}
              >
                <svg className="language-globe" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" />
                </svg>
                {language.toLowerCase()}
              </button>
              {languageOpen && (
                <div className="language-menu" role="listbox" aria-label="Language">
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === "EN"}
                    onClick={() => chooseLanguage("EN")}
                  >
                    <span className="language-name"><span aria-hidden="true">🇺🇸</span> English</span>
                    <small>en</small>
                  </button>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === "AM"}
                    onClick={() => chooseLanguage("AM")}
                  >
                    <span className="language-name"><span aria-hidden="true">🇪🇹</span> አማርኛ</span>
                    <small>am</small>
                  </button>
                </div>
              )}
            </div>
            <Link className="navbar-partner" href="/partner" onClick={() => setMenuOpen(false)}>
              {isAmharic ? "ከቱርሚ ጋር ይተባበሩ" : "Partner with Turmi"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
