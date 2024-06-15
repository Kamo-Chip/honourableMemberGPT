"use client";

import { usePoliticalPartyContext } from "@/context";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IoIosSend } from "react-icons/io";
import MessageList from "../message-list";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ChatComponent = () => {
  const { politicalPartyContext } = usePoliticalPartyContext();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    setMessages,
    isLoading,
  } = useChat({
    api: "api/chat",
    body: {
      politicalParty: politicalPartyContext.abbreviation,
    },
  });
  const searchParams = useSearchParams();
  const [hasClickedSuggestion, setHasClickedSuggestion] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [searchParams]);

  useEffect(() => {
    if (hasClickedSuggestion) {
      const submitBtn = document.querySelector(
        "#submit-btn"
      ) as HTMLButtonElement;
      submitBtn.click();
    }
  }, [hasClickedSuggestion]);

  return (
    <div className="flex flex-col w-full relative h-full">
      <div
        className={`flex flex-col w-full h-full overflow-y-auto py-10 ${
          messages.length ? "visible" : "hidden"
        }`}
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {!messages.length ? (
        <PromptSuggestionContainer
          setHasClickedSuggestion={setHasClickedSuggestion}
          setInput={setInput}
        />
      ) : null}
      <form
        className="absolute bottom-1 w-[97%]"
        id="chat-form"
        onSubmit={handleSubmit}
      >
        <ChatInput handleInputChange={handleInputChange} input={input} />
      </form>
    </div>
  );
};

type PromptSuggestionProps = {
  setInput: Dispatch<SetStateAction<string>>;
  prompt: string;
  id: string;
  title: string;
  setHasClickedSuggestion: Dispatch<SetStateAction<boolean>>;
};
const PromptSuggestion = ({
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

type PromptSuggestionContainerProps = {
  setInput: Dispatch<SetStateAction<string>>;

  setHasClickedSuggestion: Dispatch<SetStateAction<boolean>>;
};

const PromptSuggestionContainer = ({
  setInput,
  setHasClickedSuggestion,
}: PromptSuggestionContainerProps) => {
  return (
    <div className="m-auto flex flex-col w-fit">
      <span className="text-base font-normal mb-4 flex flex-col text-center">
        Some questions to get the conversation going 💬
      </span>
      <div className="flex flex-wrap items-center justify-center sm:grid sm:grid-cols-2 gap-4 sm:grid-rows-2 w-full overflow-x-auto mb-2">
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
          id={`prompt-3`}
          title={"🥱 TLDR"}
          setHasClickedSuggestion={setHasClickedSuggestion}
        />
      </div>
    </div>
  );
};

type ChatInputProps = {
  handleInputChange: ChangeEventHandler;
  input: string;
};
const ChatInput = ({ handleInputChange, input }: ChatInputProps) => {
  return (
    <div className="flex flex-col relative max-w-[900px] mx-auto">
      <div
        className={`flex items-center bg-white border-solid border-gray-200 border-[1px] shadow-sm rounded-full py-1 px-2`}
      >
        <Textarea
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full resize-none min-h-0 h-[40px] max-h-[80px] leading-normal"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
          placeholder="Ask a question about the manifesto..."
        />
        <Button
          type="submit"
          id="submit-btn"
          onClick={() => console.log(input)}
          className="rounded-full w-[50px] h-[35px]"
        >
          <IoIosSend size="24px" color="#fff" />
        </Button>
      </div>
      <span className="text-sm text-gray-500 font-medium mt-2 text-center">
        HonourableMemberGPT can make mistakes. Check important info.
      </span>
    </div>
  );
};

export default ChatComponent;
