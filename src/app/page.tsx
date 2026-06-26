import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Trusted from "@/components/Trusted/Trusted";
import Features from "@/components/Features/Features";
import Pricing from "@/components/Pricing/Pricing";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Trusted />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
