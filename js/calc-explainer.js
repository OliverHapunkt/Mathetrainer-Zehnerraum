/* ---------- Rechen-Erklärer (Oberfläche) ----------
   Das Kind tippt eine Aufgabe ein (+ − · :) und bekommt den Weg zum Ergebnis Schritt für Schritt gezeigt.
   Zwei Wege: „Zeig mir den Weg“ (Weiter-Knopf) oder „Ich rechne mit“ (jeden Zwischenschritt selbst eintippen).
   Die Erklär-Logik steht in calc-engine.js. Hier: Eingabe, Ansicht, Tastatur. Nichts wird gespeichert. */
(function(){
const OPS=CALC.OPS;
const C={phase:'in',a:'',op:'',b:'',msg:'',mode:'show',E:null,i:0,input:'',att:0,solved:false,fb:null,ok:0,asked:0};
const GOOD=['Richtig!','Genau!','Super gerechnet!','Stark, das stimmt!'];

function dotGrid(f,g){
 const d=20,gap=8,W=g*d+16,H=f*d+16+(f>5?gap:0);let s='';
 for(let r=0;r<f;r++)for(let c=0;c<g;c++)s+=`<circle cx="${8+d/2+c*d}" cy="${8+d/2+r*d+(r>=5?gap:0)}" r="7" class="${r<5?'da':'db'}"/>`;
 return`<svg class="dgrid" viewBox="0 0 ${W} ${H}" width="${Math.min(W,260)}" role="img" aria-label="${f} Reihen mit je ${g} Punkten">${s}</svg>`}
function visFor(k){const v=C.E.vis;if(!v)return'';
 if(v.type==='jl')return jumpLine(v.start,v.jumps,k);
 if(v.type==='dots')return dotGrid(v.f,v.g);return''}
function say(html){try{const tx=String(html).replace(/<[^>]+>/g,' ').replace(/\{\?\}/g,' wie viel ').replace(/\+/g,' plus ').replace(/−/g,' minus ').replace(/·/g,' mal ').replace(/ : /g,' geteilt durch ').replace(/=/g,' ist ').replace(/\s+/g,' ');
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(tx);u.lang='de-DE';u.rate=.92;speechSynthesis.speak(u)}catch(e){}}

/* ---------- Eingabe ---------- */
function eqInput(){
 const part=(v,active)=>v!==''?`<span class="num ${active?'cur':''}">${v}</span>`:`<span class="num ph ${active?'cur':''}">&nbsp;</span>`;
 const st=C.op?'b':'a';
 return`${part(C.a,st==='a')}<span class="opx">${C.op||''}</span>${C.op?part(C.b,st==='b'):''}<span class="opx"> = ?</span>`}
function renderIn(){
 const ready=C.a!==''&&C.op&&C.b!=='';
 const keys=[['1','2','3','+'],['4','5','6','−'],['7','8','9','·'],['del','0','clr',':']];
 const pad=keys.flat().map(k=>{
  if(k==='del')return`<button data-c="del" aria-label="Löschen">⌫</button>`;
  if(k==='clr')return`<button data-c="clr" class="small">Neu</button>`;
  if(OPS.includes(k))return`<button data-c="op" data-v="${k}" class="op ${C.op===k?'on':''}" aria-label="${{'+':'plus','−':'minus','·':'mal',':':'geteilt'}[k]}">${k==='·'?'<i class="bigdot"></i>':k}</button>`;
  return`<button data-c="d" data-v="${k}">${k}</button>`}).join('');
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>Rechen-Erklärer</h2></div>
 <div class="card">
  <p class="center" style="margin:0">Tippe eine Aufgabe ein. ${PONY} zeigt dir den Weg zum Ergebnis.</p>
  <div class="eq calcq" aria-live="polite">${eqInput()}</div>
  ${C.msg?`<div class="fb warn pop" role="status">${C.msg}</div>`:''}
  <div class="pad pad4">${pad}</div>
  <div class="row calcgo"><button class="btn hay" data-c="go" data-v="show" ${ready?'':'disabled'}>Zeig mir den Weg</button><button class="btn ghost" data-c="go" data-v="mit" ${ready?'':'disabled'}>Ich rechne mit</button></div>
 </div>
 <div class="row" style="justify-content:flex-start">${pony('calm',64)}<p class="small muted" style="flex:1;margin:0">Geht bis 100. Plus und Minus mit Rechenstrich, Mal und Geteilt mit dem kleinen Einmaleins.</p></div>`}

/* ---------- Ablauf ---------- */
function cur(){return C.E.steps[C.i]}
function asks(s){return s.q&&s.ans!==undefined}
function pending(){const s=cur();return C.mode==='mit'&&asks(s)&&!C.solved}
function stepHtml(s,n,state){   // state: 'done' | 'cur'
 const filled=state==='done'||!(C.mode==='mit'&&asks(s)&&!C.solved);
 const eq=s.q?`<div class="seq">${s.q.replace('{?}',filled?`<b class="ok">${s.ans}</b>`:`<span class="slot">${C.input||'…'}</span>`)}</div>`:'';
 const note=s.note&&(state==='cur'||filled)?`<div class="fb info calcnote">${s.note}</div>`:'';
 return`<div class="step ${state}"><span class="n">${n}</span><div class="body">${s.text}${eq}${note}</div></div>`}
function renderRun(){
 const E=C.E,s=cur(),last=C.i===E.steps.length-1,pend=pending();
 const k=pend&&s.jump?s.k-1:s.k;
 const vis=visFor(k);
 const list=E.steps.slice(0,C.i).map((x,j)=>stepHtml(x,j+1,'done')).join('')+stepHtml(s,C.i+1,'cur');
 const fb=C.fb?`<div class="fb ${C.fb.type} pop" role="status">${C.fb.html}</div>`:'';
 let ctrl;
 if(pend)ctrl=`<div class="pad"><button data-c="d" data-v="1">1</button>${[2,3,4,5,6,7,8,9].map(n=>`<button data-c="d" data-v="${n}">${n}</button>`).join('')}<button data-c="del" aria-label="Löschen">⌫</button><button data-c="d" data-v="0">0</button><button class="go" data-c="ok">Prüfen</button></div>`;
 else ctrl=`<div class="row" style="justify-content:center"><button class="btn hay" data-c="next" id="nextbtn">${last?'Zum Ergebnis':'Weiter'}</button></div>`;
 app.innerHTML=`<div class="top"><button class="linkbtn" data-c="back">← Neue Aufgabe</button><h2>${C.mode==='mit'?'Ich rechne mit':'Zeig mir den Weg'}</h2></div>
 <div class="dots" aria-label="Schritt ${C.i+1} von ${E.steps.length}">${E.steps.map((_,j)=>`<span class="dot ${j<C.i?'a':j===C.i?'now':''}">${ICON.shoe}</span>`).join('')}</div>
 <div class="card">
  <div class="eq">${C.a} ${C.op} ${C.b} = <span class="ph2">?</span></div>
  ${vis?`<div class="vis">${vis}</div>`:''}
  <div class="steps">${list}</div>
  ${fb}
  <div class="calcctrl">${ctrl}</div>
 </div>
 <div class="row" style="justify-content:space-between;flex-wrap:nowrap">${pony(ponyMood,64)}<div class="helpers"><button class="linkbtn" data-c="speak">${ICON.speaker} Vorlesen</button></div></div>`;
 ponyMood='calm';
 const nb=document.getElementById('nextbtn');if(nb)nb.focus({preventScroll:true});
 const cc=app.querySelector('.calcctrl');if(cc&&cc.scrollIntoView)cc.scrollIntoView({block:'nearest',behavior:'smooth'})}
function renderEnd(){
 const E=C.E,res=`${E.result}${E.restText}`;
 const all=E.steps.map((x,j)=>stepHtml(x,j+1,'done')).join('');
 const probeLbl=E.op==='·'?'Probe mit der Umkehraufgabe (Geteilt)':E.op===':'?'Probe mit Mal':'Probe mit der Umkehraufgabe';
 const vis=visFor(E.total);
 const said=C.mode==='mit'&&C.asked?`<p class="center" style="margin:0"><b>${C.ok} von ${C.asked}</b> Zwischenschritten gleich richtig. ${C.ok===C.asked?'Spitze!':'Beim Üben wirst du immer sicherer.'}</p>`:'';
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>Geschafft!</h2></div>
 <div class="card calcres">
  <div class="eq">${C.a} ${C.op} ${C.b} = <span class="ok">${res}</span></div>
  <div class="center" style="gap:6px">${pony('happy',92)}<p style="margin:0"><b>So kommst du zum Ergebnis!</b></p></div>
  ${said}
  ${E.probe?`<div class="merk"><small>${probeLbl}</small><span class="seq" style="display:block">${E.probe} ✓</span></div>`:''}
  ${vis?`<div class="vis">${vis}</div>`:''}
  <details class="calcway"><summary>Den Weg nochmal ansehen</summary><div class="steps">${all}</div></details>
  <div class="row" style="justify-content:center"><button class="btn hay" data-c="new">Neue Aufgabe</button><button class="btn ghost" data-c="again" data-v="show">Nochmal Schritt für Schritt</button>${C.mode==='show'&&E.steps.some(asks)?`<button class="btn ghost" data-c="again" data-v="mit">Ich rechne mit</button>`:''}</div>
 </div>`}
function renderCalc(){C.phase==='in'?renderIn():C.phase==='run'?renderRun():renderEnd()}
EXTRA_VIEWS.calc=renderCalc;

function start(mode){
 const E=CALC.explain(+C.a,C.op,+C.b);
 if(E.error){C.msg=E.error;return render()}
 C.E=E;C.mode=mode;C.i=0;C.input='';C.att=0;C.solved=false;C.fb=null;C.ok=0;C.asked=0;C.phase='run';ponyMood='calm';render()}
function next(){
 if(C.i>=C.E.steps.length-1){C.phase='end';ponyMood='happy';return render()}
 C.i++;C.input='';C.att=0;C.solved=false;C.fb=null;render()}
function check(){
 if(C.input==='')return;const s=cur();
 if(+C.input===s.ans){C.solved=true;C.fb={type:'good',html:pick(GOOD)};C.asked++;if(C.att===0)C.ok++;ponyMood='happy';C.input='';return render()}
 C.att++;
 if(C.att===1){C.fb={type:'warn',html:`Noch nicht ganz. ${s.hint?'Tipp: '+s.hint:'Schau auf den Rechenweg und versuch es nochmal.'}`};C.input='';return render()}
 C.solved=true;C.asked++;C.fb={type:'info',html:`Das ist nicht schlimm. Die Lösung ist <b>${s.ans}</b>. Schau dir an, wie es geht.`};C.input='';render()}
function digit(d){
 if(C.phase==='in'){const t=C.op?'b':'a';let v=C[t];if(v==='0')v='';if(v.length<3)v+=d;C[t]=v;C.msg='';return render()}
 if(C.phase==='run'&&pending()&&C.input.length<3){C.input+=d;render()}}
function del(){
 if(C.phase==='in'){if(C.b!=='')C.b=C.b.slice(0,-1);else if(C.op)C.op='';else C.a=C.a.slice(0,-1);C.msg='';return render()}
 if(C.phase==='run'&&pending()){C.input=C.input.slice(0,-1);render()}}
function reset(){Object.assign(C,{phase:'in',a:'',op:'',b:'',msg:'',E:null,input:'',fb:null});try{speechSynthesis.cancel()}catch(e){}}

CLICK_HOOKS.push((b)=>{
 const c=b.dataset.c;if(c===undefined)return false;
 if(c==='d')digit(b.dataset.v);
 else if(c==='del')del();
 else if(c==='op'){if(C.a!==''){C.op=b.dataset.v;C.msg='';render()}}
 else if(c==='clr'){reset();render()}
 else if(c==='go'){if(C.a!==''&&C.op&&C.b!=='')start(b.dataset.v)}
 else if(c==='ok')check();
 else if(c==='next')next();
 else if(c==='speak'){const s=cur();say(s.text+' '+(s.q?s.q:''))}
 else if(c==='back'||c==='new'){reset();render()}
 else if(c==='again')start(b.dataset.v);
 return true});

const KEYOP={'+':'+','-':'−','−':'−','*':'·','x':'·','·':'·',':':':','/':':'};
KEY_HOOKS.push((e)=>{
 if(view!=='calc'||e.target.tagName==='INPUT'||e.ctrlKey||e.metaKey||e.altKey)return false;
 const key=e.key;
 if(C.phase==='in'){
  if(/^[0-9]$/.test(key)){e.preventDefault();digit(key);return true}
  if(KEYOP[key]&&C.a!==''){e.preventDefault();C.op=KEYOP[key];C.msg='';render();return true}
  if(key==='Backspace'){e.preventDefault();del();return true}
  if(key==='Enter'&&C.a!==''&&C.op&&C.b!==''){e.preventDefault();start('show');return true}
  return false}
 if(C.phase==='run'){
  if(pending()){
   if(/^[0-9]$/.test(key)){e.preventDefault();digit(key);return true}
   if(key==='Backspace'){e.preventDefault();del();return true}
   if(key==='Enter'){e.preventDefault();check();return true}
   return false}
  if(key==='Enter'||key===' '){e.preventDefault();next();return true}}
 return false});

globalThis.openCalc=function(){window.scrollTo(0,0);reset();view='calc';render()};
})();
