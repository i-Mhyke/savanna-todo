import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  Query,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebase.config";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";

export const db = getFirestore(app);

export const addDocument = (
  collectionName: string,
  data: any
): Promise<void> => {
  const id = uuidv4();
  data.createdAt = serverTimestamp();
  data.updatedAt = serverTimestamp();
  return new Promise((resolve, reject) => {
    setDoc(doc(db, collectionName, id), data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addDocumentWithId = (
  collectionName: string,
  data: any,
  id: string
): Promise<void> => {
  data.createdAt = serverTimestamp();
  data.updatedAt = serverTimestamp();
  return new Promise((resolve, reject) => {
    setDoc(doc(db, collectionName, id), data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const getMultipleDocuments = async (
  queryCondition: Query<unknown, DocumentData>
) => {
  const q = queryCondition;
  const querySnapshot = await getDocs(q);
  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    const data: any = doc.data();
    const document = {
      id: doc.id,
      ...data,
    };
    documents.push(document);
  });
  return documents;
};

export const updateDocument = (
  collectionName: string,
  id: string,
  data: any
): Promise<void> => {
  data.updatedAt = serverTimestamp();
  return new Promise((resolve, reject) => {
    const docRef = doc(db, collectionName, id);
    updateDoc(docRef, data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteDocument = (
  collectionName: string,
  id: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, collectionName, id);
    deleteDoc(docRef)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
