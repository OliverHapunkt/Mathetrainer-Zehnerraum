/* ---------- helpers ---------- */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const TO=n=>n>=10&&n<100?`<span class="t">${Math.floor(n/10)}</span><span class="o">${n%10}</span>`:`${n}`;
const KEY='lernstall.v1';
const PONY='Sternchen';
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){let s=null;try{s=JSON.parse(localStorage.getItem(KEY))}catch(e){}if(!s||!s.st)s={name:'',topic:null,shoes:0,st:{},err:{},intro:{}};
 s.subject=s.subject||null;s.tsel=s.tsel||{};s.miss=s.miss||{};return s}
const S=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function bump(tag){S.err[tag]=(S.err[tag]||0)+1}
/* Vorlesen ohne Mathe-Ersetzungen (für Sachunterricht, Deutsch …) */
function sayPlain(html){try{const tx=String(html).replace(/<[^>]+>/g,' ').replace(/\{\?\}/g,' … ').replace(/\s+/g,' ');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(tx);u.lang='de-DE';u.rate=.88;speechSynthesis.speak(u)}catch(e){}}
function speak(html){try{const tx=html.replace(/<[^>]+>/g,' ').replace(/\{\?\}|\?(?=\s*$)/g,' wie viel ').replace(/−/g,' minus ').replace(/:/g,' geteilt durch ').replace(/\s+/g,' ');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(tx);u.lang='de-DE';u.rate=.92;speechSynthesis.speak(u)}catch(e){}}

