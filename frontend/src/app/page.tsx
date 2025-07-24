import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import GettingStarted from "@/components/sections/GettingStarted";
import { Hero } from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import { NavBar } from "@/components/sections/NavBar";
import Stats from "@/components/sections/Stats";
import TechnologyStack from "@/components/sections/TechnologyStack";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Welcome to Aquasen",
  description: "",
};

export default function Landing() {
  <title>Page Title</title>;
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #10b981 0%, transparent 50%)`,
            backgroundSize: "400px 400px, 600px 600px, 800px 800px",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Technology Stack Section */}
        <TechnologyStack />

        {/* Pricing Section */}
        <Pricing />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Getting Started Section */}
        <GettingStarted />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
