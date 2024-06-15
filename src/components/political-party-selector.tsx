"use client";

import { usePoliticalPartyContext } from "@/context";
import { politicalParties } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import { PoliticalParty } from "@/types/PoliticalParty";

const partyColours = {
  anc: "yellow",
};
const PoliticalPartySelector = () => {
  const { politicalPartyContext, setPoliticalPartyContext } =
    usePoliticalPartyContext();
  const router = useRouter();

  const handlePartyClick = (party: PoliticalParty) => {
    setPoliticalPartyContext(party);
    router.push(`/party-chat?party=${party.abbreviation}`);
  };
  // When user hits landing page clear context
  useEffect(() => {
    setPoliticalPartyContext("");
  }, []);

  return (
    <div className="flex flex-col">
      <SearchInput />
      <div className="flex mt-6 justify-evenly w-full overflow-x-auto pb-2">
        {politicalParties.map((party, idx) => (
          <Button
            className={`mx-2 rounded-3xl h-fit ${
              politicalPartyContext.fullName === party.fullName
                ? "selectedBtn"
                : ""
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
