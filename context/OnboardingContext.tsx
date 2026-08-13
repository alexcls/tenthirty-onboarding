"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { firstStepId, getVisibleSteps } from "@/lib/onboarding-steps";
import type { OnboardingAction, OnboardingState } from "@/types/onboarding";

const initialState: OnboardingState = {
  currentStepId: firstStepId,
  answers: {},
  history: [],
  isTechPath: false,
};

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case "SELECT_OPTION": {
      const nextAnswers = {
        ...state.answers,
        [action.stepId]: action.optionId,
      };

      const selectedIndustry =
        typeof nextAnswers.industry === "string"
          ? nextAnswers.industry
          : undefined;

      const visibleSteps = getVisibleSteps(selectedIndustry);
      const currentIndex = visibleSteps.findIndex(
        (step) => step.id === action.stepId,
      );
      const nextStepId = visibleSteps[currentIndex + 1]?.id ?? action.stepId;

      return {
        ...state,
        answers: nextAnswers,
        currentStepId: nextStepId,
        history: [...state.history, action.stepId],
        isTechPath: selectedIndustry === "tech-software",
      };
    }

    case "GO_BACK": {
      const previousStepId = state.history[state.history.length - 1];

      if (!previousStepId) {
        return state;
      }

      return {
        ...state,
        currentStepId: previousStepId,
        history: state.history.slice(0, -1),
      };
    }

    case "GO_TO_STEP": {
      return {
        ...state,
        currentStepId: action.stepId,
      };
    }

    default:
      return state;
  }
}

type OnboardingContextValue = {
  state: OnboardingState;
  visibleSteps: ReturnType<typeof getVisibleSteps>;
  selectOption: (stepId: string, optionId: string) => void;
  goBack: () => void;
  goToStep: (stepId: string) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined,
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const visibleSteps = useMemo(
    () =>
      getVisibleSteps(
        typeof state.answers.industry === "string"
          ? state.answers.industry
          : undefined,
      ),
    [state.answers.industry],
  );

  const value = useMemo<OnboardingContextValue>(
    () => ({
      state,
      visibleSteps,
      selectOption: (stepId: string, optionId: string) => {
        dispatch({ type: "SELECT_OPTION", stepId, optionId });
      },
      goBack: () => {
        dispatch({ type: "GO_BACK" });
      },
      goToStep: (stepId: string) => {
        dispatch({ type: "GO_TO_STEP", stepId });
      },
    }),
    [state, visibleSteps],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}
