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
              <span>{isAmharic ? "ለግብርና ፋይናንስ " : "Operational infrastructure for "}</span>
              <span>{isAmharic ? "የሥራ መሠረተ ልማት" : "agricultural financing"}</span>
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
              <span>{isAmharic ? "ቱርሚ የግብርና ምርትን በፋይናንስ፣ በሥራ አመራር፣ " : "Turmi supports organizations responsible for financing, operating, "}</span>
              <span>{isAmharic ? "በክትትልና በግዥ የሚደግፉ ድርጅቶችን ይደግፋል።" : "monitoring and purchasing agricultural production."}</span>
            </p>
          </AnimatedCopy>
        </div>
        <SolutionStack />
      </main>
      <SiteFooter />
    </>
  );
}
