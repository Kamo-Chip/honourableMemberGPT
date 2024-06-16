"use client";

import Plug from "@/containers/plug/plug";
import { politicalParties } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../search-input";

const ChatSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 z-40 min-w-[75vw] md:min-w-[400px] bg-black h-screen pt-20 px-2 md:max-w-[300px] flex flex-col border-r-[1px] border-gray-200 shadow-sm`}
    >
      <div className="px-4 mb-8">
        <SearchInput />
      </div>
      <ul className="flex flex-col mt-4 overflow-y-auto text-white">
        {politicalParties.map((party, idx) => (
          <li
            className={`p-4 hover:bg-gray-400 cursor-pointer flex items-center rounded-3xl font-medium ${
              searchParams.get("party") === party.abbreviation
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

      <Plug position="absolute bottom-2 left-2" />
    </div>
  );
};

export default ChatSidebar;
