import type { ReactNode } from "react";

import { ProgressBar } from "@/components/ProgressBar";

export function OnboardingLayout({
  children,
  stepNumber,
  totalSteps,
  canGoBack = false,
  onBack,
}: {
  children: ReactNode;
  stepNumber: number;
  totalSteps: number;
  canGoBack?: boolean;
  onBack?: () => void;
}) {
  const progress = totalSteps > 0 ? (stepNumber / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef4ff,_#f8fafc_40%,_#f4f7fb)] px-4 py-5">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[420px] flex-col rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-[72px]">
            {canGoBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Zurück
              </button>
            ) : null}
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Schritt {stepNumber} / {totalSteps}
          </span>
        </header>

        <ProgressBar progress={progress} className="mb-6" />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
