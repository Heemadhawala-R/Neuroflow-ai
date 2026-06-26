import styles from "./Trusted.module.css";

const companies = [
  "Stripe",
  "Notion",
  "Linear",
  "Vercel",
  "Figma",
  "Loom",
  "Retool",
  "Segment",
];

export default function Trusted() {
  return (
    <section
      id="trusted"
      className={styles.trusted}
      aria-label="Trusted by leading companies"
    >
      <div className={styles.container}>
        <p className={styles.label}>
          Trusted by engineering teams at
        </p>
        <div
          className={styles.logoTrack}
          aria-hidden="true"
        >
          <div className={styles.logos}>
            {[...companies, ...companies].map((name, i) => (
              <span key={`${name}-${i}`} className={styles.logo}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
