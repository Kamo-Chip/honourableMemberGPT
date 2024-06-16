import HeaderSection from "@/containers/landing-page/header-section";
import HeroSection from "@/containers/landing-page/hero-section";
import Plug from "@/containers/plug/plug";

export default function Home() {
  return (
    <div className="h-screen flex flex-col px-2 pt-5 items-center justify-center md:px-0 relative">
      <Plug position="fixed top-0 right-0" />
      <HeaderSection />
      <HeroSection />
    </div>
  );
}
