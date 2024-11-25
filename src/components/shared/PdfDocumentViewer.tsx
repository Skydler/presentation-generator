import { Attraction } from "@/pages/PdfGenerator";
import { Image, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import BackgroundImage from "@/assets/background.png";
import LogoPluralis from "@/assets/logo_pluralis.png";
import Intro from "@/assets/intro.png";
import IntroPresentation from "@/assets/intro_presentation.png";

export type ContentPage = {
  attraction: Attraction;
};

type PdfDocumentViewerProps = {
  pages: ContentPage[];
  currentProdIndex: number;
};
export function PdfDocumentViewer({
  pages,
  currentProdIndex,
}: PdfDocumentViewerProps) {
  return (
    <PDFViewer height={700} width={700}>
      <Document title="Pluralis PDF" pageLayout="singlePage">
        <Page orientation="landscape" style={styles.page}>
          <Image src={Intro} style={styles.background} />
        </Page>
        <Page orientation="landscape" style={styles.page}>
          <Image src={IntroPresentation} style={styles.background} />
        </Page>

        {pages.map((page, index) => (
          <Page
            key={index}
            id={index.toString()}
            orientation="landscape"
            style={styles.page}
            //ref={(ref) => {
            //  if (index === currentProdIndex) {
            //    ref?.scrollIntoView();
            //  }
            //}}
          >
            <View style={styles.content}>
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
    </PDFViewer>
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
