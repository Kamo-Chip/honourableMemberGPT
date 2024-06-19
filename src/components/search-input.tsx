"use client";

import { politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

type SearchInputProps = {
  closeSidebar?: () => void;
};

const SearchInput = ({ closeSidebar }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [partiesToDisplay, setPartiesToDisplay] = useState<PoliticalParty[]>(
    []
  );

  const filterPoliticalParties = (partyToSearch: string) => {
    setPartiesToDisplay(
      politicalParties.filter(
        (party) =>
          party.fullName.toLowerCase().includes(partyToSearch) ||
          party.abbreviation.toLowerCase().includes(partyToSearch)
      )
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setIsFocused(value !== "");
    setUserInput(value);

    if (value) {
      filterPoliticalParties(value);
    }
  };

  useEffect(() => {
    setPartiesToDisplay(politicalParties);
  }, []);

  return (
    <div className="flex flex-col relative z-10 text-black">
      <div
        className={`flex items-center bg-white border-solid border-gray-200 border-[1px] rounded-full ${
          isFocused ? "rounded-b-none rounded-t-3xl" : ""
        } py-1 px-2`}
      >
        <MdSearch size="24px" color="gray" />
        <Input
          placeholder="Search political party..."
          className={`border-none focus-visible:ring-0 focus-visible:ring-offset-0 `}
          onChange={handleChange}
          value={userInput}
        />
      </div>
      {isFocused ? (
        <PartyListContainer
          partiesToDisplay={partiesToDisplay}
          hideContainer={() => setIsFocused(false)}
          closeSidebar={closeSidebar}
        />
      ) : null}
    </div>
  );
};

type PartyListContainerProps = {
  partiesToDisplay: PoliticalParty[];
  hideContainer: any;
  closeSidebar?: () => void;
};

const PartyListContainer = ({
  partiesToDisplay,
  hideContainer,
  closeSidebar,
}: PartyListContainerProps) => {
  return (
    <ul className="bg-white border-solid border-gray-200 border-[1px] border-t-0 shadow-sm rounded-b-3xl absolute left-0 right-0 top-[50px]">
      {partiesToDisplay.length ? (
        partiesToDisplay.map((party, idx) => (
          <PartyListItem
            key={`search-input-${party}${idx}`}
            party={party}
            idx={idx}
            hideContainer={hideContainer}
            closeSidebar={closeSidebar}
          />
        ))
      ) : (
        <span
          className={`p-4 hover:bg-blue-100 cursor-pointer flex items-center rounded-b-3xl mx-auto w-fit
    `}
        >
          There is no political party matching your search
        </span>
      )}
    </ul>
  );
};

type PartyListItemProps = {
  party: PoliticalParty;
  idx: number;
  hideContainer: any;
  closeSidebar?: () => void;
};

const PartyListItem = ({
  party,
  idx,
  hideContainer,
  closeSidebar,
}: PartyListItemProps) => {
  const router = useRouter();

  return (
    <li
      className={`p-4 hover:bg-blue-100 cursor-pointer flex items-center ${
        idx == politicalParties.length - 1 ? "rounded-b-3xl" : ""
      }`}
      onClick={() => {
        hideContainer();
        if (closeSidebar) {
          closeSidebar();
        }

        router.push(`/party-chat?chattingWith=${party.abbreviation}`);
      }}
    >
      <Avatar>
        <AvatarImage src={`/party-icons/${party.logoUrl}`} />
        <AvatarFallback>🇿🇦</AvatarFallback>
      </Avatar>
      <span className="ml-4">{party.fullName}</span>
      <span className="ml-1 uppercase text-gray-500 text-sm font-medium">{`(${party.abbreviation})`}</span>
    </li>
  );
};
export default SearchInput;
