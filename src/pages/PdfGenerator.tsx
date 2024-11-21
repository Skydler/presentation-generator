import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { defaultAttractions } from "@/mocks/attractions";
import { AttractionEditor } from "@/components/shared/AttractionsEditor";
import { DefaultPdfDocument } from "@/components/shared/DefaultPdfDocument";

type City = {
  name: string;
  description: string;
  location: string;
};

type Restaurant = {
  name: string;
  description: string;
  location: string;
};

export type Attraction = City | Restaurant;

function PdfGenerator() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction>(
    defaultAttractions[0],
  );

  return (
    <VStack height="vh" justifyContent="center">
      <HStack gap={10}>
        <AttractionEditor setAttraction={setSelectedAttraction} />
        <Separator orientation="vertical" />
        <VStack>
          <PDFViewer height={700} width={800}>
            <DefaultPdfDocument attraction={selectedAttraction} />
          </PDFViewer>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default PdfGenerator;
