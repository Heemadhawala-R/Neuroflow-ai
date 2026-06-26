"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Docs", href: "#features" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        burgerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableEls = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        );

        if (focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const firstFocusable =
      menuRef.current?.querySelector<HTMLElement>(FOCUSABLE);

    firstFocusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`${styles.navbar} ${
        scrolled ? styles.scrolled : ""
      }`}
      role="banner"
    >
      <nav
        className={styles.inner}
        aria-label="Primary navigation"
      >
        {/* Logo */}

        <a
          href="/"
          className={styles.logo}
          aria-label="NeuroFlow AI home"
        >
          <Image
            src="/icons/cube-16-solid.svg"
            alt=""
            width={20}
            height={20}
            className={styles.logoIcon}
            aria-hidden="true"
          />

          <span className={styles.logoText}>
            NeuroFlow
          </span>

          <span className={styles.logoBadge}>
            AI
          </span>
        </a>


        <ul
          className={styles.links}
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>


        <div className={styles.actions}>
          <a
            href="#pricing"
            className={styles.signIn}
            aria-label="Sign in"
          >
            Sign in
          </a>

          <a
            href="#pricing"
            className={styles.cta}
            aria-label="Get started free"
          >
            Get started
          </a>
        </div>


        <button
          ref={burgerRef}
          className={styles.burger}
          onClick={() =>
            setMenuOpen((open) => !open)
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
        >
          {menuOpen ? (
            <Image
              src="/icons/x-mark.svg"
              alt=""
              width={22}
              height={22}
              className={styles.burgerIcon}
            />
          ) : (
            <span
              className={styles.burgerLines}
              aria-hidden="true"
            />
          )}
        </button>
      </nav>


      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileActions}>
            <a
              href="#pricing"
              className={styles.mobileSignIn}
              onClick={closeMenu}
            >
              Sign in
            </a>

            <a
              href="#pricing"
              className={styles.mobileCta}
              onClick={closeMenu}
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}