import {
  collection,
  DocumentData,
  query,
  Query,
  where,
} from "firebase/firestore";
import {
  addDocument,
  db,
  deleteDocument,
  getDocument,
  getMultipleDocuments,
  updateDocument,
} from "./firestore.controllers";
import { todoCollectionName } from "./firebase.config";
import { ITodo } from "@/types/Todo";

export const getUserTodos = async (userId: string): Promise<ITodo[]> => {
  const condition: Query<unknown, DocumentData> = query(
    collection(db, todoCollectionName),
    where("userId", "==", userId)
  );
  const todos = await getMultipleDocuments(condition);
  return todos;
};

export const getTodo = async (todoId: string) => {
  const todo = await getDocument(todoCollectionName, todoId);
  return todo;
};

export const createTodo = async (todo: any) => {
  const doc = await addDocument(todoCollectionName, todo);
  return doc;
};

export const updateTodo = async (todoId: string, todo: any) => {
  const doc = await updateDocument(todoCollectionName, todoId, todo);
  return doc;
};

export const deleteTodo = async (todoId: string) => {
  const doc = await deleteDocument(todoCollectionName, todoId);
  return doc;
};
