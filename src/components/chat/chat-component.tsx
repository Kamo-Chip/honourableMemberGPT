"use client";

import {
  saveChatHistory,
  updateChatHistory
} from "@/lib/dbFunctions";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useState
} from "react";
import MessageList from "../message-list";
import { ChatInput } from "./chat-input";
import { PromptSuggestionContainer } from "./prompt-suggestion-container";

type ChatComponentProps = {
  isChatLoading: boolean;
};

const ChatComponent = ({ isChatLoading }: ChatComponentProps) => {
  const searchParams = useSearchParams();
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
      politicalParty: searchParams.get("chattingWith"),
    },
  });
  const [hasClickedSuggestion, setHasClickedSuggestion] = useState(false);
  const [currChatSession, setCurrChatSession] = useState("");

  const handleChatHistorySaves = async () => {
    if (!currChatSession) {
      const sessionId = await saveChatHistory(messages);
      setCurrChatSession(sessionId);
    } else {
      updateChatHistory(currChatSession, messages);
    }
  };
  
  useEffect(() => {
    setMessages([]);
    setCurrChatSession("");
  }, [searchParams]);

  useEffect(() => {
    if (hasClickedSuggestion) {
      const submitBtn = document.querySelector(
        "#submit-btn"
      ) as HTMLButtonElement;
      submitBtn.click();
    }
  }, [hasClickedSuggestion]);

  useEffect(() => {
    if (messages.length && !isLoading) {
      handleChatHistorySaves();
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col w-full relative h-full">
      <div
        className={`flex flex-col w-full h-full pt-10 pr-2 pb-5 max-h-[calc(100vh-100px)] overflow-y-auto ${
          messages.length ? "visible" : "hidden"
        }`}
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {!messages.length && !isChatLoading ? (
        <PromptSuggestionContainer
          setHasClickedSuggestion={setHasClickedSuggestion}
          setInput={setInput}
        />
      ) : null}
      <form
        className="fixed bottom-0 left-2 right-2 w-[95%] mx-auto z-20"
        id="chat-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <ChatInput handleInputChange={handleInputChange} input={input} />
      </form>
    </div>
  );
};

export default ChatComponent;
