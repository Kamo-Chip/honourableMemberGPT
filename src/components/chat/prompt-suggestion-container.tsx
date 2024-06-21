"use client";

import { useSearchParams } from "next/navigation";
import {
    Dispatch,
    SetStateAction
} from "react";
import { PromptSuggestion } from "./prompt-suggestion";

type PromptSuggestionContainerProps = {
  setInput: Dispatch<SetStateAction<string>>;

  setHasClickedSuggestion: Dispatch<SetStateAction<boolean>>;
};

export const PromptSuggestionContainer = ({
  setInput,
  setHasClickedSuggestion,
}: PromptSuggestionContainerProps) => {
  const searchParams = useSearchParams();

  return (
    <div className="m-auto flex flex-col w-fit">
      <span className="text-base font-normal mb-4 flex flex-col text-center">
        Some questions to get the conversation going 💬
      </span>
      <div className="flex flex-wrap items-center justify-center sm:grid sm:grid-cols-2 gap-4 sm:grid-rows-2 w-full overflow-x-auto mb-2">
        {searchParams.get("chattingWith") != "gnu" ? (
          <>
            <PromptSuggestion
              setInput={setInput}
              setHasClickedSuggestion={setHasClickedSuggestion}
              title={"📈 Unemployment"}
              prompt={"How do they plan to solve youth unemployment?"}
              id={`prompt-1`}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"What are the goals of the party?"}
              id={`prompt-2`}
              title={"🥅  Goals"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"What is the plan to stop loadshedding?"}
              id={`prompt-3`}
              title={"⚡️ Loadshedding"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"Give me quick a summary of the document"}
              id={`prompt-4`}
              title={"🥱 TLDR"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
          </>
        ) : (
          <>
            <PromptSuggestion
              setInput={setInput}
              setHasClickedSuggestion={setHasClickedSuggestion}
              title={"🤝 Cooperation"}
              prompt={"How will parties work together?"}
              id={`prompt-1`}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"How will important decisions be made?"}
              id={`prompt-2`}
              title={"☝️  Decision making"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"What is the reason for the GNU existing?"}
              id={`prompt-3`}
              title={"🤔 Why GNU?"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
            <PromptSuggestion
              setInput={setInput}
              prompt={"What are the priorities of the GNU?"}
              id={`prompt-4`}
              title={"🥊 Priorities"}
              setHasClickedSuggestion={setHasClickedSuggestion}
            />
          </>
        )}
      </div>
    </div>
  );
};
