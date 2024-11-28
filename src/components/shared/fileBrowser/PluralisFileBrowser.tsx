import { Container } from "@chakra-ui/react";
import { FullFileBrowser, ChonkyActions } from "@aperturerobotics/chonky";
import { ChonkyIconFA } from "@aperturerobotics/chonky-icon-fontawesome";
import { useMemo } from "react";
import { useBrowserVFS } from "./browserVFS";
import { useFileActionHandler } from "./hooks/fileActions";
import { useFiles, useFolderChain } from "./hooks/fileNavigation";

export function PluralisFileBrowser() {
  const {
    fileMap,
    currentFolderId,
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    createFolder,
  } = useBrowserVFS();

  const files = useFiles(fileMap, currentFolderId);
  const folderChain = useFolderChain(fileMap, currentFolderId);
  const handleFileAction = useFileActionHandler(
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    createFolder,
  );

  const fileActions = useMemo(
    () => [ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles],
    [],
  );

  return (
    <Container width={1000} height={450}>
      <FullFileBrowser
        files={files}
        folderChain={folderChain}
        fileActions={fileActions}
        onFileAction={handleFileAction}
        /* eslint-disable @typescript-eslint/no-explicit-any */
        iconComponent={ChonkyIconFA as any}
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
      />
    </Container>
  );
}
