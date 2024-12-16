// This is example has been taken from
// https://github.com/TimboKZ/chonky-website/blob/master/2.x_storybook/src/demos/VFSMutable.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomFileData, CustomFileMap } from "./fileTypes";
import { NewFileForm } from "./CreateFileDialog";
import { NewFolderForm } from "./CreateFolderDialog";
import {
  createProductFile,
  deleteProductFiles,
  getProductFiles,
  moveProductFiles,
} from "../../../services/firebase/db";

// NOTE: This hook contains the state of the virtual file system (VFS), with the
// current directory and all the actions the user can perform over files
export const useBrowserVFS = () => {
  const [fileMap, setFileMap] = useState<CustomFileMap>({
    m9Yj1LnLYwpK4DuXjIDW: {
      id: "m9Yj1LnLYwpK4DuXjIDW",
      name: "Loading...",
      isDir: true,
      childrenIds: [],
      childrenCount: 0,
    },
  });
  const [currentFolderId, setCurrentFolderId] = useState("m9Yj1LnLYwpK4DuXjIDW");

  useEffect(() => {
    async function getFiles() {
      const files = await getProductFiles();
      const newFileMap: CustomFileMap = {};
      for (const doc of files.docs) {
        newFileMap[doc.id] = { ...doc.data(), id: doc.id } as CustomFileData;
      }
      setFileMap(newFileMap);
    }
    getFiles();
  }, []);

  const currentFolderIdRef = useRef(currentFolderId);
  useEffect(() => {
    currentFolderIdRef.current = currentFolderId;
  }, [currentFolderId]);

  const deleteFiles = useCallback((files: CustomFileData[]) => {
    deleteProductFiles(files);

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
          const newChildrenIds = parent.childrenIds!.filter((id) => id !== file.id);
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

  const moveFiles = useCallback((files: CustomFileData[], source: CustomFileData, destination: CustomFileData) => {
    moveProductFiles(files, source, destination);

    setFileMap((currentFileMap) => {
      const newFileMap = { ...currentFileMap };
      const moveFileIds = new Set(files.map((f) => f.id));

      // Delete files from their source folder.
      const newSourceChildrenIds = source.childrenIds!.filter((id) => !moveFileIds.has(id));
      newFileMap[source.id] = {
        ...source,
        childrenIds: newSourceChildrenIds,
        childrenCount: newSourceChildrenIds.length,
      };

      // Add the files to their destination folder.
      const newDestinationChildrenIds = [...destination.childrenIds!, ...files.map((f) => f.id)];
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
  }, []);

  const createFolder = useCallback(async (data: NewFolderForm) => {
    const folderData = {
      id: "",
      name: data.folderName,
      isDir: true,
      modDate: new Date(),
      parentId: currentFolderIdRef.current,
      childrenIds: [],
      childrenCount: 0,
    };
    const newFolderData = await createProductFile(folderData);

    setFileMap((currentFileMap) => {
      const newFileMap = { ...currentFileMap };

      // Create the new folder
      newFileMap[newFolderData.id] = newFolderData;

      // Update parent folder to reference the new folder.
      const parent = newFileMap[currentFolderIdRef.current];
      newFileMap[currentFolderIdRef.current] = {
        ...parent,
        childrenCount: parent.childrenCount! + 1,
        childrenIds: [...parent.childrenIds!, newFolderData.id],
      };

      return newFileMap;
    });
  }, []);

  const createFile = useCallback(async (file: NewFileForm) => {
    const fileData = {
      id: "",
      name: file.filename + ".txt",
      isDir: false,
      modDate: new Date(),
      parentId: currentFolderIdRef.current,
      content: { title: file.title, description: file.description },
      isHidden: false,
    };
    const newFileData = await createProductFile(fileData);

    setFileMap((currentFileMap) => {
      const newFileMap = { ...currentFileMap };

      // Create the new file
      newFileMap[newFileData.id] = newFileData;

      // Update parent folder to reference the new file.
      const parent = newFileMap[currentFolderIdRef.current];
      newFileMap[currentFolderIdRef.current] = {
        ...parent,
        childrenCount: parent.childrenCount! + 1,
        childrenIds: [...parent.childrenIds!, newFileData.id],
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
