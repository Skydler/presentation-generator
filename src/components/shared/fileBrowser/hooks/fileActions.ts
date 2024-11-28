import {
  ChonkyActions,
  ChonkyFileActionData,
  FileData,
} from "@aperturerobotics/chonky";
import { CustomFileData } from "../fileTypes";
import { useCallback } from "react";
import { toaster } from "@/components/ui/toaster";
import { useFormContext } from "react-hook-form";
import { Attraction } from "@/pages/PdfGenerator";

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
  const { setValue } = useFormContext<Attraction>();
  return useCallback(
    (data: ChonkyFileActionData) => {
      if (data.id === ChonkyActions.OpenFiles.id) {
        const { targetFile, files } = data.payload;
        const fileToOpen: CustomFileData = targetFile ?? files[0];

        if (!fileToOpen) return;

        if (fileToOpen.isDir) {
          setCurrentFolderId(fileToOpen.id);
          return;
        } else {
          if (!fileToOpen.content) throw new Error("File content is missing");

          setValue("title", fileToOpen.content.title);
          setValue("description", fileToOpen.content.description);
          toaster.create({
            title: "File Opened: " + fileToOpen.content.title,
            type: "success",
          });
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
    [createFolder, deleteFiles, moveFiles, setCurrentFolderId, setValue],
  );
};
