# Sternchens Lern-Stall – Projektnotizen

Lerntrainer (statische Seite, GitHub Pages von `main`) für ein Kind in Klasse 2 (Bayern) mit Aufmerksamkeitsschwierigkeiten. Maskottchen: Pony „Sternchen“.

## Grundsätze
- Kurze Runden (4–8 Aufgaben), eine Aufgabe pro Bildschirm, sofortige freundliche Rückmeldung, Hilfe Schritt für Schritt nach 2 Fehlversuchen
- Fehler erklären statt bestrafen; Fehlerarten (`tag`) werden für Eltern gezählt
- Pferde-Thema ja, aber ohne Ablenkung
- **Rechtschreibung aller Texte sorgfältig prüfen** (kindgerecht, korrekte Groß-/Kleinschreibung)
- Keine externen Anfragen (Schriften liegen lokal), nichts verlässt den Browser

## Nicht brechen
- localStorage-Schlüssel `lernstall.v1` und bestehende Stations-IDs beibehalten (sonst geht der Fortschritt verloren)

## Aufbau
- `js/core.js` Kern (Fachwahl, Übungsablauf, Aufgabenarten num/choice/word/tiles)
- `js/topics/*.js` je Thema eine Datei, `registerTopic({subject:'mathe'|'hsu', …})`, in `index.html` einbinden
- Inhalte HSU „Der Wald“ stammen aus dem Schulheft (Stockwerke, Teile des Baumes, Waldregeln, Nadelbäume)

## Lernmethoden
- „Reise im Kopf“ (Routen-/Gedächtnispfad): Wissen wird entlang eines Weges mit Merk-Bildern gelernt, von unten nach oben. Das Kind lernt gut mit Mnemotechniken und Geschichten
- Aufgaben brauchen einen eindeutigen `key`, damit nichts doppelt in einer Runde kommt

## Rechen-Erklärer (Mathe)
- `js/calc-engine.js`: reine Erklär-Logik `CALC.explain(a,op,b)` (+ − · :), Schritte nach Heft-Methode (Zehner zuerst, Zehnerübergang, Tausch-/Umkehraufgabe, Kernaufgaben beim Einmaleins). Ohne DOM, per `node`/`vm` testbar.
- `js/calc-explainer.js`: Eingabe, Ansicht „Zeig mir den Weg“ / „Ich rechne mit“. Hängt sich über `EXTRA_VIEWS`, `CLICK_HOOKS`, `KEY_HOOKS` (core.js) ein; Startkarte über `tools:[…]` im Thema (`registerTopic`).
- Zahlenraum bis 100, Einmaleins bis 10·10, geteilt durch 1–10 (mit Rest). Nichts wird gespeichert.

## Flip-7-Rechenhilfe (Mathe)
- `js/flip7.js`: Karten der Hand antippen → Kind tippt sein selbst gerechnetes Ergebnis → Vergleich; bei Fehler gezielte Erklärung (`FLIP7.diagnose`), nach 2. Fehlversuch oder „Rechnung zeigen“ der Rechenweg (`FLIP7.steps`).
- Regeln: Zahlenkarten addieren, ×2 nur auf Zahlenkarten, Plus-Karten danach, 7 verschiedene Zahlen = +15, doppelte Zahl = Bust = 0. Aktionskarten zählen 0 und fehlen.
