/* =====================================================================
   VORLAGE für ein neues Thema.  Kopieren, umbenennen, anpassen,
   dann in index.html eine Zeile <script src="js/topics/DATEI.js"></script> ergänzen.

   Ein Thema besteht aus Übungsplätzen (stations). Jeder Platz hat:
     id     eindeutig über ALLE Themen (z. B. 'mal-2er')
     title, sub   Überschrift und Untertitel auf der Kachel
     n      Aufgaben pro Runde
     learn  Lernkarten vor der ersten Runde: [{h:'Überschrift', b:'HTML'}]
     gen    Funktion, die EINE Aufgabe erzeugt (siehe unten)

   Eine Aufgabe (Rückgabe von gen) ist ein Objekt:
   Zahleneingabe:
     {kind:'num', prompt:'3 · {?} = 12', answer:4,
      diagnose(v){ ... return {tag:'fehlerart', msg:'Erklärung (HTML)'} oder null },
      steps:[{q:'Schritt als HTML mit {?}', a:4}],   // Hilfe "Schritt für Schritt"
      after:'Probe: 3 · 4 = 12 ✓'}
   Auswahl:
     {kind:'choice', prompt:'Frage (HTML)', answer:'richtig', options:['richtig','falsch','falsch2'],
      diagnose(v){...}, explain:'Erklärung, falls zweimal falsch'}
   Mehrschritt-Textaufgabe:
     {stepsOnly:true, story:'...', frage:'...', steps:[{q, a} | {kind:'choice', q, options, a}]}

   Optionale Felder bei kind:'num': bar, hf, strip, jl (Grafiken, siehe visuals-math.js).
   Verfügbare Helfer: R(a,b) Zufallszahl, pick(liste), shuffle(liste), ICON, esc().
   Fehlerarten (tag) werden für Eltern gezählt; Klartext dafür in errNames.
   ===================================================================== */
(function(){
 function genMal2(){
  const a=R(1,10),r=a*2;
  return{kind:'num',prompt:`2 · ${a} = {?}`,answer:r,
   diagnose:v=>v===a+2?{tag:'plusstattmal',msg:'Das wäre plus. <b>2 · '+a+'</b> heißt: zweimal die '+a+', also '+a+' + '+a+'.'}:null,
   steps:[{q:`2 · ${a} heißt ${a} + ${a}:<br><b>${a} + ${a}</b> = {?}`,a:r}],
   after:`2 · ${a} = ${a} + ${a} = ${r}`};
 }
 registerTopic({
  id:'vorlage',
  title:'Vorlage-Thema',
  sub:'Beispiel: kleines Einmaleins',
  stations:[{id:'vorlage-2er',title:'Die 2er-Reihe',sub:'Doppelte finden',n:5,gen:genMal2,
   learn:[{h:'Malnehmen mit 2',b:'<p>2 · 6 heißt: zweimal die 6. Das ist <b>6 + 6 = 12</b>.</p><div class="merk"><small>Merk dir</small>Mal 2 ist das Doppelte.</div>'}]}],
  turnier:{title:'Turnier-Ritt',sub:'Alles gemischt',n:6,gen:genMal2},
  errNames:{plusstattmal:'Plus statt Mal gerechnet'},
  parentNote:'Beispielthema zum Ausprobieren.'
 });
})();
