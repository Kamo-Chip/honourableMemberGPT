"use client";

import StandardLoading from "@/containers/loading/standard-loading";
import InfiniteHorizontalScrollSlide from "@/containers/sliders/infinite-slider";
import { politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./search-input";
import { Button } from "./ui/button";

type PartyColoursType = {
  [key: string]: string;
};

const partyColours: PartyColoursType = {
  anc: "bg-[#e2b500]",
  da: "bg-[#155FA2]",
  eff: "bg-[#cf2e2e]",
  mk: "bg-[#56AA48]",
  ifp: "bg-[#000]",
};
const PoliticalPartySelector = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handlePartyClick = (party: PoliticalParty) => {
    setIsLoading(true);
    router.push(`/party-chat?chattingWith=${party.abbreviation}`);
  };

  const generateSlides = () => {
    const slides = politicalParties.map((party, idx) => (
      <Button
        className={`mx-2 rounded-3xl h-fit ${partyColours[party.abbreviation]} max-w-full max-sm:px-0`}
        onClick={() => handlePartyClick(party)}
        key={`${party}${idx}`}
      >
        <span className="w-10 mx-4 text-ellipsis overflow-hidden whitespace-nowrap ">
          {party.abbreviation.toUpperCase()}
        </span>
      </Button>
    ));

    return slides;
  };

  if (isLoading) return <StandardLoading />;

  return (
    <div className="flex flex-col">
      <SearchInput />
      <div className="mt-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <InfiniteHorizontalScrollSlide slides={generateSlides()} />
      </div>
    </div>
  );
};

export default PoliticalPartySelector;
