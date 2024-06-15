import PoliticalPartySelector from "@/components/political-party-selector";

const HeaderSection = () => {
  return (
    <section className="flex flex-col max-w-4xl mb-auto fixed top-5 left-2 right-2 mx-auto">
      <PoliticalPartySelector />
    </section>
  );
};

export default HeaderSection;
