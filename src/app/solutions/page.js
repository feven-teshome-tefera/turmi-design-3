"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import SolutionStack from "@/components/SolutionStack";
import AnimatedCopy from "@/components/AnimatedCopy";
import { useLanguage } from "@/components/LanguageContext";
import "./solutions.css";

export default function SolutionsPage() {
  const lenisRef = useRef();
  const { isAmharic } = useLanguage();

  useEffect(() => {
    function update(time) { lenisRef.current?.lenis?.raf(time * 1000); }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Navbar />
      <main className="solutions-page">
        <div className="solutions-lede">
          <p>{isAmharic ? "የቱርሚ መፍትሔዎች" : "Turmi solutions"}</p>
          <AnimatedCopy
            colorInitial="#c7c3b9"
            colorAccent="#abff02"
            colorFinal="#171712"
            scrollStart="top 75%"
            playOnEnter
          >
            <h1>
              <span>{isAmharic ? "በግብርና ምርት ዙሪያ " : "Financing designed around "}</span>
              <span>{isAmharic ? "የተነደፈ ፋይናንስ" : "agricultural production."}</span>
            </h1>
          </AnimatedCopy>
          <AnimatedCopy
            colorInitial="#c7c3b9"
            colorAccent="#abff02"
            colorFinal="#171712"
            scrollStart="top 82%"
            playOnEnter
          >
            <p>
              <span>{isAmharic ? "ቱርሚ ካፒታልን እንደ አንድ ያልተከፋፈለ ብድር ሳይመለከት " : "Turmi structures capital around identifiable production requirements "}</span>
              <span>{isAmharic ? "በሚታወቁ የምርት ፍላጎቶችና አምራች ንብረቶች ዙሪያ ያዋቅራል።" : "and productive assets rather than a single undifferentiated loan."}</span>
            </p>
          </AnimatedCopy>
        </div>
        <SolutionStack />
      </main>
      <SiteFooter />
    </>
  );
}
