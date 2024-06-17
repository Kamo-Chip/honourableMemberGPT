"use client";

import { politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { useRouter } from "next/navigation";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import { useState } from "react";
import StandardLoading from "@/containers/loading/standard-loading";

type PartyColoursType = {
  [key: string]: string;
};

const partyColours: PartyColoursType = {
  anc: "bg-[#e2b500]",
  da: "bg-[#155FA2]",
  eff: "bg-[#cf2e2e]",
  "m.k.": "bg-[#56AA48]",
  ifp: "bg-[#000]",
};
const PoliticalPartySelector = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handlePartyClick = (party: PoliticalParty) => {
    setIsLoading(true);
    router.push(`/party-chat?party=${party.abbreviation}`);
  };

  if (isLoading) return <StandardLoading />;

  return (
    <div className="flex flex-col">
      <SearchInput />
      <div className="flex mt-6 justify-evenly w-full overflow-x-auto pb-2">
        {politicalParties
          .filter((party) => party.abbreviation != "gnu")
          .map((party, idx) => (
            <Button
              className={`mx-2 rounded-3xl h-fit ${
                partyColours[party.abbreviation]
              }`}
              onClick={() => handlePartyClick(party)}
              key={`${party}${idx}`}
            >
              <span className="w-10 mx-4 text-ellipsis overflow-hidden whitespace-nowrap">
                {party.abbreviation.toUpperCase()}
              </span>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PoliticalPartySelector;
