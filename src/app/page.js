"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import AnimatedCopy from "@/components/AnimatedCopy";
import MagneticCards from "@/components/MagneticCards";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef();
  const { isAmharic } = useLanguage();

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
      <section className="hero" aria-labelledby="hero-heading">
        <Image
          className="hero-image"
          src="/dan-meyers-0AgtPoAARtE-unsplash.jpg"
          alt="Sunlit rows of crops stretching across a green agricultural field"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-container">
          <h1 id="hero-heading" className="hero-heading">
            <span className="hero-phrase">{isAmharic ? "በእውነተኛ ምርት ዙሪያ የተገነባ" : "Agricultural finance built"}</span>{" "}
            <span className="hero-phrase hero-phrase-delayed">
              {isAmharic ? "የግብርና ፋይናንስ።" : "around real production."}
            </span>
          </h1>
        </div>
      </section>
      <section id="about" className="about">
        <div className="header">
          <h1>{isAmharic ? "የግብርና እሴት ሰንሰለት የሥራና የፋይናንስ ንብርብር" : "The operating and financing layer of the agricultural value chain."}</h1>
        </div>
        <div className="copy">
          <AnimatedCopy>
            <p>
              {isAmharic ? "ቱርሚ ካፒታልን፣ የግብርና ሥራዎችን፣ የተረጋገጠ የመስክ አፈጻጸምንና የገበያ ተደራሽነትን በአንድ የተቀናጀ ሞዴል ያገናኛል። ፋይናንስን በእውነተኛ የምርት ፍላጎቶች ላይ በማዋል ከመስክ እስከ መከርና ክፍያ ድረስ አፈጻጸምን ይከታተላል።" : <>Turmi connects capital, agricultural operations, verified field
              performance, and market access in one vertically integrated model.
              We deploy financing against real production needs and track execution
              from the field through harvest and repayment.</>}
            </p>
          </AnimatedCopy>
        </div>
      </section>
      <MagneticCards />
      <section id="services" className="services">
        <div className="service">
          <div className="col">
            <div className="service-copy">
              <h3>{isAmharic ? "በሚረጋገጥ ማስረጃ የተደገፉ ሥራዎች" : "Operations backed by verifiable evidence."}</h3>
              <AnimatedCopy>
                <p>
                  {isAmharic ? "ቱርሚ የመስክና የጂኦስፓሻል ማስረጃን በመጠቀም የግብርና እንቅስቃሴን ይረዳል፣ የተስማሙ ደረጃዎችን ያረጋግጣል፣ እና በምርት ዑደቱ ሁሉ የፋይናንስና የሥራ ውሳኔዎችን ይደግፋል።" : <>Turmi uses field and geospatial evidence to understand agricultural
                  activity, verify agreed milestones, and support financing and
                  operational decisions throughout the production cycle.
                  Verification connects capital deployment to real execution.</>}
                </p>
              </AnimatedCopy>
            </div>
          </div>
          <div className="col">
            <img src="/img_2.jpg" alt="" />
          </div>
        </div>
      </section>
      <section id="impact" className="outro">
        <AnimatedCopy scrollStart="top 85%" playOnEnter>
          <h3>{isAmharic ? "የግብርና ምርትን በተሻለ የተገናኘ ካፒታል ዙሪያ ይገንቡ።" : "Build agricultural production around better-connected capital."}</h3>
        </AnimatedCopy>
      </section>
      <SiteFooter />
    </>
  );
}
