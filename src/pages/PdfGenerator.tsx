import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AttractionEditor } from "@/components/shared/AttractionsEditor";
import {
  ContentPage,
  PdfDocumentViewer,
} from "@/components/shared/PdfDocumentViewer";
import { PageController } from "@/components/shared/PageController";

export type Attraction = {
  title: string;
  description: string;
};

const emptyProduct: ContentPage = {
  attraction: {
    title: "",
    description: "",
  },
};

function PdfGenerator() {
  const [products, setProducts] = useState<ContentPage[]>([emptyProduct]);
  const [currentProd, setCurrentProd] = useState(1);

  return (
    <VStack height="vh" justifyContent="center">
      <HStack gap={10}>
        <PageController
          pages={products}
          currentProdIndex={currentProd}
          setCurrentProd={setCurrentProd}
          handleRemovePage={() => {
            setProducts((current) => {
              const newProducts = [...current];
              newProducts.splice(currentProd, 1);
              return newProducts;
            });
            setCurrentProd((current) => current - 1);
          }}
          handleNewPage={() => {
            setProducts((current) => [...current, emptyProduct]);
            setCurrentProd((current) => current + 1);
          }}
        >
          <AttractionEditor
            updatePage={(data: Attraction) => {
              setProducts((current) => {
                const newProducts = [...current];
                newProducts[currentProd - 1] = { attraction: data };
                return newProducts;
              });
            }}
          />
        </PageController>
        <Separator orientation="vertical" />
        <PdfDocumentViewer pages={products} currentProdIndex={currentProd} />
      </HStack>
    </VStack>
  );
}

export default PdfGenerator;
