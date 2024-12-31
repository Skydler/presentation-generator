import { HStack, VStack } from "@chakra-ui/react";
import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "../ui/pagination";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ContentPage } from "./pdf/PdfDocument";
import { useFormContext } from "react-hook-form";
import { Attraction } from "../../pages/PdfGenerator";

type PageControllerProps = {
  pages: ContentPage[];
  children: ReactNode;
  currentProdIndex: number;
  setCurrentProd: (index: number) => void;
  handleRemovePage: () => void;
  handleNewPage: () => void;
};
export function PageController({
  pages,
  children,
  currentProdIndex,
  setCurrentProd,
  handleNewPage,
  handleRemovePage,
}: PageControllerProps) {
  const { setValue } = useFormContext<Attraction>();
  const canRemovePage = pages.length > 1;

  return (
    <VStack gap={5} width="full">
      <PaginationRoot
        count={pages.length}
        page={currentProdIndex}
        pageSize={1}
        defaultPage={1}
        onPageChange={(detail) => {
          setCurrentProd(detail.page);
          setValue("title", pages[detail.page - 1].attraction.title);
          setValue("description", pages[detail.page - 1].attraction.description);
        }}
      >
        <HStack gap={4}>
          <PaginationPrevTrigger />
          <PaginationPageText />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>

      {children}

      <HStack gap={4} width="100%">
        <Button variant="surface" colorPalette="red" onClick={handleRemovePage} disabled={!canRemovePage} flex={1}>
          Delete
        </Button>
        <Button variant="solid" colorPalette="green" onClick={handleNewPage} flex={1}>
          New Product
        </Button>
      </HStack>
    </VStack>
  );
}
