"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { getVisibleSteps, heroStepId } from "@/lib/onboarding-steps";
import type { OnboardingAction, OnboardingState } from "@/types/onboarding";

const initialState: OnboardingState = {
  currentStepId: heroStepId,
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
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: action.optionId,
        },
      };
    }

    case "TOGGLE_OPTION": {
      const currentValue = state.answers[action.stepId];
      const currentValues = Array.isArray(currentValue) ? currentValue : [];

      const nextValues = currentValues.includes(action.optionId)
        ? currentValues.filter((value) => value !== action.optionId)
        : [...currentValues, action.optionId];

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: nextValues,
        },
      };
    }

    case "SET_TEXT": {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: action.value,
        },
      };
    }

    case "SET_BOOLEAN": {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: action.value,
        },
      };
    }

    case "SET_SLIDER": {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: action.value,
        },
      };
    }

    case "ADVANCE": {
      const selectedIndustry =
        typeof state.answers.industry === "string"
          ? state.answers.industry
          : undefined;

      const visibleSteps = getVisibleSteps(selectedIndustry);
      const currentIndex = visibleSteps.findIndex(
        (step) => step.id === action.stepId,
      );
      const nextStepId = visibleSteps[currentIndex + 1]?.id;

      if (!nextStepId) {
        return state;
      }

      return {
        ...state,
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
  toggleOption: (stepId: string, optionId: string) => void;
  setText: (stepId: string, value: string) => void;
  setBoolean: (stepId: string, value: boolean) => void;
  setSlider: (stepId: string, value: number) => void;
  advance: (stepId: string) => void;
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
      toggleOption: (stepId: string, optionId: string) => {
        dispatch({ type: "TOGGLE_OPTION", stepId, optionId });
      },
      setText: (stepId: string, value: string) => {
        dispatch({ type: "SET_TEXT", stepId, value });
      },
      setBoolean: (stepId: string, value: boolean) => {
        dispatch({ type: "SET_BOOLEAN", stepId, value });
      },
      setSlider: (stepId: string, value: number) => {
        dispatch({ type: "SET_SLIDER", stepId, value });
      },
      advance: (stepId: string) => {
        dispatch({ type: "ADVANCE", stepId });
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
