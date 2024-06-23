"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/containers/logo/logo";
import Plug from "@/containers/plug/plug";
import { gnuDetails, politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import SearchInput from "../search-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ShareComponent from "@/containers/share/share";
import { title } from "process";

const ChatSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-white self-start fixed cursor-pointer rounded-full z-[100] top-2 left-2">
          <HiMenuAlt4 size="24px" color="#fff" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-[80vw] max-w-[500px] z-[101] text-white bg-black h-screen pt-20 px-2 flex flex-col shadow-sm border-r-2 border-black"
        side={"left"}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Logo
          className={
            "text-white absolute top-10 left-0 right-0 text-center text-sm"
          }
        />
        <div className="mb-8 mt-4">
          <SearchInput closeSidebar={() => setOpen(false)} />
          <SheetClose>
            <SidebarListContainer />
          </SheetClose>
        </div>
        <Plug position="absolute bottom-2 left-2 text-black" />
        <div className="absolute bottom-2 right-2 ">
          <ShareComponent shareData={{ title: "", text: "", url: "" }} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SidebarListItem = ({ party }: { party: PoliticalParty }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <li
      className={`p-4 hover:bg-gray-400 cursor-pointer flex items-center rounded-3xl font-medium ${
        searchParams.get("chattingWith") === party.abbreviation
          ? "selectedBtn"
          : ""
      }`}
      onClick={() =>
        router.push(`/party-chat?chattingWith=${party.abbreviation}`)
      }
    >
      <Avatar className="bg-gray-50 mr-4 w-[30px] h-[30px] rounded-full">
        <AvatarImage src={`/party-icons/${party.logoUrl}`} className="" />
        <AvatarFallback>🇿🇦</AvatarFallback>
      </Avatar>
      <span className="whitespace-nowrap">{party.fullName}</span>
    </li>
  );
};

const SidebarListContainer = () => {
  return (
    <ul className="flex flex-col mt-8 overflow-y-auto text-white">
      <span className="text-left pl-4 font-medium text-sm text-neutral-300">
        GNU
      </span>
      <SidebarListItem party={gnuDetails} />

      <span className="text-left pl-4 font-medium text-sm text-neutral-300 mt-6">
        Parties
      </span>
      {politicalParties.map((party, idx) => (
        <SidebarListItem party={party} key={`chat-sidebar${party}${idx}`} />
      ))}
    </ul>
  );
};
export default ChatSidebar;
