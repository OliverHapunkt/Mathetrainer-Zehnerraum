# Sternchens Lern-Stall

Online: https://oliverhapunkt.github.io/Mathetrainer-Zehnerraum/ (GitHub Pages, Branch `main`)

Beim Start wählt das Kind das Fach: **Mathe** oder **HSU** (Heimat- und Sachunterricht). Hufeisen und Pony-Belohnungen gelten für alle Fächer.

Interaktiver Lerntrainer mit Pony-Motivation. Läuft komplett im Browser, ohne Server, ohne Konto.

## Eigenschaften
- Name wird beim ersten Start abgefragt und nur im Browser (localStorage) gespeichert
- Fortschritt, Hufeisen und Fehlerstatistik bleiben lokal auf dem Gerät
- Keine externen Dienste: Schriften liegen in `fonts/` (SIL OFL), keine Tracker, keine Google-Anfragen
- Aufbau für mehrere Themen: pro Thema eine Datei in `js/topics/`

## Auf GitHub Pages veröffentlichen
1. Neues Repository anlegen und den Inhalt dieses Ordners hochladen (`index.html` muss im Hauptverzeichnis liegen)
2. Im Repository: **Settings → Pages**
3. **Source:** „Deploy from a branch“, Branch `main`, Ordner `/ (root)`, speichern
4. Nach ca. 1 Minute erreichbar unter `https://<benutzername>.github.io/<repo-name>/`
5. Auf Tablet oder Handy: Seite öffnen und „Zum Home-Bildschirm“ hinzufügen

Hinweis: Fortschritt gilt pro Gerät und Browser. Ein Wechsel des Geräts beginnt von vorn.

## Neues Thema hinzufügen
1. `js/topics/_vorlage.js` kopieren, z. B. nach `js/topics/deutsch-klasse2.js`
2. Thema, Übungsplätze, Lernkarten und Aufgaben-Generatoren anpassen (alles in der Vorlage erklärt). Mit `subject:'hsu'` (oder `'mathe'`) wird das Thema einem Fach zugeordnet; neue Fächer in `SUBJECTS` in `js/core.js` eintragen
3. In `index.html` eine Zeile ergänzen: `<script src="js/topics/deutsch-klasse2.js"></script>`
4. Sobald mehr als ein Thema geladen ist, erscheinen oben Reiter zum Umschalten

Stations-IDs müssen über alle Themen eindeutig sein (Präfix mit dem Themen-Kürzel).

## Struktur
- `index.html` – Einstieg und Skript-Reihenfolge
- `css/style.css` – Aussehen (Hell/Dunkel automatisch)
- `js/core.js` – Kern: Speicher, Startbildschirm, Übungsablauf, Pony, Themen-Register
- `js/visuals-math.js` – Mathe-Grafiken (Rechenstrich, Streifenmodell, Hunderterfeld)
- `js/topics/mathe-klasse2.js` – Thema „Mathe Klasse 2“ (Fach `mathe`)
- `js/topics/hsu-wald.js` – Thema „Der Wald“ (Fach `hsu`): Stockwerke, Teile des Baumes, Nadelbäume, Waldregeln, Rechtschreibung
- `js/visuals-hsu.js` – Wald-Grafiken (Stockwerke, Baumteile)
- `js/visuals-journey.js` – Weg-Karte und Merk-Bilder für die „Reise im Kopf“
- `js/topics/hsu-wald-reise.js` – Geschichten, Lernkarten und Quiz der Waldreisen (Gedächtnis-Pfad)
- `zehnerraum.html` – der frühere einfache Zehnerraum-Trainer
- `js/topics/_vorlage.js` – Vorlage für neue Themen (nicht eingebunden)
- `js/main.js` – Startet die App

## Teilen mit Rest
Station „Teilen mit Rest“: Äpfel gerecht auf Pferde verteilen, Rest im Eimer. Eingabe in zwei Feldern (Ergebnis, Rest), gezielte Hinweise bei zu großem Rest oder zu großem Ergebnis, Hilfe in drei Schritten (Zahl aus der Reihe suchen, Malaufgabe, Rest). Dazu die Station „Mal und Geteilt“ fürs gemischte Einmaleins.

## Rechen-Erklärer
Im Fach Mathe tippt das Kind eine Aufgabe ein (+ − · :) und bekommt den Weg Schritt für Schritt gezeigt – oder rechnet die Zwischenschritte selbst mit. Logik: `js/calc-engine.js`, Oberfläche: `js/calc-explainer.js`.

## Lokal testen
`index.html` per Doppelklick öffnen. Alternativ: `python3 -m http.server` im Ordner.

## Aufgabenarten
- `num` – Zahl über Ziffernblock
- `choice` – Auswahl-Knöpfe
- `word` – Wort über Buchstaben-Tastatur (mit ⇧ für Großbuchstaben, auch echte Tastatur); `flash:true` zeigt das Wort kurz und blendet es dann aus
- `tiles` – Buchstaben-Puzzle (`tiles:[…]`)
- Optional: `vis` (HTML oder Funktion `solved=>HTML`), `say` (Vorlesetext), `again()` (gleiche Aufgabe später nochmal), `stepsFor(tag)` (Hilfe-Schritte passend zum Fehler), `onMiss`/`onWin`

## Reise im Kopf (Gedächtnis-Pfad)
Zu jedem Wissensthema gibt es einen Weg mit Stationen. Jede Station hat ein Merk-Bild, eine kurze Geschichte und eine Szene. Am Ende verbindet eine verrückte Geschichte alle Bilder.
Neue Reise: in `js/topics/hsu-wald-reise.js` ein Objekt wie `J_NADEL` anlegen (Stationen mit `name`, `short`, `anchor`, `img`, `hook`, `story`, `facts`, `qa`), Szenen in `js/visuals-journey.js` zeichnen und in `globalThis.WALDREISE_STATIONS` eintragen.

## Keine doppelten Fragen
Jede Aufgabe hat einen Schlüssel (`key`, sonst `prompt`/`story`). In einer Runde kommt jeder Schlüssel nur einmal vor.
