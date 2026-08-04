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
            <span className="hero-phrase">{isAmharic ? "ከእርሻ ጋር የሚንቀሳቀስ" : "Finance that moves"}</span>{" "}
            <span className="hero-phrase hero-phrase-delayed">
              {isAmharic ? "ፋይናንስ።" : "when farms do."}
            </span>
          </h1>
        </div>
      </section>
      <section id="about" className="about">
        <div className="header">
          <h1>{isAmharic ? "ከመስክ እንቅስቃሴ ወደ አስተማማኝ ማስረጃ" : "From field activity to reliable evidence"}</h1>
        </div>
        <div className="copy">
          <AnimatedCopy>
            <p>
              {isAmharic ? "ቱርሚ የመስክ ወኪሎች ገበሬዎችን እንዲመዘግቡ፣ እርሻዎችን እንዲያሰፍሩ፣ የምርት መረጃ እንዲሰበስቡ እና ከመዝራት እስከ መከር ያለውን ሂደት እንዲያረጋግጡ ይረዳል። እያንዳንዱ የመስክ መዝገብ ለፋይናንስ ተቋማት፣ ለግብርና ድርጅቶች እና ለፕሮግራም አስተዳዳሪዎች በመሬት ላይ የሚካሄደውን ግልጽ እይታ ይሰጣል።" : <>Turmi helps field agents register farmers, map farms, collect
              production data, and verify progress from planting through
              harvest. Every field record gives financial institutions,
              agricultural organizations, and program managers a clearer view
              of what is happening on the ground.</>}
            </p>
          </AnimatedCopy>
        </div>
      </section>
      <MagneticCards />
      <section id="services" className="services">
        <div className="service">
          <div className="col">
            <div className="service-copy">
              <h3>{isAmharic ? "የገበሬና የእርሻ ምዝገባ" : "Farmer and Farm Registration"}</h3>
              <AnimatedCopy>
                <p>
                  {isAmharic ? "አስተማማኝ የገበሬ መገለጫዎችን ይገንቡ እና ትክክለኛ የእርሻና የመሬት መረጃ በመስክ ላይ ይመዝግቡ። ወኪሎች የሰብል፣ የምርት እና የወቅት ዝርዝሮችን ከሰዎቹና ከቦታዎቹ ጋር በማገናኘት መመዝገብ ይችላሉ።" : <>Build reliable farmer profiles and capture accurate farm and
                  plot information in the field. Agents can record crop,
                  production, and seasonal details while connecting every entry
                  to the people and locations it represents.</>}
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
          <h3>{isAmharic ? "የተሻለ ማስረጃ። ለእያንዳንዱ እርሻ የተሻለ ድጋፍ።" : "Better evidence. Better support for every farm."}</h3>
        </AnimatedCopy>
      </section>
      <SiteFooter />
    </>
  );
}
