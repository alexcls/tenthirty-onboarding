## Rolle & Ziel

Du bist ein Senior Frontend Engineer mit starkem Produkt- und UX-Gespür. Baue einen **produktionsnah wirkenden, klickbaren Prototyp** eines Onboarding-Flows für **TenThirty**, eine KI-gestützte Job-Matching-Web-App.

Der Flow beginnt bei der Hero Section einer Landingpage und endet bei der Account-Erstellung. Es geht **nicht** um eine vollständige Landingpage und **nicht** um ein echtes Backend. Die Nutzererfahrung muss echt und flüssig sein, die Daten dahinter dürfen simuliert sein.

**Kontext:** Nutzer kommen über ein TikTok-Video, öffnen den Link im mobilen Browser und haben keinerlei Vorwissen über das Produkt.

---

## Tech-Stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** für Styling
- **Framer Motion** für Transitions und Micro-Interactions
- State-Management bewusst simpel: React Context + `useReducer` für den Onboarding-State. Kein Redux, kein Zustand, keine externe Form-Library.
- Kein Backend, keine Datenbank, keine echten API-Calls. Alle "KI"-Berechnungen und Job-Daten werden lokal simuliert (Mock-Daten + `setTimeout`).

---

## Design-Richtung

- **Mobile-First.** Primär für ca. 390px Breite designen. Auf Desktop wird das mobile Layout mittig zentriert dargestellt (max-width Container), das reicht völlig aus.
- Ein Screen = eine Entscheidung. Große Touch-Targets, viel Weißraum, wenig Text pro Screen.
- Moderne, freundliche, vertrauenswürdige Anmutung. Vorschlag: tiefes Indigo/Blau als Primärfarbe, ein frisches Grün oder Warm-Orange als Akzent für CTAs und Progress, neutrale Grautöne als Basis. Definiere die Palette als CSS-Variablen / Tailwind-Theme-Extension an einer zentralen Stelle.
- Sprache der gesamten UI: **Deutsch**.
- Keine generische Bootstrap-/Template-Optik. Es soll aussehen wie etwas, das man freiwillig benutzen würde.

---

## Der Flow im Detail

### Screen 0 – Hero Section

- Große Headline mit klarem Wertversprechen (z.B. "Finde den Job, der wirklich zu dir passt").
- Kurze Subline, die erklärt, was die App macht.
- Prominenter CTA-Button ("Jetzt starten").
- **Wichtig – Erwartungsmanagement:** direkt unter dem CTA ein dezenter Hinweis wie "Ca. 60 Sekunden · 8 Fragen · Kein Lebenslauf nötig". Das nimmt die Unsicherheit, was einen erwartet, und ist eine bewusste Anti-Abbruch-Maßnahme.
- Dezente Animation/Illustration, die den Screen lebendig macht (kein Stock-Foto).

### Screens 1–8 – Der Fragen-Flow

Jeder Frage-Screen enthält:

- **Progress-Indikator oben** (z.B. schmale Balken-Segmente oder "Schritt 3 von 8"), animiert bei Fortschritt.
- **Zurück-Button** (reduziert Angst vor "falscher" Antwort).
- Frage als große Überschrift, optional eine erklärende Subline.
- Antwortoptionen als große, antippbare Karten/Chips.
- **Auto-Advance:** bei Single-Choice-Fragen automatisch zum nächsten Screen nach kurzer Verzögerung (~250ms), damit kein zusätzlicher "Weiter"-Klick nötig ist. Bei Multi-Select und Slider bleibt ein expliziter Weiter-Button.
  **Frage 1 – Branche**
  "In welchem Bereich suchst du?"
  Kacheln mit Icon: Tech & Software · Marketing · Sales · Design · Sonstiges

> **Scope-Entscheidung:** Nur bei Auswahl "Tech & Software" folgt der vollständige, branchenspezifische Flow (inkl. Frage 3 und 6). Bei allen anderen Branchen wird ein generischer Fallback-Pfad genutzt, der die branchenspezifischen Fragen überspringt. Der Flow darf bei keiner Auswahl abbrechen oder in einen Sackgassen-Screen laufen.

**Frage 2 – Situation / Motivation**
"Was beschreibt deine Situation am besten?"

- Ich suche aktiv einen neuen Job
- Ich bin offen, aber nicht aktiv auf der Suche
- Ich schaue mich einfach mal um
- Mein Vertrag läuft aus / ich wurde gekündigt
  _Zweck: emotionale statt reine Datenfrage. Signalisiert dem Nutzer sofort, dass die App seine Lage versteht._

**Frage 3 – Rolle / Spezialisierung** _(nur Tech-Pfad)_
"Was ist dein Schwerpunkt?"
Kacheln: Frontend · Backend · Full-Stack · Mobile · Data & ML · DevOps

