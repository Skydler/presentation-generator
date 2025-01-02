import { Stack } from "@chakra-ui/react";
import { FullFileBrowser, ChonkyActions } from "@aperturerobotics/chonky";
import { ChonkyIconFA } from "@aperturerobotics/chonky-icon-fontawesome";
import { useState } from "react";
import { useBrowserVFS } from "./browserVFS";
import { useFileActionHandler } from "./hooks/fileActions";
import { useFiles, useFolderChain } from "./hooks/fileNavigation";
import { CreateFile } from "./customActions";
import { CreateFileDialog } from "./CreateFileDialog";
import { CreateFolderDialog } from "./CreateFolderDialog";

const disabledActions = [ChonkyActions.ToggleHiddenFiles.id, ChonkyActions.OpenSelection.id];
const fileActions = [CreateFile, ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles];

export function PluralisFileBrowser() {
  const { fileMap, currentFolderId, setCurrentFolderId, deleteFiles, moveFiles, createFolder, createFile } =
    useBrowserVFS();
  const handleFileAction = useFileActionHandler({
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    openCreateFolderDialog: () => setIsCreateFolderDialogOpen(true),
    openCreateFileDialog: () => setIsCreateFileDialogOpen(true),
  });

  const files = useFiles(fileMap, currentFolderId);
  const folderChain = useFolderChain(fileMap, currentFolderId);
  const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false);
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false);

  return (
    <Stack width="full">
      <FullFileBrowser
        files={files}
        folderChain={folderChain}
        fileActions={fileActions}
        onFileAction={handleFileAction}
        /* eslint-disable @typescript-eslint/no-explicit-any */
        iconComponent={ChonkyIconFA as any}
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
        disableDefaultFileActions={disabledActions}
      />

      <CreateFileDialog open={isCreateFileDialogOpen} setOpen={setIsCreateFileDialogOpen} createFile={createFile} />
      <CreateFolderDialog
        open={isCreateFolderDialogOpen}
        setOpen={setIsCreateFolderDialogOpen}
        createFolder={createFolder}
      />
    </Stack>
  );
}