const ICON={
 shoe:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5 L5.2 10 A6.8 6.8 0 1 0 18.8 10 L17 3.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="6.4" cy="12.6" r=".9" fill="var(--surface)"/><circle cx="17.6" cy="12.6" r=".9" fill="var(--surface)"/><circle cx="8.6" cy="17.6" r=".9" fill="var(--surface)"/><circle cx="15.4" cy="17.6" r=".9" fill="var(--surface)"/></svg>',
 star:on=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path class="${on?'star-on':'star-off'}" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/></svg>`,
 speaker:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 carrot:'<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><path d="M14 14 L30 30 Q32 33 29 32 L12 18 Q9 15 14 14Z" fill="#EE7A1E"/><path d="M13 15 Q8 7 11 4 M14 14 Q12 6 17 5 M15 14 Q19 8 22 9" stroke="#3C8A3F" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M18 20l2-1M22 24l2-1M25 27l2-1" stroke="#B9530C" stroke-width="1.5"/></svg>'
};

/* ---------- pony ---------- */
const ACC=[{at:15,name:'Blume'},{at:45,name:'Stirnschleife'},{at:90,name:'Turnier-Medaille'},{at:160,name:'Krone'}];
function pony(mood='calm',size=110){
 const s=S.shoes, happy=mood!=='calm';
 const eyes=happy?'<path d="M64 108 Q74 98 84 108" stroke="var(--eye)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M116 108 Q126 98 136 108" stroke="var(--eye)" stroke-width="5" fill="none" stroke-linecap="round"/>'
  :'<circle cx="74" cy="108" r="10" fill="var(--eye)"/><circle cx="126" cy="108" r="10" fill="var(--eye)"/><circle cx="77" cy="104" r="3.4" fill="#fff"/><circle cx="129" cy="104" r="3.4" fill="#fff"/>';
 return `<svg class="pony ${mood}" viewBox="0 0 200 210" width="${size}" height="${Math.round(size*1.05)}" aria-hidden="true">
 <path d="M60 58 L44 6 L88 42Z" fill="var(--horse)"/><path d="M140 58 L156 6 L112 42Z" fill="var(--horse)"/>
 <path d="M62 50 L52 20 L78 42Z" fill="var(--horse-in)"/><path d="M138 50 L148 20 L122 42Z" fill="var(--horse-in)"/>
 <ellipse cx="100" cy="108" rx="58" ry="70" fill="var(--horse)"/>
 <path d="M66 46 Q78 20 100 30 Q124 18 136 46 Q120 40 112 58 Q104 44 96 60 Q88 42 66 46Z" fill="var(--mane)"/>
 <path d="M100 66 l5 10 11 1.5 -8 7.5 2 11 -10 -5.5 -10 5.5 2 -11 -8 -7.5 11 -1.5z" fill="#FFF7EA"/>
 ${eyes}
 ${happy?'<ellipse cx="62" cy="134" rx="10" ry="6" fill="#F08F7A" opacity=".55"/><ellipse cx="138" cy="134" rx="10" ry="6" fill="#F08F7A" opacity=".55"/>':''}
 <ellipse cx="100" cy="164" rx="44" ry="33" fill="var(--muzzle)"/>
 <ellipse cx="84" cy="160" rx="6" ry="8" fill="#6B3B22"/><ellipse cx="116" cy="160" rx="6" ry="8" fill="#6B3B22"/>
 <path class="mouth" d="${happy?'M84 180 Q100 196 116 180':'M88 184 Q100 190 112 184'}" stroke="#6B3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
 ${s>=ACC[0].at?'<g transform="translate(150 52)"><circle r="7" cx="0" cy="-9" fill="#F6A5C0"/><circle r="7" cx="9" cy="-2" fill="#F6A5C0"/><circle r="7" cx="5" cy="9" fill="#F6A5C0"/><circle r="7" cx="-6" cy="8" fill="#F6A5C0"/><circle r="7" cx="-9" cy="-3" fill="#F6A5C0"/><circle r="5.5" fill="#F2B632"/></g>':''}
 ${s>=ACC[1].at?'<path d="M48 66 Q100 54 152 66 L150 74 Q100 62 50 74Z" fill="#3B82C4"/><path d="M48 70 l-14 -10 2 18z M48 70 l-12 10 12 4z" fill="#3B82C4"/>':''}
 ${s>=ACC[2].at?'<path d="M90 194 L100 206 L110 194" stroke="#C0392B" stroke-width="6" fill="none"/><circle cx="100" cy="200" r="9" fill="#F2B632" stroke="#B8860B" stroke-width="2"/>':''}
 ${s>=ACC[3].at?'<path d="M76 30 L80 6 L92 20 L100 2 L108 20 L120 6 L124 30Z" fill="#F2B632" stroke="#B8860B" stroke-width="2"/>':''}
 </svg>`}


/* ---------- Themen-Register ----------
   Jedes Thema (js/topics/*.js) ruft registerTopic({...}) auf. Siehe README. */
const TOPICS=[],STMAP={};
/* Fächer: jedes Thema gehört zu einem Fach (subject). Beim Start wählt das Kind das Fach. */
const SUBJECTS={
 mathe:{title:'Mathe',sub:'Rechnen wie ein Profi',icon:'<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><rect x="4" y="4" width="56" height="56" rx="14" fill="var(--info-soft)"/><path d="M20 18v16M12 26h16M38 26h14M38 42h14M38 48h14M14 42l12 10M26 42 14 52" stroke="var(--tens)" stroke-width="4" stroke-linecap="round"/></svg>'},
 hsu:{title:'HSU',sub:'Heimat- und Sachunterricht',icon:'<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><rect x="4" y="4" width="56" height="56" rx="14" fill="var(--good-soft)"/><path d="M32 10 46 32H38L49 47H15L26 32H18Z" fill="var(--grass)"/><rect x="29" y="47" width="6" height="9" rx="2" fill="var(--horse)"/></svg>'}
};
function registerTopic(t){
 t.subject=t.subject||'mathe';
 t.stations.forEach(s=>{if(STMAP[s.id])console.warn('Doppelte Stations-ID:',s.id);s.topic=t.id;s.subject=t.subject;STMAP[s.id]=s});
 const tu=Object.assign({id:t.id+'-turnier',learn:[],topic:t.id,subject:t.subject},t.turnier);
 STMAP[tu.id]=tu;t.turnierStation=tu;t.errNames=t.errNames||{};TOPICS.push(t)}
function subjects(){return Object.keys(SUBJECTS).filter(k=>TOPICS.some(t=>t.subject===k))}
function subjTopics(){const sj=S.subject||subjects()[0];return TOPICS.filter(t=>t.subject===sj)}
function curTopic(){const L=subjTopics();return L.find(t=>t.id===S.tsel[S.subject])||L.find(t=>t.id===S.topic)||L[0]}
function isPlain(id){const s=STMAP[id];return s&&s.subject!=='mathe'}


/* ---------- screens ---------- */
const app=document.getElementById('app');
let view=S.name?'pick':'welcome',P=null,L=null,ponyMood='calm',confirmReset=false,flashTimer=null;
const PRAISE_M=['Super gemacht!','Richtig! Sternchen wiehert vor Freude.','Klasse – sauber gerechnet!','Stark! So geht das.','Ja! Volltreffer.','Richtig! Du wirst immer sicherer.'];
const PRAISE_H=['Super gemacht!','Richtig! Sternchen wiehert vor Freude.','Klasse – genau richtig!','Stark! Du bist ein echter Wald-Profi.','Ja! Volltreffer.','Richtig! Du wirst immer sicherer.'];
const PRAISE_W=['Perfekt geschrieben!','Richtig! Jeder Buchstabe sitzt.','Super! Das Wort kannst du jetzt.','Klasse – fehlerfrei!','Ja! Sternchen ist stolz auf dich.'];
function praise(){if(P&&P.t&&(P.t.kind==='word'||P.t.kind==='tiles'))return pick(PRAISE_W);return pick(P&&isPlain(P.id)?PRAISE_H:PRAISE_M)}
const PRAISE2=['Richtig! Beim zweiten Versuch geschafft – das zählt!','Ja! Gut, dass du nochmal nachgedacht hast.'];
const STEPOK=['Richtig!','Genau!','Prima!','Stimmt!'];
const TRY=['Noch nicht ganz. Schau nochmal genau hin.','Fast! Probier es nochmal in Ruhe.'];
function starsOf(id){return(S.st[id]&&S.st[id].stars)||0}
function nextAcc(){return ACC.find(a=>a.at>S.shoes)}

function renderWelcome(){
 app.innerHTML=`<div class="card center pop">${pony('happy',150)}<h1>Hallo! Ich bin ${PONY}.</h1>
 <p>Wie heißt du?</p>
 <input id="nm0" maxlength="20" autocomplete="off" aria-label="Dein Name" style="font:inherit;font-size:1.4rem;text-align:center;padding:12px 16px;border-radius:16px;border:2px solid var(--line);background:var(--surface2);color:var(--ink);width:100%;max-width:320px">
 <button class="btn hay" data-act="welcome-go">Los geht's</button>
 <p class="small muted">Der Name und dein Fortschritt bleiben nur auf diesem Gerät im Browser gespeichert.</p></div>`;
 const i=document.getElementById('nm0');i.addEventListener('keydown',e=>{if(e.key==='Enter')welcomeGo()});i.focus()}
function welcomeGo(){const v=document.getElementById('nm0').value.trim();if(!v){document.getElementById('nm0').focus();return}S.name=v;save();view='pick';render()}

function renderPick(){
 const sj=subjects();
 if(sj.length<2){S.subject=sj[0];view='home';return renderHome()}
 app.innerHTML=`<div class="card center pop">${pony('happy',120)}<h1>Hallo ${esc(S.name)}!</h1><p class="lead">Was möchtest du heute üben?</p>
 <div class="subjects">${sj.map(k=>{const s=SUBJECTS[k];return`<button class="subj ${S.subject===k?'last':''}" data-subject="${k}">${s.icon}<b>${s.title}</b><span>${s.sub}</span></button>`}).join('')}</div>
 <p class="small muted"><span class="shoes">${ICON.shoe}${S.shoes} Hufeisen</span> – die Hufeisen gelten für alle Fächer.</p></div>`}

function renderHome(){
 const T=curTopic(),na=nextAcc(),prev=[...ACC].reverse().find(a=>a.at<=S.shoes),from=prev?prev.at:0;
 const pct=na?Math.round((S.shoes-from)/(na.at-from)*100):100;
 const reco=T.stations.find(s=>starsOf(s.id)<3)||T.turnierStation;
 const all=[...TOPICS.flatMap(t=>t.stations),...TOPICS.map(t=>t.turnierStation)];
 const ST_=subjTopics(),errNames=Object.assign({},...ST_.map(t=>t.errNames)),SJ=SUBJECTS[T.subject];
 const rows=[...T.stations,T.turnierStation].map(s=>{const d=S.st[s.id];return`<tr><td>${s.title}</td><td>${d?d.rounds+(d.rounds===1?' Runde · ':' Runden · ')+Math.round(d.first/d.total*100)+'% beim 1. Versuch':'noch nicht geübt'}</td></tr>`}).join('');
 const errs=Object.entries(S.err).filter(([k])=>errNames[k]).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${errNames[k]}</td><td>${v}×</td></tr>`).join('')||'<tr><td colspan="2" class="muted">Noch keine Fehler erfasst.</td></tr>';
 const tabs=ST_.length>1?`<div class="tabs" role="tablist">${ST_.map(t=>`<button class="tab ${t.id===T.id?'on':''}" role="tab" aria-selected="${t.id===T.id}" data-topic="${t.id}">${t.title}</button>`).join('')}</div>`:'';
 const multi=subjects().length>1;
 app.innerHTML=`
 ${multi?`<div class="top"><span class="subjtag">${SJ.icon}<b>${SJ.title}</b></span><span class="spacer"></span><button class="linkbtn" data-act="pick">⇄ Fach wechseln</button></div>`:''}
 <div class="hero">${pony(ponyMood,104)}<div class="txt">
  <h1>Hallo ${esc(S.name)}!</h1>
  <div class="row"><span class="shoes">${ICON.shoe}${S.shoes} Hufeisen</span></div>
  ${na?`<div class="prog" aria-label="Fortschritt"><i style="width:${pct}%"></i></div><p class="small muted">Noch ${na.at-S.shoes} Hufeisen, dann bekommt ${PONY}: <b>${na.name}</b></p>`:`<p class="small">${PONY} hat alles bekommen. Du bist ein Profi!</p>`}
 </div></div>
 ${tabs}
 <div class="reco"><div class="txt"><span class="eyebrow">Heute empfohlen</span><h2>${reco.title}</h2><span class="muted small">${reco.sub} · ca. 5 Minuten</span></div><button class="btn" data-go="${reco.id}">Los geht's</button></div>
 <h3>${T.sub}</h3>
 ${[...new Set(T.stations.map(s=>s.group||''))].map(g=>`${g?`<p class="grouphead">${g}</p>`:''}<div class="grid">${T.stations.filter(s=>(s.group||'')===g).map(s=>`<button class="st" data-go="${s.id}"><b>${s.title}</b><span>${s.sub}</span><div class="stars" aria-label="${starsOf(s.id)} von 3 Sternen">${[1,2,3].map(i=>ICON.star(i<=starsOf(s.id))).join('')}</div></button>`).join('')}</div>`).join('')}
 <button class="turnier" data-go="${T.turnierStation.id}">${pony('calm',44)}<div><b style="font-family:var(--display);font-size:1.15rem">${T.turnierStation.title}</b><br><span class="muted small">${T.turnierStation.n} gemischte Aufgaben – zeig, was du kannst</span></div><span class="spacer"></span><span class="stars">${[1,2,3].map(i=>ICON.star(i<=starsOf(T.turnierStation.id))).join('')}</span></button>
 <details class="parents"><summary>Für Eltern</summary>
  <p class="small muted" style="margin-top:8px">${T.parentNote?T.parentNote+' ':''}Falsche Antworten werden erkannt und gezielt erklärt. Nach zwei Fehlversuchen wird die Aufgabe gemeinsam in Schritten gelöst, später kommt eine ähnliche Aufgabe nochmal. Empfehlung: täglich 1–2 Runden à 5 Minuten statt einer langen Sitzung.</p>
  <h3 style="margin-top:14px">${T.title}: Stand</h3>
  <div class="tblwrap"><table class="ptable">${rows}</table></div>
  <h3 style="margin-top:14px">Häufigste Fehlerarten</h3>
  <div class="tblwrap"><table class="ptable">${errs}</table></div>
  ${T.parentExtra?T.parentExtra():''}
  <div class="row" style="margin-top:12px"><label for="nm" class="small">Name:</label><input id="nm" value="${esc(S.name)}" maxlength="20" style="font:inherit;padding:6px 10px;border-radius:10px;border:2px solid var(--line);background:var(--surface2);color:var(--ink);max-width:160px">
  <span class="spacer"></span><button class="linkbtn" data-act="reset">Fortschritt zurücksetzen</button></div>
  ${confirmReset?'<div class="confirm row"><span>Wirklich alles löschen (Name und Fortschritt)?</span><button class="btn small" data-act="reset-yes">Ja, löschen</button><button class="btn small ghost" data-act="reset-no">Abbrechen</button></div>':''}
 </details>`;
 ponyMood='calm';
 const nm=document.getElementById('nm');nm.addEventListener('change',()=>{S.name=nm.value.trim()||S.name;save();renderHome()});
}

