"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="navbar-logo" href="#" aria-label="Turmi home">
          Turmi
        </a>

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
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Solutions</a>
            <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
          </div>

          <div className="navbar-actions">
            <button className="navbar-utility" type="button" aria-label="Select language">
              EN
            </button>
            <button className="navbar-theme" type="button" aria-label="Change color theme">
              <span aria-hidden="true" />
            </button>
            <a className="navbar-partner" href="#partner" onClick={() => setMenuOpen(false)}>
              Partner with Turmi
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
