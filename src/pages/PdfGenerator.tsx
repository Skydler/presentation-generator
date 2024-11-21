import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { defaultAttractions } from "@/mocks/attractions";
import { AttractionEditor } from "@/components/shared/AttractionsEditor";
import { DefaultPdfDocument } from "@/components/shared/DefaultPdfDocument";

export type Attraction = {
  title: string;
  description: string;
};

function PdfGenerator() {
  const [pageAttraction, setPageAttraction] = useState<Attraction>(
    defaultAttractions[0],
  );

  return (
    <VStack height="vh" justifyContent="center">
      <HStack gap={10}>
        <AttractionEditor updatePage={setPageAttraction} />
        <Separator orientation="vertical" />
        <VStack>
          <PDFViewer height={700} width={700}>
            <DefaultPdfDocument attraction={pageAttraction} />
          </PDFViewer>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default PdfGenerator;