function openStation(id){const s=STMAP[id];if(s.learn.length&&!S.intro[id]){L={id,i:0};view='learn';render()}else startPractice(id)}
function renderLearn(){
 const s=STMAP[L.id],sl=s.learn[L.i],last=L.i===s.learn.length-1;
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>${s.title}</h2><span class="muted small">${L.i+1} / ${s.learn.length}</span></div>
 <div class="card pop"><div class="pony-corner">${pony('calm',58)}<div class="bubble">${sl.h}</div></div>${sl.b}
 <div class="helpers"><button class="linkbtn" data-act="speak-learn">${ICON.speaker} Vorlesen</button></div></div>
 <div class="row">${L.i>0?'<button class="btn ghost" data-act="lprev">Zurück</button>':''}<span class="spacer"></span>${last?'<button class="btn hay" data-act="lstart">Jetzt üben!</button>':'<button class="btn" data-act="lnext">Weiter</button>'}</div>`}

/* Aufgabenarten: 'num' (Ziffernblock), 'choice' (Auswahl), 'word' (Buchstaben-Tastatur), 'tiles' (Buchstaben-Puzzle) */
const INPUT_KINDS=['num','word','tiles'];
const KB=['qwertzuiopü','asdfghjklöä','yxcvbnmß'];
function startPractice(id){const s=STMAP[id];S.intro[id]=1;save();P={id,tasks:Array.from({length:s.n},()=>s.gen()),i:0,first:0,earned:0,requeued:0,res:[]};view='practice';newTask()}
function clr(){P.input='';P.used=[];P.caps=false}
function newTask(){clearTimeout(flashTimer);const t=P.tasks[P.i];Object.assign(P,{t,input:'',used:[],caps:false,att:0,mode:t.stepsOnly?'steps':'main',si:0,satt:0,stepErr:false,fb:null,solved:false,log:[],wrong:[],flashing:false});if(t.flash)return startFlash();render()}
function startFlash(){const t=P.t;P.flashing=true;clearTimeout(flashTimer);render();if(t.sayWord)sayPlain(t.sayWord);
 const ms=2800+170*String(t.answer).length;flashTimer=setTimeout(()=>{if(P&&P.t===t&&view==='practice'){P.flashing=false;render()}},ms)}
function curStep(){return P.mode==='main'?P.t:P.t.steps[P.si]}
function curKind(){if(P.mode==='main')return P.t.kind;const st=P.t.steps[P.si];return st?(st.kind||'num'):null}
function slot(){const w=curKind()!=='num';return`<span class="slot ${P.input?'':'empty'} ${w?'w':''}">${P.input?esc(P.input):'?'}</span>`}
function fill(str,val){return str.includes('{?}')?str.replace('{?}',val):str}
function matches(kind,val,ans,acc){if(kind==='num')return +val===ans;if(kind==='word'||kind==='tiles'){const v=String(val).trim();return v===ans||(acc||[]).includes(v)}return val===ans}
function keyboard(){const up=P.caps;
 return`<div class="kb" aria-label="Buchstaben-Tastatur">${KB.map((r,i)=>`<div class="kbr">${i===2?`<button class="kk wide ${up?'on':''}" data-kb="caps" aria-label="Großbuchstabe" title="Großbuchstabe">⇧</button>`:''}${[...r].map(c=>`<button class="kk" data-kb="${c}">${up&&c!=='ß'?c.toUpperCase():c}</button>`).join('')}${i===2?'<button class="kk wide" data-kb="del" aria-label="Löschen">⌫</button>':''}</div>`).join('')}
 <div class="kbr"><button class="kk go" data-kb="ok">Prüfen</button></div></div>`}
function tilesPad(){const tl=curStep().tiles||[];
 return`<div class="tiles">${tl.map((c,i)=>`<button class="tile" data-tile="${i}" ${P.used.includes(i)?'disabled':''}>${esc(c)}</button>`).join('')}</div>
 <div class="row" style="justify-content:center"><button class="btn ghost small" data-kb="del">⌫ Zurück</button><button class="btn small" data-kb="ok">Prüfen</button></div>`}
function renderPractice(){
 const t=P.t,s=STMAP[P.id],plain=isPlain(P.id);
 const dots=P.tasks.map((_,i)=>`<span class="dot ${P.res[i]||(i===P.i?'now':'')}">${ICON.shoe}</span>`).join('');
 let head='';
 if(t.stepsOnly)head=`<div class="story">${t.story}<div class="frage">${t.frage}</div></div>`;
 else{const inp=INPUT_KINDS.includes(t.kind),cls=plain?'eq wordq':'eq';
  const ans=`<b class="ok" style="font-size:inherit">${esc(t.answer)}</b>`;
  const shown=P.solved?ans:(P.flashing?`<b class="flash">${esc(t.answer)}</b>`:(P.mode==='main'&&inp?slot():(plain?'…':'?')));
  head=`<div class="${cls}">${t.prompt.includes('{?}')?fill(t.prompt,shown):t.prompt}</div>`;
  if(!t.prompt.includes('{?}')&&inp)head+=`<div class="${cls}">${P.solved?ans:(P.mode==='main'?slot():'')}</div>`}
 let vis='';
 if(t.vis)vis=typeof t.vis==='function'?t.vis(P.solved):t.vis;
 if(t.bar){const[w,p1,p2,m]=t.bar;vis=barModel(w,p1,p2,m,P.solved)}
 if(t.hf)vis=hfWindow(t.hf[0],t.hf[1],P.solved,false);
 if(t.strip)vis=strip(t.strip[0],t.strip[1],P.solved,t.strip[2]);
 if(t.jl&&(P.mode==='steps'||P.solved))vis=jumpLine(t.jl.start,t.jl.jumps,P.solved?undefined:P.si);
 let steps='';
 if(P.mode==='steps'){
  steps='<div class="steps">'+P.log.map((l,i)=>`<div class="step ${l.rev?'rev':'done'}"><span class="n">${i+1}</span><div class="body">${fill(l.q,`<b class="ok">${esc(l.a)}</b>`)}</div></div>`).join('');
  if(!P.solved){const st=t.steps[P.si];steps+=`<div class="step cur"><span class="n">${P.si+1}</span><div class="body">${st.kind==='choice'?st.q:fill(st.q,slot())}</div></div>`}
  steps+='</div>'}
 const fb=P.fb?`<div class="fb ${P.fb.type} pop" role="status">${P.fb.html}</div>`:'';
 let ctrl='';const k=P.solved?null:curKind();
 if(P.solved)ctrl=`<div class="row" style="justify-content:center"><button class="btn hay" data-act="next" id="nextbtn">${P.i===P.tasks.length-1?'Fertig!':'Weiter'}</button></div>`;
 else if(P.flashing)ctrl=`<p class="center flashhint"><b>Schau dir das Wort genau an …</b><br>Gleich verschwindet es. Dann schreibst du es auf.</p>`;
 else if(k==='choice'){const opts=P.mode==='main'?t.options:t.steps[P.si].options;ctrl=`<div class="opts">${opts.map(o=>`<button class="opt ${P.wrong.includes(o)?'wrong':''}" data-opt="${encodeURIComponent(o)}">${o}</button>`).join('')}</div>`}
 else if(k==='word')ctrl=keyboard();
 else if(k==='tiles')ctrl=tilesPad();
 else ctrl=`<div class="pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-k="${n}">${n}</button>`).join('')}<button data-k="del" aria-label="Löschen">⌫</button><button data-k="0">0</button><button class="go" data-k="ok">Prüfen</button></div>`;
 const helpers=P.flashing?'<div class="helpers"></div>':`<div class="helpers">${t.stepsOnly||P.mode==='main'?`<button class="linkbtn" data-act="speak">${ICON.speaker} Vorlesen</button>`:''}${t.flash&&!P.solved&&!P.flashing&&P.mode==='main'?'<button class="linkbtn" data-act="reflash">Nochmal zeigen</button>':''}${P.mode==='main'&&!P.solved&&t.steps&&t.steps.length?'<button class="linkbtn" data-act="help">Hilf mir Schritt für Schritt</button>':''}${s.learn.length?'<button class="linkbtn" data-act="relearn">Erklärung nochmal</button>':''}</div>`;
 app.innerHTML=`<div class="top"><button class="linkbtn" data-act="home">← Stall</button><h2>${s.title}</h2></div>
 <div class="dots" aria-label="Aufgabe ${P.i+1} von ${P.tasks.length}">${dots}</div>
 <div class="card">${head}${vis?`<div class="vis">${vis}</div>`:''}${steps}${fb}${ctrl}</div>
 <div class="row" style="justify-content:space-between;flex-wrap:nowrap">${pony(ponyMood,64)}${helpers}</div>`;
 ponyMood='calm';
 const nb=document.getElementById('nextbtn');if(nb)nb.focus({preventScroll:true});
}
function submit(val){
 const t=P.t;if(P.solved||P.flashing)return;
 if(P.mode==='main'){
  const ok=matches(t.kind,val,t.answer,t.accept);
  if(ok)return win(P.att===0?2:1,P.att===0,false);
  P.att++;const d=t.diagnose&&t.diagnose(t.kind==='num'?+val:val);if(d&&d.tag)bump(d.tag);
  if(t.kind==='choice')P.wrong.push(val);
  if(t.onMiss)t.onMiss();
  if(P.att===1){P.fb={type:'warn',html:(d?d.msg:pick(TRY))+(t.kind!=='choice'?'<br>Versuch es nochmal!':'')};if(t.kind!=='word')clr();save();return render()}
  clr();
  if(t.stepsFor)t.steps=t.stepsFor(d&&d.tag);
  if(t.steps&&t.steps.length){P.mode='steps';P.fb={type:'info',html:(d?d.msg+'<br>':'')+'Kein Problem! Wir machen es jetzt <b>zusammen</b> – Schritt für Schritt.'};save();return render()}
  P.solved=true;P.res[P.i]='c';P.earned+=1;S.shoes+=1;requeue();P.fb={type:'info',html:`Richtig ist: <b>${esc(t.answer)}</b><br>${t.explain||''}`};save();return render()}
 const st=t.steps[P.si],sk=st.kind||'num',ok=matches(sk,val,st.a,st.accept);
 if(ok){P.log.push({q:st.q,a:st.a});P.si++;P.satt=0;clr();P.wrong=[];if(P.si>=t.steps.length)return finishSteps();P.fb={type:'good',html:pick(STEPOK)+' Weiter zum nächsten Schritt.'};return render()}
 P.satt++;P.stepErr=true;const d=st.diagnose&&st.diagnose(sk==='num'?+val:val);if(d&&d.tag)bump(d.tag);
 if(sk==='choice')P.wrong.push(val);
 if(P.satt===1){P.fb={type:'warn',html:d?d.msg:(st.hint||pick(TRY))};if(sk!=='word')clr();save();return render()}
 P.log.push({q:st.q,a:st.a,rev:true});P.si++;P.satt=0;clr();P.wrong=[];
 if(P.si>=t.steps.length)return finishSteps(`Die Lösung von diesem Schritt ist <b>${esc(st.a)}</b>. ${st.why||''}`);
 P.fb={type:'info',html:`Die Lösung ist <b>${esc(st.a)}</b>. ${st.why||''} Schau sie dir an – dann weiter!`};save();render()}
