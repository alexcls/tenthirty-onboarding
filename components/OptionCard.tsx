"use client";

import { motion } from "framer-motion";

import type { OptionCardOption } from "@/types/onboarding";

export function OptionCard({
  option,
  selected = false,
  disabled = false,
  onSelect,
}: {
  option: OptionCardOption;
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={[
        "w-full rounded-2xl border p-4 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        selected
          ? "border-indigo-600 bg-indigo-50 shadow-[0_8px_20px_rgba(79,70,229,0.12)]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {option.icon ? (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              {option.icon}
            </span>
          ) : null}

          <div>
            <span className="block text-base font-semibold text-slate-900">
              {option.label}
            </span>
            {option.description ? (
              <span className="mt-1 block text-xs text-slate-500">
                {option.description}
              </span>
            ) : null}
          </div>
        </div>

        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold",
            selected
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white text-slate-200",
          ].join(" ")}
        >
          {selected ? "✓" : ""}
        </span>
      </div>
    </motion.button>
  );
}
