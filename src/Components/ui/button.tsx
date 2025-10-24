import * as React from "react";
import { cn } from "../../lib/utils";

export function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none bg-teal-600 text-white hover:bg-teal-700 px-4 py-2",
        className
      )}
      {...props}
    />
  );
}
