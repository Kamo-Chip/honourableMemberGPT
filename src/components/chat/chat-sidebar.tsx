"use client";

import Logo from "@/containers/logo/logo";
import Plug from "@/containers/plug/plug";
import { politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../search-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TooltipWrapper from "../wrappers/tooltip-wrapper";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState } from "react";

const ChatSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-white self-start fixed cursor-pointer rounded-full z-[100] top-2 left-2">
          <HiMenuAlt4 size="24px" color="#fff" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[80vw] max-w-[500px] z-[101] text-white bg-black h-screen pt-20 px-2 flex flex-col shadow-sm border-r-2 border-black"
      >
        <Logo
          className={
            "text-white absolute top-10 left-0 right-0 text-center text-sm"
          }
        />
        <div className="mb-8 mt-4">
          
          <SearchInput closeSidebar={setOpen}/>
          <SheetClose>
            <SidebarListContainer />
          </SheetClose>
        </div>
        <Plug position="absolute bottom-2 left-2 text-black" />
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
        searchParams.get("party") === party.abbreviation ? "selectedBtn" : ""
      }`}
      onClick={() => router.push(`/party-chat?party=${party.abbreviation}`)}
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
  const gnu = politicalParties.find((party) => party.abbreviation === "gnu");

  return (
    <ul className="flex flex-col mt-4 overflow-y-auto text-white">
      {gnu && <SidebarListItem party={gnu} />}

      {politicalParties
        .filter((party) => party.abbreviation != "gnu")
        .map((party, idx) => (
          <SidebarListItem party={party} key={`chat-sidebar${party}${idx}`} />
        ))}
    </ul>
  );
};
export default ChatSidebar;
