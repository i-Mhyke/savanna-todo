import { Timestamp } from "firebase/firestore";

export const todoPriority = ["low", "medium", "high"] as const;
export type ICreateTodo = {
  title: string;
  priority: (typeof todoPriority)[number];
};

export interface ITodo extends ICreateTodo {
  id?: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ITodoCreateTemplate {
  isOpen: boolean;
  onOpenClose: (status: boolean) => void;
}
