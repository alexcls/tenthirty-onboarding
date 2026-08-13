"use client";

import { motion } from "framer-motion";

import { OnboardingLayout } from "@/components/OnboardingLayout";
import { OptionCard } from "@/components/OptionCard";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";

function OnboardingFlow() {
  const { state, visibleSteps, selectOption, goBack } = useOnboarding();

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
          Frage {currentStep.number}
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-900">
          {currentStep.title}
        </h1>

        {currentStep.description ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {currentStep.description}
          </p>
        ) : null}

        {currentStep.options && currentStep.options.length > 0 ? (
          <div className="mt-8 space-y-3">
            {currentStep.options.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={state.answers[currentStep.id] === option.id}
                onSelect={() => selectOption(currentStep.id, option.id)}
              />
            ))}
          </div>
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
