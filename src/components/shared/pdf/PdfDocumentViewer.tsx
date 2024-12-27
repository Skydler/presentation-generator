import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ContentPage, PdfDocument } from "./PdfDocument";
import { Button } from "../../ui/button";

type PdfDocumentViewerProps = { products: ContentPage[] };
export function PdfDocumentViewer({ products }: PdfDocumentViewerProps) {
  return (
    <>
      <PDFViewer style={{ height: "100%", width: "100%" }}>
        <PdfDocument products={products} />
      </PDFViewer>
      <PDFDownloadLink document={<PdfDocument products={products} />} fileName="pluralis.pdf">
        <Button>Download PDF</Button>
      </PDFDownloadLink>
    </>
  );
}