**Frage 4 – Senioritätslevel**
"Wie viel Berufserfahrung bringst du mit?"
Junior (0–2 Jahre) · Mid (2–5) · Senior (5–8) · Lead / Staff (8+)

**Frage 5 – Verfügbarkeit**
"Ab wann könntest du starten?"
Sofort · In 1 Monat · In 3 Monaten · Erstmal nur unverbindlich umschauen

**Frage 6 – Tech-Stack** _(nur Tech-Pfad, Multi-Select)_
"Womit arbeitest du am liebsten?"
Chips, deren Auswahl sich **dynamisch an die Antwort aus Frage 3 anpasst** (Frontend → React, Vue, Angular, TypeScript, Next.js …; Backend → Node, Java, Python, Go, C#/.NET …). Max. 5 auswählbar, Auswahl visuell klar markiert.

_Bewusst spät platziert: aufwendigste Frage, aber zu diesem Zeitpunkt ist das Investment des Nutzers bereits hoch._

**Frage 7 – Standort & Remote**
"Wo möchtest du arbeiten?"
Texteingabe für die Stadt mit simuliertem Autocomplete (Mock-Liste deutscher Städte, gefiltert beim Tippen) + Toggle "Auch Remote-Jobs anzeigen".

**Frage 8 – Mindestgehalt**
"Ab welchem Gehalt wird ein Wechsel für dich interessant?"

Bewusst als **Mindestanforderung**, nicht als Wunschgehalt formuliert (vermeidet Ankereffekte nach oben, liefert realistischeres Matching-Signal).

Umsetzung als **Slider**, nicht als Kacheln:

- Startwert wird **anhand von Rolle + Senioritätslevel vorbelegt** (z.B. Senior Frontend → 65.000 €), damit der Nutzer meist nur fein justieren muss.
- Schrittweite 5.000 €.
- Große, live mitlaufende Zahl über dem Slider.
- Beim Ziehen aktualisiert sich live ein Hinweis wie "Bei diesem Betrag: 47 passende Jobs" (simuliert, aber plausibel mit dem Wert abnehmend/zunehmend).
- Kleiner Textlink darunter: "Lieber später angeben" (überspringt die Frage). Sensibelste Frage im Flow, daher Skip-Option.

### Screen 9 – Zusammenfassung

"Passt das so?"
Kompakte Darstellung aller Antworten als Chips (z.B. "Frontend · Senior · München · Remote OK · ab 65.000 €"). Jeder Chip ist antippbar und springt zur jeweiligen Frage zurück.

_Zweck: gibt Kontrolle zurück, kurz bevor der Nutzer "loslässt", und signalisiert Sorgfalt (erhöht Vertrauen in die spätere Match-Qualität)._

### Screen 10 – Der KI-Moment

Ladebildschirm, ca. 3 Sekunden, mit nacheinander erscheinenden Statuszeilen, jede mit Häkchen-Animation beim Abschluss:

1. "Profil wird analysiert …"
2. "Vergleiche mit 8.400 offenen Stellen …"
3. "Berechne deine Top-Matches …"
   Dazu ein animierter Progress-Ring oder Pulse-Effekt. Der Screen muss sich wie echte Arbeit anfühlen, nicht wie ein billiger Spinner. Am Ende ein kurzer Übergangs-Beat ("Fast geschafft"), bevor das Ergebnis erscheint.

### Screen 11 – Ergebnis / Soft Reveal

**Der wichtigste Screen des gesamten Flows.** Hier wird echter Wert geliefert, bevor irgendetwas verlangt wird.

- Headline mit hochzählender Zahl-Animation: "Wir haben **34** Jobs für dich gefunden".
- **Die erste Job-Karte ist vollständig sichtbar und lesbar** — echter Titel, Firma, Standort, Gehaltsband, Match-Score (z.B. 94 %, mit von 0 hochzählender Animation) und 2–3 Match-Gründe als Chips (z.B. "React · Senior · Remote"). Kein Blur, kein Login nötig.
- Darunter 2–3 weitere Karten **teilweise angeschnitten und geblurrt**, mit Overlay "+31 weitere Matches".
- CTA in Value-Sprache: **"Alle Matches freischalten"** — nicht "Account erstellen".
  _Bewusste Entscheidung: kein komplett verschwommener Wall. Der Nutzer bekommt einen echten, vollständigen Job zu sehen. Der Signup fühlt sich dadurch an wie "ich will mehr davon" statt wie eine Hürde._

Die Job-Daten sind Mock-Daten, sollen aber **plausibel zu den gegebenen Antworten passen** (Rolle, Stadt, Gehalt über der Mindestgrenze), damit die Personalisierung glaubwürdig wirkt.

### Screen 12 – Account-Erstellung

- Überschrift führt die Sprache des Ergebnis-Screens weiter: "Fast geschafft — sichere dir deine 34 Matches" (kein Wechsel in neutralen Formular-Modus).
- Subline mit dem eigentlichen Nutzen für den Nutzer: "Damit deine Matches nicht verloren gehen und du bei neuen passenden Jobs benachrichtigt wirst."
- **Primär: große Buttons "Weiter mit Google" und "Weiter mit Apple"** (simuliert). Darunter klein als Alternative: E-Mail + Passwort.
- Kein langes Formular, keine strengen Passwortregeln, keine Extra-Felder.
- Nach Abschluss ein kurzer Success-State mit Confetti-artigem Moment und "Willkommen bei TenThirty".

---

## Übergreifende Anforderungen

**Micro-Interactions & Motion**

- Sanfte Screen-Transitions (Slide + Fade, Richtung passend zu vor/zurück).
- Kurzer Scale-/Bounce-Effekt beim Antippen einer Antwortkachel.
- Ab Frage 2 ein dezenter, live mitlaufender Zähler im Hintergrund/Footer ("2.847 passende Jobs in deiner Region"), der sich mit jeder Antwort leicht verändert. Erzeugt sofortiges Feedback, dass die eigenen Eingaben etwas bewirken.
- Alle Animationen kurz halten (150–350ms). Der Flow muss sich schnell anfühlen, nicht verspielt-langsam.
- `prefers-reduced-motion` respektieren.
  **Code-Qualität**
- Wiederverwendbare Komponenten statt 12 Einzel-Screens mit dupliziertem Markup. Mindestens: `OnboardingLayout` (Progress + Zurück-Button + Content-Slot), `QuestionScreen`, `OptionCard`, `ChipSelect`, `SalarySlider`, `ProgressBar`, `LoadingSequence`, `JobCard`.
- **Die Fragen werden datengetrieben aus einer zentralen Konfigurationsdatei gerendert** (z.B. `lib/onboarding-steps.ts`), nicht als hartkodierte Einzelseiten. Neue Fragen oder eine neue Branche müssen sich durch Ergänzen der Config hinzufügen lassen. Verzweigungslogik (Tech-Pfad vs. generischer Pfad) ebenfalls dort abbilden.
- Klare Ordnerstruktur: `components/`, `lib/`, `data/` (Mock-Jobs), `types/`.
- TypeScript-Typen für den Onboarding-State und die Step-Config.
- Kurze, aussagekräftige Kommentare nur dort, wo eine Produktentscheidung im Code steckt (z.B. warum spät platziert, warum Skip-Option).
  **Nicht bauen**
- Kein echtes Auth, keine Datenbank, keine echten API-Calls.
- Keine Paywall. Ziel des Flows ist ein kostenloser Account, nicht eine Zahlung.
- Keine vollständige Landingpage über die Hero Section hinaus.
- Keine Über-Abstraktion. Der Prototyp soll in wenigen Stunden lesbar und nachvollziehbar bleiben.

---

## Zusätzliche Deliverables

Lege im Repo zusätzlich an:

**`README.md`** — kurze Anleitung zum Starten, Überblick über die Ordnerstruktur, Liste der wichtigsten Komponenten.

**`RATIONALE.md`** — Produktbegründung, die folgende Fragen beantwortet:

- Warum ist der Flow so strukturiert (insb. Reihenfolge der Fragen: einfache/emotionale Fragen zuerst, sensible Fragen wie Gehalt zuletzt)?
- Welche UX-Patterns wurden bewusst eingesetzt (Progress-Transparenz, Auto-Advance, Soft Reveal statt Hard Wall, Value-Sprache im CTA, Sunk-Cost-Effekt bei der Fragenreihenfolge, Kontroll-Rückgabe im Summary-Screen)?
- Welche Momente erhöhen die Abschlussrate konkret?
- Was würde man zuerst A/B-testen?
  **`NOTES.md`** — Annahmen, bewusst verworfene Ideen, Scope-Entscheidungen (z.B. nur eine Branche vollständig ausgebaut, kein Backend, Mindestgehalt statt Wunschgehalt) und was man mit mehr Zeit ergänzen würde.

---

## Erfolgskriterium

Der Prototyp ist gelungen, wenn ein Außenstehender ihn auf dem Handy durchklicken kann, dabei zu keinem Zeitpunkt überlegen muss, was als Nächstes passiert, am Ende das Gefühl hat, echten Wert bekommen zu haben — und den Account freiwillig erstellen würde, nicht weil er muss.
