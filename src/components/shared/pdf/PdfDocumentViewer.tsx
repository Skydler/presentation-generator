import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ContentPage, PdfDocument } from "./PdfDocument";
import { VStack } from "@chakra-ui/react";
import { Button } from "../../ui/button";

type PdfDocumentViewerProps = { products: ContentPage[] };
export function PdfDocumentViewer({ products }: PdfDocumentViewerProps) {
  return (
    <VStack height="100%">
      <PDFViewer height="100%" width={700}>
        <PdfDocument products={products} />
      </PDFViewer>
      <PDFDownloadLink document={<PdfDocument products={products} />} fileName="pluralis.pdf">
        <Button>Download PDF</Button>
      </PDFDownloadLink>
    </VStack>
  );
}
