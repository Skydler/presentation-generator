import { Font, Image, StyleSheet, Document, Page, Text, View } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import BackgroundImage from "../../../assets/background.png";
import LogoPluralis from "../../../assets/logo_pluralis.png";
import Intro from "../../../assets/intro.png";
import IntroPresentation from "../../../assets/intro_presentation.png";
import OpenSansRegular from "../../../assets/fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../../../assets/fonts/OpenSans-Bold.ttf";
import OpenSansItalic from "../../../assets/fonts/OpenSans-Italic.ttf";
import OpenSansBoldItalic from "../../../assets/fonts/OpenSans-BoldItalic.ttf";
import { Attraction } from "../../../pages/PdfGenerator";

export type ContentPage = {
  attraction: Attraction;
};
type PdfDocumentProps = { products: ContentPage[] };
export function PdfDocument({ products }: PdfDocumentProps) {
  return (
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
              <View fixed style={{ height: 50, width: "100%" }}></View>
              <Text style={styles.title}>{page.attraction.title}</Text>
              <Html style={styles.description}>{page.attraction.description}</Html>
              <View fixed style={{ height: 80, width: "100%" }}></View>
              <Image src={LogoPluralis} style={styles.logo} fixed />
            </View>
            <Image src={BackgroundImage} style={styles.background} fixed />
          </Page>
        );
      })}
    </Document>
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
    paddingRight: 50,
    paddingLeft: 50,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {},
});
