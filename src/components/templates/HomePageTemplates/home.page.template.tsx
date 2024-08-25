"use client";
import { AppContainer } from "@/components/commons/AppContainer";
import { TodoListItem } from "@/components/commons/TodoList/todo-items";
import Button from "@/components/ui/buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { TodoCreateTemplate } from "./todo.create.template";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useUser";
import { getUserTodos } from "@/controllers/todo.controller";
import { ITodo } from "@/types/Todo";

interface IGroupByDate {
  todos: ITodo[];
  date: string;
}

const groupByDate = (todos: ITodo[]) => {
  const grouped: IGroupByDate[] = [];
  todos.forEach((todo) => {
    const date = todo.createdAt?.toDate().toDateString();
    if (!date) return;
    const existingGroup = grouped.find((group) => group.date === date);
    if (existingGroup) {
      existingGroup.todos.push(todo);
    } else {
      grouped.push({ date, todos: [todo] });
    }
  });
  return grouped;
};

export const HomePageTemplate = () => {
  const [openModal, setOpenModal] = useState(false);
  const authUser = useCurrentUser();
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["todo-list"],
    queryFn: async () => {
      if (authUser) return await getUserTodos(authUser.uid);
    },
    enabled: !!authUser,
  });

  const refetchRequest = () => {
    refetch();
  };

  if (error) return <p>Something went wrong</p>;

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <AppContainer className="max-w-[640px] relative h-full">
        <div className="py-20">
          <h1 className="font-semibold mb-11">To Do List</h1>
          <>
            {isPending ? (
              <p>Getting your todos</p>
            ) : !data || !data.length ? (
              <p>You have no todos</p>
            ) : (
              <>
                <h3 className="font-semibold mb-7">Recent</h3>
                <div className="space-y-4">
                  {groupByDate(data).map((todo) => (
                    <>
                      <h4 className="text-accent font-medium">{todo.date}</h4>
                      {todo.todos.map((item) => (
                        <TodoListItem
                          key={item.id}
                          todo={item}
                          refetch={refetchRequest}
                        />
                      ))}
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
        <TodoCreateTemplate
          isOpen={openModal}
          onOpenClose={setOpenModal}
          refetch={refetchRequest}
        />
        <div className="sticky right-10 bottom-5 text-right">
          <Button
            onClick={() => setOpenModal(true)}
            variant="accent"
            className="rounded-full p-0 h-12 w-12"
          >
            <FaPlus size={24} />
          </Button>
        </div>
      </AppContainer>
    </main>
  );
};
