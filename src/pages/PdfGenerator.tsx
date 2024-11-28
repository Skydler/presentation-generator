import { HStack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AttractionEditor } from "../components/shared/AttractionsEditor";
import {
  ContentPage,
  PdfDocumentViewer,
} from "../components/shared/PdfDocumentViewer";
import { PageController } from "../components/shared/PageController";
import { PluralisFileBrowser } from "../components/shared/fileBrowser/PluralisFileBrowser";
import { Toaster } from "../components/ui/toaster";
import { FormProvider, useForm } from "react-hook-form";

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
  const methods = useForm<Attraction>();
  const [products, setProducts] = useState<ContentPage[]>([emptyProduct]);
  const [currentProd, setCurrentProd] = useState(1);
  const currentProdIndex = currentProd - 1;
  if (currentProdIndex < 0) {
    throw new Error("Invalid current product index");
  }

  return (
    <FormProvider {...methods}>
      <VStack height="vh" justifyContent="center" gap={10}>
        <PluralisFileBrowser />
        <HStack gap={10}>
          <PageController
            pages={products}
            currentProdIndex={currentProd}
            setCurrentProd={setCurrentProd}
            handleRemovePage={() => {
              if (products.length > 1) {
                const newProducts = products.filter(
                  (_, index) => index !== currentProdIndex,
                );
                setProducts(newProducts);
                setCurrentProd(currentProd - 1);
              }
            }}
            handleNewPage={() => {
              const newProducts = [...products, emptyProduct];
              setProducts(newProducts);
              setCurrentProd(currentProd + 1);
            }}
          >
            <AttractionEditor
              updatePage={(data: Attraction) => {
                const newProducts = [...products];
                newProducts[currentProdIndex] = { attraction: data };
                setProducts(newProducts);
              }}
            />
          </PageController>
          <Separator orientation="vertical" />
          <PdfDocumentViewer products={products} />
        </HStack>
      </VStack>
      <Toaster />
    </FormProvider>
  );
}

export default PdfGenerator;
