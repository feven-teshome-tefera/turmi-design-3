"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";

import AnimatedCopy from "@/components/AnimatedCopy";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageContext";
import "./about.css";

const principles = [
  ["Evidence before capital", "Financing decisions should be informed by verified production information."],
  ["Operational accountability", "Inputs, services and activities should be connected to farms, plots and contracts."],
  ["Role-appropriate access", "Users should receive the information and permissions required for their responsibilities."],
  ["Farmer participation", "Farmer identity, consent, production records and contractual participation should be represented clearly."],
  ["Responsible growth", "New regions, commodities and financing channels should be added without weakening operational discipline."],
];

export default function AboutPage() {
  const lenisRef = useRef();
  const { isAmharic } = useLanguage();
  const localizedPrinciples = isAmharic ? [
    ["ከካፒታል በፊት ማስረጃ", "የፋይናንስ ውሳኔዎች በተረጋገጠ የምርት መረጃ ላይ መመስረት አለባቸው።"],
    ["የሥራ ተጠያቂነት", "ግብዓቶች፣ አገልግሎቶችና እንቅስቃሴዎች ከእርሻዎች፣ ከመሬቶችና ከውሎች ጋር መገናኘት አለባቸው።"],
    ["ለሚና ተስማሚ መዳረሻ", "ተጠቃሚዎች ለኃላፊነታቸው የሚያስፈልጋቸውን መረጃና ፈቃድ ማግኘት አለባቸው።"],
    ["የገበሬ ተሳትፎ", "የገበሬ ማንነት፣ ፈቃድ፣ የምርት መዝገቦችና የውል ተሳትፎ በግልጽ መወከል አለባቸው።"],
    ["ኃላፊነት ያለው ዕድገት", "አዳዲስ ክልሎች፣ ምርቶችና የፋይናንስ መስመሮች የሥራ ሥነ-ሥርዓትን ሳያዳክሙ መጨመር አለባቸው።"],
  ] : principles;

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Navbar />
      <main className="about-page">
        <section className="about-intro" aria-labelledby="about-heading">
          <p className="about-eyebrow">{isAmharic ? "ስለ ቱርሚ" : "About Turmi"}</p>
          <h1 id="about-heading">
            <span>{isAmharic ? "በእርሻ ላይ በሚከናወነውና " : "A clearer connection between what happens on the farm "}</span>
            <AnimatedCopy scrollStart="top 75%" playOnEnter>
              <span>{isAmharic ? "በዙሪያው በሚወሰኑ ውሳኔዎች መካከል ግልጽ ግንኙነት።" : "and the decisions made around it."}</span>
            </AnimatedCopy>
          </h1>
        </section>

        <section className="about-image" aria-label="A farmer inspecting a crop field">
          <Image src="/img_3.jpg" alt="A farmer inspecting tall crops in a field" fill sizes="(max-width: 767px) 100vw, 92vw" priority />
        </section>

        <section className="principles" aria-labelledby="principles-heading">
          <div className="principles-heading">
            <p className="about-eyebrow">{isAmharic ? "እንዴት እንደምንሠራ" : "How we work"}</p>
            <h2 id="principles-heading">{isAmharic ? "መድረኩን የሚመሩ መርሆዎች" : "Principles guiding the platform"}</h2>
          </div>
          <div className="principles-list">
            {localizedPrinciples.map(([title, copy], index) => (
              <article className="principle" key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <AnimatedCopy><p>{copy}</p></AnimatedCopy>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
