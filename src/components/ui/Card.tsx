import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      className={cn(
        "card-elevated rounded-lg border border-[--border] p-6",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
