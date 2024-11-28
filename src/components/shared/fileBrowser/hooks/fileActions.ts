import {
  ChonkyActions,
  ChonkyActionUnion,
  FileData,
  GenericFileActionHandler,
} from "@aperturerobotics/chonky";
import { CustomFileData } from "../fileTypes";
import { useCallback } from "react";
import { toaster } from "../../../ui/toaster";
import { useFormContext } from "react-hook-form";
import { Attraction } from "../../../../pages/PdfGenerator";
import { CreateFile } from "../customActions";

type CustomHandler = GenericFileActionHandler<
  ChonkyActionUnion | typeof CreateFile
>;

type UseFileActionHandlerArgs = {
  setCurrentFolderId: (folderId: string) => void;
  deleteFiles: (files: CustomFileData[]) => void;
  moveFiles: (
    files: FileData[],
    source: FileData,
    destination: FileData,
  ) => void;
  openCreateFolderDialog: () => void;
  openCreateFileDialog: () => void;
};
export const useFileActionHandler = ({
  setCurrentFolderId,
  deleteFiles,
  moveFiles,
  openCreateFolderDialog,
  openCreateFileDialog,
}: UseFileActionHandlerArgs) => {
  const { setValue } = useFormContext<Attraction>();
  return useCallback<CustomHandler>(
    (data) => {
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
        openCreateFolderDialog();
      } else if (data.id === CreateFile.id) {
        openCreateFileDialog();
      }
    },
    [
      deleteFiles,
      moveFiles,
      setCurrentFolderId,
      setValue,
      openCreateFolderDialog,
      openCreateFileDialog,
    ],
  );
};
