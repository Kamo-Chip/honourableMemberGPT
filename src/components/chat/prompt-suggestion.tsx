"use client" 

import {
    Dispatch,
    SetStateAction
} from "react";
import { Button } from "../ui/button";

type PromptSuggestionProps = {
  setInput: Dispatch<SetStateAction<string>>;
  prompt: string;
  id: string;
  title: string;
  setHasClickedSuggestion: Dispatch<SetStateAction<boolean>>;
};
export const PromptSuggestion = ({
  setInput,
  prompt,
  title,
  id,
  setHasClickedSuggestion,
}: PromptSuggestionProps) => {
  return (
    <Button
      className="w-48 sm:w-64 rounded-2xl cursor-pointer whitespace-normal bg-black border-[1px] border-gray-200 flex flex-col h-[120px] sm:h-[110px] "
      id={id}
      onClick={() => {
        setInput(prompt);
        setHasClickedSuggestion(true);
      }}
    >
      <span className="mr-auto my-2 font-medium text-base">{title}</span>
      <span className="mb-auto font-normal text-left">{prompt}</span>
    </Button>
  );
};
