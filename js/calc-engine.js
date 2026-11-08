/* ---------- Rechen-Erklärer: Erklär-Logik (ohne Oberfläche, einzeln testbar) ----------
   CALC.validate(a,op,b)  -> null oder freundliche Meldung (Text)
   CALC.explain(a,op,b)   -> { a,op,b, result, restText, shown, steps:[…], probe, vis }
   Schritt: { text, q?, ans?, hint?, note?, jump?, k }
     q    Gleichung mit {?} (nur wenn das Kind etwas ausrechnen kann)
     ans  richtige Zahl für {?}
     jump true, wenn dieser Schritt einen Sprung auf dem Rechenstrich ergänzt
     k    so viele Sprünge sind nach diesem Schritt sichtbar
   vis: { type:'jl', start, jumps } | { type:'dots', f, g } | null
   Methode wie im Schulheft: Zehner zuerst, dann bis zur nächsten Zehnerzahl, dann der Rest. */
(function(){
const OPS=['+','−','·',':'];
const T=n=>`<b>${n}</b>`;                       // Zahl hervorheben

function validate(a,op,b){
 if(!Number.isInteger(a)||!Number.isInteger(b)||!OPS.includes(op))return'Tippe zuerst eine ganze Aufgabe ein.';
 if(a<0||b<0||a>100||b>100)return'Wir üben bis 100. Nimm kleinere Zahlen.';
 if(op==='+'&&a+b>100)return`${a} + ${b} ist mehr als 100. Im Zahlenraum bis 100 darf das Ergebnis höchstens 100 sein. Nimm kleinere Zahlen.`;
 if(op==='−'&&b>a)return`Von ${a} kann man ${b} nicht wegnehmen, denn dann wäre das Ergebnis kleiner als 0. Tausche die Zahlen oder nimm eine kleinere Zahl zum Abziehen.`;
 if(op==='·'&&(a>10||b>10))return'Das kleine Einmaleins geht bis 10 · 10. Nimm Zahlen von 0 bis 10.';
 if(op===':'&&b===0)return'Durch 0 kann man nicht teilen. Probier eine andere Zahl zum Teilen.';
 if(op===':'&&b>10)return'Beim Geteilt-Rechnen nutzen wir die 1er- bis 10er-Reihe. Teile durch eine Zahl von 1 bis 10.';
 return null}

/* ---------- Plus ---------- */
function plus(a0,b0){
 let a=a0,b=b0;const S=[],J=[];let start;
 const r=a+b;
 if(a===0||b===0){
  S.push({text:`Null dazu ändert nichts. ${T(a0)} + ${T(b0)} bleibt ${T(r)}.`,q:`${a0} + ${b0} = {?}`,ans:r,k:0});
  return{result:r,steps:S,probe:`${r} − ${b0} = ${a0}`,vis:null}}
 const swap=a<b&&b>=10;
 if(swap){[a,b]=[b,a];S.push({text:`<b>Tausch-Trick:</b> ${T(a0)} + ${T(b0)} hat dasselbe Ergebnis wie ${T(a)} + ${T(b)}. Mit der großen Zahl vorne ist es leichter. Wir starten bei ${T(a)}.`,k:0})}
 start=a;
 const bt=Math.floor(b/10)*10,b1=b%10;
 if(!swap){
  S.push({text:b>=10&&b1>0?`Wir starten bei ${T(a)}. Die ${T(b)} zerlegen wir in Zehner und Einer: ${b} = <span class="t">${bt}</span> + <span class="o">${b1}</span>.`:`Wir starten bei ${T(a)} und gehen ${T(b)} weiter.`,k:0})}
 let m=a;
 if(bt>0){J.push(bt);S.push({text:`Erst die <span class="t">Zehner</span> dazu:`,q:`${m} + ${bt} = {?}`,ans:m+bt,hint:`${bt/10} Zehner dazu: Springe in Zehnerschritten.`,jump:true,k:J.length});m+=bt}
 if(b1>0){
  const need=(10-m%10)%10;
  if(need===0||b1<=need){
   J.push(b1);S.push({text:`Jetzt die <span class="o">${b1} Einer</span> dazu:`,q:`${m} + ${b1} = {?}`,ans:m+b1,hint:`Zähle ${b1} weiter, ab ${m}.`,jump:true,k:J.length});m+=b1}
  else{
   const ten=m+need,rest=b1-need;
   J.push(need);S.push({text:`Jetzt die <span class="o">${b1} Einer</span>. Erst bis zur nächsten Zehnerzahl springen:`,q:`${m} + ${need} = {?}`,ans:ten,hint:`Wie viel fehlt von ${m} bis ${ten}?`,jump:true,k:J.length});
   J.push(rest);S.push({text:`Es sind noch ${T(rest)} übrig (denn ${need} + ${rest} = ${b1}):`,q:`${ten} + ${rest} = {?}`,ans:ten+rest,hint:`Von ${ten} aus noch ${rest} weiter.`,jump:true,k:J.length});m=ten+rest}}
 return{result:r,steps:S,probe:`${r} − ${b0} = ${a0}`,vis:{type:'jl',start,jumps:J}}}

/* ---------- Minus ---------- */
function minus(a,b){
 const S=[],J=[],r=a-b;
 if(b===0){S.push({text:`Wenn du nichts wegnimmst, bleibt alles da. ${T(a)} − 0 bleibt ${T(a)}.`,q:`${a} − 0 = {?}`,ans:a,k:0});return{result:r,steps:S,probe:`${r} + ${b} = ${a}`,vis:null}}
 if(a===b){S.push({text:`Wenn du dieselbe Zahl wegnimmst, bleibt nichts übrig. ${T(a)} − ${T(b)} ist ${T(0)}.`,q:`${a} − ${b} = {?}`,ans:0,k:0});return{result:0,steps:S,probe:`0 + ${b} = ${a}`,vis:null}}
 const bt=Math.floor(b/10)*10,b1=b%10;
 S.push({text:b>=10&&b1>0?`Wir starten bei ${T(a)}. Die ${T(b)} zerlegen wir: ${b} = <span class="t">${bt}</span> + <span class="o">${b1}</span>. Erst die Zehner weg, dann die Einer.`:`Wir starten bei ${T(a)} und gehen ${T(b)} zurück.`,k:0});
 let m=a;
 if(bt>0){J.push(-bt);S.push({text:`Erst die <span class="t">Zehner</span> weg:`,q:`${m} − ${bt} = {?}`,ans:m-bt,hint:`${bt/10} Zehner weg: Springe in Zehnerschritten zurück.`,jump:true,k:J.length});m-=bt}
 if(b1>0){
  const a1=m%10;
  if(b1<=a1){
   J.push(-b1);S.push({text:`Jetzt die <span class="o">${b1} Einer</span> weg:`,q:`${m} − ${b1} = {?}`,ans:m-b1,hint:`Zähle ${b1} zurück, ab ${m}.`,jump:true,k:J.length});m-=b1}
  else{
   const ten=m-a1,rest=b1-a1;
   J.push(-a1);S.push({text:`Jetzt die <span class="o">${b1} Einer</span>. Erst bis zur Zehnerzahl zurückspringen:`,q:`${m} − ${a1} = {?}`,ans:ten,hint:`Springe ${a1} zurück, bis du bei einer Zehnerzahl bist.`,note:`<b>Achtung, Falle:</b> Bei Minus darf man die Einer nicht umdrehen! Nicht ${b1} − ${a1} rechnen. Der Rechenstrich zeigt den richtigen Weg.`,jump:true,k:J.length});
   J.push(-rest);S.push({text:`Es fehlen noch ${T(rest)} (denn ${a1} + ${rest} = ${b1}):`,q:`${ten} − ${rest} = {?}`,ans:ten-rest,hint:`Von ${ten} aus noch ${rest} zurück.`,jump:true,k:J.length});m=ten-rest}}
 return{result:r,steps:S,probe:`${r} + ${b} = ${a}`,vis:{type:'jl',start:a,jumps:J}}}

/* ---------- Mal (Kernaufgaben: 1er, 2er, 5er, 10er, Verdoppeln) ---------- */
function mal(a0,b0){
 const r=a0*b0,S=[];
 const f=Math.min(a0,b0),g=Math.max(a0,b0);          // f Reihen mit je g Punkten
 const vis={type:'dots',f,g};
 const probe=f===0?`${r} : ${b0||1} …`:`${r} : ${g} = ${f}`;
 if(f===0){S.push({text:`Mal 0 ergibt immer 0: Wenn nichts da ist, kommt auch nichts dazu.`,q:`${a0} · ${b0} = {?}`,ans:0,k:0});return{result:0,steps:S,probe:'',vis:null}}
 if(a0>b0)S.push({text:`<b>Tauschaufgabe:</b> ${T(a0)} · ${T(b0)} hat dasselbe Ergebnis wie ${T(f)} · ${T(g)}. Mit der kleineren Zahl vorne ist es leichter. Das Bild zeigt ${f} Reihen mit je ${g} Punkten.`,k:0});
 else S.push({text:`${T(f)} · ${T(g)} bedeutet: ${f} Reihen mit je ${g} Punkten. Das Bild zeigt es.`,k:0});
 const add=(text,q,ans,hint)=>S.push({text,q,ans,hint,k:0});
 switch(f){
  case 1:add(`Mal 1 ändert nichts:`,`1 · ${g} = {?}`,g,`Eine Reihe mit ${g} Punkten.`);break;
  case 2:add(`Mal 2 heißt <b>verdoppeln</b>:`,`${g} + ${g} = {?}`,2*g,`Zwei Reihen mit ${g} Punkten.`);break;
  case 3:add(`Erst das Doppelte (2 · ${g}):`,`${g} + ${g} = {?}`,2*g);
         add(`Dann noch eine Reihe dazu (3 = 2 + 1):`,`${2*g} + ${g} = {?}`,3*g);break;
  case 4:add(`Erst verdoppeln (2 · ${g}):`,`${g} + ${g} = {?}`,2*g);
         add(`Nochmal verdoppeln (4 = 2 + 2):`,`${2*g} + ${2*g} = {?}`,4*g);break;
  case 5:add(`Die 5er-Reihe ist die Hälfte der 10er-Reihe. Erst 10 · ${g}:`,`10 · ${g} = {?}`,10*g,`Mal 10: Hänge hinten eine 0 an.`);
         add(`Dann halbieren:`,`${10*g} : 2 = {?}`,5*g,`Teile ${10*g} in zwei gleiche Teile.`);break;
  case 6:add(`Zuerst die Kernaufgabe 5 · ${g} (Hälfte von 10 · ${g}):`,`5 · ${g} = {?}`,5*g,`10 · ${g} = ${10*g}, davon die Hälfte.`);
         add(`Dazu kommt noch 1 Reihe (6 = 5 + 1):`,`${5*g} + ${g} = {?}`,6*g);break;
  case 7:add(`Zuerst die Kernaufgabe 5 · ${g} (Hälfte von 10 · ${g}):`,`5 · ${g} = {?}`,5*g,`10 · ${g} = ${10*g}, davon die Hälfte.`);
         add(`Dann 2 Reihen (7 = 5 + 2). Erst 2 · ${g}:`,`${g} + ${g} = {?}`,2*g);
         add(`Beides zusammen:`,`${5*g} + ${2*g} = {?}`,7*g);break;
  case 8:add(`Dreimal verdoppeln! Erst 2 · ${g}:`,`${g} + ${g} = {?}`,2*g);
         add(`Verdoppeln gibt 4 · ${g}:`,`${2*g} + ${2*g} = {?}`,4*g);
         add(`Nochmal verdoppeln gibt 8 · ${g}:`,`${4*g} + ${4*g} = {?}`,8*g);break;
  case 9:add(`Mal 9 ist fast mal 10. Erst 10 · ${g}:`,`10 · ${g} = {?}`,10*g,`Mal 10: Hänge hinten eine 0 an.`);
         add(`Dann eine Reihe wieder weg (9 = 10 − 1):`,`${10*g} − ${g} = {?}`,9*g);break;
  case 10:add(`Mal 10 ist leicht: Hänge hinten eine <b>0</b> an.`,`10 · ${g} = {?}`,10*g);break}
 return{result:r,steps:S,probe:`${r} : ${g} = ${f}`,vis}}

/* ---------- Geteilt (Umkehraufgabe zu Mal) ---------- */
function reihe(b,q,hit,rest){
 const L=[];for(let i=1;i<=q+(rest?1:0);i++){const v=i*b;L.push(`<span class="chip ${i===q?'hit':''} ${i>q?'over':''}">${v}</span>`)}
 return`<span class="reihe">${L.join('')}</span>`}
function geteilt(a,b){
 const S=[],q=Math.floor(a/b),rest=a%b,restText=rest?` Rest ${rest}`:'';
 const probe=rest?`${q} · ${b} + ${rest} = ${a}`:`${q} · ${b} = ${a}`;
 if(a===0){S.push({text:`Wenn nichts da ist, kann man nichts verteilen. 0 : ${T(b)} ist ${T(0)}.`,q:`0 : ${b} = {?}`,ans:0,k:0});return{result:0,restText:'',steps:S,probe,vis:null}}
 if(b===1){S.push({text:`Geteilt durch 1 bleibt die Zahl gleich. Alles bleibt in einem Teil.`,q:`${a} : 1 = {?}`,ans:a,k:0});return{result:a,restText:'',steps:S,probe:`${a} · 1 = ${a}`,vis:null}}
 if(q>10){
  const a1=b*10*Math.floor(a/(b*10)),a2=a-a1,q1=a1/b,q2=Math.floor(a2/b);
  S.push({text:`Das ist eine große Zahl. Zerlege ${T(a)} in ${T(a1)} und ${T(a2)}. Beide Teile teilst du einzeln durch ${T(b)}.`,k:0});
  S.push({text:`Erst der große Teil:`,q:`${a1} : ${b} = {?}`,ans:q1,hint:`${a1/10} Zehner : ${b} = ${q1/10} Zehner.`,k:0});
  S.push({text:`Dann der kleine Teil${a2%b?` (es bleibt Rest ${a2%b})`:''}:`,q:`${a2} : ${b} = {?}`,ans:q2,hint:`Nimm die ${b}er-Reihe zu Hilfe: ${b}, ${2*b}, ${3*b} …`,k:0});
  S.push({text:`Beide Ergebnisse zusammen:`,q:`${q1} + ${q2} = {?}`,ans:q,k:0});
  return{result:q,restText,steps:S,probe,vis:null}}
 S.push({text:`<b>Geteilt ist die Umkehrung von Mal.</b> Du fragst: Wie oft passt die ${T(b)} in die ${T(a)}? Oder: ${T('?')} · ${T(b)} = ${T(a)}${rest?' (fast)':''}.`,k:0});
 S.push({text:`Hilf dir mit der <b>${b}er-Reihe</b>:<br>${reihe(b,q,true,rest)}${rest?`<br>Die nächste Zahl, ${(q+1)*b}, ist schon größer als ${a}.`:''}`,k:0});
 S.push({text:rest?`Das größte Ergebnis, das nicht über ${a} liegt, ist ${T(q*b)}. Welche Malaufgabe passt?`:`Welche Malaufgabe passt?`,q:`{?} · ${b} = ${q*b}`,ans:q,hint:`Zähle in der ${b}er-Reihe, wie viele Zahlen es bis ${q*b} sind.`,k:0});
 if(rest)S.push({text:`Bis ${T(a)} bleibt etwas übrig. Das ist der <b>Rest</b>:`,q:`${a} − ${q*b} = {?}`,ans:rest,hint:`${a} minus ${q*b}.`,k:0});
 return{result:q,restText,steps:S,probe,vis:null}}

function explain(a,op,b){
 const m=validate(a,op,b);if(m)return{error:m};
 const E=op==='+'?plus(a,b):op==='−'?minus(a,b):op==='·'?mal(a,b):geteilt(a,b);
 E.a=a;E.op=op;E.b=b;E.restText=E.restText||'';
 E.total=(E.vis&&E.vis.type==='jl')?E.vis.jumps.length:0;
 return E}

globalThis.CALC={validate,explain,OPS};
})();
