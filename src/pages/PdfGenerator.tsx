import { Container, Stack, Separator, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AttractionEditor } from "../components/shared/AttractionsEditor";
import { PdfDocumentViewer } from "../components/shared/pdf/PdfDocumentViewer";
import { PageController } from "../components/shared/PageController";
import { PluralisFileBrowser } from "../components/shared/fileBrowser/PluralisFileBrowser";
import { FormProvider, useForm } from "react-hook-form";
import { ContentPage } from "../components/shared/pdf/PdfDocument";

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
      <Container>
        <Stack direction="column" gap={10} lg={{ flexDirection: "row" }}>
          <VStack gap={10} flex={1}>
            <PluralisFileBrowser />
            <PageController
              pages={products}
              currentProdIndex={currentProd}
              setCurrentProd={setCurrentProd}
              handleRemovePage={() => {
                if (products.length > 1) {
                  const newProducts = products.filter((_, index) => index !== currentProdIndex);
                  setProducts(newProducts);
                  setCurrentProd(currentProd - 1);
                }
              }}
              handleNewPage={() => {
                const newProducts = [...products, emptyProduct];
                setProducts(newProducts);
                setCurrentProd(currentProd + 1);
                methods.setValue("title", "");
                methods.setValue("description", "");
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
          </VStack>
          <VStack>
            <Separator orientation="vertical" />
          </VStack>
          <VStack gap={10} flex={1}>
            <PdfDocumentViewer products={products} />
          </VStack>
        </Stack>
      </Container>
    </FormProvider>
  );
}

export default PdfGenerator;
