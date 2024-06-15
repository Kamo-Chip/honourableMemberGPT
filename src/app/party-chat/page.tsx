"use client";

import ChatDisplay from "@/components/chat/chat-display";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";
import { usePoliticalPartyContext } from "@/context";
import { getDocument } from "@/lib/dbFunctions";
import { politicalParties } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
const Page = () => {
  const { politicalPartyContext, setPoliticalPartyContext } =
    usePoliticalPartyContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);

  const getPartyFromAbbreviation = (abbreviation: string) => {
    const partyToFind = politicalParties.find(
      (party) => party.abbreviation == abbreviation
    );
    return partyToFind;
  };

  const fetchDocument = async (party: string) => {
    try {
      const url = await getDocument(`${party}-2024.pdf`);
      setDocumentUrl(url);
    } catch (error: any) {
      setDocumentUrl("");
    }
  };

  useEffect(() => {
    const party = searchParams.get("party");
    if (party != null) {
      setPoliticalPartyContext(getPartyFromAbbreviation(party));
      fetchDocument(party);
      setIsSidebarVisible(false);
      setIsDocumentVisible(false);
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
        politicalPartyContext={politicalPartyContext}
        isSidebarVisible={isSidebarVisible}
      />
      {isSidebarVisible ? <ChatSidebar /> : null}
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
  politicalPartyContext,
  isSidebarVisible,
}: {
  setIsSidebarVisible: any;
  setIsDocumentVisible: any;
  isDocumentVisible: any;
  politicalPartyContext: any;
  isSidebarVisible: any;
}) => {
  return (
    <div className="flex absolute top-0 z-50 left-0 right-0 pt-2 px-2">
      <TooltipWrapper
        triggerContent={
          <Button
            className="text-white self-start fixed cursor-pointer rounded-full "
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <HiMenuAlt2 size="24px" color="#fff" />
          </Button>
        }
        tooltipContent={
          <span>{isSidebarVisible ? "Open " : "Close "} sidebar</span>
        }
      />

      <TooltipWrapper
        triggerContent={
          <Button
            className={`flex flex-1 justify-center items-center text-white max-w-fit rounded-full mx-auto py-2 px-4 font-bold text-sm cursor-pointer ${
              isSidebarVisible ? "hidden" : "visible"
            }`}
            onClick={() => setIsDocumentVisible(!isDocumentVisible)}
          >
            <span className="mr-2">
              {politicalPartyContext.abbreviation?.toUpperCase()} manifesto
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
    </div>
  );
};

export default Page;
