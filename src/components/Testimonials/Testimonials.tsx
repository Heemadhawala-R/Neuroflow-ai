import styles from "./Testimonials.module.css";

const testimonials = [
  {
    quote:
      "NeuroFlow replaced three separate ETL tools. Our data engineering team now ships in hours what used to take weeks. The Unified Data Graph alone is worth the price.",
    author: "Priya Nair",
    role: "Head of Data Engineering",
    company: "Groww",
    initials: "PN",
    accent: true,
  },
  {
    quote:
      "We moved 80 million daily events from our homegrown pipeline to NeuroFlow in a single sprint. Zero downtime. The Flow Orchestrator handles retry logic we used to write by hand.",
    author: "Marcus Klein",
    role: "CTO",
    company: "Synthex Labs",
    initials: "MK",
    accent: false,
  },
  {
    quote:
      "The predictive analytics surfaced a churn signal three weeks before our customer success team noticed. That alone paid for an entire year of NeuroFlow.",
    author: "Aiko Tanaka",
    role: "VP Product",
    company: "Haruko Health",
    initials: "AT",
    accent: false,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Customer stories</p>
          <h2 id="testimonials-heading" className={styles.heading}>
            Trusted by teams
            <br />
            shipping at scale
          </h2>
        </header>

        <div className={styles.grid} role="list">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className={`${styles.card} ${t.accent ? styles.cardAccent : ""}`}
              role="listitem"
            >
              {/* Quote marks */}
              <span className={styles.quoteGlyph} aria-hidden="true">"</span>

              <blockquote className={styles.quote}>
                <p>{t.quote}</p>
              </blockquote>

              <figcaption className={styles.author}>
                <div
                  className={`${styles.avatar} ${t.accent ? styles.avatarAccent : ""}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <strong className={styles.authorName}>{t.author}</strong>
                  <span className={styles.authorRole}>
                    {t.role}, {t.company}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
