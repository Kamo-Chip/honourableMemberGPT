import PoliticalPartySelector from "@/components/political-party-selector";
import Logo from "../logo/logo";

const HeaderSection = () => {
  return (
    <section className="flex flex-col max-w-4xl mb-auto fixed top-16 left-2 right-2 mx-auto">
      <Logo className="fixed left-0 right-0 text-center md:left-8 md:text-left top-4 text-xl md:text-2xl tracking-wide" />
      <PoliticalPartySelector />
    </section>
  );
};

export default HeaderSection;
