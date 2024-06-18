"use client";

import ChatDisplay from "@/components/chat/chat-display";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";
import Plug from "@/containers/plug/plug";
import { getDocument } from "@/lib/dbFunctions";
import { politicalParties } from "@/lib/utils";
import { PoliticalParty } from "@/types/PoliticalParty";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
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
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState<
    PoliticalParty | undefined
  >({ logoUrl: "", fullName: "", abbreviation: "" });

  const getPartyFromAbbreviation = (abbreviation: string) => {
    const partyToFind = politicalParties.find(
      (party) => party.abbreviation == abbreviation
    );
    return partyToFind;
  };

  const fetchDocument = async (party: string) => {
    try {
      const url = await getDocument(`${party}.pdf`);
      setDocumentUrl(url);
    } catch (error: any) {
      setDocumentUrl("");
    }
  };

  useEffect(() => {
    const party = searchParams.get("party");
    if (party != null) {
      fetchDocument(party);
      setIsSidebarVisible(false);
      setIsDocumentVisible(false);
      setSelectedParty(getPartyFromAbbreviation(party));
    } else {
      router.push("/");
    }
  }, [searchParams]);

  return (
    <div className="flex w-full flex-col items-center">
      <Header
        setIsSidebarVisible={setIsSidebarVisible}
        setIsDocumentVisible={setIsDocumentVisible}
        isDocumentVisible={isDocumentVisible}
        selectedParty={selectedParty}
        isSidebarVisible={isSidebarVisible}
      />
      {/* {isSidebarVisible ? <ChatSidebar /> : null}
       */}
      <ChatSidebar />
      <ChatDisplay
        documentUrl={documentUrl}
        isDocumentVisible={isDocumentVisible}
      />
    </div>
  );
};

const Header = ({
  setIsSidebarVisible,
  setIsDocumentVisible,
  isDocumentVisible,
  selectedParty,
  isSidebarVisible,
}: {
  setIsSidebarVisible: any;
  setIsDocumentVisible: any;
  isDocumentVisible: any;
  selectedParty: any;
  isSidebarVisible: any;
}) => {
  return (
    <div className="flex fixed top-0 z-50 left-0 right-0 pt-2 px-2">
      <Plug position="sm:flex fixed top-0 right-0 hidden" />

      <TooltipWrapper
        triggerContent={
          <Button
            className={`hidden flex-1 justify-center items-center text-white max-w-fit rounded-full mx-auto py-2 px-4 font-bold text-sm cursor-pointer  xl:flex ${
              isSidebarVisible ? "hidden" : "visible"
            }`}
            onClick={() => setIsDocumentVisible(!isDocumentVisible)}
          >
            <span className="mr-2 flex items-center">
              <PartyHeaderIcon fileName={selectedParty.logoUrl} />
              {selectedParty.abbreviation?.toUpperCase()} manifesto
            </span>
            <span>
              {isDocumentVisible ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </Button>
        }
        tooltipContent={
          <span>{!isDocumentVisible ? "View " : "Hide "} document</span>
        }
      />
      <Badge
        className={`flex flex-1 justify-center items-center max-w-fit rounded-full mx-auto py-2 px-4 font-bold cursor-pointer xl:hidden ${
          isSidebarVisible ? "hidden" : "visible"
        }`}
      >
        <PartyHeaderIcon fileName={selectedParty.logoUrl} />
        {selectedParty.abbreviation?.toUpperCase()} manifesto
      </Badge>
    </div>
  );
};

const PartyHeaderIcon = ({ fileName }: { fileName: string }) => {
  return (
    <Avatar className="mr-2 w-5 h-5 bg-gray-50">
      <AvatarImage src={`/party-icons/${fileName}`} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};

export default Page;