function finishSteps(pre){
 const t=P.t;
 if(t.stepsOnly){const first=!P.stepErr;return win(first?3:2,first,true,pre)}
 win(1,false,true,pre)}
function requeue(){if(P.requeued<2){P.tasks.push(P.t&&P.t.again?P.t.again():STMAP[P.id].gen());P.requeued++}}
function win(gain,first,viaSteps,pre){
 const t=P.t;S.shoes+=gain;P.earned+=gain;if(first)P.first++;P.res[P.i]=first?'a':(viaSteps?'c':'b');P.solved=true;ponyMood='happy';
 if(t.onWin)t.onWin(first);
 if(!first&&!t.stepsOnly)requeue();
 const msg=first?praise():(viaSteps?(t.stepsOnly?'Geschafft! Alle Schritte erledigt.':'Geschafft – Schritt für Schritt! Genau so lernt man es. Gleich kommt so eine Aufgabe nochmal.'):pick(PRAISE2));
 P.fb={type:'good',html:`${pre?pre+'<br>':''}<b>${msg}</b> <span class="plus">+${gain}</span> <span class="shoes" style="font-size:1rem">${ICON.shoe}</span>${t.after?`<div class="after">${t.after}</div>`:''}`};
 save();render()}
function next(){P.i++;if(P.i>=P.tasks.length)return finish();newTask()}
function finish(){
 const total=P.tasks.length,ratio=P.first/total,stars=ratio>=.85?3:ratio>=.6?2:1;
 const d=S.st[P.id]||{stars:0,rounds:0,first:0,total:0};d.stars=Math.max(d.stars,stars);d.rounds++;d.first+=P.first;d.total+=total;S.st[P.id]=d;save();
 P.stars=stars;P.carrots=stars+1;P.fed=0;view='done';ponyMood='happy';render()}
