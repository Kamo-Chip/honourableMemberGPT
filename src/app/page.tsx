import HeaderSection from "@/components/containers/landing-page/header-section";
import HeroSection from "@/components/containers/landing-page/hero-section";
import Plug from "@/components/containers/plug/plug";

export default function Home() {
  return (
    <div className="h-screen flex flex-col px-2 pt-5 items-center justify-center md:px-0 relative">
      <Plug position="fixed bottom-0 left-0" />
      <HeaderSection />
      <HeroSection />
    </div>
  );
}
