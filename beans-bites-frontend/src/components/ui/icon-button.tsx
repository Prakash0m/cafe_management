import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "circle" | "flat";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = "md",
      variant = "circle",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A0A] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-95";

    const variants = {
      circle: "rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-gray-700 hover:text-[#FF5A0A]",
      ghost: "rounded-lg bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900",
      flat: "rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700",
    };

    const sizes = {
      sm: "h-7 w-7 p-1 text-xs",
      md: "h-8 w-8 p-1.5 text-sm",
      lg: "h-10 w-10 p-2 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

