import { cn } from "@/libs/utils";
import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-input-border bg-input-background ring-offset-background placeholder:text-input-foreground focus-visible:ring-ring flex h-auto w-full rounded-lg border-2 px-3 py-2.5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

export type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "border-input-border bg-input-background ring-offset-background placeholder:text-input-foreground focus-visible:ring-ring flex h-auto w-full rounded-lg border-2 px-3 py-2.5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
SelectInput.displayName = "SelectInput";
export { SelectInput };
