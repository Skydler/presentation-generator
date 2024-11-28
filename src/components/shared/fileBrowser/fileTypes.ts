import { Attraction } from "../../../pages/PdfGenerator";
import { FileData } from "@aperturerobotics/chonky";

export interface CustomFileData extends FileData {
  parentId?: string;
  childrenIds?: string[];
  content?: Attraction;
}

export interface CustomFileMap {
  [fileId: string]: CustomFileData;
}
