import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#114C5A",
};

export const metadata: Metadata = {
  title: "NeuroFlow AI — Intelligent Data Automation Platform",
  description:
    "NeuroFlow AI automates your data workflows with neural precision. Connect, process, and act on data at scale — without writing a single pipeline.",
  keywords: [
    "AI automation",
    "data pipeline",
    "workflow automation",
    "machine learning platform",
    "data integration",
    "NeuroFlow AI",
  ],
  authors: [{ name: "NeuroFlow AI" }],
  creator: "NeuroFlow AI",
  publisher: "NeuroFlow AI",
  alternates: {
    canonical: "https://neuroflow-ai-one.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuroflow-ai-one.vercel.app/",
    siteName: "NeuroFlow AI",
    title: "NeuroFlow AI — Intelligent Data Automation Platform",
    description:
      "Automate your data workflows with neural precision. Connect, process, and act on data at scale.",
    images: [
      {
        url: "https://neuroflow.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeuroFlow AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroFlow AI — Intelligent Data Automation Platform",
    description: "Automate your data workflows with neural precision.",
    images: ["https://neuroflow.ai/og-image.png"],
    creator: "@neuroflowai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NeuroFlow AI",
  url: "https://neuroflow-ai-one.vercel.app/",
  description:
    "Intelligent data automation platform. Connect, process, and act on data at scale without writing a single pipeline.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "29",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "29",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Professional",
      price: "89",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "89",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      price: "249",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "249",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
