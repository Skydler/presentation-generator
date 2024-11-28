// This is example has been taken from
// https://github.com/TimboKZ/chonky-website/blob/master/2.x_storybook/src/demos/VFSMutable.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CustomFileData, CustomFileMap } from "./fileTypes";
import defaultFiles from "./default_files.json";
import { NewFileForm } from "./CreateFileDialog";
import { NewFolderForm } from "./CreateFolderDialog";

const prepareCustomFileMap = () => {
  const baseFileMap = defaultFiles.fileMap as unknown as CustomFileMap;
  const rootFolderId = defaultFiles.rootFolderId;
  return { baseFileMap, rootFolderId };
};

// This hook contains the state of the virtual file system (VFS), with the
// current directory and all the actions the user can perform over files
export const useBrowserVFS = () => {
  const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);

  const [fileMap, setFileMap] = useState(baseFileMap);
  const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

  const currentFolderIdRef = useRef(currentFolderId);
  useEffect(() => {
    currentFolderIdRef.current = currentFolderId;
  }, [currentFolderId]);

  const deleteFiles = useCallback((files: CustomFileData[]) => {
    setFileMap((currentFileMap) => {
      // Create a copy of the file map to make sure we don't mutate it.
      const newFileMap = { ...currentFileMap };

      files.forEach((file) => {
        // Delete file from the file map.
        delete newFileMap[file.id];

        // Update the parent folder to make sure it doesn't try to load the
        // file we just deleted.
        if (file.parentId) {
          const parent = newFileMap[file.parentId]!;
          const newChildrenIds = parent.childrenIds!.filter(
            (id) => id !== file.id,
          );
          newFileMap[file.parentId] = {
            ...parent,
            childrenIds: newChildrenIds,
            childrenCount: newChildrenIds.length,
          };
        }
      });

      return newFileMap;
    });
  }, []);

  const moveFiles = useCallback(
    (
      files: CustomFileData[],
      source: CustomFileData,
      destination: CustomFileData,
    ) => {
      setFileMap((currentFileMap) => {
        const newFileMap = { ...currentFileMap };
        const moveFileIds = new Set(files.map((f) => f.id));

        // Delete files from their source folder.
        const newSourceChildrenIds = source.childrenIds!.filter(
          (id) => !moveFileIds.has(id),
        );
        newFileMap[source.id] = {
          ...source,
          childrenIds: newSourceChildrenIds,
          childrenCount: newSourceChildrenIds.length,
        };

        // Add the files to their destination folder.
        const newDestinationChildrenIds = [
          ...destination.childrenIds!,
          ...files.map((f) => f.id),
        ];
        newFileMap[destination.id] = {
          ...destination,
          childrenIds: newDestinationChildrenIds,
          childrenCount: newDestinationChildrenIds.length,
        };

        // Finally, update the parent folder ID on the files from source folder
        // ID to the destination folder ID.
        files.forEach((file) => {
          newFileMap[file.id] = {
            ...file,
            parentId: destination.id,
          };
        });

        return newFileMap;
      });
    },
    [],
  );

  // TODO: Should replace with UUID generator or similar
  const idCounter = useRef(0);
  const createFolder = useCallback((data: NewFolderForm) => {
    setFileMap((currentFileMap) => {
      const newFileMap = { ...currentFileMap };

      // Create the new folder
      const newFolderId = `new-folder-${idCounter.current++}`;
      newFileMap[newFolderId] = {
        id: newFolderId,
        name: data.folderName,
        isDir: true,
        modDate: new Date(),
        parentId: currentFolderIdRef.current,
        childrenIds: [],
        childrenCount: 0,
      };

      // Update parent folder to reference the new folder.
      const parent = newFileMap[currentFolderIdRef.current];
      newFileMap[currentFolderIdRef.current] = {
        ...parent,
        childrenIds: [...parent.childrenIds!, newFolderId],
      };

      return newFileMap;
    });
  }, []);

  const createFile = useCallback((file: NewFileForm) => {
    setFileMap((currentFileMap) => {
      const newFileMap = { ...currentFileMap };

      // Create the new file
      const newFileId = `new-file-${idCounter.current++}`;
      newFileMap[newFileId] = {
        id: newFileId,
        name: file.filename + ".txt",
        isDir: false,
        modDate: new Date(),
        parentId: currentFolderIdRef.current,
        content: { title: file.title, description: file.description },
        isHidden: false,
      };

      // Update parent folder to reference the new file.
      const parent = newFileMap[currentFolderIdRef.current];
      newFileMap[currentFolderIdRef.current] = {
        ...parent,
        childrenIds: [...parent.childrenIds!, newFileId],
      };

      return newFileMap;
    });
  }, []);

  return {
    fileMap,
    currentFolderId,
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    createFolder,
    createFile,
  };
};
