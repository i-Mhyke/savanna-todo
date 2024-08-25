import { cn } from "@/libs/utils";
import React from "react";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-text mb-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});

Label.displayName = "Label";
export { Label };
