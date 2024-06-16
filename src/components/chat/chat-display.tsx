import ChatComponent from "./chat-component";
import DocumentDisplay from "../document-display";

const ChatDisplay = ({
  documentUrl,
  isDocumentVisible,
}: {
  documentUrl: string;
  isDocumentVisible: boolean;
}) => {
  return (
    <div
      className={`p-1 md:p-8 md:pb-1 h-screen w-full overflow-y-hidden ${
        isDocumentVisible ? "xl:grid xl:grid-cols-2 xl:gap-16" : ""
      } flex flex-col`}
    >
      <DocumentDisplay
        documentUrl={documentUrl}
        isDocumentVisible={isDocumentVisible}
      />

      <ChatComponent />
    </div>
  );
};

export default ChatDisplay;
