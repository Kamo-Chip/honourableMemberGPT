import { Message } from "ai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatMessage = ({
  message,
  isLast,
}: {
  message: Message;
  isLast: boolean;
}) => {
  return (
    <div
      className={`max-w-[75%] w-fit flex py-2 px-4 rounded-xl my-4 border-[1px] shadow-sm ${
        isLast ? "mb-10" : ""
      } ${
        message.role === "assistant"
          ? "bg-green-100 mr-auto border-green-200"
          : "bg-blue-100 ml-auto border-blue-200"
      }`}
    >
      {/* <pre className="whitespace-pre-wrap leading-normal"> */}
      <Markdown
        className={`leading-normal chatMessage`}
        remarkPlugins={[remarkGfm]}
      >
        {message.content}
      </Markdown>
      {/* </pre> */}
    </div>
  );
};
