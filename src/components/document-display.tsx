import { PdfViewer } from "./pdf-viewer";

const DocumentDisplay = ({
  documentUrl,
  isDocumentVisible,
}: {
  documentUrl: string;
  isDocumentVisible: boolean;
}) => {

  return (
    <div
      className={`flex flex-col z-10 ${
        isDocumentVisible ? "visible" : "hidden"
      }`}
    >
      <PdfViewer documentUrl={documentUrl} />
    </div>
  );
};

export default DocumentDisplay;
