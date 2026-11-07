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
