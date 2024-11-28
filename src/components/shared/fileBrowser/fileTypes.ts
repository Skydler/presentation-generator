import { FileData } from "@aperturerobotics/chonky";

export interface CustomFileData extends FileData {
  parentId?: string;
  childrenIds?: string[];
}

export interface CustomFileMap {
  [fileId: string]: CustomFileData;
}
