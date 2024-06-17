import PoliticalPartySelector from "@/components/political-party-selector";

const HeaderSection = () => {
  return (
    <section className="flex flex-col max-w-4xl mb-auto fixed top-16 left-2 right-2 mx-auto">
      <span className="fixed left-0 right-0 text-center md:left-8 md:text-left top-4 font-medium text-xl md:text-2xl tracking-wide">
        HonourableMemberGPT 🤖
      </span>
      <PoliticalPartySelector />
    </section>
  );
};

export default HeaderSection;
