import { cn } from "@/libs/utils";
import { forwardRef, useImperativeHandle } from "react";

export interface IFloatModal {
  isOpen: boolean;
  onOpenClose: (status: boolean) => void;
  children: React.ReactNode;
}
export const FloatModal = forwardRef(
  ({ isOpen, onOpenClose, children }: IFloatModal, ref) => {
    const handleOpenClose = () => {
      onOpenClose(!isOpen);
    };
    useImperativeHandle(ref, () => ({
      handleOpenClose,
    }));
    return (
      <div
        className={cn(
          "fixed bottom-0 w-full max-w-[540px] left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-t-2xl p-6 transition-all duration-300 ease-in-out z-10",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {children}
      </div>
    );
  }
);

FloatModal.displayName = "FloatModal";
