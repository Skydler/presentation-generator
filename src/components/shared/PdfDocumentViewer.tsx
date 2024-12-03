import { Attraction } from "../../pages/PdfGenerator";
import { Font, Image, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import BackgroundImage from "../../assets/background.png";
import LogoPluralis from "../../assets/logo_pluralis.png";
import Intro from "../../assets/intro.png";
import IntroPresentation from "../../assets/intro_presentation.png";
import Html from "react-pdf-html";
import OpenSansRegular from "../../assets/fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../../assets/fonts/OpenSans-Bold.ttf";
import OpenSansItalic from "../../assets/fonts/OpenSans-Italic.ttf";
import OpenSansBoldItalic from "../../assets/fonts/OpenSans-BoldItalic.ttf";

export type ContentPage = {
  attraction: Attraction;
};

type PdfDocumentViewerProps = { products: ContentPage[] };
export function PdfDocumentViewer({ products }: PdfDocumentViewerProps) {
  return (
    <PDFViewer height="100%" width={700}>
      <Document title="Pluralis PDF" pageLayout="singlePage">
        <Page key="intro-1" orientation="landscape" style={styles.page}>
          <Image src={Intro} style={styles.background} />
        </Page>
        <Page key="intro-2" orientation="landscape" style={styles.page}>
          <Image src={IntroPresentation} style={styles.background} />
        </Page>
        {products.map((page, index) => {
          return (
            <Page key={`product-${index}`} orientation="landscape" style={styles.page}>
              <View style={styles.content} data-page-number={index}>
                <Text style={styles.title}>{page.attraction.title}</Text>
                <Html>{page.attraction.description}</Html>
                <Image src={LogoPluralis} style={styles.logo} />
              </View>
              <Image src={BackgroundImage} style={styles.background} fixed />
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
}

Font.register({
  family: "OpenSans",
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: "bold" },
    { src: OpenSansItalic, fontStyle: "italic" },
    { src: OpenSansBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "OpenSans",
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
