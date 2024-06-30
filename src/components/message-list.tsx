import { ChatMessage } from "./chat/chat-message";
import { Message } from "ai";
import { MessageSkeleton } from "./message-skeleton";
import { useEffect, useRef } from "react";
const MessageList = ({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-col">
      {messages.map((message, idx) => (
        <div key={message.id}>
          <div ref={scrollRef}>
            <ChatMessage
              message={message}
              isLast={idx == messages.length - 1}
            />
          </div>

          {isLoading &&
          messages[messages.length - 1].role === "user" &&
          idx == messages.length - 1 ? (
            <MessageSkeleton />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
