import { Message } from "ai";

export const ChatMessage = ({
  message,
  isLast,
}: {
  message: Message;
  isLast: boolean;
}) => {
  return (
    <div
      className={`max-w-[75%] w-fit flex py-2 px-4 rounded-xl my-4 border-gray-200 border-[1px] shadow-sm ${
        isLast ? "mb-10" : ""
      } ${
        message.role === "assistant"
          ? "bg-gray-200 mr-auto"
          : "bg-blue-300 ml-auto"
      }`}
    >
      <pre className="whitespace-pre-wrap leading-normal">{message.content}</pre>
    </div>
  );
};
