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
            <div className="partner-details">
              <p className="partner-kicker">{isAmharic ? "ከቱርሚ ጋር ይተባበሩ" : "Partner with Turmi"}</p>
              <h1 id="partner-heading">
                {isAmharic ? "ከእርስዎ መስማት እንፈልጋለን።" : "We’d love to hear from you."}
              </h1>
              <p className="partner-description">
                {isAmharic
                  ? "ፋይናንስን ከእውነተኛ የግብርና ምርት ጋር ለማገናኘት ከአምራቾች፣ ከፋይናንስ ተቋማት፣ ከገዢዎችና ከግብርና አጋሮች ጋር እንሰራለን።"
                  : "We work with producers, financial institutions, buyers, and agricultural partners to connect capital with real production."}
              </p>
              <div className="partner-orbits" aria-hidden="true">
                <span /><span /><span />
              </div>
              <p className="partner-location">{isAmharic ? "ኢትዮጵያ · አፍሪካ" : "Ethiopia · Africa"}</p>
            </div>

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
                  <p className="partner-kicker">{isAmharic ? "ውይይት ይጀምሩ" : "Start a conversation"}</p>
                  <h2>{isAmharic ? "ያግኙን" : "Contact us"}</h2>
                  <div className="partner-fields">
                    <label>{isAmharic ? "ስም" : "First name"}<input name="firstName" type="text" autoComplete="given-name" placeholder={isAmharic ? "ስምዎ" : "Enter your first name"} required /></label>
                    <label>{isAmharic ? "የአባት ስም" : "Last name"}<input name="lastName" type="text" autoComplete="family-name" placeholder={isAmharic ? "የአባት ስምዎ" : "Enter your last name"} required /></label>
                    <label>{isAmharic ? "የሥራ ኢሜይል" : "Work email"}<input name="email" type="email" autoComplete="email" placeholder={isAmharic ? "ኢሜይልዎ" : "Enter your email"} required /></label>
                  </div>
                  <label>{isAmharic ? "መልዕክት" : "Message"}<textarea name="message" rows="3" placeholder={isAmharic ? "መልዕክትዎን ይጻፉ" : "Enter your message"} required /></label>
                  <button type="submit">{isAmharic ? "ይላኩ" : "Submit"} <span aria-hidden="true">↗</span></button>
                  <div className="partner-email">
                    <span>{isAmharic ? "ኢሜይል" : "Email us"}</span>
                    <a href="mailto:hello@turmi.co">hello@turmi.co</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
