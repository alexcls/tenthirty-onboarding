# Notes

## Annahmen

- Zielgruppe ist ein breites, aber überwiegend junges Publikum (TikTok-Herkunft), das primär mobil unterwegs ist — daher konsequent mobile-first designt.
- TenThirtys Monetarisierung erfolgt nicht über eine Nutzer-Paywall (anders als bei den recherchierten Subscription-Apps), daher endet der Flow bei einem kostenlosen Account statt einer Zahlung.
- Nutzer haben kein Vorwissen über das Produkt, wenn sie über TikTok einsteigen — daher der explizite Erwartungs-Hinweis auf der Hero Section.

## Bewusst verworfene Ideen

- **Alle Branchen vollständig ausbauen.** Verworfen zugunsten eines einzigen, tief ausgearbeiteten Tech-Pfads — fünf mittelmäßig ausgearbeitete Branchen hätten in der Zeitbox weniger überzeugt als eine wirklich durchdachte.
- **Gehalt als exakter Wunschwert.** Verworfen zugunsten eines Mindestgehalts, um Ankereffekte zu vermeiden und realistischere Matching-Signale zu bekommen.
- **Komplett geblurrter Ergebnis-Screen (Hard Wall).** Verworfen zugunsten eines Soft Reveal mit einem voll sichtbaren Job — Ziel war, dass sich der Signup wie eine natürliche Fortsetzung anfühlt statt wie eine erzwungene Hürde.
- **Datum-Picker bei der Verfügbarkeitsfrage.** Verworfen zugunsten von vier groben Buttons — schneller beantwortbar, für Matching-Zwecke reicht die grobe Einordnung.

## Scope-Entscheidungen

- Nur die Branche "Tech & Software" hat den vollen, spezifischen Frage-Flow (Rolle, Tech-Stack). Andere Branchen laufen über einen generischen Fallback-Pfad ohne diese beiden Fragen, damit der Flow bei jeder Auswahl trotzdem sauber durchklickbar bleibt.
- Kein echtes Backend, keine echte KI, keine Datenbank. Matching-Score wird lokal aus den Antworten berechnet (Punkte für Rollen-, Senioritäts-, Remote- und Gehaltsübereinstimmung), Jobs sind Mock-Daten.
- Kein echtes Auth (Google/Apple-Buttons sind simuliert, kein OAuth-Flow).

## Mit mehr Zeit würde ich ergänzen

- Echte Verzweigungslogik für weitere Branchen statt nur des einen ausgebauten Tech-Pfads (die Grundstruktur dafür — `branch`-Feld in der Step-Config — ist bereits vorbereitet, aber noch nicht aktiv genutzt).
- Einen echten Success-/Willkommens-Screen nach dem letzten Signup-Klick statt eines wirkungslosen letzten Buttons.
- Automatisierte Tests für die Reducer-Logik in `OnboardingContext.tsx` (Step-Übergänge, Branchen-Filterung), da das der Teil mit der höchsten Fehleranfälligkeit bei zukünftigen Erweiterungen ist.
- Ein echtes A/B-Testing-Setup für die Soft-Reveal- vs. Hard-Wall-Frage aus der Rationale.
- Verbesserte Modularisierung des Codes für bessere Wiederverwendung und Verständlichkeit.
