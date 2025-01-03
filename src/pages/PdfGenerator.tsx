import { Container, Stack, Separator, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
    description: "<p></p>",
  },
};

function PdfGenerator() {
  const methods = useForm<Attraction>();
  const [products, setProducts] = useState<ContentPage[]>([emptyProduct]);
  const [currentProd, setCurrentProd] = useState(0);
  if (currentProd < 0) {
    throw new Error("Invalid current product index");
  }

  function updateFormAttraction(data: Attraction) {
    methods.setValue("title", data.title);
    methods.setValue("description", data.description);
  }

  return (
    <FormProvider {...methods}>
      <Container>
        <Stack direction="column" gap={10} lg={{ flexDirection: "row" }}>
          <VStack gap={10} flex={1}>
            <PluralisFileBrowser />
            <PageController
              products={products}
              currentProdIndex={currentProd}
              handleRemovePage={() => {
                if (products.length > 1) {
                  const newProducts = products.filter((_, index) => index !== currentProd);
                  const newIndex = Math.min(currentProd, newProducts.length - 1);
                  setProducts(newProducts);
                  setCurrentProd(newIndex);
                  updateFormAttraction(newProducts[newIndex].attraction);
                }
              }}
              handleNewPage={() => {
                const newProducts = [...products];
                const newIndex = currentProd + 1;
                newProducts.splice(newIndex, 0, emptyProduct);

                setProducts(newProducts);
                setCurrentProd(newIndex);
                updateFormAttraction(emptyProduct.attraction);
              }}
              handlePageChange={(index: number) => {
                setCurrentProd(index);
                updateFormAttraction(products[index].attraction);
              }}
            >
              <AttractionEditor
                updatePage={(data: Attraction) => {
                  const newProducts = [...products];
                  newProducts[currentProd] = { attraction: data };
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
