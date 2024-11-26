import { ReactElement, useEffect } from "react";
import { DocumentProps, usePDF } from "@react-pdf/renderer";
// PDF visualizer initialization
import { Page, Document as ViewerDocument } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Container } from "@chakra-ui/react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfDocumentViewerProps = {
  pageNumber?: number;
  children: ReactElement<DocumentProps>;
};
export function PdfDocumentViewer({
  pageNumber,
  children,
}: PdfDocumentViewerProps) {
  const [instance, update] = usePDF({ document: children });

  useEffect(() => {
    update(children);
  }, [children, update]);

  return (
    <Container maxH="2xl" overflowY="scroll" p={0}>
      <ViewerDocument file={instance.url}>
        <Page pageNumber={pageNumber || 1} />
      </ViewerDocument>
    </Container>
  );
}
