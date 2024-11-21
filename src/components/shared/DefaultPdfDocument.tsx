import { Attraction } from "@/App";
import { Document, Page, Text, View } from "@react-pdf/renderer";

type DefaultPdfDocumentProps = { attraction: Attraction };
export function DefaultPdfDocument({ attraction }: DefaultPdfDocumentProps) {
  return (
    <Document>
      <Page orientation="landscape">
        <View>
          <Text>{attraction.name}</Text>
          <Text>{attraction.description}</Text>
          <Text>{attraction.location}</Text>
        </View>
      </Page>
    </Document>
  );
}
