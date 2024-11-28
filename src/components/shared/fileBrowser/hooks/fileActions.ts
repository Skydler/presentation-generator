import {
  ChonkyActions,
  ChonkyFileActionData,
  FileData,
  FileHelper,
} from "@aperturerobotics/chonky";
import { CustomFileData } from "../fileTypes";
import { useCallback } from "react";

export const useFileActionHandler = (
  setCurrentFolderId: (folderId: string) => void,
  deleteFiles: (files: CustomFileData[]) => void,
  moveFiles: (
    files: FileData[],
    source: FileData,
    destination: FileData,
  ) => void,
  createFolder: (folderName: string) => void,
) => {
  return useCallback(
    (data: ChonkyFileActionData) => {
      if (data.id === ChonkyActions.OpenFiles.id) {
        const { targetFile, files } = data.payload;
        const fileToOpen = targetFile ?? files[0];
        if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
          setCurrentFolderId(fileToOpen.id);
          return;
        }
      } else if (data.id === ChonkyActions.DeleteFiles.id) {
        deleteFiles(data.state.selectedFilesForAction!);
      } else if (data.id === ChonkyActions.MoveFiles.id) {
        moveFiles(
          data.payload.files,
          data.payload.source!,
          data.payload.destination,
        );
      } else if (data.id === ChonkyActions.CreateFolder.id) {
        const folderName = prompt("Provide the name for your new folder:");
        if (folderName) createFolder(folderName);
      }
    },
    [createFolder, deleteFiles, moveFiles, setCurrentFolderId],
  );
};
