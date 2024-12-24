// This is example has been taken from
// https://github.com/TimboKZ/chonky-website/blob/master/2.x_storybook/src/demos/VFSMutable.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomFileData, CustomFileMap } from "./fileTypes";
import { NewFileForm } from "./CreateFileDialog";
import { NewFolderForm } from "./CreateFolderDialog";
import {
  createProductFile,
  deleteProductFiles,
  moveProductFiles,
  setCurrentFolderSnapshot,
} from "../../../services/firebase/db";

const defaultFileMap: CustomFileMap = {
  m9Yj1LnLYwpK4DuXjIDW: {
    id: "m9Yj1LnLYwpK4DuXjIDW",
    name: "Loading...",
    isDir: true,
    childrenIds: [],
    childrenCount: 0,
  },
};

// This hook contains the state of the virtual file system (VFS), with the
// current directory and all the actions the user can perform over files
export const useBrowserVFS = () => {
  const [fileMap, setFileMap] = useState(defaultFileMap);
  const [currentFolderId, setCurrentFolderId] = useState("m9Yj1LnLYwpK4DuXjIDW");
  const currentFolderIdRef = useRef(currentFolderId);

  useEffect(() => {
    // This will track the current folder and update the file map on db changes
    setCurrentFolderSnapshot(setFileMap);
  }, [currentFolderId]);

  useEffect(() => {
    currentFolderIdRef.current = currentFolderId;
  }, [currentFolderId]);

  const deleteFiles = useCallback((files: CustomFileData[]) => {
    deleteProductFiles(files);
  }, []);

  const moveFiles = useCallback((files: CustomFileData[], source: CustomFileData, destination: CustomFileData) => {
    moveProductFiles(files, source, destination);
  }, []);

  const createFolder = useCallback((data: NewFolderForm) => {
    const folderData = {
      id: "",
      name: data.folderName,
      isDir: true,
      modDate: new Date(),
      parentId: currentFolderIdRef.current,
      childrenIds: [],
      childrenCount: 0,
    };
    createProductFile(folderData);
  }, []);

  const createFile = useCallback((file: NewFileForm) => {
    const fileData = {
      id: "",
      name: file.filename + ".txt",
      isDir: false,
      modDate: new Date(),
      parentId: currentFolderIdRef.current,
      content: { title: file.title, description: file.description },
      isHidden: false,
    };
    createProductFile(fileData);
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
