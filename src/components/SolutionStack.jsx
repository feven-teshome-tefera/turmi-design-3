"use client";

import styles from "./SolutionStack.module.css";
import AnimatedCopy from "./AnimatedCopy";
import { useLanguage } from "./LanguageContext";

const solutions = [
  {
    title: "Production Financing",
    copy: "Working capital for agricultural production cycles, deployed according to defined production plans and verified execution milestones.",
    features: [
      "Land preparation and inputs",
      "Cultivation and agricultural services",
      "Livestock operations",
      "Harvesting requirements",
      "Defined production plans",
      "Progressive capital deployment",
    ],
  },
  {
    title: "Equipment & Infrastructure Financing",
    copy: "Longer-term financing connected to the productive use and expected economic output of agricultural assets.",
    features: [
      "Irrigation systems",
      "Machinery and equipment",
      "Storage infrastructure",
      "Processing infrastructure",
      "Ranch operations",
      "Productive capacity",
    ],
  },
  {
    title: "Producers & Agricultural Partners",
    copy: "Access structured financing, productive assets, operational support, and participation across the production cycle.",
    features: [
      "Producer onboarding",
      "Input delivery",
      "Field services",
      "Equipment and verification",
      "Logistics and processing",
      "Connections to markets",
    ],
  },
  {
    title: "Financial Institutions, Buyers & Exporters",
    copy: "Participate in agricultural financing and connect with organized production with greater visibility into requirements, execution, and outcomes.",
    features: [
      "Production requirements",
      "Execution visibility",
      "Verified milestones",
      "Organized supply",
      "Harvest coordination",
      "Market and repayment pathways",
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
            <p className={styles.label}>{isAmharic ? "ፋይናንስና አጋሮች" : "Finance & partners"}</p>
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
