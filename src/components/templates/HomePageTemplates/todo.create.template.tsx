import { FloatModal } from "@/components/commons/FloatModal";
import Button from "@/components/ui/buttons/Button";
import { Input, SelectInput } from "@/components/ui/inputs/Input";
import { Label } from "@/components/ui/inputs/Label";
import { createTodo } from "@/controllers/todo.controller";
import useCurrentUser from "@/hooks/useUser";
import { ICreateTodo, ITodo, todoPriority } from "@/types/Todo";
import { useMutation } from "@tanstack/react-query";
import { forwardRef, useState } from "react";
import { MdCloseFullscreen } from "react-icons/md";

export interface ITodoCreateTemplate {
  isOpen: boolean;
  onOpenClose: (status: boolean) => void;
  refetch: () => void;
}

export const TodoCreateTemplate = forwardRef(
  ({ isOpen, onOpenClose, refetch }: ITodoCreateTemplate, ref) => {
    const authUser = useCurrentUser();
    const [error, setError] = useState<string>();

    const mutation = useMutation({
      mutationFn: (todo: ITodo) => {
        return createTodo(todo);
      },
      onSuccess: () => {
        refetch();
        onOpenClose(false);
      },
      onError: (error: any) => {
        setError(error.message);
      },
    });

    const handleSubmit = (event: any) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const value = Object.fromEntries(formData.entries()) as ICreateTodo;
      if (!authUser) {
        window.alert("Please login to create a todo");
        return;
      }
      const todo: ITodo = { ...value, userId: authUser.uid };
      mutation.mutate(todo);
      event.currentTarget.reset();
    };
    return (
      <FloatModal isOpen={isOpen} onOpenClose={onOpenClose}>
        <div className="text-right">
          <Button variant="ghost" onClick={() => onOpenClose(false)}>
            <MdCloseFullscreen size={20} />
          </Button>
        </div>
        <h3 className="mb-5">Add Todo</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" type="text" placeholder="Buy groceries" />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <SelectInput name="priority">
              {todoPriority.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className="w-full"
            type="submit"
            isLoading={mutation.isPending}
          >
            Submit
          </Button>
        </form>
      </FloatModal>
    );
  }
);

TodoCreateTemplate.displayName = "TodoCreateTemplate";
