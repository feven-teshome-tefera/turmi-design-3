"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageContext";
import "./team.css";

const disciplines = [
  {
    number: "01",
    slug: "field-operations",
    title: "Field operations",
    copy: "Close to producers, partners, and the realities that shape every agricultural cycle.",
    amTitle: "የመስክ ሥራዎች",
    amCopy: "ከአምራቾች፣ ከአጋሮችና እያንዳንዱን የግብርና ዑደት ከሚቀርጹ እውነታዎች ጋር በቅርብ።",
  },
  {
    number: "02",
    slug: "agricultural-intelligence",
    title: "Agricultural intelligence",
    copy: "Turning field evidence, geospatial signals, and local knowledge into decisions.",
    amTitle: "የግብርና ብልህነት",
    amCopy: "የመስክ ማስረጃን፣ የጂኦስፓሻል ምልክቶችንና አካባቢያዊ ዕውቀትን ወደ ውሳኔ መቀየር።",
  },
  {
    number: "03",
    slug: "capital-partnerships",
    title: "Capital & partnerships",
    copy: "Designing accountable finance around production, performance, and shared outcomes.",
    amTitle: "ካፒታልና አጋርነት",
    amCopy: "በምርት፣ በአፈጻጸምና በጋራ ውጤቶች ዙሪያ ተጠያቂነት ያለው ፋይናንስ መንደፍ።",
  },
  {
    number: "04",
    slug: "product-technology",
    title: "Product & technology",
    copy: "Building calm, useful tools that make complex systems easier to operate and trust.",
    amTitle: "ምርትና ቴክኖሎጂ",
    amCopy: "ውስብስብ ሥርዓቶችን ለማንቀሳቀስና ለማመን ቀላል የሚያደርጉ ጠቃሚ መሣሪያዎችን መገንባት።",
  },
];

export default function TeamPage() {
  const pageRef = useRef(null);
  const { isAmharic } = useLanguage();

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".team-hero-copy > *", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray(".team-discipline").forEach((card, index) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotate: index % 2 ? 1.5 : -1.5,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.from(".team-manifesto > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-manifesto", start: "top 78%" },
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="team-page" ref={pageRef}>
        <section className="team-hero" aria-labelledby="team-heading">
          <div className="team-hero-copy">
            <p className="team-eyebrow">{isAmharic ? "የቱርሚ ቡድን" : "The team at Turmi"}</p>
            <h1 id="team-heading">
              {isAmharic ? "መሬትን፣ መረጃንና ካፒታልን የሚያገናኙ ሰዎች።" : "People connecting land, intelligence, and capital."}
            </h1>
            <p className="team-lede">
              {isAmharic
                ? "አስተዋይ የግብርና ፋይናንስ በርካታ የዕውቀት ዓይነቶችን ይፈልጋል። ቱርሚን ከመስክ እስከ ሞዴል ድረስ በጋራ እንገነባለን።"
                : "Better agricultural finance takes more than one kind of expertise. We build Turmi together—from the field to the model."}
            </p>
          </div>

          <div className="team-orbit" aria-hidden="true">
            <div className="orbit orbit-one"><i /></div>
            <div className="orbit orbit-two"><i /></div>
            <div className="orbit orbit-three"><i /></div>
            <div className="orbit-core"><span>Turmi</span><small>{isAmharic ? "አንድ ሥርዓት" : "one system"}</small></div>
          </div>
        </section>

        <section className="team-disciplines" aria-labelledby="disciplines-heading">
          <div className="team-section-heading">
            <p className="team-eyebrow">{isAmharic ? "እንዴት እንገነባለን" : "How we build"}</p>
            <h2 id="disciplines-heading">{isAmharic ? "የተለያዩ ክህሎቶች። አንድ ተልዕኮ።" : "Different disciplines. One mission."}</h2>
          </div>

          <div className="team-discipline-grid">
            {disciplines.map((item) => (
              <Link className="team-discipline" href={`/team/${item.slug}`} key={item.number}>
                <div className="discipline-top">
                  <span>{item.number}</span>
                  <span className="discipline-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{isAmharic ? item.amTitle : item.title}</h3>
                <p>{isAmharic ? item.amCopy : item.copy}</p>
                <span className="discipline-cta">{isAmharic ? "ቡድኑን ይመልከቱ" : "Meet the team"}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="team-manifesto">
          <p className="team-eyebrow">{isAmharic ? "የሚያገናኘን" : "What connects us"}</p>
          <h2>{isAmharic ? "እኛ ከሩቅ አንገምትም።" : "We don’t build from a distance."}</h2>
          <p>
            {isAmharic
              ? "እንሰማለን፣ እንሞክራለን፣ እንማራለን፤ ከዚያም ለእውነተኛ ሰዎችና ለእውነተኛ ምርት የሚሠሩ ሥርዓቶችን እንገነባለን።"
              : "We listen, test, and learn—then turn that understanding into systems that work for real people and real production."}
          </p>
          <div className="team-word-loop" aria-hidden="true">
            <span>FIELD · EVIDENCE · TRUST · PRODUCTION · FIELD · EVIDENCE · TRUST · PRODUCTION ·&nbsp;</span>
            <span>FIELD · EVIDENCE · TRUST · PRODUCTION · FIELD · EVIDENCE · TRUST · PRODUCTION ·&nbsp;</span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
