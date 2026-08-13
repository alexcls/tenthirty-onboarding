"use client";

import { motion } from "framer-motion";

export function ProgressBar({
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}
      aria-label="Fortschritt"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      role="progressbar"
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(progress, 0)}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}
