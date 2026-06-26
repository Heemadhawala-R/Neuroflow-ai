"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export type Currency = "USD" | "INR" | "EUR";

interface PricingState {
  isAnnual: boolean;
  currency: Currency;
  toggleAnnual: () => void;
  setCurrency: (c: Currency) => void;
}

const PricingContext = createContext<PricingState | null>(null);

export function PricingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrencyState] =
    useState<Currency>("USD");

  const toggleAnnual = useCallback(() => {
    setIsAnnual((prev) => !prev);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
  }, []);

  const value = useMemo(
    () => ({
      isAnnual,
      currency,
      toggleAnnual,
      setCurrency,
    }),
    [isAnnual, currency, toggleAnnual, setCurrency]
  );

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricingStore(): PricingState {
  const ctx = useContext(PricingContext);

  if (!ctx) {
    throw new Error(
      "usePricingStore must be used inside <PricingProvider>"
    );
  }

  return ctx;
}