const PAUSE=['Galoppiere 10 Sekunden auf der Stelle wie ein Pony!','Mach 5 Pferde-Hopser durchs Zimmer.','Wiehere einmal laut und schüttle deine Mähne!','Streck dich so groß wie ein Pferd – und dann klein wie ein Pony.'];
function renderDone(){
 const msg=P.stars===3?'Wow! Fast alles beim ersten Versuch!':P.stars===2?'Toll gemacht! Du wirst richtig gut.':'Gut durchgehalten! Jede Runde macht dich stärker.';
 app.innerHTML=`<div class="card center pop">${pony(ponyMood,130)}
 <h1>${msg}</h1>
 <div class="bigstars row" style="justify-content:center">${[1,2,3].map(i=>ICON.star(i<=P.stars)).join('')}</div>
 <p><span class="shoes">${ICON.shoe} +${P.earned} Hufeisen</span></p>
 <p class="muted">Du hast ${P.carrots} Karotten verdient. Tipp sie an und füttere ${PONY}!</p>
 <div class="carrots">${Array.from({length:P.carrots},(_,i)=>`<button class="carrot ${i<P.fed?'eaten':''}" data-feed="${i}" aria-label="Karotte füttern">${ICON.carrot}</button>`).join('')}</div>
 ${P.fed>=P.carrots?`<p><b>Mmmh! ${PONY} ist satt und glücklich.</b></p>`:''}
 <div class="pause"><span class="eyebrow">Pony-Pause</span><p>${pick(PAUSE)}</p></div>
 <div class="row" style="justify-content:center"><button class="btn ghost" data-act="home">Zum Stall</button><button class="btn" data-go="${P.id}">Nochmal üben</button></div></div>`;
 ponyMood='calm'}
