import React from "react";

import { cn } from "@/libs/utils";

type AppContainerProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithRef<"div">;

const AppContainer = React.forwardRef<HTMLDivElement, AppContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "container mx-auto max-w-[1360px] px-4 sm:px-7 md:px-10",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
AppContainer.displayName = "AppContainer";
export { AppContainer };
