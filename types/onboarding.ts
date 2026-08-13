export type OptionCardOption = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
};

export type OnboardingStepKind =
  | "single-select"
  | "multi-select"
  | "text"
  | "slider";

export type OnboardingStep = {
  id: string;
  number: number;
  title: string;
  description?: string;
  kind: OnboardingStepKind;
  options?: OptionCardOption[];
  optionsByAnswer?: Record<string, OptionCardOption[]>;
  suggestions?: string[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
  };
  branch?: {
    followIf?: string;
    nextStepId?: string;
    fallbackStepId?: string;
  };
};

export type OnboardingAnswers = Record<
  string,
  string | string[] | number | boolean | undefined
>;

export type OnboardingState = {
  currentStepId: string;
  answers: OnboardingAnswers;
  history: string[];
  isTechPath: boolean;
};

export type OnboardingAction =
  | { type: "SELECT_OPTION"; stepId: string; optionId: string }
  | { type: "TOGGLE_OPTION"; stepId: string; optionId: string }
  | { type: "SET_TEXT"; stepId: string; value: string }
  | { type: "SET_BOOLEAN"; stepId: string; value: boolean }
  | { type: "SET_SLIDER"; stepId: string; value: number }
  | { type: "ADVANCE"; stepId: string }
  | { type: "GO_BACK" }
  | { type: "GO_TO_STEP"; stepId: string };
