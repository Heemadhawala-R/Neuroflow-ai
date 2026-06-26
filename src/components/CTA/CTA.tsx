import Image from "next/image";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section
      id="cta"
      className={styles.section}
      aria-labelledby="cta-heading"
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.glow} aria-hidden="true" />

          <p className={styles.eyebrow}>Get started today</p>

          <h2 id="cta-heading" className={styles.heading}>
            Your data pipeline,
            <br />
            <span className={styles.headingAccent}>finally automated</span>
          </h2>

          <p className={styles.sub}>
            Join 4,000+ engineering teams who replaced their patchwork pipelines
            with NeuroFlow. No credit card required.
          </p>

          <div className={styles.ctas}>
            <a
              href="#pricing"
              className={styles.ctaPrimary}
              aria-label="Start building with NeuroFlow for free"
            >
              Start building free
              <Image
                src="/icons/arrow-trending-up.svg"
                alt=""
                width={18}
                height={18}
                className={styles.ctaIcon}
                aria-hidden="true"
              />
            </a>
            <a
              href="#"
              className={styles.ctaSecondary}
              aria-label="Read the NeuroFlow documentation"
            >
              <Image
                src="/icons/link.svg"
                alt=""
                width={16}
                height={16}
                className={styles.docIcon}
                aria-hidden="true"
              />
              Read the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
