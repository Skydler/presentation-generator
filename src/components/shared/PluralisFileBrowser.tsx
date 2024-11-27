import { Container } from "@chakra-ui/react";
import {
  FullFileBrowser as F,
  FileBrowserProps,
  FileBrowserHandle,
  FileArray,
  ChonkyActions,
  FileActionHandler,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { useCallback, useMemo, useState } from "react";

const FullFileBrowser = F as React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    FileBrowserProps & React.RefAttributes<FileBrowserHandle>
  >
>;

export function PluralistFileBrowser() {
  const [files, setFiles] = useState<FileArray>([
    { id: "lht", name: "Projects", isDir: true },
    {
      id: "mcd",
      name: "chonky-sphere-v2.png",
      thumbnailUrl: "https://chonky.io/chonky-sphere-v2.png",
    },
  ]);
  const [folderChain, setFolderChain] = useState<FileArray>([
    { id: "xcv", name: "Demo", isDir: true },
  ]);

  const handleAction = useCallback<FileActionHandler>(
    (data) => {
      if (data.id === ChonkyActions.CreateFolder.id) {
        setFiles([
          ...files,
          { id: "new-folder", name: "New Folder", isDir: true },
        ]);
      }
    },
    [files],
  );

  const fileActions = useMemo(() => [ChonkyActions.CreateFolder], []);

  return (
    <Container width={1000}>
      <FullFileBrowser
        files={files}
        folderChain={folderChain}
        /* eslint-disable @typescript-eslint/no-explicit-any */
        iconComponent={ChonkyIconFA as any}
        defaultFileViewActionId={ChonkyActions.EnableListView.id}
        fileActions={fileActions}
        onFileAction={handleAction}
      />
    </Container>
  );
}
