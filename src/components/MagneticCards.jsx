"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./MagneticCards.module.css";
import { useLanguage } from "./LanguageContext";

const CARD_CONTENT = [
  {
    number: "01",
    heading: "Structure",
    description: "Register producers, map farms, and define production requirements.",
  },
  {
    number: "02",
    heading: "Finance",
    description: "Connect financing to specific agricultural activities and assets.",
  },
  {
    number: "03",
    heading: "Execute & Verify",
    description: "Coordinate inputs and services, then verify agreed milestones.",
  },
  {
    number: "04",
    heading: "Market & Repay",
    description: "Coordinate harvest, buyers, logistics, receivables, and repayment.",
  },
];

const PROXIMITY_RADIUS = 500;
const PUSH_FORCE = 10;
const TILT_AMOUNT = 0.1;
const NEIGHBOR_INFLUENCE = 0.2;
const SPRING_STIFFNESS = 0.05;
const BOUNCE_FRICTION = 0.85;
const CURSOR_SMOOTHING = 0.75;
const ROTATIONS = [5, -5, 7.5, -10];

export default function MagneticCards() {
  const { isAmharic } = useLanguage();
  const cardContent = isAmharic ? [
    { number: "01", heading: "ይመዝግቡ", description: "የገበሬ፣ የእርሻ፣ የሰብልና የወቅት መገለጫዎችን ይፍጠሩ።" },
    { number: "02", heading: "ያሰፍሩ", description: "እያንዳንዱን የእርሻና የመሬት መዝገብ ከተረጋገጠ ቦታ ጋር ያገናኙ።" },
    { number: "03", heading: "ይከታተሉ", description: "የመስክ ጉብኝቶችን፣ የሰብል ሂደትን፣ ፎቶዎችንና ወሳኝ ደረጃዎችን ይከታተሉ።" },
    { number: "04", heading: "ወደ ውጭ ይላኩ", description: "የተሰበሰቡ ምርቶችን ለገዢዎች፣ ለሎጂስቲክስና ለውጭ ገበያ ያስተባብሩ።" },
  ] : CARD_CONTENT;
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !cardsContainer || cards.length !== cardContent.length) {
      return undefined;
    }

    const cursor = { x: 0, y: 0, vx: 0, vy: 0 };
    let previousX = 0;
    let previousY = 0;

    const getLayout = () => {
      if (window.innerWidth <= 767) {
        const { width, height } = cards[0].getBoundingClientRect();
        const x = width / 2 + 6;
        const y = height / 2 + 6;

        return {
          x: [-x, x, -x, x],
          y: [-y, -y, y, y],
          rotation: ROTATIONS,
        };
      }

      return {
        x: [-275, -100, 100, 275],
        y: [10, -10, 25, -10],
        rotation: ROTATIONS,
      };
    };

    let layout = getLayout();
    const cardPhysics = cards.map((element, index) => {
      gsap.set(element, {
        x: layout.x[index],
        y: layout.y[index],
        rotation: layout.rotation[index],
        zIndex: index,
        xPercent: -50,
        yPercent: -50,
      });

      return {
        element,
        restX: layout.x[index],
        restY: layout.y[index],
        restRotation: layout.rotation[index],
        x: layout.x[index],
        y: layout.y[index],
        rotation: layout.rotation[index],
        velocityX: 0,
        velocityY: 0,
        velocityRotation: 0,
      };
    });

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    if (mobileQuery.matches) {
      return () => {
        gsap.set(cards, { clearProps: "transform,zIndex" });
      };
    }

    const handleMouseMove = (event) => {
      cursor.vx =
        cursor.vx * CURSOR_SMOOTHING +
        (event.clientX - previousX) * (1 - CURSOR_SMOOTHING);
      cursor.vy =
        cursor.vy * CURSOR_SMOOTHING +
        (event.clientY - previousY) * (1 - CURSOR_SMOOTHING);
      previousX = cursor.x = event.clientX;
      previousY = cursor.y = event.clientY;
    };

    const handleMouseLeave = () => {
      cursor.vx = 0;
      cursor.vy = 0;
    };

    const handleResize = () => {
      layout = getLayout();

      cardPhysics.forEach((card, index) => {
        card.restX = layout.x[index];
        card.restY = layout.y[index];
        card.restRotation = layout.rotation[index];
      });
    };

    const calculatePushForce = (card) => {
      const speed = Math.sqrt(cursor.vx ** 2 + cursor.vy ** 2);
      if (speed < 0.5) return { forceX: 0, forceY: 0 };

      const rect = cardsContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 + card.restX;
      const centerY = rect.top + rect.height / 2 + card.restY;
      const distance = Math.sqrt(
        (cursor.x - centerX) ** 2 + (cursor.y - centerY) ** 2
      );

      if (distance > PROXIMITY_RADIUS) {
        return { forceX: 0, forceY: 0 };
      }

      const weight = (1 - distance / PROXIMITY_RADIUS) ** 3;
      return {
        forceX: cursor.vx * PUSH_FORCE * weight,
        forceY: cursor.vy * PUSH_FORCE * weight,
      };
    };

    const applyNeighborInfluence = (forces, index) => {
      let forceX = forces[index].forceX;
      let forceY = forces[index].forceY;

      forces.forEach((force, neighborIndex) => {
        if (neighborIndex === index) return;

        const falloff =
          NEIGHBOR_INFLUENCE ** Math.abs(neighborIndex - index);
        forceX += force.forceX * falloff;
        forceY += force.forceY * falloff * 0.6;
      });

      return { forceX, forceY };
    };

    const updateCards = () => {
      const forces = cardPhysics.map(calculatePushForce);

      cardPhysics.forEach((card, index) => {
        const { forceX, forceY } = applyNeighborInfluence(forces, index);

        card.velocityX =
          (card.velocityX +
            (card.restX + forceX - card.x) * SPRING_STIFFNESS) *
          BOUNCE_FRICTION;
        card.velocityY =
          (card.velocityY +
            (card.restY + forceY - card.y) * SPRING_STIFFNESS) *
          BOUNCE_FRICTION;
        card.velocityRotation =
          (card.velocityRotation +
            (card.restRotation + forceX * TILT_AMOUNT - card.rotation) *
              SPRING_STIFFNESS) *
          BOUNCE_FRICTION;

        card.x += card.velocityX;
        card.y += card.velocityY;
        card.rotation += card.velocityRotation;

        gsap.set(card.element, {
          x: card.x,
          y: card.y,
          rotation: card.rotation,
        });
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    gsap.ticker.add(updateCards);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateCards);
      gsap.set(cards, { clearProps: "transform,zIndex" });
    };
  }, [cardContent.length]);

  return (
    <section
      ref={sectionRef}
      className={styles.spotlight}
      aria-label="One system from capital to market"
    >
      <div ref={cardsContainerRef} className={styles.cards}>
        {cardContent.map((card, index) => (
          <article
            className={styles.card}
            key={card.number}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <span className={styles.cardNumber}>{card.number}</span>
            <h2>{card.heading}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
