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
      className={`sticky z-10 pt-10 h-[calc(100vh-78px)] ${
        isDocumentVisible ? "visible" : "hidden"
      }`}
    >
      <PdfViewer documentUrl={documentUrl} />
    </div>
  );
};

export default DocumentDisplay;
