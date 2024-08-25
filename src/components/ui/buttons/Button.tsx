import { cn } from "@/libs/utils";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

const ButtonVariant = [
  "primary",
  "outline",
  "ghost",
  "light",
  "dark",
  "accent",
] as const;
const ButtonSize = ["sm", "base"] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "base",
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center rounded-lg justify-center font-medium",
          "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "base" && ["px-3 py-2.5", "text-sm md:text-base"],
            size === "sm" && ["px-2 py-1", "text-xs md:text-sm"],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "bg-primary-background text-primary-foreground",
              "border-primary-background border",
              "hover:bg-primary-background hover:text-primary-foreground",
              "active:bg-primary-background",
              "disabled:bg-primary-background",
            ],
            variant === "outline" && [
              "text-primary",
              "border-primary border",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "ghost" && [
              "text-primary",
              "shadow-none",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "light" && [
              "bg-light-background text-light-foreground",
              "border border-light-background",
              "hover:text-dark hover:bg-gray-100",
              "active:bg-white/80 disabled:bg-gray-200",
            ],
            variant === "dark" && [
              "bg-gray-900 text-white",
              "border border-gray-600",
              "hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
            ],
            variant === "accent" && [
              "bg-accent text-white",
              "border border-accent",
              "hover:bg-accent active:accent disabled:bg-accent/60",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": ["primary", "dark"].includes(variant),
                "text-black": ["light"].includes(variant),
                "text-primary-500": ["outline", "ghost"].includes(variant),
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {LeftIcon && (
          <div
            className={cn([
              size === "base" && "mr-1",
              size === "sm" && "mr-1.5",
            ])}
          >
            <LeftIcon
              className={cn(
                [
                  size === "base" && "md:text-md text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                leftIconClassName
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === "base" && "ml-1",
              size === "sm" && "ml-1.5",
            ])}
          >
            <RightIcon
              className={cn(
                [
                  size === "base" && "text-md md:text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                rightIconClassName
              )}
            />
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
