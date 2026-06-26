import Image from "next/image";
import styles from "./Footer.module.css";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

const socials = [
  { label: "GitHub", href: "#", icon: "/icons/link-solid.svg" },
  { label: "Twitter / X", href: "#", icon: "/icons/arrow-trending-up.svg" },
  { label: "LinkedIn", href: "#", icon: "/icons/link.svg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label="NeuroFlow AI home">
              <Image
                src="/icons/cube-16-solid.svg"
                alt=""
                width={20}
                height={20}
                className={styles.logoIcon}
                aria-hidden="true"
              />
              <span className={styles.logoText}>NeuroFlow</span>
              <span className={styles.logoBadge}>AI</span>
            </a>
            <p className={styles.tagline}>
              Data automation with
              <br />
              neural precision.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.socialIcon}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {columns.map((col) => (
              <div key={col.heading} className={styles.col}>
                <h3 className={styles.colHeading}>{col.heading}</h3>
                <ul role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.footerLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} NeuroFlow AI, Inc. All rights reserved.
          </p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
