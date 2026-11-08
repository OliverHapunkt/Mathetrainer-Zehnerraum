/* ---------- Flip-7-Rechenhilfe ----------
   Karten der Hand antippen → Kind rechnet selbst und tippt sein Ergebnis → Vergleich → bei Fehler Erklärung.
   Regeln (Rundenwertung): Zahlenkarten zusammenzählen; ×2 verdoppelt nur die Zahlenkarten;
   Plus-Karten (+2 … +10) kommen danach dazu; 7 verschiedene Zahlen = Flip 7 = +15 Bonus;
   doppelte Zahl = Bust = 0 Punkte. Aktionskarten (Einfrieren, Flip Three, Zweite Chance) zählen 0.
   Teil 1: Rechen-Logik (ohne DOM, testbar). Teil 2: Oberfläche. Nichts wird gespeichert. */
(function(){
function score(nums,mods,bust){
 const ns=[...nums].sort((a,b)=>a-b),sum=ns.reduce((a,b)=>a+b,0);
 const x2=mods.includes('x2'),plus=mods.filter(m=>m!=='x2').map(Number).sort((a,b)=>a-b);
 const plusSum=plus.reduce((a,b)=>a+b,0),base=x2?sum*2:sum,bonus=ns.length===7?15:0;
 return{ns,sum,x2,plus,plusSum,base,bonus,bust:!!bust,total:bust?0:base+plusSum+bonus}}
function chain(start,list){let run=start;return list.map(n=>{const l=`${run} + ${n} = ${run+n}`;run+=n;return l}).join('<br>')}
function steps(S){
 if(S.bust)return[{text:'Du hattest eine Zahl <b>doppelt</b>. Das heißt <b>Bust</b>: In dieser Runde gibt es <b>0 Punkte</b>, egal was sonst noch auf der Hand liegt.'}];
 const R=[];
 if(S.ns.length)R.push({text:'Erst alle <b>Zahlenkarten</b> zusammenzählen:',eq:S.ns.length===1?`${S.ns[0]}`:chain(S.ns[0],S.ns.slice(1))});
 else R.push({text:'Du hast keine Zahlenkarten. Die Zahlenkarten ergeben <b>0</b>.'});
 let cur=S.sum;
 if(S.x2){R.push({text:'Die <b>×2-Karte</b> verdoppelt die Zahlenkarten – aber nur die, nicht die Plus-Karten:',eq:`${S.sum} + ${S.sum} = ${S.sum*2}`});cur=S.sum*2}
 if(S.plus.length){R.push({text:'Die <b>Plus-Karten</b> kommen danach dazu:',eq:chain(cur,S.plus)});cur+=S.plusSum}
 if(S.bonus){R.push({text:'<b>Flip 7!</b> Du hast 7 verschiedene Zahlen. Dafür gibt es <b>15 Bonuspunkte</b>:',eq:`${cur} + 15 = ${cur+15}`})}
 return R}
function diagnose(S,v){
 if(S.bust)return'Bei einer doppelten Zahl (Bust) gibt es <b>0 Punkte</b>.';
 const c=[];
 if(S.bonus&&v===S.total-15)c.push('Du hast den <b>Flip-7-Bonus</b> vergessen: Bei 7 verschiedenen Zahlen gibt es 15 Punkte extra.');
 if(!S.bonus&&v===S.total+15)c.push('Den Bonus von 15 Punkten gibt es nur bei <b>genau 7 verschiedenen Zahlen</b>.');
 if(S.x2&&v===S.sum+S.plusSum+S.bonus)c.push('Du hast die <b>×2-Karte</b> nicht benutzt. Sie verdoppelt die Zahlenkarten.');
 if(S.x2&&S.plusSum&&v===2*(S.sum+S.plusSum)+S.bonus)c.push('Die <b>×2-Karte</b> verdoppelt nur die <b>Zahlenkarten</b>, nicht die Plus-Karten. Die Plus-Karten kommen erst danach dazu.');
 if(S.plusSum&&v===S.base+S.bonus)c.push('Du hast die <b>Plus-Karten</b> vergessen. Sie zählen am Ende dazu.');
 if(S.x2&&v===S.base)c.push(S.plusSum?'Hier fehlen noch die Plus-Karten.':'');
 if(v===S.sum&&(S.x2||S.plusSum||S.bonus))c.push('Das sind nur die Zahlenkarten. Schau, ob noch eine Sonderkarte dazukommt.');
 const ok=c.filter(Boolean);if(ok.length)return ok[0];
 const d=Math.abs(v-S.total);
 if(d===10)return'Fast! Du bist genau um <b>10</b> daneben. Prüf die Zehner nochmal.';
 if(d<=2)return`Fast! Du bist nur um <b>${d}</b> daneben. Prüf die Einer nochmal.`;
 return'Das stimmt noch nicht. Zähle die Zahlenkarten Schritt für Schritt zusammen.'}
globalThis.FLIP7={score,steps,diagnose};

/* ---------- Oberfläche ---------- */
if(typeof EXTRA_VIEWS==='undefined')return;
const F={phase:'pick',nums:[],mods:[],bust:false,input:'',att:0,fb:null,rev:false,S:null,right:false};
const MODS=[2,4,6,8,10,'x2'];
const mlab=m=>m==='x2'?'×2':'+'+m;
const card=(n,cls='')=>`<span class="f7c ${cls}" style="--h:${(typeof n==='number'?n*29:200)}">${n}</span>`;
function handHtml(){
 const L=[...F.nums].sort((a,b)=>a-b).map(n=>card(n)),M=F.mods.slice().sort((a,b)=>(a==='x2')-(b==='x2')||a-b).map(m=>`<span class="f7c mod">${mlab(m)}</span>`);
 if(F.bust)L.push('<span class="f7c bust">doppelt</span>');
 return`<div class="f7hand" role="img" aria-label="Deine Hand">${L.concat(M).join('')||'<span class="muted">keine Karten</span>'}</div>`}
function renderPick(){
 const n=F.nums.length,ready=F.nums.length+F.mods.length>0||F.bust;
 const nums=Array.from({length:13},(_,i)=>`<button class="f7b ${F.nums.includes(i)?'on':''}" style="--h:${i*29}" data-f="num" data-v="${i}" aria-pressed="${F.nums.includes(i)}">${i}</button>`).join('');
 const mods=MODS.map(m=>`<button class="f7b mod ${F.mods.includes(m)?'on':''}" data-f="mod" data-v="${m}" aria-pressed="${F.mods.includes(m)}">${mlab(m)}</button>`).join('');
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>Flip-7-Rechenhilfe</h2></div>
 <div class="card">
  <p class="center" style="margin:0">Tippe die Karten an, die du vor dir liegen hast.</p>
  <div><p class="grouphead" style="margin-top:0">Zahlenkarten</p><div class="f7grid">${nums}</div></div>
  <div><p class="grouphead" style="margin-top:0">Sonderkarten zum Rechnen</p><div class="f7grid f7mods">${mods}</div></div>
  <button class="f7bust ${F.bust?'on':''}" data-f="bust" aria-pressed="${F.bust}">Eine Zahl kam doppelt (Bust)</button>
  <p class="small muted center" style="margin:0">Einfrieren, Flip Three und Zweite Chance geben keine Punkte. Die lässt du weg.</p>
  <div><p class="grouphead" style="margin-top:0">Deine Hand${n===7?' – Flip 7!':''}</p>${handHtml()}</div>
  <div class="row" style="justify-content:center"><button class="btn hay" data-f="go" ${ready?'':'disabled'}>Ich rechne selbst</button><button class="btn ghost" data-f="clr">Alle weg</button></div>
 </div>`}
function renderGuess(){
 const pad=`<div class="pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-f="d" data-v="${n}">${n}</button>`).join('')}<button data-f="del" aria-label="Löschen">⌫</button><button data-f="d" data-v="0">0</button><button class="go" data-f="ok">Prüfen</button></div>`;
 app.innerHTML=`<div class="top"><button class="linkbtn" data-f="edit">← Karten ändern</button><h2>Flip-7-Rechenhilfe</h2></div>
 <div class="card">
  ${handHtml()}
  <p class="center" style="margin:0"><b>Rechne im Kopf oder auf Papier.</b><br>Wie viele Punkte bekommst du? Tippe dein Ergebnis ein.</p>
  <div class="eq">${F.input||'<span class="ph2">?</span>'} <span class="opx" style="font-size:.6em">Punkte</span></div>
  ${F.fb?`<div class="fb ${F.fb.type} pop" role="status">${F.fb.html}</div>`:''}
  ${pad}
  <div class="helpers"><button class="linkbtn" data-f="show">Rechnung zeigen</button></div>
 </div>`}
function renderResult(){
 const S=F.S,st=steps(S).map((s,i)=>`<div class="step done"><span class="n">${i+1}</span><div class="body">${s.text}${s.eq?`<div class="seq">${s.eq}</div>`:''}</div></div>`).join('');
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>${F.right?'Richtig!':'So geht es'}</h2></div>
 <div class="card">
  ${handHtml()}
  ${F.fb?`<div class="fb ${F.fb.type} pop" role="status">${F.fb.html}</div>`:''}
  <div class="eq">Das sind <span class="ok">${S.total}</span> Punkte</div>
  <div class="steps">${st}</div>
  <div class="row" style="justify-content:center"><button class="btn hay" data-f="new" id="nextbtn">Neue Hand</button><button class="btn ghost" data-f="edit">Karten ändern</button></div>
 </div>
 <div class="row" style="justify-content:flex-start">${pony(ponyMood,64)}</div>`;
 ponyMood='calm';const nb=document.getElementById('nextbtn');if(nb)nb.focus({preventScroll:true})}
EXTRA_VIEWS.f7=()=>F.phase==='pick'?renderPick():F.phase==='guess'?renderGuess():renderResult();

function reveal(right){F.S=score(F.nums,F.mods,F.bust);F.right=right;F.phase='result';if(right)ponyMood='happy';render()}
function check(){
 if(F.input==='')return;const S=score(F.nums,F.mods,F.bust),v=+F.input;
 if(v===S.total){F.fb={type:'good',html:'Super, das hast du richtig gerechnet! Hier siehst du den Rechenweg zum Vergleich.'};return reveal(true)}
 F.att++;const why=diagnose(S,v);
 if(F.att===1){F.fb={type:'warn',html:`${why}<br>Rechne nochmal in Ruhe nach.`};F.input='';return render()}
 F.fb={type:'info',html:`${why}<br>Das ist nicht schlimm. Schau dir den Rechenweg an.`};reveal(false)}
function toggle(arr,v){const i=arr.indexOf(v);i<0?arr.push(v):arr.splice(i,1)}
function digit(d){if(F.input.length<3){F.input+=d;render()}}
CLICK_HOOKS.push(b=>{
 const f=b.dataset.f;if(f===undefined)return false;
 const v=b.dataset.v,isN=/^\d+$/.test(v||'');
 if(f==='num'){toggle(F.nums,+v);F.bust=false;render()}
 else if(f==='mod'){toggle(F.mods,isN?+v:v);F.bust=false;render()}
 else if(f==='bust'){F.bust=!F.bust;if(F.bust){F.nums=[];F.mods=[]}render()}
 else if(f==='clr'){F.nums=[];F.mods=[];F.bust=false;render()}
 else if(f==='go'){if(F.nums.length+F.mods.length>0||F.bust){F.phase='guess';F.input='';F.att=0;F.fb=null;render()}}
 else if(f==='d')digit(v);
 else if(f==='del'){F.input=F.input.slice(0,-1);render()}
 else if(f==='ok')check();
 else if(f==='show'){F.fb={type:'info',html:'Hier ist der Rechenweg.'};reveal(false)}
 else if(f==='edit'){F.phase='pick';F.fb=null;render()}
 else if(f==='new'){Object.assign(F,{phase:'pick',nums:[],mods:[],bust:false,input:'',att:0,fb:null});render()}
 return true});
KEY_HOOKS.push(e=>{
 if(view!=='f7'||e.target.tagName==='INPUT'||e.ctrlKey||e.metaKey||e.altKey)return false;
 if(F.phase==='guess'){
  if(/^[0-9]$/.test(e.key)){e.preventDefault();digit(e.key);return true}
  if(e.key==='Backspace'){e.preventDefault();F.input=F.input.slice(0,-1);render();return true}
  if(e.key==='Enter'){e.preventDefault();check();return true}}
 return false});
globalThis.openFlip7=function(){window.scrollTo(0,0);F.phase='pick';F.fb=null;view='f7';render()};
})();
