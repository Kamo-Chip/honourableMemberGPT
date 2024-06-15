"use client";

// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// import { useState } from "react";
// import { Document, Page } from "react-pdf";

export const PdfViewer = ({ documentUrl }: { documentUrl: string }) => {
  // const [numPages, setNumPages] = useState<number>();

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages);
  // }

  if (!documentUrl) return <span className="m-auto">No file to display</span>;

  return (
    <div className="max-w-full overflow-hidden rounded-lg shadow-sm border-solid border-[1px] h-full">
      {/* <Document file={documentUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page
              key={`${page}`}
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document> */}
      <iframe src={documentUrl} className="w-full h-full" />
    </div>
  );
};
