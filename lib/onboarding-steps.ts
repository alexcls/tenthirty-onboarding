import type { OnboardingStep } from "@/types/onboarding";

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "industry",
    number: 1,
    title: "In welchem Bereich suchst du?",
    description: "Wähle die Richtung, die zu dir passt.",
    kind: "single-select",
    options: [
      { id: "tech-software", label: "Tech & Software", icon: "💻" },
      { id: "marketing", label: "Marketing", icon: "📣" },
      { id: "sales", label: "Sales", icon: "📈" },
      { id: "design", label: "Design", icon: "🎨" },
      { id: "other", label: "Sonstiges", icon: "✨" },
    ],
    branch: {
      followIf: "tech-software",
      nextStepId: "situation",
      fallbackStepId: "situation",
    },
  },
  {
    id: "situation",
    number: 2,
    title: "Was beschreibt deine Situation am besten?",
    kind: "single-select",
    options: [
      { id: "active-search", label: "Ich suche aktiv einen neuen Job" },
      {
        id: "open-but-not-active",
        label: "Ich bin offen, aber nicht aktiv auf der Suche",
      },
      { id: "just-looking", label: "Ich schaue mich einfach mal um" },
      {
        id: "contract-ending",
        label: "Mein Vertrag läuft aus / ich wurde gekündigt",
      },
    ],
  },
  {
    id: "role",
    number: 3,
    title: "Was ist dein Schwerpunkt?",
    kind: "single-select",
    options: [
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "fullstack", label: "Full-Stack" },
      { id: "mobile", label: "Mobile" },
      { id: "data-ml", label: "Data & ML" },
      { id: "devops", label: "DevOps" },
    ],
  },
  {
    id: "seniority",
    number: 4,
    title: "Wie viel Berufserfahrung bringst du mit?",
    kind: "single-select",
    options: [
      { id: "junior", label: "Junior (0–2 Jahre)" },
      { id: "mid", label: "Mid (2–5 Jahre)" },
      { id: "senior", label: "Senior (5–8 Jahre)" },
      { id: "lead-staff", label: "Lead / Staff (8+ Jahre)" },
    ],
  },
  {
    id: "availability",
    number: 5,
    title: "Ab wann könntest du starten?",
    kind: "single-select",
    options: [
      { id: "immediately", label: "Sofort" },
      { id: "in-1-month", label: "In 1 Monat" },
      { id: "in-3-months", label: "In 3 Monaten" },
      { id: "explore-only", label: "Erstmal nur unverbindlich umschauen" },
    ],
  },
  {
    id: "tech-stack",
    number: 6,
    title: "Womit arbeitest du am liebsten?",
    description: "Wähle bis zu 5 Technologien.",
    kind: "multi-select",
    options: [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "angular", label: "Angular" },
      { id: "typescript", label: "TypeScript" },
      { id: "nextjs", label: "Next.js" },
      { id: "node", label: "Node" },
    ],
  },
  {
    id: "location",
    number: 7,
    title: "Wo möchtest du arbeiten?",
    description: "Stadt, Remote oder beides.",
    kind: "text",
    options: [
      { id: "munich", label: "München" },
      { id: "berlin", label: "Berlin" },
      { id: "hamburg", label: "Hamburg" },
      { id: "remote-only", label: "Nur Remote" },
    ],
  },
  {
    id: "salary",
    number: 8,
    title: "Ab welchem Gehalt wird ein Wechsel für dich interessant?",
    kind: "slider",
    options: [{ id: "salary-threshold", label: "Mindestgehalt" }],
  },
  {
    id: "summary",
    number: 9,
    title: "Passt das so?",
    description: "Überprüfe deine Antworten noch einmal.",
    kind: "single-select",
    options: [{ id: "ready", label: "Alles passt" }],
  },
];

export const firstStepId = onboardingSteps[0].id;

export function getVisibleSteps(selectedIndustry?: string): OnboardingStep[] {
  if (selectedIndustry === "tech-software") {
    return onboardingSteps;
  }

  return onboardingSteps.filter(
    (step) => !["role", "tech-stack"].includes(step.id),
  );
}

export function getStepById(stepId: string): OnboardingStep | undefined {
  return onboardingSteps.find((step) => step.id === stepId);
}
