import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[--primary-light] px-3 py-1 font-mono text-xs text-[--primary]",
        className,
      )}
      {...props}
    />
  );
}
