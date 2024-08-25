import { FloatModal } from "@/components/commons/FloatModal";
import Button from "@/components/ui/buttons/Button";
import { Input, SelectInput } from "@/components/ui/inputs/Input";
import { Label } from "@/components/ui/inputs/Label";
import { updateTodo } from "@/controllers/todo.controller";
import useCurrentUser from "@/hooks/useUser";
import { ICreateTodo, ITodo, todoPriority } from "@/types/Todo";
import { useMutation } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MdCloseFullscreen } from "react-icons/md";

export interface ITodoUpdateTemplate {
  isOpen: boolean;
  onOpenClose: (status: boolean) => void;
  todo: ITodo;
  refetch: () => void;
}
export const TodoUpdateTemplate = forwardRef(
  ({ isOpen, onOpenClose, todo, refetch }: ITodoUpdateTemplate, ref) => {
    const authUser = useCurrentUser();
    const [error, setError] = useState<string>();
    const id = todo.id || "";

    const mutation = useMutation({
      mutationFn: (todo: ITodo) => {
        return updateTodo(id, todo);
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
          {/* Close Button */}
          <Button variant="ghost" onClick={() => onOpenClose(false)}>
            <MdCloseFullscreen size={20} />
          </Button>
        </div>
        <h3 className="mb-5">Update Todo</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              defaultValue={todo.title}
              name="title"
              type="text"
              placeholder="Buy groceries"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <SelectInput name="priority" defaultValue={todo.priority}>
              {todoPriority.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </SelectInput>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </FloatModal>
    );
  }
);

TodoUpdateTemplate.displayName = "TodoUpdateTemplate";
