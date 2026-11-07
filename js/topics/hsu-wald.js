/* =====================================================================
   HSU (Heimat- und Sachunterricht) Klasse 2 – Thema „Der Wald“
   Inhalte nach dem Heft: Stockwerke des Waldes, Teile des Baumes,
   Waldregeln, Nadelbäume. Dazu Rechtschreibung mit den Wörtern,
   die in den Heft-Einträgen noch falsch geschrieben waren.
   ===================================================================== */
(function(){

/* ---------- Wortliste für Rechtschreibung ----------
   w   richtige Schreibweise
   g   [vorne, schwierige Stelle, hinten, Auswahl für die Lücke]
   t   Fehlerart (für die Eltern-Statistik, siehe errNames unten)
   tip kindgerechter Rechtschreib-Tipp
   c   Satz aus dem Wald-Thema, {?} = das Wort
   wr  typische Falschschreibungen (für „Welches Wort ist richtig?“)
   a   Artikel (nur bei Nomen) für die Groß-Probe
   acc weitere richtige Schreibweisen */
const W=[
 {w:'Schwamm',g:['Schwa','mm','',['m','mm']],t:'doppel',a:'der',tip:'Das <b>a</b> ist kurz – darum <b>mm</b>. Sprich langsam: Schwamm.',c:'Die Moosschicht ist wie ein {?}.',wr:['Schwam','Schwamn']},
 {w:'angesammelt',g:['angesa','mm','elt',['m','mm']],t:'doppel',tip:'Kommt von <b>sammeln</b> – kurzes a, darum <b>mm</b>. Es ist kein Nomen, also <b>klein</b>.',c:'In der Moosschicht wird Wasser {?}.',wr:['angesamelt','Angesammelt']},
 {w:'Schmetterlinge',g:['Schme','tt','erlinge',['t','tt']],t:'doppel',a:'die',tip:'Kurzes e – darum <b>tt</b>. Und hinten das <b>g</b> nicht vergessen: Schmet-ter-lin-ge.',c:'In der Krautschicht fliegen bunte {?}.',wr:['Schmeterlinge','Schmetterline']},
 {w:'Hummeln',g:['Hu','mm','eln',['m','mm']],t:'doppel',a:'die',tip:'Kurzes u – darum <b>mm</b>: Hum-meln.',c:'Bienen und {?} fliegen von Blüte zu Blüte.',wr:['Humeln','Hummlen']},
 {w:'Spinnen',g:['Spi','nn','en',['n','nn']],t:'doppel',a:'die',tip:'Kurzes i – darum <b>nn</b>. Eine Spinne, viele Spinnen.',c:'Im Moos krabbeln Asseln und {?}.',wr:['Spinen','Spinner']},
 {w:'Tanne',g:['Ta','nn','e',['n','nn']],t:'doppel',a:'die',tip:'Kurzes a – darum <b>nn</b>: Tan-ne.',c:'Die {?} hat weiche, flache Nadeln.',wr:['Tane','Tanen']},
 {w:'Wasser',g:['Wa','ss','er',['s','ss','ß']],t:'doppel',a:'das',tip:'Kurzes a – darum <b>ss</b>: Was-ser.',c:'Die Wurzeln saugen {?} aus dem Boden.',wr:['Waser','Waßer']},
 {w:'Müll',g:['Mü','ll','',['l','ll']],t:'doppel',a:'der',tip:'Kurzes ü – darum <b>ll</b>.',c:'Wir lassen keinen {?} liegen!',wr:['Mül','Mühl']},
 {w:'Baumstamm',g:['Baumsta','mm','',['m','mm']],t:'doppel',a:'der',tip:'Baum + Stamm. Im Stamm ist das a kurz – darum <b>mm</b>.',c:'Der {?} ist wie ein Aufzug.',wr:['Baumstam','Baumstamn']},
 {w:'Sauerstoff',g:['Sauersto','ff','',['f','ff']],t:'doppel',a:'der',tip:'Sauer + Stoff. Kurzes o – darum <b>ff</b>.',c:'Die Blätter stellen {?} her.',wr:['Sauerstof','Sauastoff']},
 {w:'Nährstoffe',g:['N','ä','hrstoffe',['e','ä']],t:'ableiten',a:'die',tip:'Kommt von <b>Nahrung</b> – darum <b>ä</b>. Und Stoffe mit <b>ff</b>.',c:'Der Stamm leitet Wasser und {?}.',wr:['Nehrstoffe','Nährstofe']},
 {w:'Schädlinge',g:['Sch','ä','dlinge',['e','ä']],t:'ableiten',a:'die',tip:'Kommt von <b>Schaden</b> – aus a wird <b>ä</b>.',c:'Die Rinde schützt den Baum vor {?}.',wr:['Schedlinge','Sädlinge']},
 {w:'Blätter',g:['Bl','ä','tter',['e','ä']],t:'ableiten',a:'die',tip:'Ein Blatt, viele Blätter – aus a wird <b>ä</b>. Kurz gesprochen, darum <b>tt</b>.',c:'Die {?} stellen Sauerstoff her.',wr:['Bletter','Bläter']},
 {w:'Kräuter',g:['Kr','äu','ter',['eu','äu']],t:'ableiten',a:'die',tip:'Ein Kraut, viele Kräuter – aus au wird <b>äu</b>.',c:'Die Krautschicht hat ihren Namen von den {?}.',wr:['Kreuter','Kräter']},
 {w:'Mäuse',g:['M','äu','se',['eu','äu']],t:'ableiten',a:'die',tip:'Eine Maus, viele Mäuse – aus au wird <b>äu</b>.',c:'Unter der Erde graben {?} ihre Gänge.',wr:['Meuse','Mäuße']},
 {w:'Füchse',g:['F','ü','chse',['u','ü']],t:'ableiten',a:'die',tip:'Ein Fuchs, viele Füchse – aus u wird <b>ü</b>.',c:'Im Gebüsch verstecken sich {?}.',wr:['Fuchse','Füxe']},
 {w:'Bäume',g:['B','äu','me',['eu','äu']],t:'ableiten',a:'die',tip:'Ein Baum, viele Bäume – aus au wird <b>äu</b>.',c:'Junge {?} wachsen in der Strauchschicht.',wr:['Beume','Bäme']},
 {w:'umfällt',g:['umf','ä','llt',['e','ä']],t:'ableiten',tip:'Kommt von <b>fallen</b> – aus a wird <b>ä</b>, und das <b>ll</b> bleibt.',c:'Die Wurzeln halten den Baum fest, damit er nicht {?}.',wr:['umfält','umfellt']},
 {w:'Glühwürmchen',g:['Gl','üh','würmchen',['ü','üh']],t:'dehnung',a:'das',tip:'Kommt von <b>glühen</b> – sprich glü-hen, dann hörst du das <b>h</b>.',c:'In der Krautschicht kann man {?} beobachten.',wr:['Glüwürmchen','Glühwürmschen']},
 {w:'Frühblüher',g:['Fr','üh','blüher',['ü','üh']],t:'dehnung',a:'die',tip:'<b>früh</b> + <b>blühen</b> – beide Wörter haben ein <b>h</b>.',c:'Schneeglöckchen sind {?}.',wr:['Frühblüer','Frübluher']},
 {w:'Strohhalm',g:['Stro','hh','alm',['h','hh']],t:'dehnung',a:'der',tip:'<b>Stroh</b> endet mit h, <b>Halm</b> fängt mit h an – darum <b>hh</b>.',c:'Die Wurzeln sind wie ein {?}.',wr:['Strohalm','Strohhalmm']},
 {w:'Rehe',g:['R','eh','e',['e','eh']],t:'dehnung',a:'die',tip:'Ein Reh, viele Rehe. Das <b>h</b> macht das e lang.',c:'Im Gebüsch verstecken sich {?}.',wr:['Ree','Rhee']},
 {w:'Pflanzen',g:['','Pf','lanzen',['F','Pf']],t:'pf',a:'die',tip:'Sprich ganz deutlich: <b>Pf</b>-lan-zen. Man hört p und f.',c:'Die Moosschicht gibt das Wasser an die {?} weiter.',wr:['Flanzen','Pflanzenn']},
 {w:'Blütenpflanzen',g:['Blüten','pf','lanzen',['f','pf']],t:'pf',a:'die',tip:'Blüten + Pflanzen. <b>Pf</b>lanzen mit <b>pf</b>!',c:'In der Krautschicht wachsen {?}.',wr:['Blütenflanzen','Blüthenpflanzen']},
 {w:'Zapfen',g:['Za','pf','en',['f','pf']],t:'pf',a:'die',tip:'Sprich deutlich: Zap-fen. Man hört p und f – also <b>pf</b>.',c:'Die {?} der Fichte hängen nach unten.',wr:['Zafen','Zapen']},
 {w:'Schutzpanzer',g:['Schu','tz','panzer',['z','tz']],t:'tzck',a:'der',tip:'Kurzes u – darum <b>tz</b>.',c:'Die Rinde ist wie ein {?}.',wr:['Schuzpanzer','Schutzpanser']},
 {w:'geschützt',g:['geschü','tz','t',['z','tz']],t:'tzck',tip:'Kommt von <b>schützen</b> – kurzes ü, darum <b>tz</b>. Kein Nomen, also <b>klein</b>.',c:'In den Dornen sind die Vogelnester gut {?}.',wr:['geschüzt','Geschützt']},
 {w:'Schnecken',g:['Schne','ck','en',['k','ck']],t:'tzck',a:'die',tip:'Kurzes e – darum <b>ck</b>.',c:'In der Moosschicht kriechen {?}.',wr:['Schneken','Schnäcken']},
 {w:'Pilze',g:['Pil','z','e',['z','tz']],t:'tzck',a:'die',tip:'Nach <b>l</b> kommt nie tz – nur <b>z</b>.',c:'In der Moosschicht wachsen {?}.',wr:['Piltze','Pilse']},
 {w:'Tiere',g:['T','ie','re',['i','ie']],t:'ie',a:'die',tip:'Das lange i schreibt man meistens <b>ie</b>.',c:'Im Wald leben viele {?}.',wr:['Tire','Tiehre']},
 {w:'wieder',g:['w','ie','der',['i','ie']],t:'ie',tip:'<b>wieder</b> (= noch einmal) schreibt man mit <b>ie</b>. Kein Nomen, also klein.',c:'Im Frühling kommen die Frösche {?} heraus.',wr:['wider','Wieder']},
 {w:'ziemlich',g:['z','ie','mlich',['i','ie']],t:'ie',tip:'Langes i – darum <b>ie</b>. Kein Nomen, also klein.',c:'Die Nadeln der Kiefer sind {?} lang.',wr:['zimlich','Ziemlich']},
 {w:'Kiefer',g:['K','ie','fer',['i','ie']],t:'ie',a:'die',tip:'Langes i – darum <b>ie</b>: Kie-fer.',c:'Die {?} hat lange, spitze Nadeln.',wr:['Kifer','Kiver']},
 {w:'Bienen',g:['B','ie','nen',['i','ie']],t:'ie',a:'die',tip:'Langes i – darum <b>ie</b>: Bie-nen.',c:'{?} und Hummeln sammeln Nektar.',wr:['Binen','Bienenn']},
 {w:'Teile',g:['T','ei','le',['ai','ei']],t:'merk',a:'die',tip:'<b>ei</b> wie beim Ei. Ein Teil, viele Teile.',c:'Krone, Stamm und Wurzel sind die {?} des Baumes.',wr:['Taile','Teihle']},
 {w:'manchmal',g:['ma','n','chmal',['n','nn']],t:'gross',tip:'<b>manchmal</b> ist kein Nomen – also <b>klein</b>. Und nur ein n.',c:'In der Krautschicht kann man {?} Glühwürmchen sehen.',wr:['Manchmal','mannchmal']},
 {w:'Amphibien',g:['Am','ph','ibien',['f','ph']],t:'merk',a:'die',tip:'Merkwort! Man spricht f, schreibt aber <b>ph</b>.',c:'Frösche, Kröten und Salamander sind {?}.',wr:['Amfibien','Amphiebien']},
 {w:'Fotosynthese',g:['Fotos','y','nthese',['ü','i','y']],t:'merk',a:'die',tip:'Merkwort! Das <b>y</b> spricht man wie ü.',c:'Wenn Blätter Sauerstoff herstellen, nennt man das {?}.',wr:['Fotosünthese','Fotosinthese'],acc:['Photosynthese']},
 {w:'Holunder',g:['Ho','l','under',['l','ll']],t:'merk',a:'der',tip:'Merkwort! Nur <b>ein l</b>: Ho-lun-der.',c:'Der {?} ist ein Strauch mit schwarzen Beeren.',wr:['Hollunder','Holunda']},
 {w:'Käfer',g:['K','ä','fer',['e','ä']],t:'merk',a:'der',tip:'Merkwort mit <b>ä</b>: der Käfer.',c:'Unter dem Moos krabbelt ein {?}.',wr:['Kefer','Käfa']},
 {w:'Lärche',g:['L','ä','rche',['e','ä']],t:'merk',a:'die',tip:'Merkwort! Die <b>Lärche</b> (Baum) mit ä. Die Lerche mit e ist ein Vogel.',c:'Die {?} verliert im Herbst ihre Nadeln.',wr:['Lerche','Lärsche']},
 {w:'Fichte',g:['Fi','ch','te',['sch','ch']],t:'merk',a:'die',tip:'<b>ch</b> wie bei „ich“: Fich-te.',c:'Die {?} ist der häufigste Baum in Deutschland.',wr:['Fischte','Fiechte']},
 {w:'Farne',g:['Fa','r','ne',['h','r']],t:'merk',a:'die',tip:'Sprich deutlich: Far-ne. Das <b>r</b> hört man nur leise.',c:'In der Krautschicht wachsen Gräser und {?}.',wr:['Fane','Fahne']},
 {w:'Tausendfüßer',g:['Tausendfü','ß','er',['s','ss','ß']],t:'merk',a:'der',tip:'Nach dem langen ü kommt <b>ß</b> – wie bei <b>Füße</b>.',c:'Der {?} hat ganz viele Beine.',wr:['Tausendfüser','Tausendfüsser'],acc:['Tausendfüßler']},
 {w:'Brombeere',g:['Brom','bee','re',['be','bee']],t:'merk',a:'die',tip:'Beere hat ein langes e – man schreibt <b>ee</b>.',c:'Die {?} hat Dornen.',wr:['Brombere','Brambeere']},
 {w:'Beeren',g:['B','ee','ren',['e','ä','ee']],t:'merk',a:'die',tip:'Beeren (Früchte) mit <b>ee</b>. Bären mit ä sind Tiere!',c:'Wir essen keine {?} und Pilze aus dem Wald!',wr:['Beren','Bären']},
 {w:'Moos',g:['M','oo','s',['o','oo']],t:'merk',a:'das',tip:'Merkwort mit <b>oo</b> – wie bei Boot.',c:'Das {?} speichert Wasser.',wr:['Mos','Mooß']},
 {w:'Salamander',g:['Sala','m','ander',['m','mm']],t:'merk',a:'der',tip:'Sa-la-man-der: nur <b>ein m</b>.',c:'Unter dem Moos versteckt sich ein {?}.',wr:['Sallamander','Salammander']}
];
const WMAP={};W.forEach(x=>WMAP[x.w]=x);
const isNoun=x=>!!x.a;
const flip=s=>s[0]===s[0].toLowerCase()?s[0].toUpperCase()+s.slice(1):s[0].toLowerCase()+s.slice(1);
const mark=x=>`${x.g[0]}<mark>${x.g[1]}</mark>${x.g[2]}`;
const gapWord=x=>`<span class="wort">${x.g[0]}<span class="gap">?</span>${x.g[2]}</span>`;
const ctxDots=x=>x.c.replace('{?}','…');
const ctxFull=x=>x.c.replace('{?}',x.w);
const after=x=>`<span class="wort">${mark(x)}</span><br>${x.tip}`;

/* Wörter, die schon einmal falsch waren, kommen öfter dran */
let recent=[];
function pickWord(){
 const pool=W.filter(x=>!recent.includes(x.w));
 const wt=pool.map(x=>1+Math.min(S.miss[x.w]||0,4)*2),sum=wt.reduce((a,b)=>a+b,0);
 let r=Math.random()*sum,i=0;while(r>wt[i]){r-=wt[i];i++}
 const x=pool[Math.min(i,pool.length-1)];recent.push(x.w);if(recent.length>8)recent.shift();return x}
function hooks(x){return{
 onMiss(){S.miss[x.w]=(S.miss[x.w]||0)+1},
 onWin(first){if(first&&S.miss[x.w]){S.miss[x.w]--;if(!S.miss[x.w])delete S.miss[x.w]}}}}

function grossMsg(x){
 return isNoun(x)?`<b>${x.w}</b> ist ein Nomen (Namenwort). Probe: <i>${x.a} ${x.w}</i> – das passt! Nomen schreibt man <b>groß</b>.`
  :`<b>${x.w}</b> ist kein Nomen. „der, die, das ${x.w}“ passt nicht – also schreibt man es <b>klein</b>.`}
function spellDiag(v,x){
 v=String(v).trim();const w=x.w;
 if(v.toLowerCase()===w.toLowerCase())return{tag:'gross',msg:'Fast perfekt! Nur <b>groß oder klein</b> stimmt nicht. '+grossMsg(x)};
 let p=0;while(p<v.length&&p<w.length&&v[p]===w[p])p++;
 const parts=[];
 if(p>=2)parts.push(`Die ersten <b>${p}</b> Buchstaben stimmen schon!`);
 if(v.length<w.length)parts.push(w.length-v.length===1?'Es fehlt <b>ein</b> Buchstabe.':`Es fehlen <b>${w.length-v.length}</b> Buchstaben.`);
 else if(v.length>w.length)parts.push(v.length-w.length===1?'Ein Buchstabe ist <b>zu viel</b>.':`Es sind <b>${v.length-w.length}</b> Buchstaben zu viel.`);
 parts.push(`<div class="tipbox">Tipp: ${x.tip}</div>`);
 return{tag:x.t,msg:parts.join(' ')}}
function spellSteps(x,kind,tiles,tag){
 const first=tag==='gross'
  ?{kind:'choice',q:`Groß oder klein? Denk an die Probe mit <b>der, die, das</b>.`,options:shuffle([x.w,flip(x.w)]),a:x.w,diagnose:()=>({tag:'gross',msg:grossMsg(x)}),why:grossMsg(x)}
  :{kind:'choice',q:`Schau auf die schwierige Stelle:<br>${gapWord(x)}<br>Was gehört in die Lücke?`,options:shuffle(x.g[3]),a:x.g[1],diagnose:()=>({tag:x.t,msg:x.tip}),why:x.tip};
 return[first,
  kind==='tiles'?{kind:'tiles',tiles,q:`Jetzt leg das ganze Wort:<br><span class="wort">${mark(x)}</span><br>{?}`,a:x.w}
   :{kind:'word',q:`Jetzt schreib das ganze Wort ab:<br><span class="wort">${mark(x)}</span><br>{?}`,a:x.w,accept:x.acc,diagnose:v=>spellDiag(v,x)}]}
function makeTiles(x){
 const extra=[];const mid=[...x.g[1]];
 x.g[3].filter(o=>o!==x.g[1]).forEach(o=>{const m=mid.slice();[...o].forEach(c=>{const i=m.indexOf(c);if(i>=0)m.splice(i,1);else if(!extra.includes(c))extra.push(c)})});
 const all=[...x.w,...extra.slice(0,2)];let s;let n=0;do{s=shuffle(all);n++}while(s.join('').startsWith(x.w)&&n<20);return s}

/* ---------- Rechtschreib-Aufgaben ---------- */
function genDetektiv(x){
 x=x||pickWord();const h=hooks(x),again=()=>genDetektiv(x);
 const mode=!isNoun(x)&&Math.random()<.5?'gross':pick(['which','which','gap','gap','gross']);
 if(mode==='gross')return Object.assign({kind:'choice',prompt:`<b>Groß oder klein?</b><br><span class="q">${ctxDots(x)}</span>`,answer:x.w,options:shuffle([x.w,flip(x.w)]),
  diagnose:()=>({tag:'gross',msg:grossMsg(x)}),explain:grossMsg(x),after:after(x),say:ctxFull(x),again},h);
 if(mode==='gap')return Object.assign({kind:'choice',prompt:`<span class="q">${x.c.replace('{?}',gapWord(x))}</span><br><b>Welche Buchstaben fehlen?</b>`,answer:x.g[1],options:shuffle(x.g[3]),
  diagnose:()=>({tag:x.t,msg:x.tip}),explain:x.tip,after:after(x),say:ctxFull(x),again},h);
 return Object.assign({kind:'choice',prompt:`<b>Welches Wort ist richtig geschrieben?</b><br><span class="q">${ctxDots(x)}</span>`,answer:x.w,options:shuffle([x.w,...x.wr.slice(0,2)]),
  diagnose:v=>({tag:x.t,msg:`<span class="wort">${esc(v)}</span> ist leider falsch.<div class="tipbox">Tipp: ${x.tip}</div>`}),explain:x.tip,after:after(x),say:ctxFull(x),again},h)}
function genPuzzle(x){
 x=x||pickWord();const tiles=makeTiles(x);
 return Object.assign({kind:'tiles',tiles,prompt:`<span class="q">${x.c}</span>`,answer:x.w,accept:x.acc,
  diagnose:v=>spellDiag(v,x),steps:spellSteps(x,'tiles',tiles),stepsFor:tag=>spellSteps(x,'tiles',tiles,tag),after:after(x),say:ctxFull(x),again:()=>genPuzzle(x)},hooks(x))}
function genBlitz(x){
 x=x||pickWord();
 return Object.assign({kind:'word',flash:true,sayWord:x.w,prompt:`<span class="q">${x.c}</span>`,answer:x.w,accept:x.acc,
  diagnose:v=>spellDiag(v,x),steps:spellSteps(x,'word'),stepsFor:tag=>spellSteps(x,'word',null,tag),after:after(x),say:ctxFull(x),again:()=>genBlitz(x)},hooks(x))}

/* ---------- Sachwissen: Stockwerke des Waldes ---------- */
const SDESC=[
 'Die <b>Baumschicht</b> ist ganz oben. Dort sind die Kronen der großen Bäume.',
 'Die <b>Strauchschicht</b> ist bis zu 5 Meter hoch. Dort wachsen Holunder, Haselsträucher, Brombeeren und junge Bäume.',
 'Die <b>Krautschicht</b> ist bis zu 1 Meter hoch. Dort wachsen Gräser, Farne, Kräuter und Blumen.',
 'Die <b>Moosschicht</b> ist ganz flach am Boden. Dort wachsen Moos, Pilze und Flechten. Sie speichert Wasser wie ein Schwamm.',
 'Die <b>Wurzelschicht</b> ist unter der Erde. Dort sind die Wurzeln und die Baue der Tiere.'];
const SQ=[
 ['Wo wachsen <b>Holunder</b> und <b>Haselsträucher</b>?',1],
 ['Wo wachsen <b>Brombeeren</b> und <b>junge Bäume</b>?',1],
 ['Wo verstecken sich <b>Rehe</b> und die <b>Haselmaus</b>?',1],
 ['Wo bauen viele <b>Vögel</b> ihre Nester? Die Dornen schützen sie.',1],
 ['Wo wachsen <b>Gräser</b>, <b>Farne</b> und <b>Kräuter</b>?',2],
 ['Wo blühen die <b>Frühblüher</b>?',2],
 ['Wo summen <b>Bienen</b> und <b>Hummeln</b>?',2],
 ['Wo kann man manchmal <b>Glühwürmchen</b> beobachten?',2],
 ['Wo wachsen <b>Moos</b>, <b>Pilze</b> und <b>Flechten</b>?',3],
 ['Wo kriechen <b>Schnecken</b> und <b>Asseln</b>?',3],
 ['Welches Stockwerk speichert Wasser wie ein <b>Schwamm</b>?',3],
 ['Wo graben sich <b>Frösche</b> und <b>Kröten</b> im Winter ein?',4],
 ['Wo wohnt der <b>Dachs</b> in seinem Bau?',4],
 ['Wo findet man die <b>Wurzeln</b> aller Pflanzen?',4],
 ['Wo sind die <b>Kronen</b> der großen Bäume?',0],
 ['Wo klettert das <b>Eichhörnchen</b> und klopft der <b>Specht</b>?',0],
 ['Welches Stockwerk ist das <b>höchste</b>?',0],
 ['Welches Stockwerk liegt <b>unter der Erde</b>?',4],
 ['Welches Stockwerk ist ganz flach am Boden – nur <b>wenige Zentimeter</b> hoch?',3],
 ['Welches Stockwerk ist bis zu <b>1 Meter</b> hoch?',2],
 ['Welches Stockwerk ist bis zu <b>5 Meter</b> hoch?',1]];
function schichtTask(prompt,i,vis){
 const opts=shuffle([i,...shuffle([0,1,2,3,4].filter(k=>k!==i)).slice(0,2)]).map(k=>SCHICHTEN[k]);
 return{kind:'choice',prompt,answer:SCHICHTEN[i],options:opts,vis,
  diagnose:v=>{const k=SCHICHTEN.indexOf(v);return{tag:'schicht',msg:`${SDESC[k]} Passt das? Überleg nochmal!`}},
  explain:SDESC[i],after:SDESC[i]}}
function genSchicht(){
 const r=Math.random();
 if(r<.3){const i=R(0,4);return schichtTask('Wie heißt das <b>markierte</b> Stockwerk?',i,solved=>waldSchichten(i,!solved))}
 if(r<.45){const up=Math.random()<.5,i=up?R(1,4):R(0,3),j=up?i-1:i+1;
  return schichtTask(`Welches Stockwerk liegt direkt <b>${up?'über':'unter'}</b> der ${SCHICHTEN[i]}?`,j,solved=>solved?waldSchichten(j,false):'')}
 const[q,i]=pick(SQ);return schichtTask(q,i)}

/* ---------- Sachwissen: Teile des Baumes ---------- */
const BDESC=[
 'Die <b>Baumkrone</b> ist oben: Äste und Blätter. Die Blätter stellen Sauerstoff her.',
 'Der <b>Baumstamm</b> ist wie ein Aufzug und ein Schutzpanzer. Er leitet Wasser und Nährstoffe und schützt vor Schädlingen.',
 'Die <b>Wurzel</b> hält den Baum fest. Und sie saugt Wasser auf – wie ein Strohhalm.'];
const BQ=[
 ['Welcher Teil hält den Baum fest, damit er <b>nicht umfällt</b>?',2],
 ['Welcher Teil saugt Wasser aus dem Boden – wie ein <b>Strohhalm</b>?',2],
 ['Welcher Teil ist wie ein <b>Aufzug</b>? Er leitet Wasser und Nährstoffe nach oben.',1],
 ['Welcher Teil schützt den Baum wie ein <b>Panzer</b> vor Schädlingen?',1],
 ['Wo stellen die <b>Blätter</b> Sauerstoff her?',0],
 ['Wo sind die <b>Äste</b> und die <b>Blätter</b>?',0]];
function baumTask(prompt,i,vis){
 return{kind:'choice',prompt,answer:BAUMTEILE[i],options:BAUMTEILE.slice(),vis,
  diagnose:v=>({tag:'baum',msg:`${BDESC[BAUMTEILE.indexOf(v)]} Passt das zur Frage?`}),explain:BDESC[i],after:BDESC[i]}}
function genBaum(){
 const r=Math.random();
 if(r<.3){const i=R(0,2);return baumTask('Wie heißt der <b>markierte</b> Teil?',i,solved=>baumTeile(i,!solved))}
 if(r<.42)return{kind:'choice',prompt:'Die Blätter stellen mit Sonnenlicht <b>Sauerstoff</b> her. Wie nennt man das?',answer:'Fotosynthese',options:shuffle(['Fotosynthese','Winterschlaf','Verdunstung']),
  diagnose:()=>({tag:'baum',msg:'Das ist etwas anderes. Das Wort fängt mit <b>Foto</b> an!'}),explain:'Das nennt man <b>Fotosynthese</b>.',after:`<span class="wort">${mark(WMAP.Fotosynthese)}</span> – das y spricht man wie ü.`};
 if(r<.52)return{kind:'choice',prompt:'Was stellen die <b>Blätter</b> mit Sonnenlicht her?',answer:'Sauerstoff',options:shuffle(['Sauerstoff','Regen','Honig']),
  diagnose:()=>({tag:'baum',msg:'Nicht ganz. Es ist etwas, das wir zum Atmen brauchen.'}),explain:'Die Blätter stellen <b>Sauerstoff</b> her. Den brauchen wir zum Atmen.',after:'Die Blätter stellen <b>Sauerstoff</b> her. Den brauchen wir zum Atmen.'};
 const[q,i]=pick(BQ);return baumTask(q,i)}

/* ---------- Sachwissen: Nadelbäume ---------- */
const NB=['Lärche','Tanne','Kiefer','Fichte'];
const NDESC=[
 'Die <b>Lärche</b>: Ihre weichen Nadeln wachsen in Büscheln, werden im Herbst goldgelb und fallen ab. Die Zapfen sind klein und rundlich.',
 'Die <b>Tanne</b>: Ihre Nadeln sind stumpf, flach und weich, unten mit zwei silberweißen Streifen. Die Zapfen fallen nie im Ganzen herunter.',
 'Die <b>Kiefer</b>: Ihre Nadeln sind lang, blau- oder graugrün, spitz und starr. Die Zapfen sind eiförmig. Ihr Holz ist beliebt für Möbel.',
 'Die <b>Fichte</b>: Sie ist der häufigste Baum in Deutschland. Ihre Zapfen hängen nach unten, ihre spitzen, kantigen Nadeln stechen.'];
const NR=[
 ['Im Herbst werden meine Nadeln goldgelb und fallen ab.',0],
 ['Ich bin der einzige Nadelbaum, der im Winter keine Nadeln hat.',0],
 ['Meine schmalen, weichen Nadeln wachsen in kleinen Büscheln.',0],
 ['Meine Zapfen sind klein und rundlich.',0],
 ['Meine Nadeln sind stumpf, flach und weich.',1],
 ['Unter meinen Nadeln sind zwei silberweiße Wachsstreifen.',1],
 ['Meine Zapfen fallen nie im Ganzen herunter. Nur die Schuppen fallen einzeln ab.',1],
 ['Meine Nadeln sind blau- oder graugrün und ziemlich lang.',2],
 ['Meine langen Nadeln sind leicht gedreht, spitz und starr.',2],
 ['Meine Zapfen sind eiförmig und graugrün.',2],
 ['Aus meinem Holz baut man gern Möbel.',2],
 ['Ich bin der häufigste Baum in Deutschland.',3],
 ['Meine Zapfen hängen nach unten.',3],
 ['Meine spitzen, kantigen Nadeln stechen.',3]];
function nadelDiag(v,i){const k=NB.indexOf(v);
 const ft=(k===3&&i===1)||(k===1&&i===3)?'<div class="tipbox">Merkspruch: <b>Die Fichte sticht, die Tanne nicht.</b></div>':'';
 return{tag:'nadel',msg:`${NDESC[k]}${ft}`}}
function genNadel(){
 if(Math.random()<.7){const[q,i]=pick(NR);
  return{kind:'choice',prompt:`<b>Wer bin ich?</b><br><span class="q">„${q}“</span>`,answer:NB[i],options:NB.slice(),diagnose:v=>nadelDiag(v,i),explain:NDESC[i],after:NDESC[i],say:'Wer bin ich? '+q}}
 const i=R(0,3),right=pick(NR.filter(r=>r[1]===i))[0],wrong=shuffle(NR.filter(r=>r[1]!==i)).slice(0,2).map(r=>r[0]);
 return{kind:'choice',prompt:`Welcher Satz passt zur <b>${NB[i]}</b>?`,answer:right,options:shuffle([right,...wrong]),
  diagnose:v=>{const k=NR.find(r=>r[0]===v)[1];return{tag:'nadel',msg:`Das passt zur <b>${NB[k]}</b>. Such den Satz für die ${NB[i]}!`}},explain:NDESC[i],after:NDESC[i]}}

/* ---------- Waldregeln ---------- */
const RG=[
 {r:'Wir lassen keinen Müll liegen!',s:'Dein Pausenbrot ist aufgegessen. Das Papier ist übrig.',ok:'Ich nehme das Papier wieder mit nach Hause.',no:['Ich lasse es unter einem Baum liegen.','Ich verstecke es im Moos.'],w:'Müll'},
 {r:'Wir fassen keine Wildtiere an!',s:'Ein kleines Rehkitz liegt ganz allein im Gras.',ok:'Ich fasse es nicht an und gehe leise weiter.',no:['Ich streichle es vorsichtig.','Ich nehme es mit nach Hause.'],why:'Die Mutter ist meistens in der Nähe. Riecht das Kitz nach Menschen, nimmt sie es vielleicht nicht mehr an.'},
 {r:'Wir bleiben auf den Wegen!',s:'Quer durch die Büsche wäre es kürzer.',ok:'Ich bleibe trotzdem auf dem Weg.',no:['Ich laufe quer durch die Büsche.','Ich trample einen neuen Pfad.']},
 {r:'Wir schreien im Wald nicht herum!',s:'Du willst deiner Freundin etwas Spannendes erzählen.',ok:'Ich spreche leise, damit die Tiere keine Angst bekommen.',no:['Ich rufe so laut ich kann.','Ich schreie, damit es alle hören.']},
 {r:'Wir achten auf Schilder und Warnhinweise!',s:'Auf einem Schild steht: „Achtung! Baumfällarbeiten“.',ok:'Ich gehe dort nicht weiter und nehme einen anderen Weg.',no:['Ich schaue mir das aus der Nähe an.','Ich laufe ganz schnell vorbei.']},
 {r:'Wir achten auf unsere Mitmenschen!',s:'Auf dem schmalen Weg kommt euch ein Radfahrer entgegen.',ok:'Ich mache Platz und lasse ihn vorbei.',no:['Ich bleibe mitten auf dem Weg stehen.','Ich renne ihm entgegen.']},
 {r:'Wir zerstören keine Pflanzen!',s:'Am Wegrand blühen schöne Blumen.',ok:'Ich lasse sie stehen und schaue sie nur an.',no:['Ich reiße sie aus.','Ich trete darauf.'],w:'Pflanzen'},
 {r:'Wir machen kein offenes Feuer im Wald!',s:'Es ist kalt. Ein Kind will ein Lagerfeuer machen.',ok:'Ich sage: Nein, Feuer ist im Wald gefährlich!',no:['Ich sammle schnell trockene Äste.','Ich helfe beim Anzünden.']},
 {r:'Wir essen keine Beeren und Pilze!',s:'Am Weg wachsen rote Beeren. Sie sehen lecker aus.',ok:'Ich esse sie nicht. Sie könnten giftig sein.',no:['Ich probiere nur eine.','Ich esse eine ganze Handvoll.'],w:'Beeren'},
 {r:'Wir achten auf den Wald!',s:'Ein Kind will seinen Namen in die Rinde eines Baumes ritzen.',ok:'Ich sage: Bitte nicht, das verletzt den Baum!',no:['Ich ritze meinen Namen auch hinein.','Ich schaue einfach zu.']}];
function genRegel(){
 const g=pick(RG);
 if(g.w&&Math.random()<.3){const x=WMAP[g.w];
  return Object.assign({kind:'choice',prompt:`<b>Waldregel:</b> Welches Wort ist richtig geschrieben?<br><span class="q">${g.r.replace(g.w,'…')}</span>`,answer:x.w,options:shuffle([x.w,...x.wr.slice(0,2)]),
   diagnose:()=>({tag:x.t,msg:x.tip}),explain:x.tip,after:after(x),say:g.r},hooks(x))}
 const rule=`<b>Waldregel:</b> ${g.r}${g.why?'<br>'+g.why:''}`;
 return{kind:'choice',prompt:`<span class="q">${g.s}</span><br><b>Was machst du?</b>`,answer:g.ok,options:shuffle([g.ok,...g.no]),
  diagnose:()=>({tag:'regeln',msg:'Hmm, ist das gut für den Wald und die Tiere? Denk an die Waldregeln!'}),explain:rule,after:rule,say:g.s+' Was machst du?'}}

function genMix(){return pick([genSchicht,genBaum,genNadel,genRegel,()=>genDetektiv(),()=>genDetektiv(),()=>genBlitz()])()}

/* ---------- Übungsplätze ---------- */
const ST=[
 {id:'wald-stockwerke',group:'Wald-Wissen',title:'Stockwerke des Waldes',sub:'Von der Krone bis zur Wurzel',n:6,gen:genSchicht,learn:[
  {h:'Der Wald hat Stockwerke',b:`<div class="vis">${waldSchichten()}</div><p>Wie ein Haus hat der Wald <b>fünf Stockwerke</b> – von ganz oben bis unter die Erde.</p>`},
  {h:'Die oberen Stockwerke',b:`<p>${SDESC[0]}</p><p>${SDESC[1]} Viele Vögel bauen hier ihre Nester – die Dornen schützen sie.</p>`},
  {h:'Die unteren Stockwerke',b:`<p>${SDESC[2]}</p><p>${SDESC[3]}</p><p>${SDESC[4]}</p>`},
  {h:'Merkspruch',b:`<div class="merk"><small>Merk dir</small>Baum, Strauch, Kraut und Moos –<br>unten ist die Wurzel los!</div><p>So weißt du die Reihenfolge von oben nach unten.</p>`}]},
 {id:'wald-baum',group:'Wald-Wissen',title:'Teile des Baumes',sub:'Krone, Stamm und Wurzel',n:5,gen:genBaum,learn:[
  {h:'Die drei Teile des Baumes',b:`<div class="vis">${baumTeile()}</div><p>Jeder Baum hat eine <b>Krone</b>, einen <b>Stamm</b> und <b>Wurzeln</b>.</p>`},
  {h:'Die Baumkrone',b:`<p>In der Krone sind Äste und Blätter. Die Blätter stellen mit Sonnenlicht <b>Sauerstoff</b> her. Das nennt man <b>Fotosynthese</b>.</p>`},
  {h:'Der Baumstamm',b:`<p>Der Stamm ist wie ein <b>Aufzug</b>: Er leitet Wasser und Nährstoffe nach oben.</p><p>Und er ist wie ein <b>Schutzpanzer</b>: Er schützt den Baum vor Schädlingen.</p>`},
  {h:'Die Wurzel',b:`<p>Die Wurzeln halten den Baum fest, damit er nicht umfällt. Außerdem sind sie wie ein <b>Strohhalm</b>: Sie saugen Wasser aus dem Boden.</p><div class="merk"><small>Merk dir</small>Krone: Sauerstoff<br>Stamm: Aufzug und Panzer<br>Wurzel: Halt und Strohhalm</div>`}]},
 {id:'wald-nadel',group:'Wald-Wissen',title:'Nadelbäume',sub:'Lärche, Tanne, Kiefer, Fichte',n:6,gen:genNadel,learn:[
  {h:'Vier Nadelbäume',b:`<p>${NDESC[0]}</p><p>${NDESC[1]}</p>`},
  {h:'Noch zwei Nadelbäume',b:`<p>${NDESC[2]}</p><p>${NDESC[3]}</p>`},
  {h:'Fichte oder Tanne?',b:`<div class="merk"><small>Merk dir</small>Die Fichte sticht, die Tanne nicht.</div><p>Die Zapfen der <b>Fichte</b> hängen nach unten. Die <b>Lärche</b> ist der einzige Nadelbaum, der im Herbst seine Nadeln verliert.</p>`}]},
 {id:'wald-regeln',group:'Wald-Wissen',title:'Waldregeln',sub:'Gast sein im Wald',n:5,gen:genRegel,learn:[
  {h:'Wir sind Gäste im Wald',b:`<p>Der Wald ist das Zuhause von vielen Tieren und Pflanzen. Wir sind dort zu Gast – darum gibt es <b>Waldregeln</b>.</p>`},
  {h:'Die zehn Waldregeln',b:`<ol class="rules">${RG.map(g=>`<li>${g.r}</li>`).join('')}</ol>`}]},
 {id:'wald-detektiv',group:'Rechtschreibung',title:'Wort-Detektiv',sub:'Richtig schreiben: Fehler finden',n:6,gen:()=>genDetektiv(),learn:[
  {h:'Trick 1: Kurz gesprochen – doppelt geschrieben',b:`<p>Hörst du einen <b>kurzen</b> Selbstlaut, kommt danach oft ein doppelter Mitlaut:</p><p class="wort">Schwa<mark>mm</mark> · Hu<mark>mm</mark>eln · Ta<mark>nn</mark>e · Wa<mark>ss</mark>er</p><p>Statt kk und zz schreibt man <b>ck</b> und <b>tz</b>: Schne<mark>ck</mark>en, Schu<mark>tz</mark>panzer.</p>`},
  {h:'Trick 2: Ableiten',b:`<p>ä oder e? äu oder eu? Such ein verwandtes Wort mit <b>a</b> oder <b>au</b>:</p><p>Bl<b>a</b>tt → Bl<mark>ä</mark>tter<br>Sch<b>a</b>den → Sch<mark>ä</mark>dlinge<br>Kr<b>au</b>t → Kr<mark>äu</mark>ter<br>M<b>au</b>s → M<mark>äu</mark>se</p>`},
  {h:'Trick 3: Das stumme h',b:`<p>Manchmal hört man das <b>h</b>, wenn man das Wort verlängert:</p><p>glü<b>h</b>en → Gl<mark>üh</mark>würmchen<br>frü<b>h</b> → Fr<mark>üh</mark>blüher<br>Stroh + Halm → Stro<mark>hh</mark>alm</p>`},
  {h:'Trick 4: Groß oder klein?',b:`<p>Kannst du <b>der, die</b> oder <b>das</b> davorsetzen? Dann ist es ein Nomen – es wird <b>groß</b> geschrieben: <i>der Schwamm, die Pflanzen</i>.</p><p>Sonst schreibt man es <b>klein</b>: <i>angesammelt, manchmal, wieder</i>.</p>`},
  {h:'Merkwörter',b:`<p>Manche Wörter muss man sich einfach merken:</p><p class="wort">Am<mark>ph</mark>ibien · Fotos<mark>y</mark>nthese · Ho<mark>l</mark>under · K<mark>ä</mark>fer · L<mark>ä</mark>rche</p>`}]},
 {id:'wald-puzzle',group:'Rechtschreibung',title:'Buchstaben-Puzzle',sub:'Wörter aus Buchstaben legen',n:5,gen:()=>genPuzzle(),learn:[
  {h:'So geht das Puzzle',b:`<p>Lies den Satz. Welches Wort fehlt? Tippe die Buchstaben in der richtigen Reihenfolge an.</p><p>Mit <b>⌫</b> nimmst du den letzten Buchstaben zurück. Achtung: Manchmal ist ein Buchstabe zu viel dabei!</p><div class="merk"><small>Tipp</small>Sprich das Wort langsam in Silben: Schmet-ter-lin-ge.</div>`}]},
 {id:'wald-blitz',group:'Rechtschreibung',title:'Blitz-Wörter',sub:'Anschauen, merken, schreiben',n:5,gen:()=>genBlitz(),learn:[
  {h:'So gehen Blitz-Wörter',b:`<ol class="rules"><li><b>Anschauen:</b> Das Wort leuchtet ein paar Sekunden auf.</li><li><b>Merken:</b> Augen zu und das Wort leise in Silben sprechen.</li><li><b>Schreiben:</b> Mit der Tastatur. Für einen Großbuchstaben erst <b>⇧</b> drücken.</li><li>Unsicher? <b>„Nochmal zeigen“</b> ist erlaubt!</li></ol>`}]}
];

registerTopic({
 id:'hsu-wald',subject:'hsu',
 title:'Der Wald',
 sub:'HSU Klasse 2: Der Wald',
 stations:ST,
 turnier:{title:'Wald-Ritt',sub:'Alles gemischt',n:8,gen:genMix},
 errNames:{
  schicht:'Stockwerke des Waldes verwechselt',
  baum:'Teile des Baumes verwechselt',
  nadel:'Nadelbäume verwechselt',
  regeln:'Waldregeln',
  doppel:'Rechtschreibung: doppelter Mitlaut (mm, nn, tt, ss …)',
  ableiten:'Rechtschreibung: ä/äu ableiten (Blatt → Blätter)',
  dehnung:'Rechtschreibung: Dehnungs-h (glühen, Stroh)',
  pf:'Rechtschreibung: pf',
  tzck:'Rechtschreibung: tz, ck, z',
  ie:'Rechtschreibung: langes i als ie',
  gross:'Rechtschreibung: groß oder klein',
  merk:'Rechtschreibung: Merkwörter (ph, y, ä, ee …)'},
 parentNote:'Grundlage ist das HSU-Heft „Der Wald“ (Stockwerke, Teile des Baumes, Nadelbäume, Waldregeln). Die Rechtschreib-Übungen nutzen Wörter, die in den Heft-Einträgen noch falsch geschrieben waren (z. B. Schädlinge, Strohhalm, Glühwürmchen, Amphibien, Farne, Blütenpflanzen, Schwamm, angesammelt). Falsch geschriebene Wörter kommen automatisch öfter dran, bis sie beim ersten Versuch sitzen.',
 parentExtra(){const m=Object.entries(S.miss).sort((a,b)=>b[1]-a[1]);
  return`<h3 style="margin-top:14px">Übe-Wörter (zuletzt falsch geschrieben)</h3><p class="small">${m.length?m.map(([w,n])=>`<span class="wort" style="font-size:1rem;margin-right:10px">${esc(w)} <span class="muted">(${n}×)</span></span>`).join(''):'<span class="muted">Noch keine.</span>'}</p>`}
});
})();
