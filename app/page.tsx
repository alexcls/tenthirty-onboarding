"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { OnboardingLayout } from "@/components/OnboardingLayout";
import { OptionCard } from "@/components/OptionCard";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import { getStepById, getStepOptions } from "@/lib/onboarding-steps";

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
  } = useOnboarding();
  const autoAdvanceRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (
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

        {currentStep.kind === "single-select" ? (
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
