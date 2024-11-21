import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { defaultAttractions } from "@/mocks/attractions";
import { AttractionEditor } from "@/components/shared/AttractionsEditor";
import { PdfDocumentViewer } from "@/components/shared/PdfDocumentViewer";

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
        <PdfDocumentViewer attraction={pageAttraction} />
      </HStack>
    </VStack>
  );
}

export default PdfGenerator;