function render(){window.scrollTo&&view!=='practice'&&window.scrollTo(0,0);({welcome:renderWelcome,pick:renderPick,home:renderHome,learn:renderLearn,practice:renderPractice,done:renderDone})[view]()}

/* ---------- events ---------- */
app.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.subject){S.subject=b.dataset.subject;save();view='home';return render()}
 if(b.dataset.topic){S.topic=b.dataset.topic;S.tsel[S.subject]=b.dataset.topic;save();return render()}
 if(b.dataset.go){const id=b.dataset.go;if(view==='done'){startPractice(id)}else openStation(id);return}
 if(b.dataset.k){const k=b.dataset.k;if(k==='del')P.input=P.input.slice(0,-1);else if(k==='ok'){if(P.input!=='')submit(P.input);return}else if(P.input.length<3)P.input+=k;return render()}
 if(b.dataset.kb!==undefined){if(!P||P.solved||P.flashing)return;const k=b.dataset.kb;
  if(k==='del'){P.input=P.input.slice(0,-1);P.used.pop()}
  else if(k==='ok'){if(P.input)submit(P.input);return}
  else if(k==='caps')P.caps=!P.caps;
  else if(P.input.length<24){P.input+=P.caps?k.toUpperCase():k;P.caps=false}
  return render()}
 if(b.dataset.tile!==undefined){if(!P||P.solved)return;const i=+b.dataset.tile;if(P.used.includes(i))return;P.used.push(i);P.input+=curStep().tiles[i];return render()}
 if(b.dataset.opt)return submit(decodeURIComponent(b.dataset.opt));
 if(b.dataset.feed!==undefined){P.fed++;ponyMood='munch';return render()}
 const a=b.dataset.act;
 if(a==='pick'){view='pick';return render()}
 if(a==='home'){view='home';clearTimeout(flashTimer);try{speechSynthesis.cancel()}catch(e){}return render()}
 if(a==='next')return next();
 if(a==='help'){P.mode='steps';clr();P.fb={type:'info',html:'Gute Idee! Wir machen es zusammen.'};return render()}
 if(a==='reflash')return startFlash();
 if(a==='relearn'){clearTimeout(flashTimer);P.flashing=false;L={id:P.id,i:0,back:true};view='learn';return render()}
 if(a==='lnext'){L.i++;return render()} if(a==='lprev'){L.i--;return render()}
 if(a==='lstart'){if(L.back&&P&&P.id===L.id){view='practice';return render()}return startPractice(L.id)}
 if(a==='speak'){const t=P.t;if(t.say)return sayPlain(t.say);return(isPlain(P.id)?sayPlain:speak)(t.stepsOnly?t.story+' '+t.frage:t.prompt)}
 if(a==='speak-learn'){const s=STMAP[L.id].learn[L.i];return(isPlain(L.id)?sayPlain:speak)(s.h+'. '+s.b)}
 if(a==='reset'){confirmReset=true;render();document.querySelector('details.parents').open=true;return}
 if(a==='reset-no'){confirmReset=false;render();document.querySelector('details.parents').open=true;return}
 if(a==='reset-yes'){const t=S.topic;Object.assign(S,{name:'',topic:t,shoes:0,st:{},err:{},intro:{},miss:{}});confirmReset=false;save();view='welcome';return render()}
 if(a==='welcome-go')return welcomeGo();
});
document.addEventListener('keydown',e=>{
 if(view!=='practice'||!P||e.target.tagName==='INPUT')return;
 if(P.solved&&(e.key==='Enter'||e.key===' ')){e.preventDefault();return next()}
 if(P.solved||P.flashing)return;
 const k=curKind();
 if(k==='word'){
  if(e.key.length===1&&/^[a-zäöüß]$/i.test(e.key)&&P.input.length<24){e.preventDefault();P.input+=e.key;P.caps=false;render()}
  else if(e.key==='Backspace'){e.preventDefault();P.input=P.input.slice(0,-1);render()}
  else if(e.key==='Enter'&&P.input){submit(P.input)}
  return}
 if(k!=='num')return;
 if(/^[0-9]$/.test(e.key)&&P.input.length<3){P.input+=e.key;render()}
 else if(e.key==='Backspace'){P.input=P.input.slice(0,-1);render()}
 else if(e.key==='Enter'&&P.input!==''){submit(P.input)}
});
