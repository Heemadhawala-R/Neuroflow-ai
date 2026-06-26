"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import Image from "next/image";
import styles from "./Pricing.module.css";
import { PricingProvider, usePricingStore } from "./PricingStore";
import type { Currency } from "./PricingStore";

const PRICING_MATRIX: Record<string, Record<Currency, number>> = {
  starter: {
    USD: 29,
    INR: 2399,
    EUR: 27,
  },
  professional: {
    USD: 89,
    INR: 7399,
    EUR: 82,
  },
  enterprise: {
    USD: 249,
    INR: 20699,
    EUR: 229,
  },
};

const ANNUAL_DISCOUNT = 0.8;

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
};

const CURRENCIES: Currency[] = [
  "USD",
  "INR",
  "EUR",
];

const tiers = [
  {
    key: "starter",
    name: "Starter",
    description:
      "For small teams getting started with AI automation.",
    features: [
      "Up to 500K events",
      "5 workflows",
      "10 integrations",
      "Email support",
      "7-day retention",
    ],
    highlighted: false,
    cta: "Start Free",
  },
  {
    key: "professional",
    name: "Professional",
    description:
      "Perfect for fast-growing businesses.",
    features: [
      "20M events",
      "Unlimited workflows",
      "200+ integrations",
      "Priority support",
      "Predictive AI",
      "90-day retention",
      "Webhooks",
    ],
    highlighted: true,
    cta: "Start Trial",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description:
      "Built for organizations that operate at scale.",
    features: [
      "Unlimited events",
      "Dedicated servers",
      "Custom integrations",
      "365-day retention",
      "SLA",
      "SSO",
      "Audit logs",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
] as const;

function PriceDisplay({
  tierKey,
}: {
  tierKey: string;
}) {
  const {
    currency,
    isAnnual,
  } = usePricingStore();

  const price = useMemo(() => {
    const base =
      PRICING_MATRIX[tierKey][currency];

    return isAnnual
      ? Math.round(base * ANNUAL_DISCOUNT)
      : base;
  }, [tierKey, currency, isAnnual]);

  return (
    <>
      <div className={styles.priceBlock}>
        <span className={styles.symbol}>
          {CURRENCY_SYMBOLS[currency]}
        </span>

        <span className={styles.amount}>
          {price.toLocaleString()}
        </span>

        <span className={styles.period}>
          /mo
        </span>
      </div>

      <p
        className={styles.annualNote}
        aria-live="polite"
        aria-atomic="true"
      >
        {isAnnual
          ? "Billed annually • Save 20%"
          : "\u00A0"}
      </p>
    </>
  );
}

type Tier = (typeof tiers)[number];

const TierCard = memo(function TierCard({
  tier,
}: {
  tier: Tier;
}) {
  return (
    <article
      className={`${styles.card} ${
        tier.highlighted
          ? styles.cardHighlighted
          : ""
      }`}
    >
      {tier.highlighted && (
        <span className={styles.popularBadge}>
          Most Popular
        </span>
      )}

      <h3 className={styles.tierName}>
        {tier.name}
      </h3>

      <p className={styles.tierDesc}>
        {tier.description}
      </p>

      <PriceDisplay tierKey={tier.key} />

      <a
        href="#cta"
        className={`${styles.cta} ${
          tier.highlighted
            ? styles.ctaHighlighted
            : ""
        }`}
      >
        {tier.cta}
      </a>

      <ul className={styles.features}>
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={styles.featureItem}
          >
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              width={14}
              height={14}
            />

            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
});
function PricingControls() {
  const {
    isAnnual,
    currency,
    toggleAnnual,
    setCurrency,
  } = usePricingStore();

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleOutsideClick = (
      e: MouseEvent
    ) => {
      if (
        !dropdownRef.current?.contains(
          e.target as Node
        )
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [dropdownOpen]);

  const handleCurrency = useCallback(
    (c: Currency) => {
      setCurrency(c);
      setDropdownOpen(false);
    },
    [setCurrency]
  );

  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Pricing Controls"
    >


      <div className={styles.toggleWrap}>

        <span
          id="monthly"
          className={styles.toggleLabel}
        >
          Monthly
        </span>

        <button
          className={`${styles.toggle} ${
            isAnnual
              ? styles.toggleOn
              : ""
          }`}
          role="switch"
          aria-checked={isAnnual}
          aria-labelledby="monthly annual"
          onClick={toggleAnnual}
        >
          <span
            className={styles.toggleThumb}
          />
        </button>

        <span
          id="annual"
          className={styles.toggleLabel}
        >
          Annual

          <span
            className={styles.saveBadge}
          >
            −20%
          </span>

        </span>

      </div>


      <div
        className={styles.currencyWrap}
        ref={dropdownRef}
      >

        <button
          className={styles.currencyBtn}
          onClick={() =>
            setDropdownOpen(
              !dropdownOpen
            )
          }
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          {CURRENCY_SYMBOLS[currency]}{" "}
          {currency}

          <Image
            src="/icons/chevron-down.svg"
            alt=""
            width={14}
            height={14}
            className={`${styles.currencyChevron} ${
              dropdownOpen
                ? styles.currencyChevronOpen
                : ""
            }`}
          />

        </button>

        {dropdownOpen && (

          <ul
            className={styles.dropdown}
            role="listbox"
          >

            {CURRENCIES.map((c) => (

              <li
                key={c}
                role="option"
                tabIndex={0}
                aria-selected={
                  c === currency
                }
                className={`${styles.dropdownItem} ${
                  c === currency
                    ? styles.dropdownItemActive
                    : ""
                }`}
                onClick={() =>
                  handleCurrency(c)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" ||
                    e.key === " "
                  ) {
                    e.preventDefault();
                    handleCurrency(c);
                  }
                }}
              >
                {CURRENCY_SYMBOLS[c]} {c}
              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}
export default function Pricing() {
  return (
    <PricingProvider>
      <section
        id="pricing"
        className={styles.section}
        aria-labelledby="pricing-heading"
      >
        <div className={styles.container}>


          <header className={styles.header}>

            <p className={styles.eyebrow}>
              Pricing
            </p>

            <h2
              id="pricing-heading"
              className={styles.heading}
            >
              Simple, Transparent Pricing
            </h2>

            <p className={styles.sub}>
              Flexible pricing designed for startups,
              growing teams, and enterprise businesses.
              Upgrade anytime as your business scales.
            </p>

          </header>


          <PricingControls />


          <div
            className={styles.grid}
            role="list"
          >

            {tiers.map((tier) => (

              <TierCard
                key={tier.key}
                tier={tier}
              />

            ))}

          </div>

        </div>
      </section>
    </PricingProvider>
  );
}