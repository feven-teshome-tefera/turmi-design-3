"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ReactLenis } from "lenis/react";

import AnimatedCopy from "@/components/AnimatedCopy";
import MagneticCards from "@/components/MagneticCards";
import Navbar from "@/components/Navbar";

export default function Home() {
  const lenisRef = useRef();

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
            <span className="hero-phrase">Finance that moves</span>{" "}
            <span className="hero-phrase hero-phrase-delayed">
              when farms do.
            </span>
          </h1>
        </div>
      </section>
      <section className="about">
        <div className="header">
          <h1>From field activity to reliable evidence</h1>
        </div>
        <div className="copy">
          <AnimatedCopy>
            <p>
              Turmi helps field agents register farmers, map farms, collect
              production data, and verify progress from planting through
              harvest. Every field record gives financial institutions,
              agricultural organizations, and program managers a clearer view
              of what is happening on the ground.
            </p>
          </AnimatedCopy>
        </div>
      </section>
      <MagneticCards />
      <section className="services">
        <div className="service">
          <div className="col">
            <div className="service-copy">
              <h3>Farmer and Farm Registration</h3>
              <AnimatedCopy>
                <p>
                  Build reliable farmer profiles and capture accurate farm and
                  plot information in the field. Agents can record crop,
                  production, and seasonal details while connecting every entry
                  to the people and locations it represents.
                </p>
              </AnimatedCopy>
            </div>
          </div>
          <div className="col">
            <img src="/img_2.jpg" alt="" />
          </div>
        </div>
        <div className="service">
          <div className="col">
            <img src="/img_3.jpg" alt="" />
          </div>
          <div className="col">
            <div className="service-copy">
              <h3>Field Monitoring and Evidence</h3>
              <AnimatedCopy>
                <p>
                  Record field visits, observations, photographs, and
                  supporting evidence as work happens. Verified,
                  location-based records help teams follow planting, input
                  delivery, crop growth, and harvest milestones with confidence.
                </p>
              </AnimatedCopy>
            </div>
          </div>
        </div>
        <div className="service">
          <div className="col">
            <div className="service-copy">
              <h3>Built for Work in the Field</h3>
              <AnimatedCopy>
                <p>
                  Keep collecting essential information in areas with unreliable
                  internet. Turmi supports offline data capture and synchronizes
                  records when connectivity returns, helping agents work quickly
                  and consistently wherever farms are located.
                </p>
              </AnimatedCopy>
            </div>
          </div>
          <div className="col">
            <img src="/img_4.jpg" alt="" />
          </div>
        </div>
        <div className="service">
          <div className="col">
            <img src="/img_5.jpg" alt="" />
          </div>
          <div className="col">
            <div className="service-copy">
              <h3>Clear Program Visibility</h3>
              <AnimatedCopy>
                <p>
                  Flag risks, delays, and operational problems before they grow.
                  Supervisors can follow agent activity and program progress,
                  giving finance and support teams the verified information they
                  need to coordinate action and reach the right farms.
                </p>
              </AnimatedCopy>
            </div>
          </div>
        </div>
      </section>
      <section className="outro">
        <h3>Better evidence. Better support for every farm.</h3>
      </section>
    </>
  );
}
