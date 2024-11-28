import { HStack, VStack } from "@chakra-ui/react";
import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "../ui/pagination";
import { ContentPage } from "./PdfDocumentViewer";
import { ReactNode } from "react";
import { Button } from "../ui/button";

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
  return (
    <VStack gap={10}>
      <PaginationRoot
        count={pages.length}
        page={currentProdIndex}
        pageSize={1}
        defaultPage={1}
        onPageChange={(detail) => setCurrentProd(detail.page)}
      >
        <HStack gap={4}>
          <PaginationPrevTrigger />
          <PaginationPageText />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>

      {children}

      <HStack gap={4}>
        {pages.length > 1 && (
          <Button variant="surface" colorPalette="red" onClick={handleRemovePage}>
            Delete
          </Button>
        )}
        <Button variant="solid" colorPalette="green" onClick={handleNewPage}>
          New Product
        </Button>
      </HStack>
    </VStack>
  );
}
