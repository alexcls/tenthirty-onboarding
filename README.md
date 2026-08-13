# TenThirty — Onboarding Prototyp

Klickbarer Prototyp eines mobile-first Onboarding-Flows für die KI-Job-Matching-App TenThirty.
Von der Hero Section bis zur Account-Erstellung, mit simuliertem KI-Matching (kein echtes Backend).

## Starten

```bash
npm install
npm run dev
```

Danach `http://localhost:3000` öffnen. Für die beste Ansicht die Browser-DevTools auf ein mobiles Gerät stellen (ca. 390px Breite) — der Flow ist mobile-first designt.

## Ordnerstruktur

```
app/
  page.tsx                     — Rendert den gesamten Onboarding-Flow (Hero, Fragen, Summary, KI-Screen, Ergebnis, Signup)
components/
  OnboardingLayout.tsx          — Äußerer Rahmen: Header, Progress-Bar, scrollbarer Content-Bereich, sticky Footer für CTAs
  OptionCard.tsx                — Antippbare Antwortkarte für Single-/Multi-Select-Fragen
  ProgressBar.tsx               — Fortschrittsanzeige oben im Layout
context/
  OnboardingContext.tsx         — State-Management (useReducer) für Antworten, aktuellen Schritt, Verlauf
lib/
  onboarding-steps.ts           — Zentrale Konfiguration aller Fragen/Screens inkl. Optionen, Branchen-Filterung, Slider-Config
data/
  mock-jobs.ts                  — Simulierte Job-Datenbank inkl. Matching-Score-Berechnung basierend auf den Antworten
types/
  onboarding.ts                 — Zentrale TypeScript-Typen für Steps, State und Actions
docs/
  prompt.md                     — Ursprüngliche Produktspezifikation, mit der dieser Prototyp umgesetzt wurde
```

## Wichtigste Komponenten

- **OnboardingLayout** — regelt Header/Progress/Footer-Struktur, damit der primäre CTA-Button auf jedem Screen immer sichtbar bleibt, auch wenn der Inhalt scrollt.
- **onboarding-steps.ts** — die Fragen sind datengetrieben statt als Einzelseiten hartkodiert. Eine neue Frage oder Branche lässt sich durch Ergänzen der Config hinzufügen, ohne neue Komponenten zu bauen.
- **mock-jobs.ts** — berechnet einen nachvollziehbaren Match-Score pro Job (Punkte für Rollen-, Senioritäts-, Remote- und Gehaltsübereinstimmung) statt eines rein zufälligen Werts.

## Bekannte Einschränkungen

Kein echtes Backend, kein echtes Auth. Alle Job-Daten und der "KI-Analyse"-Moment sind simuliert. Details dazu in `NOTES.md`.
