import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "best-seller" | "popular" | "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    "best-seller": "bg-[#E11D48] text-white font-semibold shadow-sm",
    popular: "bg-[#F59E0B] text-white font-semibold shadow-sm",
    default: "bg-[#FF5A0A] text-white font-semibold shadow-sm",
    outline: "border border-gray-200 text-gray-700 bg-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] leading-tight tracking-wide font-medium select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

