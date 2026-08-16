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
    src: "/images/how-it-works/coDeEGtveCAidVIxKj344eJq-MDtcgMvSYFmvW99y9FqNPGDEzn9P51wIOxejhIXYX9-gx5l7_ZY9SvGc9Dc8g5CkaNwzz0jNrvuSdMzdvrNFjMnJtBVYdLhuA3gWNTjagbxl7CMwZt5NVVeLGPIXH5jdgmEqBuw7PqousS2EghEJ1SqqAIc267p5BAUUZiw.jpeg",
    alt: "Field agents and ground sensors collecting verified agricultural ground truth",
  },
  {
    src: "/images/how-it-works/484185936_1265446404938137_6265662690372974928_n.jpg",
    alt: "Verified ground truth training Turmi's geospatial classification models",
  },
  {
    src: "/images/how-it-works/DR4b6hfHkXfcxYNX3hc7j1bTt1yhWjrZrc3wKN3lWSUnpJ_A6_fppumRAuohhY0EsXBfZ7xCCcJpqBS0blOi143eALxLjQ0aH22K53RfrWiUAxyecG2SB1lwzoGrpQxhiOHQhKjOKSAvPrsxmqy7eDlnR3_VCF7vZQ8Ebu5WgB9yScUHunxkvzGeqMlSbw1_.jpeg",
    alt: "Satellite and sensor evidence confirming performance and gating capital",
  },
  {
    src: "/images/how-it-works/harvesting-wheat-crop-stockcake.jpg",
    alt: "Improving risk profiles through better data and optimized capital allocation",
  },
];

function Illustration({ index, sizes }) {
  const illustration = illustrations[index];

  return (
    <div
      className={`${styles.image} ${styles.featuredImage}`}
    >
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
    let updateScrollTrigger;
    let updateLenis;
    let cancelled = false;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pathLength = path.getTotalLength();
    const images = Array.from(spotlight.querySelectorAll("img"));
    const waitForImage = (image) =>
      image?.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image?.addEventListener("load", resolve, { once: true });
            image?.addEventListener("error", resolve, { once: true });
          });

    gsap.set(path, {
      opacity: 0,
      strokeDasharray: pathLength,
      strokeDashoffset: reducedMotion ? 0 : pathLength,
    });

    const startAnimation = () => {
      if (cancelled) return;

      gsap.set(path, { opacity: 1 });

      if (reducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ autoRaf: false });
      updateScrollTrigger = () => ScrollTrigger.update();
      updateLenis = (time) => lenis?.raf(time * 1000);

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

      ScrollTrigger.refresh();
    };

    waitForImage(images[0]).then(startAnimation);

    if (!reducedMotion) {
      const imagesReady = Promise.all(images.map(waitForImage));
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
        if (lenis && updateScrollTrigger) lenis.off("scroll", updateScrollTrigger);
        if (updateLenis) gsap.ticker.remove(updateLenis);
        lenis?.destroy();
      };
    }

    return () => {
      cancelled = true;
      gsap.set(path, { clearProps: "opacity,strokeDasharray,strokeDashoffset" });
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
            <h1>{isAmharic ? "ክብ የመረጃ ሥርዓት።" : "A circular intelligence system."}</h1>
            <p>
              {isAmharic ? <>እያንዳንዱ የፋይናንስ ዑደት ቀጣዩን ይበልጥ ብልህ ያደርገዋል። ከመሬት የሚገኘው እውነተኛ መረጃ ሞዴሎቻችንን ያሰለጥናል፤ ሞዴሎቻችንም የካፒታል ምደባችንን ያሻሽላሉ።<br /><br /><strong>ወኪሎች እውነተኛ የመስክ መረጃ ይሰበስባሉ።</strong> የመስክ ወኪሎችና ሴንሰሮች ስለ አፈር፣ የመኖ ሰብሎች፣ መንጋዎችና ሥራዎች የተረጋገጠ መረጃ ይሰበስባሉ።</> : <>Every financing cycle makes the next one smarter. Ground truth feeds our
              models; our models sharpen our capital allocation.
              <br />
              <br />
              <strong>Agents collect ground truth</strong>
              <br />
              Field agents and ground sensors capture verified data on soil, feed
              crops, herds, and operations.</>}
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
            <h2>{isAmharic ? "መረጃ ሞዴሎቻችንን ያሻሽላል።" : "Data trains our models"}</h2>
            <p>
              {isAmharic ? <>እውነተኛ የመስክ መረጃ የጂኦስፓሻል ምደባ ሞዴሎቻችንን ያሻሽላል — የተሳለ ማወቂያና የተሻሉ ትንበያዎች።<br /><br /><strong>ሞዴሎች ካፒታልን ይቆጣጠራሉ።</strong> የሳተላይትና የሴንሰር ማስረጃ እውነተኛ አፈጻጸምን ሲያረጋግጥ የፋይናንስ ክፍሎች በራስ-ሰር ይለቀቃሉ።<br /><br /><strong>የአደጋ መገለጫዎች ይሻሻላሉ።</strong> የተሻለ መረጃ የተመቻቸ የካፒታል ምደባን፣ ፍትሃዊ ዋጋንና ዝቅተኛ አደጋን ለሁሉም ያመጣል።</> : <>Ground truth improves our geospatial classification models — sharper
              detection, better predictions.
              <br />
              <br />
              <strong>Models gate capital</strong>
              <br />
              Tranches release automatically when satellite and sensor evidence
              confirms real performance.
              <br />
              <br />
              <strong>Risk profiles improve</strong>
              <br />
              Better data means optimized capital allocation, fairer pricing, and
              lower risk — for everyone in the loop.</>}
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
