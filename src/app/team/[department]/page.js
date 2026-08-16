"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageContext";
import "./department.css";

const departmentTeams = {
  "field-operations": {
    title: "Field operations",
    amTitle: "የመስክ ሥራዎች",
    intro: "The people keeping Turmi grounded in producers, places, and real production.",
    amIntro: "ቱርሚን ከአምራቾች፣ ከቦታዎችና ከእውነተኛ ምርት ጋር የሚያቆራኙ ሰዎች።",
    names: ["Field Operations Lead", "Regional Coordinator", "Producer Success", "Verification Lead", "Agronomy Specialist", "Logistics Coordinator"],
  },
  "agricultural-intelligence": {
    title: "Agricultural intelligence",
    amTitle: "የግብርና ብልህነት",
    intro: "The team turning ground truth and geospatial signals into useful intelligence.",
    amIntro: "የመስክ እውነታንና የጂኦስፓሻል ምልክቶችን ወደ ጠቃሚ መረጃ የሚቀይር ቡድን።",
    names: ["Intelligence Lead", "Geospatial Scientist", "Data Scientist", "Remote Sensing Analyst", "Research Analyst", "Model Operations"],
  },
  "capital-partnerships": {
    title: "Capital & partnerships",
    amTitle: "ካፒታልና አጋርነት",
    intro: "The people aligning patient capital, trusted partners, and shared outcomes.",
    amIntro: "ትዕግሥተኛ ካፒታልን፣ ታማኝ አጋሮችንና የጋራ ውጤቶችን የሚያስተባብሩ ሰዎች።",
    names: ["Partnerships Lead", "Capital Strategy", "Portfolio Operations", "Institutional Partnerships", "Risk & Compliance", "Market Development"],
  },
  "product-technology": {
    title: "Product & technology",
    amTitle: "ምርትና ቴክኖሎጂ",
    intro: "The builders shaping Turmi into a clear, reliable operating system.",
    amIntro: "ቱርሚን ግልጽና አስተማማኝ የሥራ ሥርዓት አድርገው የሚገነቡ ባለሙያዎች።",
    names: ["Product Lead", "Engineering Lead", "Product Designer", "Platform Engineer", "Data Engineer", "Quality & Reliability"],
  },
};

const portraits = [
  "jurica-koletic-7YVZYZeITc8-unsplash.jpg",
  "christina-wocintechchat-com-m-Zpzf7TLj_gA-unsplash(1).jpg",
  "ryan-hoffman-Ft4p5E9HjTQ-unsplash.jpg",
  "christina-wocintechchat-com-m-kXmKqYOGA4Y-unsplash.jpg",
  "tony-luginsland-bbOOTiq-EPA-unsplash.jpg",
  "karabo-mdluli-Y7TEMCKRIgI-unsplash.jpg",
];

export default function DepartmentTeamPage() {
  const { department } = useParams();
  const team = departmentTeams[department];
  const pageRef = useRef(null);
  const spotlightRef = useRef(null);
  const indexRef = useRef(null);
  const imagesRef = useRef(null);
  const namesRef = useRef(null);
  const { isAmharic } = useLanguage();

  useLayoutEffect(() => {
    if (!team) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const spotlight = spotlightRef.current;
    const projectIndex = indexRef.current;
    const imagesContainer = imagesRef.current;
    const namesContainer = namesRef.current;
    const projectImages = gsap.utils.toArray(".department-member-image", spotlight);
    const projectNames = gsap.utils.toArray(".department-member-name", spotlight);

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: spotlight,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const count = projectNames.length;
          const current = Math.min(Math.floor(progress * count) + 1, count);
          const sectionPadding = parseFloat(getComputedStyle(spotlight).paddingTop);
          const indexDistance = spotlight.offsetHeight - sectionPadding * 2 - projectIndex.offsetHeight;
          const namesDistance = spotlight.offsetHeight - sectionPadding * 2 - namesContainer.offsetHeight;
          const imagesDistance = window.innerHeight - imagesContainer.offsetHeight;

          projectIndex.textContent = `${String(current).padStart(2, "0")}/${String(count).padStart(2, "0")}`;
          gsap.set(projectIndex, { y: progress * indexDistance });
          gsap.set(imagesContainer, { y: progress * imagesDistance });

          projectImages.forEach((image) => {
            const rect = image.getBoundingClientRect();
            gsap.set(image, { opacity: rect.top <= innerHeight / 2 && rect.bottom >= innerHeight / 2 ? 1 : 0.32 });
          });

          projectNames.forEach((name, itemIndex) => {
            const start = itemIndex / count;
            const itemProgress = gsap.utils.clamp(0, 1, (progress - start) * count);
            gsap.set(name, { y: -itemProgress * namesDistance, color: itemProgress > 0 && itemProgress < 1 ? "#f5f1e8" : "#596b61" });
          });
        },
      });
    }, pageRef);

    return () => context.revert();
  }, [team]);

  if (!team) notFound();

  return (
    <>
      <Navbar />
      <main className="department-page" ref={pageRef}>
        <section className="department-intro">
          <Link href="/team" className="department-back">← {isAmharic ? "ወደ ቡድኖች" : "All teams"}</Link>
          <p>{isAmharic ? "የቱርሚ ቡድን" : "Meet the team"}</p>
          <h1>{isAmharic ? team.amTitle : team.title}</h1>
          <p className="department-intro-copy">{isAmharic ? team.amIntro : team.intro}</p>
          <span className="department-scroll-cue">{isAmharic ? "ለማግኘት ይሸብልሉ" : "Scroll to meet the team"} ↓</span>
        </section>

        <section className="department-spotlight" ref={spotlightRef}>
          <div className="department-index"><h2 ref={indexRef}>01/06</h2></div>
          <div className="department-images" ref={imagesRef}>
            {portraits.map((portrait, index) => (
              <div className="department-member-image" key={portrait}>
                <Image src={`/images/team/${portrait}`} alt={team.names[index]} width={1200} height={675} sizes="(max-width: 850px) 90vw, 38vw" />
              </div>
            ))}
          </div>
          <div className="department-names" ref={namesRef}>
            {team.names.map((name) => <p className="department-member-name" key={name}>{name}</p>)}
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
