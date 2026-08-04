"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageContext";
import "./partner.css";

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const { isAmharic } = useLanguage();

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="partner-page">
        <section className="partner-intro" aria-labelledby="partner-heading">
          <div className="partner-panel">
            <div className="partner-form-wrap">
              {submitted ? (
                <div className="partner-success" role="status">
                  <span aria-hidden="true">✓</span>
                  <h2>{isAmharic ? "እናመሰግናለን።" : "Thank you."}</h2>
                  <p>{isAmharic ? "የትብብር ጥያቄዎ ለቱርሚ ቡድን ዝግጁ ነው።" : "Your partnership enquiry is ready for the Turmi team."}</p>
                  <button type="button" onClick={() => setSubmitted(false)}>{isAmharic ? "ሌላ ጥያቄ ይላኩ" : "Send another enquiry"}</button>
                </div>
              ) : (
                <form className="partner-form" onSubmit={handleSubmit}>
                  <h2>{isAmharic ? "ያግኙን" : "Get in touch"}</h2>
                  <label>{isAmharic ? "ስም" : "Name"}<input name="name" type="text" autoComplete="name" required /></label>
                  <label>{isAmharic ? "የሥራ ኢሜይል" : "Work email"}<input name="email" type="email" autoComplete="email" required /></label>
                  <label>{isAmharic ? "ድርጅት" : "Organization"}<input name="organization" type="text" autoComplete="organization" required /></label>
                  <label>{isAmharic ? "ከቱርሚ ጋር እንዴት መሥራት ይፈልጋሉ?" : "How would you like to work with Turmi?"}<textarea name="message" rows="4" required /></label>
                  <button type="submit">{isAmharic ? "ውይይት ይጀምሩ" : "Start a conversation"} <span aria-hidden="true">↗</span></button>
                </form>
              )}
            </div>

            <div className="partner-details">
              <div className="partner-copy">
                <h1 id="partner-heading" className="partner-eyebrow">
                  {isAmharic ? "ከእኛ ጋር ይተባበሩ" : "Partner with us"}
                </h1>
              </div>
              <div className="partner-map" aria-label={isAmharic ? "የቱርሚ የሥራ ክልል" : "Turmi operating region"}>
                <div className="map-road map-road-one" aria-hidden="true" />
                <div className="map-road map-road-two" aria-hidden="true" />
                <div className="map-pin" aria-hidden="true"><span /></div>
                <p>{isAmharic ? "ኢትዮጵያ · አፍሪካ" : "Ethiopia · Africa"}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
