import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AttractionEditor } from "@/components/shared/AttractionsEditor";
import {
  ContentPage,
  PdfDocumentViewer,
} from "@/components/shared/PdfDocumentViewer";

export type Attraction = {
  title: string;
  description: string;
};

function PdfGenerator() {
  const [pdfPages, setPdfPages] = useState<ContentPage[]>([]);

  return (
    <VStack height="vh" justifyContent="center">
      <HStack gap={10}>
        <AttractionEditor
          updatePage={(data: Attraction) => {
            setPdfPages((current) => [...current, { id: 3, attraction: data }]);
          }}
        />
        <Separator orientation="vertical" />
        <PdfDocumentViewer pages={pdfPages} />
      </HStack>
    </VStack>
  );
}

export default PdfGenerator;
