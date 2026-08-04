"use client";

import styles from "./SolutionStack.module.css";
import AnimatedCopy from "./AnimatedCopy";
import { useLanguage } from "./LanguageContext";

const solutions = [
  {
    title: "For banks, MFIs and DFIs",
    copy: "Turmi provides structured operational records that can support agricultural portfolio oversight and financing decisions.",
    features: [
      "Farmer, farm and plot-level records",
      "Production and activity visibility",
      "Plot-level financing requirements",
      "Oracle-supported milestone evidence",
      "Role-based access for reviewers",
      "Contract and portfolio information",
    ],
  },
  {
    title: "For Managed Services Entities",
    copy: "Turmi helps MSEs coordinate the operational work required to deploy financing through inputs, services and infrastructure.",
    features: [
      "Farmer onboarding",
      "Procurement coordination",
      "Input and service delivery",
      "Field-agent workflows",
      "Contract-farming administration",
      "Agricultural portfolio management",
      "Harvest and logistics coordination",
    ],
  },
  {
    title: "For exporters and off-takers",
    copy: "Turmi helps market partners gain greater visibility into contracted production and harvest coordination.",
    features: [
      "Contracted farm and plot records",
      "Production-status visibility",
      "Harvest-readiness information",
      "Aggregation support",
      "Logistics coordination",
      "Buyer and off-take workflow visibility",
    ],
  },
  {
    title: "For government and development partners",
    copy: "Turmi provides operational infrastructure for agricultural programs requiring structured field records, managed-service workflows and measurable implementation.",
    features: [
      "Farmer-program registration",
      "Plot mapping",
      "Service-delivery records",
      "Field monitoring",
      "Production verification",
      "Program-level operational visibility",
    ],
  },
];

export default function SolutionStack() {
  const { isAmharic } = useLanguage();
  const localizedSolutions = isAmharic ? [
    { title: "ለባንኮች፣ ኤምኤፍአይ እና ዲኤፍአይ", copy: "ቱርሚ የግብርና ፖርትፎሊዮ ክትትልንና የፋይናንስ ውሳኔዎችን የሚደግፉ የተዋቀሩ የሥራ መዝገቦችን ይሰጣል።", features: ["የገበሬ፣ የእርሻና የመሬት መዝገቦች", "የምርትና የእንቅስቃሴ ታይነት", "የመሬት ደረጃ የፋይናንስ ፍላጎቶች", "በኦራክል የተደገፈ የደረጃ ማስረጃ", "ለገምጋሚዎች በሚና የተመሠረተ መዳረሻ", "የውልና የፖርትፎሊዮ መረጃ"] },
    { title: "ለማኔጅድ ሰርቪስ አካላት", copy: "ቱርሚ በግብዓት፣ በአገልግሎትና በመሠረተ ልማት ፋይናንስ ለማሰማራት የሚያስፈልገውን ሥራ ለማስተባበር ይረዳል።", features: ["የገበሬ ምዝገባ", "የግዥ ማስተባበር", "የግብዓትና የአገልግሎት አቅርቦት", "የመስክ ወኪል የሥራ ሂደት", "የውል እርሻ አስተዳደር", "የግብርና ፖርትፎሊዮ አስተዳደር", "የመከርና የሎጂስቲክስ ማስተባበር"] },
    { title: "ለላኪዎችና ለገዢዎች", copy: "ቱርሚ የገበያ አጋሮች ስለ ውል ምርትና የመከር ማስተባበር የበለጠ ግልጽነት እንዲያገኙ ይረዳል።", features: ["የውል እርሻና የመሬት መዝገቦች", "የምርት ሁኔታ ታይነት", "የመከር ዝግጁነት መረጃ", "የማሰባሰብ ድጋፍ", "የሎጂስቲክስ ማስተባበር", "የገዢና የግዥ ሂደት ታይነት"] },
    { title: "ለመንግሥትና ለልማት አጋሮች", copy: "ቱርሚ የተዋቀሩ የመስክ መዝገቦች፣ የአገልግሎት ሂደቶችና ሊለካ የሚችል ትግበራ ለሚፈልጉ የግብርና ፕሮግራሞች የሥራ መሠረተ ልማት ይሰጣል።", features: ["የገበሬ ፕሮግራም ምዝገባ", "የመሬት ካርታ", "የአገልግሎት አቅርቦት መዝገቦች", "የመስክ ክትትል", "የምርት ማረጋገጫ", "የፕሮግራም ደረጃ የሥራ ታይነት"] },
  ] : solutions;
  return (
    <section className={styles.stack} aria-label="Turmi solutions">
      {localizedSolutions.map((solution, index) => (
        <article className={styles.solution} key={solution.title}>
          <div className={styles.marker}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <p className={styles.label}>{isAmharic ? "ማንን ይደግፋል" : "Who it supports"}</p>
          </div>
          <div className={styles.copy}>
            <AnimatedCopy
              colorInitial="#c7c3b9"
              colorAccent="#abff02"
              colorFinal="#171712"
              scrollStart="top 82%"
              playOnEnter={index !== 0}
              playOnMount={index === 0}
              delay={index === 0 ? 1.8 : 0}
            >
              <h2>{solution.title}</h2>
            </AnimatedCopy>
            <AnimatedCopy
              colorInitial="#c7c3b9"
              colorAccent="#abff02"
              colorFinal="#514c42"
              scrollStart="top 86%"
              scrollEnd="top 34%"
            >
              <p className={styles.description}>{solution.copy}</p>
            </AnimatedCopy>
          </div>
          <ul className={styles.features}>
            {solution.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <span className={styles.accent} aria-hidden="true" />
        </article>
      ))}
    </section>
  );
}
