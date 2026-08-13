# Product Rationale

## Warum diese Screen-Reihenfolge

Der Flow folgt einem bewussten Aufbau: einfache, schnell beantwortbare Fragen zuerst, aufwendigere und sensiblere Fragen später.

1. **Branche → Situation** (Screens 1–2): niedrigste Eintrittshürde, ein Tap. Die Situationsfrage ("Was beschreibt deine Lage?") ist bewusst eine emotionale statt reine Datenfrage — sie signalisiert dem Nutzer sofort, dass die App seine Lage versteht, statt ihn wie ein Formular zu behandeln.
2. **Rolle → Senioritätslevel → Verfügbarkeit** (Screens 3–5): weiterhin Ein-Klick-Antworten, baut Momentum auf.
3. **Tech-Stack** (Screen 6, Multi-Select): aufwendigste Interaktion im Flow, aber bewusst erst platziert, nachdem der Nutzer bereits vier Antworten investiert hat. Abbruchwahrscheinlichkeit sinkt mit steigendem Investment (Sunk-Cost-Effekt), ähnlich wie bei Duolingos langem Vor-Lektion-Onboarding.
4. **Standort** (Screen 7): mittlerer Aufwand (Texteingabe statt Tap).
5. **Mindestgehalt** (Screen 8): die sensibelste Frage im gesamten Flow, deshalb bewusst zuletzt platziert, wenn Vertrauen und Investment am höchsten sind. Formuliert als Mindestanforderung statt Wunschgehalt, um den typischen Ankereffekt nach oben zu vermeiden und ein realistischeres Matching-Signal zu bekommen — Unternehmen kommunizieren Gehälter ohnehin selten als exakten Wert, ein Mindestwert lässt sich robuster mit vagen Ranges abgleichen als ein Wunschbetrag. Zusätzlich eine "Später angeben"-Option, um Abbruch an genau dieser Stelle zu vermeiden.

## Bewusst eingesetzte UX-Patterns

**Progress-Transparenz.** Der Fortschrittsbalken und "Schritt X / Y" sind durchgehend sichtbar, dazu ein Hinweis auf der Hero Section ("Ca. 60 Sekunden · 8 Fragen"). Das nimmt die Unsicherheit, was den Nutzer erwartet — eine der Haupt-Abbruchursachen bei Onboarding-Flows ohne Erwartungsmanagement.

**Auto-Advance bei Single-Choice.** Nach dem Antippen einer Option springt der Flow automatisch weiter, ohne zusätzlichen "Weiter"-Klick. Reduziert Reibung bei den häufigsten Interaktionen im Flow.

**Soft Reveal statt Hard Wall.** Anders als bei klassischen Subscription-Onboardings (z. B. Cal AI), die direkt auf eine Paywall zulaufen, zeigt TenThirty vor dem Signup einen vollständigen, echten Job (Titel, Firma, Gehalt, Match-Score) — kein Blur, kein Login nötig. Erst die weiteren Matches sind angeschnitten/geblurrt. Der Nutzer bekommt echten Wert, bevor überhaupt etwas verlangt wird, statt sich getäuscht zu fühlen.

**Value-Sprache statt Hürden-Sprache.** Der Signup-CTA heißt "Alle Matches freischalten" statt "Account erstellen", die Signup-Überschrift führt die Sprache des Ergebnis-Screens weiter ("Sichere deine 34 Matches") statt in einen neutralen Formular-Ton zu wechseln. Der Signup soll sich wie eine Fortsetzung des bereits gezeigten Werts anfühlen, nicht wie ein separater bürokratischer Schritt.

**Kontroll-Rückgabe im Summary-Screen.** Vor dem KI-Moment sieht der Nutzer alle Antworten als Chips und kann jede einzelne direkt korrigieren. Das schafft Vertrauen in die Datenqualität und nimmt die Angst, sich "falsch" festgelegt zu haben.

## Welche Momente die Abschlussrate am stärksten erhöhen

Aus meiner Einschätzung die drei wirkungsvollsten Stellen:

1. Der **Transparenz-Hinweis auf der Hero Section** — verhindert Abbruch aus reiner Unsicherheit vor dem Start.
2. Die **Platzierung der Gehaltsfrage am Ende** statt am Anfang — die sensibelste Frage trifft auf den höchsten bereits investierten Aufwand.
3. Der **erste, voll sichtbare Job im Ergebnis-Screen** — der Moment, der tatsächlichen Produktwert zeigt, bevor der Signup-Ask kommt.

## Was ich zuerst A/B-testen würde

Den **Soft-Reveal-Ansatz gegen eine Variante mit komplett geblurrten Ergebnissen**. Meine Annahme ist, dass ein sichtbarer, echter Job die Signup-Rate erhöht, weil er Vertrauen aufbaut — es ist aber auch denkbar, dass ein härterer Wall (alles geblurrt) kurzfristig mehr Signups erzwingt, auch wenn das langfristig die Nutzerzufriedenheit senkt. Das lässt sich nur mit echten Nutzerdaten sauber beantworten, nicht durch reines Bauchgefühl.

## Wie ich AI genutzt habe

Ich habe die komplette Konzeptionsphase (Screen-Reihenfolge, Frage-Formulierungen, Soft-Reveal- statt Hard-Wall-Entscheidung, Mindestgehalt- statt Wunschgehalt-Frage, Scope-Eingrenzung auf eine Branche) selbst durchdacht und mit Claude als Sparringspartner ausgearbeitet und hinterfragt — u. a. anhand einer Analyse vergleichbarer Onboarding-Flows (Duolingo, Cal AI, Headspace). Diese Konzeption habe ich als strukturierten Prompt (`docs/prompt.md`) festgehalten und genutzt, um mit KI-Coding-Tools (Claude Code, GitHub Copilot) die technische Umsetzung zu beschleunigen — Komponentenstruktur, State-Management, Styling. Architektur- und Produktentscheidungen (Datenmodell für Fragen, Matching-Score-Logik, Layout-Anpassungen für Mobile) habe ich dabei selbst getroffen bzw. überprüft und korrigiert, u. a. mehrere funktionale Fehler im generierten Code (fehlerhafte React-Hooks-Reihenfolge, fehlender Auto-Advance im KI-Ladescreen, fehlender Weiter-Button im Summary-Screen).
