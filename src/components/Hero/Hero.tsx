import Image from "next/image";
import styles from "./Hero.module.css";

const stats = [
  { value: "10×", label: "Faster pipelines" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50M+", label: "Events/day" },
  { value: "< 80ms", label: "Median latency" },
];

const dashboardCards = [
  {
    icon: "/icons/arrow-trending-up.svg",
    title: "Revenue Signal",
    value: "+24.6%",
    sub: "vs last quarter",
    accent: true,
  },
  {
    icon: "/icons/chart-pie.svg",
    title: "Data Coverage",
    value: "98.3%",
    sub: "across all sources",
    accent: false,
  },
  {
    icon: "/icons/arrow-path.svg",
    title: "Active Flows",
    value: "1,847",
    sub: "running now",
    accent: false,
  },
  {
    icon: "/icons/cog-8-tooth.svg",
    title: "Automations",
    value: "312",
    sub: "saved this week",
    accent: false,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
=      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.gradientBlob} aria-hidden="true" />

      <div className={styles.container}>
        <div className={`${styles.badge} animate-fade-up`} role="note">
          <Image
            src="/icons/cube-16-solid.svg"
            alt=""
            width={14}
            height={14}
            className={styles.badgeIcon}
            aria-hidden="true"
          />
          <span>Now with Agentic Reasoning Engine v3</span>
        </div>

        <h1
          id="hero-heading"
          className={`${styles.heading} animate-fade-up delay-100`}
        >
          Data automation
          <br />
          <span className={styles.headingAccent}>with neural precision</span>
        </h1>

        <p className={`${styles.sub} animate-fade-up delay-200`}>
          NeuroFlow connects every data source, processes millions of events in
          real time, and triggers the right action — without you writing a single
          pipeline.
        </p>

        <div className={`${styles.ctas} animate-fade-up delay-300`}>
          <a
            href="#pricing"
            className={styles.ctaPrimary}
            aria-label="Start building for free"
          >
            Start building free
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              width={16}
              height={16}
              className={styles.ctaIcon}
              aria-hidden="true"
            />
          </a>
          <a
            href="#features"
            className={styles.ctaSecondary}
            aria-label="See how NeuroFlow works"
          >
            See how it works
          </a>
        </div>

        <dl className={`${styles.stats} animate-fade-up delay-400`}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div
          className={`${styles.dashboard} animate-scale-in delay-400`}
          aria-label="NeuroFlow dashboard preview"
          role="img"
        >
          <div className={styles.dashboardHeader}>
            <span className={styles.dashboardTitle}>Live Overview</span>
            <span className={styles.dashboardDot} aria-label="Live indicator" />
          </div>
          <div className={styles.dashboardGrid}>
            {dashboardCards.map((card) => (
              <article
                key={card.title}
                className={`${styles.card} ${card.accent ? styles.cardAccent : ""}`}
              >
                <div className={styles.cardTop}>
                  <Image
                    src={card.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={`${styles.cardIcon} ${card.accent ? styles.cardIconAccent : ""}`}
                    aria-hidden="true"
                  />
                  <span className={styles.cardTitle}>{card.title}</span>
                </div>
                <strong className={styles.cardValue}>{card.value}</strong>
                <span className={styles.cardSub}>{card.sub}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
