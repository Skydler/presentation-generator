import { Attraction } from "@/pages/PdfGenerator";
import { Document, Page, Text, View } from "@react-pdf/renderer";

type DefaultPdfDocumentProps = { attraction: Attraction };
export function DefaultPdfDocument({ attraction }: DefaultPdfDocumentProps) {
  return (
    <Document>
      <Page orientation="landscape">
        <View>
          <Text>{attraction.title}</Text>
          <Text>{attraction.description}</Text>
        </View>
      </Page>
    </Document>
  );
}
