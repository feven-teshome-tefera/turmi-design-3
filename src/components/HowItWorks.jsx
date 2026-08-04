"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import styles from "./HowItWorks.module.css";
import { useLanguage } from "./LanguageContext";

const illustrations = [
  {
    src: "/images/how-it-works/img_1.svg",
    alt: "Turmi field-agent onboarding and satellite-supported farm mapping",
  },
  {
    src: "/images/how-it-works/img_2.svg",
    alt: "Plot-level financing requirements and agricultural service delivery",
  },
  {
    src: "/images/how-it-works/img_3.svg",
    alt: "Field activity records and satellite-based production verification",
  },
  {
    src: "/images/how-it-works/img_4.svg",
    alt: "Contract administration, harvest coordination and market access",
  },
];

function Illustration({ index, sizes }) {
  const illustration = illustrations[index];

  return (
    <div className={styles.image}>
      <Image
        src={illustration.src}
        alt={illustration.alt}
        width={1200}
        height={700}
        sizes={sizes}
      />
    </div>
  );
}

export default function HowItWorks() {
  const { isAmharic } = useLanguage();
  const spotlightRef = useRef(null);
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    const spotlight = spotlightRef.current;
    const path = pathRef.current;
    if (!spotlight || !path) return undefined;

    let context;
    let tween;
    let lenis;
    let frameId;
    let cancelled = false;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: reducedMotion ? 0 : pathLength,
    });

    if (!reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ autoRaf: false });
      const updateScrollTrigger = () => ScrollTrigger.update();
      const updateLenis = (time) => lenis?.raf(time * 1000);

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(updateLenis);

      context = gsap.context(() => {
        tween = gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: spotlight,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, spotlight);

      const imagesReady = Promise.all(
        Array.from(spotlight.querySelectorAll("img"), (image) =>
          image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              })
        )
      );
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      Promise.all([imagesReady, fontsReady]).then(() => {
        if (cancelled) return;
        frameId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => {
        cancelled = true;
        if (frameId) window.cancelAnimationFrame(frameId);
        tween?.scrollTrigger?.kill();
        tween?.kill();
        context?.revert();
        lenis.off("scroll", updateScrollTrigger);
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      };
    }

    return () => {
      cancelled = true;
      gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" });
    };
  }, []);

  return (
    <section
      ref={spotlightRef}
      className={styles.spotlight}
      aria-label="How Turmi works"
    >
      <div className={`${styles.row} ${styles.fullRow}`}>
        <Illustration index={0} sizes="(max-width: 1000px) 100vw, 50vw" />
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <article className={styles.card}>
            <h1>{isAmharic ? "ከገበሬ ምዝገባ እስከ ግብዓት አቅርቦት" : "From farmer registration to in-kind delivery"}</h1>
            <p>
              {isAmharic ? <><strong>ደረጃ 1 — ይመዝግቡ።</strong> የገበሬ ማንነት፣ ፈቃድና የእርሻ መዝገብ ይያዙ።<br /><br /><strong>ደረጃ 2 — ያሰፍሩ።</strong> የመሬት ወሰን፣ ሰብልና የምርት ዝርዝር ያረጋግጡ።<br /><br /><strong>ደረጃ 3 — ያቅዱ።</strong> የእያንዳንዱን መሬት ግብዓት፣ አገልግሎትና የፋይናንስ ፍላጎት ይወስኑ።<br /><br /><strong>ደረጃ 4 — ያቅርቡ።</strong> የተፈቀዱ ግብዓቶችንና አገልግሎቶችን ያቅርቡ።</> : <><strong>Phase 1 — Register.</strong> Capture farmer KYC, consent
              and farm records.
              <br />
              <br />
              <strong>Phase 2 — Map.</strong> Confirm plot boundaries, crops and
              production details.
              <br />
              <br />
              <strong>Phase 3 — Plan.</strong> Define each plot&apos;s inputs,
              services and financing needs.
              <br />
              <br />
              <strong>Phase 4 — Deliver.</strong> Provide approved inputs and
              services in-kind.</>}
            </p>
          </article>
        </div>
        <div className={styles.column}>
          <Illustration index={1} sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <Illustration index={2} sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <div className={styles.column}>
          <article className={styles.card}>
            <h2>{isAmharic ? "ከመስክ ማረጋገጫ እስከ ገበያ ተደራሽነት" : "From field verification to market access"}</h2>
            <p>
              {isAmharic ? <><strong>ደረጃ 5 — ይመዝግቡ።</strong> የመስክ እንቅስቃሴና የምርት ሂደት ይከታተሉ።<br /><br /><strong>ደረጃ 6 — ያረጋግጡ።</strong> የሳተላይት መረጃን ከመስክ ምልከታ ጋር ያጣምሩ።<br /><br /><strong>ደረጃ 7 — ውል ያድርጉ።</strong> የእርሻ ስምምነቶችን ያዘጋጁ፣ ያጽድቁና ይከታተሉ።<br /><br /><strong>ደረጃ 8 — ያገናኙ።</strong> መከርን፣ ሎጂስቲክስንና የገበያ ተደራሽነትን ያስተባብሩ።</> : <><strong>Phase 5 — Record.</strong> Track field activities and
              production progress.
              <br />
              <br />
              <strong>Phase 6 — Verify.</strong> Combine satellite data with
              field observations.
              <br />
              <br />
              <strong>Phase 7 — Contract.</strong> Prepare, approve and monitor
              farming agreements.
              <br />
              <br />
              <strong>Phase 8 — Connect.</strong> Coordinate harvest, logistics
              and market access.</>}
            </p>
          </article>
        </div>
      </div>

      <div className={`${styles.row} ${styles.fullRow}`}>
        <Illustration index={3} sizes="(max-width: 1000px) 100vw, 50vw" />
      </div>

      <div className={styles.svgPath} aria-hidden="true">
        <svg
          viewBox="0 0 1378 2760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
            stroke="#0B3D2E"
            strokeWidth="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
