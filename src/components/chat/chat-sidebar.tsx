"use client";

import { politicalParties } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdIosShare } from "react-icons/md";
import SearchInput from "../search-input";
import { usePoliticalPartyContext } from "@/context";

const ChatSidebar = () => {
  const router = useRouter();
  const { politicalPartyContext } = usePoliticalPartyContext();

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 z-40 min-w-[75vw] md:min-w-[400px] bg-black h-screen pt-20 px-2 md:max-w-[300px] flex flex-col border-r-[1px] border-gray-200 shadow-sm`}
    >
      <div className="px-4">
        <SearchInput />
      </div>
      <ul className="flex flex-col mt-4 overflow-y-auto text-white">
        {politicalParties.map((party, idx) => (
          <li
            className={`p-4 hover:bg-gray-400 cursor-pointer flex items-center rounded-3xl font-medium ${
              politicalPartyContext.fullName === party.fullName
                ? "selectedBtn"
                : ""
            }`}
            key={`chat-sidebar${party}${idx}`}
            onClick={() =>
              router.push(`/party-chat?party=${party.abbreviation}`)
            }
          >
            {party.fullName}
          </li>
        ))}
      </ul>
      <div className="flex items-center absolute left-2 bottom-0 text-white font-medium cursor-pointer">
        <MdIosShare size="24px" />
        <div className="text-sm flex flex-col my-2 ml-4">
          <span>Like the site?</span>
          <span>Share with friends</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
