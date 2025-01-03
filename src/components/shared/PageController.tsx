import { HStack, VStack } from "@chakra-ui/react";
import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "../ui/pagination";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ContentPage } from "./pdf/PdfDocument";

type PageControllerProps = {
  products: ContentPage[];
  children: ReactNode;
  currentProdIndex: number;
  handleRemovePage: () => void;
  handleNewPage: () => void;
  handlePageChange: (index: number) => void;
};
export function PageController({
  products,
  children,
  currentProdIndex,
  handleNewPage,
  handleRemovePage,
  handlePageChange,
}: PageControllerProps) {
  const canRemovePage = products.length > 1;

  return (
    <VStack gap={5}>
      <PaginationRoot
        count={products.length}
        page={currentProdIndex + 1} //Because the page starts at 1
        pageSize={1}
        defaultPage={1}
        onPageChange={(detail) => handlePageChange(detail.page - 1)}
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
