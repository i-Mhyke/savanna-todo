import { TodoUpdateTemplate } from "@/components/templates/HomePageTemplates/todo.update.template";
import { deleteTodo } from "@/controllers/todo.controller";
import { ITodo } from "@/types/Todo";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";

export const TodoListItem = ({
  todo,
  refetch,
}: {
  todo: ITodo;
  refetch: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const id = todo.id || "";
  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-900";
      case "medium":
        return "bg-yellow-100 text-yellow-900";
      case "low":
        return "bg-green-100 text-green-900";
      default:
        return "bg-green-100 text-green-900";
    }
  };
  const mutation = useMutation({
    mutationFn: () => {
      return deleteTodo(id);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const onDeleteTodo = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirm) {
      mutation.mutate();
    }
  };
  return (
    <>
      <div className="shadow w-full flex justify-between items-center p-5 rounded-xl bg-background">
        <div>
          <h4 className="font-normal mb-2">{todo.title}</h4>
          <span
            className={`${priorityColor(
              todo.priority
            )} text-xs font-semibold p-1.5 rounded-lg`}
          >
            {todo.priority}
          </span>
        </div>
        <div className="space-x-3">
          <button onClick={() => setOpenModal(true)}>
            <GoPencil size={22} className="text-[#F25F4C]" />
          </button>
          <button onClick={onDeleteTodo}>
            <GoTrash size={22} className="text-[#F25F4C]" />
          </button>
        </div>
      </div>
      {/* <p>{todo.createdAt?.toDate().toString()}</p> */}
      <TodoUpdateTemplate
        isOpen={openModal}
        onOpenClose={setOpenModal}
        todo={todo}
        refetch={refetch}
      />
    </>
  );
};
