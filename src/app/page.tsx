import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import {
  CtaBanner,
  Features,
  Faq,
  Hero,
  HowItWorks,
  SocialProof,
} from "@/components/Landing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <CtaBanner />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
