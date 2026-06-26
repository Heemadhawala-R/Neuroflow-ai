"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./Features.module.css";

const features = [
  {
    id: 0,
    icon: "/icons/arrow-path.svg",
    title: "Neural Sync Engine",
    description:
      "Bidirectional data sync across 200+ connectors with sub-second propagation. Every update flows through our conflict-resolution layer — no manual reconciliation.",
    tag: "Core",
    size: "large",
  },
  {
    id: 1,
    icon: "/icons/arrow-trending-up.svg",
    title: "Predictive Analytics",
    description:
      "Embedded ML models surface anomalies, forecast trends, and generate actionable signals before your team even opens a dashboard.",
    tag: "Intelligence",
    size: "medium",
  },
  {
    id: 2,
    icon: "/icons/chart-pie.svg",
    title: "Unified Data Graph",
    description:
      "A live, queryable graph of every entity, relation, and event across your stack. Traverse relationships in milliseconds.",
    tag: "Infrastructure",
    size: "medium",
  },
  {
    id: 3,
    icon: "/icons/cog-8-tooth.svg",
    title: "Flow Orchestrator",
    description:
      "Visual workflow builder with conditional branching, retries, and SLA guardrails. Deploy automations without touching code.",
    tag: "Automation",
    size: "small",
  },
  {
    id: 4,
    icon: "/icons/link-solid.svg",
    title: "API Fabric",
    description:
      "Auto-generate typed SDKs and webhooks for every dataset. Every schema change propagates instantly to all consumers.",
    tag: "Developer",
    size: "small",
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState<number | null>(null);
  const prevIsMobileRef = useRef(false);

  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < 768;
    const wasMobile = prevIsMobileRef.current;

    if (!wasMobile && mobile) {
      if (activeDesktopIndex !== null) {
        setActiveIndex(activeDesktopIndex);
        setTimeout(() => {
          const trigger = document.getElementById(`trigger-${activeDesktopIndex}`);
          trigger?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
    }

    prevIsMobileRef.current = mobile;
    setIsMobile(mobile);
  }, [activeDesktopIndex]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    prevIsMobileRef.current = mobile;
    setIsMobile(mobile);

    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const handleBentoEnter = useCallback((id: number) => {
    setActiveDesktopIndex(id);
  }, []);

  const handleBentoLeave = useCallback(() => {
  
  }, []);

  const toggleAccordion = useCallback((id: number) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="features-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Platform capabilities</p>
          <h2 id="features-heading" className={styles.heading}>
            Built for data teams
            <br />
            who ship fast
          </h2>
          <p className={styles.sub}>
            Five core primitives that compose into any workflow your team needs.
          </p>
        </header>

        {!isMobile && (
          <div
            className={styles.bento}
            role="list"
            aria-label="Platform features"
          >
            {features.map((feat) => (
              <article
                key={feat.id}
                className={`${styles.bentoCard} ${styles[`card_${feat.size}`]}`}
                onMouseEnter={() => handleBentoEnter(feat.id)}
                onMouseLeave={handleBentoLeave}
                tabIndex={0}
                onFocus={() => handleBentoEnter(feat.id)}
                onBlur={handleBentoLeave}
                role="listitem"
                aria-label={feat.title}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <span className={styles.featureTag}>{feat.tag}</span>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <Image
                        src={feat.icon}
                        alt=""
                        width={22}
                        height={22}
                        className={styles.featureIcon}
                      />
                    </div>
                  </div>
                  <h3 className={styles.featureTitle}>{feat.title}</h3>
                  <p className={styles.featureDesc}>{feat.description}</p>
                </div>
                <div className={styles.cardGlow} aria-hidden="true" />
              </article>
            ))}
          </div>
        )}
        {isMobile && (
          <div
            className={styles.accordion}
            role="list"
            aria-label="Platform features"
          >
            {features.map((feat) => {
              const isOpen = activeIndex === feat.id;
              return (
                <div
                  key={feat.id}
                  className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ""}`}
                  role="listitem"
                >
                  <button
                    className={styles.accordionTrigger}
                    onClick={() => toggleAccordion(feat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${feat.id}`}
                    id={`trigger-${feat.id}`}
                  >
                    <div className={styles.accordionLeft}>
                      <div className={styles.accordionIconWrap} aria-hidden="true">
                        <Image
                          src={feat.icon}
                          alt=""
                          width={18}
                          height={18}
                          className={styles.accordionFeatureIcon}
                        />
                      </div>
                      <span className={styles.accordionTitle}>{feat.title}</span>
                    </div>
                    <Image
                      src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
                      alt=""
                      width={18}
                      height={18}
                      className={styles.accordionChevron}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`panel-${feat.id}`}
                    role="region"
                    aria-labelledby={`trigger-${feat.id}`}
                    className={styles.accordionPanel}
                    hidden={!isOpen}
                  >
                    <span className={styles.accordionTag}>{feat.tag}</span>
                    <p className={styles.accordionDesc}>{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
