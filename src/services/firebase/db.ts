import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  increment,
  onSnapshot,
  query,
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import { app } from "./app";
import { CustomFileData, CustomFileMap } from "../../components/shared/fileBrowser/fileTypes";
import { toaster } from "../../components/ui/toaster";

const db = getFirestore(app);
const PRODUCT_FILES_COLLECTION = "product-files";

export const setCurrentFolderSnapshot = async (setFiles: (newFiles: CustomFileMap) => void) => {
  const q = query(collection(db, PRODUCT_FILES_COLLECTION));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const newFileMap: CustomFileMap = {};
    for (const doc of snapshot.docs) {
      newFileMap[doc.id] = { ...doc.data(), id: doc.id } as CustomFileData;
    }
    setFiles(newFileMap);
  });

  return unsubscribe;
};

export const deleteProductFiles = async (files: CustomFileData[]) => {
  try {
    const batch = writeBatch(db);

    files.forEach(async (file) => {
      if (file.isDir && file.childrenIds!.length > 0) {
        toaster.create({
          title: "Cannot delete non-empty folder",
          type: "error",
        });
        throw Error("Cannot delete non-empty folder");
      }

      const fileDocRef = doc(db, PRODUCT_FILES_COLLECTION, file.id);
      batch.delete(fileDocRef);

      if (file.parentId) {
        const parentDocRef = doc(db, PRODUCT_FILES_COLLECTION, file.parentId);
        batch.update(parentDocRef, {
          childrenCount: increment(-1),
          childrenIds: arrayRemove(file.id),
        });
      }
    });

    batch.commit();
  } catch (error) {
    console.error("Delete product file transaction failed: ", error);
  }
};

export const createProductFile = async (fileData: CustomFileData) => {
  const newFileRef = doc(collection(db, PRODUCT_FILES_COLLECTION));
  const newFileData = { ...fileData, id: newFileRef.id };
  try {
    await runTransaction(db, async (transaction) => {
      transaction.set(newFileRef, newFileData);

      // Update parent folder to reference the new file
      const parentId = fileData.parentId;
      if (!parentId) throw Error("Parent ID not provided for new file");

      const parentDocRef = doc(db, PRODUCT_FILES_COLLECTION, parentId);
      transaction.update(parentDocRef, {
        childrenCount: increment(1),
        childrenIds: arrayUnion(newFileRef.id),
      });
    });
  } catch (error) {
    console.error("Create product file transaction failed: ", error);
  }

  return newFileData;
};

export const moveProductFiles = async (
  files: CustomFileData[],
  source: CustomFileData,
  destination: CustomFileData,
) => {
  try {
    const batch = writeBatch(db);
    const sourceDocRef = doc(db, PRODUCT_FILES_COLLECTION, source.id);
    const destinationDocRef = doc(db, PRODUCT_FILES_COLLECTION, destination.id);

    // Update the parent folder to remove the files from the source folder.
    batch.update(sourceDocRef, {
      childrenCount: increment(-files.length),
      childrenIds: arrayRemove(...files.map((file) => file.id)),
    });

    // Update the parent folder to reference the files in the destination folder.
    batch.update(destinationDocRef, {
      childrenCount: increment(files.length),
      childrenIds: arrayUnion(...files.map((file) => file.id)),
    });

    // Finally, update the parent folder ID on the files from source folder
    // ID to the destination folder ID.
    files.forEach((file) => {
      batch.update(doc(db, PRODUCT_FILES_COLLECTION, file.id), {
        parentId: destination.id,
      });
    });

    await batch.commit();
  } catch (error) {
    console.error("Move product files transaction failed: ", error);
  }
};
