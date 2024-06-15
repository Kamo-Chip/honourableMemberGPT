import HeaderSection from "@/containers/landing-page/header-section";
import HeroSection from "@/containers/landing-page/hero-section";

export default function Home() {
  return (
    <div className="h-screen flex flex-col px-2 pt-5 items-center justify-center md:px-0 relative">
      <HeaderSection />
      <HeroSection />
    </div>
  );
}
