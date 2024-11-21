import { Attraction } from "@/pages/PdfGenerator";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";

type PdfDocumentViewerProps = { attraction: Attraction };
export function PdfDocumentViewer({ attraction }: PdfDocumentViewerProps) {
  return (
    <PDFViewer height={700} width={700}>
      <Document>
        <Page orientation="landscape">
          <View>
            <Text>{attraction.title}</Text>
            <Text>{attraction.description}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
