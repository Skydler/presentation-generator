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
              <Text style={styles.title}>{page.attraction.title}</Text>
              <Html style={styles.description}>{QuillCustomStyles + page.attraction.description}</Html>
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
    padding: 50,
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    textAlign: "center",
  },
  description: {},
});

/*
 * NOTE:
 * This styles are taken from React-Quilljs package.
 * The package assigns these styles to the genereated html instead of inline styling it so
 * I have to assign these styles to the PDF Viewer manually :( */
const QuillCustomStyles = `
<style>
.ql-video {
  display: block;
  max-width: 100%;
}
.ql-video.ql-align-center {
  margin: 0 auto;
}
.ql-video.ql-align-right {
  margin: 0 0 0 auto;
}
.ql-bg-black {
  background-color: #000000;
}
.ql-bg-red {
  background-color: #e60000;
}
.ql-bg-orange {
  background-color: #f90;
}
.ql-bg-yellow {
  background-color: #ff0;
}
.ql-bg-green {
  background-color: #008a00;
}
.ql-bg-blue {
  background-color: #06c;
}
.ql-bg-purple {
  background-color: #93f;
}
.ql-color-white {
  color: #ffffff;
}
.ql-color-red {
  color: #e60000;
}
.ql-color-orange {
  color: #f90;
}
.ql-color-yellow {
  color: #ff0;
}
.ql-color-green {
  color: #008a00;
}
.ql-color-blue {
  color: #06c;
}
.ql-color-purple {
  color: #93f;
}
.ql-font-serif {
  font-family:
    Georgia,
    Times New Roman,
    serif;
}
.ql-font-monospace {
  font-family:
    Monaco,
    Courier New,
    monospace;
}
.ql-size-small {
  font-size: 12px;
}
.ql-size-large {
  font-size: 24px;
}
.ql-size-huge {
  font-size: 40px;
}
.ql-direction-rtl {
  direction: rtl;
  text-align: inherit;
}
.ql-align-center {
  text-align: center;
}
.ql-align-justify {
  text-align: justify;
}
.ql-align-right {
  text-align: right;
}
h1 {
  font-size: 32px;
}
h2 {
  font-size: 24px;
}
h3 {
  font-size: 19px;
}
h4 {
  font-size: 16px;
}
h5 {
  font-size: 13px;
}
h6 {
  font-size: 11px;
}
a {
  text-decoration: underline;
}
img {
  max-width: 100%;
}
</style>
` as const;
