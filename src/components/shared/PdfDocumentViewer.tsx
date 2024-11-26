import { Attraction } from "@/pages/PluralisPDFCreator";
import { Image, StyleSheet, usePDF } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import BackgroundImage from "@/assets/background.png";
import LogoPluralis from "@/assets/logo_pluralis.png";
import Intro from "@/assets/intro.png";
import IntroPresentation from "@/assets/intro_presentation.png";
import { Document as ViewerDocument, Page as ViewerPage } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export type ContentPage = {
  attraction: Attraction;
};

type PdfDocumentViewerProps = { products: ContentPage[] };
export function PdfDocumentViewer({ products }: PdfDocumentViewerProps) {
  const [instance, update] = usePDF({
    document: <PluralisDocument products={products} />,
  });

  useEffect(() => {
    update(<PluralisDocument products={products} />);
  }, [products, update]);

  return (
    <VStack height={700} width={700} m={5} p={5}>
      <ViewerDocument file={instance.url}>
        <ViewerPage pageNumber={1} />
        <ViewerPage pageNumber={2} />
        {products.map((_, index) => (
          <ViewerPage key={index} pageNumber={index + 3} />
        ))}
      </ViewerDocument>
    </VStack>
  );
}

function PluralisDocument({ products }: PdfDocumentViewerProps) {
  return (
    <Document title="Pluralis PDF" pageLayout="singlePage">
      <Page key="intro-1" orientation="landscape" style={styles.page}>
        <Image src={Intro} style={styles.background} />
      </Page>
      <Page key="intro-2" orientation="landscape" style={styles.page}>
        <Image src={IntroPresentation} style={styles.background} />
      </Page>
      {products.map((page, index) => (
        <Page
          key={`product-${index}`}
          orientation="landscape"
          style={styles.page}
        >
          <View style={styles.content} data-page-number={index}>
            <Text style={styles.title}>{page.attraction.title}</Text>
            <Text style={styles.description}>
              {page.attraction.description}
            </Text>
            <Image src={LogoPluralis} style={styles.logo} />
          </View>
          <Image src={BackgroundImage} style={styles.background} />
        </Page>
      ))}
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    position: "relative",
    color: "white",
  },
  background: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  logo: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  content: {
    padding: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
  },
  description: {
    fontSize: 24,
  },
});
