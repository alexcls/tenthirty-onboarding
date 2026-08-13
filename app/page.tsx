"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { OnboardingLayout } from "@/components/OnboardingLayout";
import { OptionCard } from "@/components/OptionCard";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import {
  firstStepId,
  getStepById,
  getStepOptions,
  heroStepId,
} from "@/lib/onboarding-steps";
import type { OnboardingStep } from "@/types/onboarding";

function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-between px-5 py-8">
      <div className="pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
          TenThirty
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-900">
          Finde den Job, der wirklich zu dir passt
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Unser KI-Onboarding zeigt dir in weniger als einer Minute passende
          Jobs — ohne Lebenslauf und ohne lange Formulare.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0.3, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative my-6 h-44 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50"
      >
        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute left-6 top-8 h-20 w-20 rounded-full bg-indigo-200/60 blur-[2px]"
        />
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 6, 0] }}
          transition={{
            duration: 4.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 right-8 h-24 w-24 rounded-full bg-emerald-200/60 blur-[2px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm">
            KI-Matching wird vorbereitet …
          </div>
        </div>
      </motion.div>

      <div className="pb-2">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 text-base font-semibold text-white transition hover:bg-indigo-700"
        >
          Jetzt starten
        </button>
        <p className="mt-3 text-center text-sm text-slate-500">
          Ca. 60 Sekunden · 8 Fragen · Kein Lebenslauf nötig
        </p>
      </div>
    </section>
  );
}

function TextQuestion({
  value,
  remoteEnabled,
  suggestions,
  onChange,
  onToggleRemote,
  onAdvance,
}: {
  value: string;
  remoteEnabled: boolean;
  suggestions: string[];
  onChange: (nextValue: string) => void;
  onToggleRemote: (nextValue: boolean) => void;
  onAdvance: () => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      ),
    [suggestions, value],
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="relative">
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            window.setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder="z. B. München, Berlin, Remote"
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        {showSuggestions && filteredSuggestions.length > 0 ? (
          <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onToggleRemote(!remoteEnabled)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm text-slate-700 transition hover:bg-slate-50"
      >
        <span>Auch Remote-Jobs anzeigen</span>
        <span
          className={[
            "inline-flex h-6 w-11 items-center rounded-full px-1 transition",
            remoteEnabled
              ? "justify-end bg-emerald-500"
              : "justify-start bg-slate-300",
          ].join(" ")}
        >
          <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
        </span>
      </button>

      <button
        type="button"
        disabled={!value.trim()}
        onClick={onAdvance}
        className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Weiter
      </button>
    </div>
  );
}

function SalaryQuestion({
  value,
  min,
  max,
  step,
  onChange,
  onAdvance,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (nextValue: number) => void;
  onAdvance: () => void;
}) {
  const matchCount = Math.max(7, Math.round(120 - (value - min) / 1500));

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Mindestgehalt</p>
            <p className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
              {new Intl.NumberFormat("de-DE").format(value)} €
            </p>
          </div>
          <p className="text-sm font-medium text-emerald-600">
            {matchCount} passende Jobs
          </p>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="mt-6 h-2 w-full appearance-none rounded-full bg-slate-200 accent-indigo-600"
        />
      </div>

      <button
        type="button"
        onClick={onAdvance}
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 text-base font-semibold text-white transition hover:bg-indigo-700"
      >
        Weiter
      </button>

      <button
        type="button"
        onClick={onAdvance}
        className="w-full text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4"
      >
        Lieber später angeben
      </button>
    </div>
  );
}

function formatAnswerLabel(
  step: OnboardingStep,
  answers: Record<string, string | string[] | number | boolean | undefined>,
) {
  const answer = answers[step.id];

  if (step.kind === "single-select" && typeof answer === "string") {
    const option = getStepOptions(step.id, answers).find(
      (item) => item.id === answer,
    );
    return option?.label ?? answer;
  }

  if (step.kind === "multi-select" && Array.isArray(answer)) {
    const labels = answer
      .map(
        (value) =>
          getStepOptions(step.id, answers).find((item) => item.id === value)
            ?.label,
      )
      .filter((value): value is string => Boolean(value));
    return labels.join(" · ");
  }

  if (step.kind === "text" && typeof answer === "string") {
    const remote = answers.locationRemote;
    if (typeof remote === "boolean") {
      return `${answer} · ${remote ? "Remote OK" : "Nur vor Ort"}`;
    }
    return answer;
  }

  if (step.kind === "slider" && typeof answer === "number") {
    return `ab ${new Intl.NumberFormat("de-DE").format(answer)} €`;
  }

  return "";
}

function OnboardingFlow() {
  const {
    state,
    visibleSteps,
    selectOption,
    toggleOption,
    setText,
    setBoolean,
    setSlider,
    advance,
    goBack,
    goToStep,
  } = useOnboarding();
  const autoAdvanceRef = useRef<string | null>(null);
  const isHeroStep = state.currentStepId === heroStepId;

  const currentStep =
    visibleSteps.find((step) => step.id === state.currentStepId) ??
    visibleSteps[0];

  if (!currentStep) {
    return null;
  }

  const currentIndex = visibleSteps.findIndex(
    (step) => step.id === currentStep.id,
  );
  const stepNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
  const currentAnswer = state.answers[currentStep.id];
  const remoteAnswer = state.answers.locationRemote;
  const stepOptions = useMemo(
    () => getStepOptions(currentStep.id, state.answers),
    [currentStep.id, state.answers],
  );
  const sliderConfig = getStepById(currentStep.id)?.sliderConfig;
  const summaryItems = useMemo(
    () =>
      visibleSteps
        .filter((step) => step.id !== "summary")
        .map((step) => ({
          step,
          label: formatAnswerLabel(step, state.answers),
        }))
        .filter((item) => item.label.length > 0),
    [state.answers, visibleSteps],
  );

  useEffect(() => {
    if (
      currentStep.id === "summary" ||
      currentStep.kind !== "single-select" ||
      typeof currentAnswer !== "string" ||
      autoAdvanceRef.current !== currentStep.id
    ) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      advance(currentStep.id);
      autoAdvanceRef.current = null;
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [advance, currentAnswer, currentStep.id, currentStep.kind]);

  const handleSingleSelect = (optionId: string) => {
    autoAdvanceRef.current = currentStep.id;
    selectOption(currentStep.id, optionId);
  };

  if (isHeroStep) {
    return <HeroScreen onStart={() => goToStep(firstStepId)} />;
  }

  return (
    <OnboardingLayout
      stepNumber={stepNumber}
      totalSteps={visibleSteps.length || 1}
      canGoBack={state.history.length > 0}
      onBack={goBack}
    >
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Schritt {stepNumber}
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-900">
          {currentStep.title}
        </h1>

        {currentStep.description ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {currentStep.description}
          </p>
        ) : null}

        {currentStep.id === "summary" ? (
          <div className="mt-8 space-y-3">
            <p className="text-sm text-slate-500">
              Tippe auf einen Chip, um die Antwort zu ändern.
            </p>
            <div className="flex flex-wrap gap-2">
              {summaryItems.map(({ step, label }) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {currentStep.id !== "summary" &&
        currentStep.kind === "single-select" ? (
          <div className="mt-8 space-y-3">
            {stepOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={state.answers[currentStep.id] === option.id}
                onSelect={() => handleSingleSelect(option.id)}
              />
            ))}
          </div>
        ) : null}

        {currentStep.kind === "multi-select" ? (
          <div className="mt-8 space-y-3">
            {stepOptions.map((option) => {
              const selectedValues = Array.isArray(currentAnswer)
                ? currentAnswer
                : [];
              const selected = selectedValues.includes(option.id);
              const maxReached = !selected && selectedValues.length >= 5;

              return (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selected}
                  disabled={maxReached}
                  onSelect={() => toggleOption(currentStep.id, option.id)}
                />
              );
            })}

            <button
              type="button"
              disabled={
                !Array.isArray(currentAnswer) || currentAnswer.length === 0
              }
              onClick={() => advance(currentStep.id)}
              className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Weiter
            </button>
          </div>
        ) : null}

        {currentStep.kind === "text" ? (
          <TextQuestion
            value={typeof currentAnswer === "string" ? currentAnswer : ""}
            remoteEnabled={
              typeof remoteAnswer === "boolean" ? remoteAnswer : true
            }
            suggestions={currentStep.suggestions ?? []}
            onChange={(nextValue) => setText(currentStep.id, nextValue)}
            onToggleRemote={(nextValue) =>
              setBoolean("locationRemote", nextValue)
            }
            onAdvance={() => advance(currentStep.id)}
          />
        ) : null}

        {currentStep.kind === "slider" && sliderConfig ? (
          <SalaryQuestion
            value={
              typeof currentAnswer === "number"
                ? currentAnswer
                : (sliderConfig.defaultValue ?? 65000)
            }
            min={sliderConfig.min}
            max={sliderConfig.max}
            step={sliderConfig.step}
            onChange={(nextValue) => setSlider(currentStep.id, nextValue)}
            onAdvance={() => advance(currentStep.id)}
          />
        ) : null}
      </motion.div>
    </OnboardingLayout>
  );
}

export default function Page() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}
