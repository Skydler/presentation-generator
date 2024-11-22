import { Attraction } from "@/pages/PdfGenerator";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";

export type ContentPage = {
  id: number;
  attraction: Attraction;
};

type PdfDocumentViewerProps = { pages: ContentPage[] };
export function PdfDocumentViewer({ pages }: PdfDocumentViewerProps) {
  return (
    <PDFViewer height={700} width={700}>
      <Document title="Pluralis PDF">
        {pages.map((page) => (
          <Page
            key={page.id}
            id={String(page.id)}
            orientation="landscape"
            wrap={false}
          >
            <View>
              <Text>{page.attraction.title}</Text>
              <Text>{page.attraction.description}</Text>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}
