/* ---------- task generators ---------- */
function genMinus(){
 const at=R(3,9),a1=R(0,8),b1=R(a1+1,9),bt=R(1,at-1),a=at*10+a1,b=bt*10+b1,r=a-b,m=a-bt*10,ten=m-a1;
 const steps=[{q:`Erst die Zehner weg:<br><b>${a} − ${bt*10}</b> = {?}`,a:m,why:`${at} Zehner minus ${bt} Zehner.`}];
 if(a1>0){steps.push({q:`Jetzt die <span class="o">${b1}</span> Einer. Erst bis zur Zehnerzahl springen:<br><b>${m} − ${a1}</b> = {?}`,a:ten});
  steps.push({q:`Es fehlen noch ${b1-a1} (denn ${a1} + ${b1-a1} = ${b1}):<br><b>${ten} − ${b1-a1}</b> = {?}`,a:r})}
 else steps.push({q:`Jetzt die Einer: <b>${m} − ${b1}</b> = {?}`,a:r,why:`Von ${m} sind es ${b1} Schritte zurück.`});
 return{kind:'num',prompt:`${a} − ${b} = {?}`,answer:r,jl:{start:a,jumps:a1>0?[-bt*10,-a1,-(b1-a1)]:[-bt*10,-b1]},
  diagnose(v){const rev=(at-bt)*10+(b1-a1);
   if(a1>0&&v===rev)return{tag:'umdreh',msg:`<b>Umdreh-Falle!</b> Du hast bei den Einern ${b1} − ${a1} gerechnet. Es heißt aber <b>${a1} − ${b1}</b>. Das geht nicht – also musst du über den Zehner springen.`};
   if(v===r+10)return{tag:'zehner',msg:'Ganz nah! Das sind genau <b>10 zu viel</b>. Beim Sprung über den Zehner wird ein Zehner aufgebraucht.'};
   if(v===r-10)return{tag:'zehner',msg:'Ganz nah! Das sind genau <b>10 zu wenig</b>. Prüf die Zehner nochmal.'};
   if(Math.abs(v-r)<=2)return{msg:'Ganz knapp! Zähl die Einer nochmal in Ruhe.'};return null},
  steps,after:`Probe: ${r} + ${b} = ${a} ✓`}}
function genPlus(){
 let at,a1,bt,b1;do{at=R(1,7);a1=R(2,9);b1=R(10-a1,9);bt=R(1,8-at)}while(at*10+a1+bt*10+b1>99);
 const a=at*10+a1,b=bt*10+b1,r=a+b,m=a+bt*10,need=10-a1,ten=m+need,rest=b1-need;
 const steps=[{q:`Erst die Zehner dazu:<br><b>${a} + ${bt*10}</b> = {?}`,a:m},
  {q:`Bis zum nächsten Zehner fehlen ${need} (Zehnerfreunde: ${a1} + ${need} = 10):<br><b>${m} + ${need}</b> = {?}`,a:ten}];
 if(rest>0)steps.push({q:`Von den ${b1} Einern sind noch ${rest} übrig:<br><b>${ten} + ${rest}</b> = {?}`,a:r});
 return{kind:'num',prompt:`${a} + ${b} = {?}`,answer:r,jl:{start:a,jumps:rest>0?[bt*10,need,rest]:[bt*10,need]},
  diagnose(v){const nc=(at+bt)*10+(a1+b1-10);
   if(v===nc)return{tag:'zehner',msg:`Du hast den <b>neuen Zehner vergessen</b>: ${a1} + ${b1} = ${a1+b1}. Das ist 1 Zehner und ${a1+b1-10} Einer. Der Zehner muss mitgezählt werden!`};
   if(v===r+10)return{tag:'zehner',msg:'Ganz nah! Das sind genau <b>10 zu viel</b>.'};
   if(Math.abs(v-r)<=2)return{msg:'Ganz knapp! Zähl die Einer nochmal in Ruhe.'};return null},
  steps,after:`Probe: ${r} − ${b} = ${a} ✓`}}
function genTU(){
 const a=R(12,59),b=R(11,39),c=a+b,base=`${a} + ${b} = ${c}`,tausch=`${b} + ${a} = ${c}`,u1=`${c} − ${b} = ${a}`,u2=`${c} − ${a} = ${b}`;
 const type=pick(['T','U','which','numT','numU','T','U']);
 const expl=`<b>Tauschaufgabe:</b> ${tausch} (Plus bleibt, Zahlen tauschen)<br><b>Umkehraufgabe:</b> ${u1} (rückwärts: aus Plus wird Minus)`;
 if(type==='T')return{kind:'choice',prompt:`Welche ist die <b>Tauschaufgabe</b> zu<br><span class="eq">${base}</span>`,answer:tausch,options:shuffle([tausch,u1,`${c} + ${a} = ${c+a}`]),
  diagnose:v=>v===u1?{tag:'tauschumkehr',msg:'Das ist die <b>Umkehraufgabe</b> – die rechnet rückwärts. Bei der Tauschaufgabe <b>bleibt das Plus</b>, nur die zwei Zahlen vorne tauschen die Plätze.'}:{msg:'Schau nochmal: Bei der Tauschaufgabe bleibt das Ergebnis gleich.'},explain:expl};
 if(type==='U'){const u=pick([u1,u2]);return{kind:'choice',prompt:`Welche ist die <b>Umkehraufgabe</b> zu<br><span class="eq">${base}</span>`,answer:u,options:shuffle([u,tausch,`${c} + ${b} = ${c+b}`]),
  diagnose:v=>v===tausch?{tag:'tauschumkehr',msg:'Das ist die <b>Tauschaufgabe</b>. Die Umkehraufgabe reitet rückwärts: <b>Ergebnis nach vorne, aus Plus wird Minus</b>.'}:{msg:'Bei der Umkehraufgabe muss ein Minus stehen und die Zahlen müssen wieder passen.'},explain:expl}}
 if(type==='which'){const isT=Math.random()<.5,other=isT?tausch:u1;return{kind:'choice',prompt:`<span class="eq" style="font-size:1.8rem">${base}</span><br>und<br><span class="eq" style="font-size:1.8rem">${other}</span><br>Was ist die zweite Aufgabe?`,answer:isT?'Tauschaufgabe':'Umkehraufgabe',options:['Tauschaufgabe','Umkehraufgabe'],
  diagnose:()=>({tag:'tauschumkehr',msg:isT?'Hier steht immer noch ein Plus – die Zahlen haben nur getauscht.':'Hier wird rückwärts gerechnet: aus Plus wurde Minus.'}),explain:expl}}
 if(type==='numT')return{kind:'num',prompt:`<span class="q">Tauschaufgabe zu ${base}</span><br>${b} + {?} = ${c}`,answer:a,diagnose:v=>v===c?{msg:'Das Ergebnis bleibt hinten stehen. Welche Zahl hat mit '+b+' den Platz getauscht?'}:null,
  steps:[{kind:'choice',q:`Bei der Tauschaufgabe tauschen die zwei vorderen Zahlen. Welche Zahl fehlt?`,options:shuffle([`${a}`,`${c}`,`${b}`]),a:`${a}`}],after:`Tauschaufgabe: ${tausch}`};
 return{kind:'num',prompt:`<span class="q">Umkehraufgabe zu ${base}</span><br>${c} − ${b} = {?}`,answer:a,
  diagnose:v=>v===c+b?{tag:'tauschumkehr',msg:'Bei der Umkehraufgabe wird <b>minus</b> gerechnet, nicht plus.'}:null,
  steps:[{kind:'choice',q:`Rückwärts gedacht: ${a} + ${b} = ${c}. Wenn ich von ${c} die ${b} wieder wegnehme, bleibt …`,options:shuffle([`${a}`,`${b}`,`${c}`]),a:`${a}`}],after:`Umkehraufgabe: ${u1} ✓`}}
function genPH(){
 const f=pick(['A','B','C','D']);let x,eq,inv,wrong,bm,probe,target,res;
 if(f==='A'||f==='B'){const b=R(11,45);x=R(11,52);const c=x+b;
  eq=f==='A'?`{?} + ${b} = ${c}`:`${b} + {?} = ${c}`;inv=`${c} − ${b}`;wrong=`${c} + ${b}`;target=c;
  bm=f==='A'?[c,x,b,'1']:[c,b,x,'2'];probe=v=>f==='A'?`${v} + ${b} = ${v+b}`:`${b} + ${v} = ${v+b}`;res=v=>v+b}
 else if(f==='C'){const a=R(45,98);x=R(11,a-12);const c=a-x;eq=`${a} − {?} = ${c}`;inv=`${a} − ${c}`;wrong=`${a} + ${c}`;target=c;bm=[a,c,x,'2'];probe=v=>`${a} − ${v} = ${a-v}`;res=v=>a-v}
 else{const b=R(11,40),c=R(12,58);x=b+c;eq=`{?} − ${b} = ${c}`;inv=`${c} + ${b}`;wrong=c>b?`${c} − ${b}`:`${b} − ${c}`;target=c;bm=[x,b,c,'w'];probe=v=>`${v} − ${b} = ${v-b}`;res=v=>v-b}
 const missWhole=bm[3]==='w';
 return{kind:'num',prompt:eq,answer:x,bar:bm,
  diagnose(v){if(isNaN(v))return null;const r=res(v);return{tag:'platzhalter',msg:`Mach die <b>Probe</b>: Setz deine Zahl ein. ${probe(v)}. Es soll aber <b>${target}</b> herauskommen – ${r>target?'das ist zu viel':'das ist zu wenig'}.`}},
  steps:[{kind:'choice',q:`Schau auf den Streifen: ${missWhole?'Das <b>Ganze</b> fehlt. Dann rechnest du beide Teile zusammen.':'Ein <b>Teil</b> fehlt. Dann rechnest du: Ganzes minus anderen Teil.'} Welche Rechnung findet die versteckte Zahl?`,options:shuffle([inv,wrong]),a:inv,
   diagnose:v=>v===wrong?{tag:'platzhalter',msg:missWhole?'Wenn das Ganze fehlt, brauchst du beide Teile zusammen.':'Wenn ein Teil fehlt, nimmst du vom Ganzen etwas weg – also minus.'}:null},
   {q:`Rechne jetzt: <b>${inv}</b> = {?}`,a:x}],after:`Probe: ${probe(x)} ✓`}}
const DIRS={'oben':-10,'unten':10,'links':-1,'rechts':1,'oben links':-11,'oben rechts':-9,'unten links':9,'unten rechts':11};
const DTXT={'oben':'eine Reihe nach oben = <b>10 weniger</b>','unten':'eine Reihe nach unten = <b>10 mehr</b>','links':'ein Kästchen nach links = <b>1 weniger</b>','rechts':'ein Kästchen nach rechts = <b>1 mehr</b>'};
function genHF(){
 const n=R(1,8)*10+R(2,9),d=Math.random()<.65?pick(['oben','unten','links','rechts']):pick(['oben links','oben rechts','unten links','unten rechts']),tg=n+DIRS[d];
 let steps;
 if(d.includes(' ')){const[v,h]=d.split(' '),m=n+DIRS[v];steps=[{q:`Schräg = zwei Schritte. Erst nach <b>${v}</b> (${v==='oben'?'10 weniger':'10 mehr'}):<br><b>${n} ${v==='oben'?'−':'+'} 10</b> = {?}`,a:m},{q:`Dann nach <b>${h}</b> (${h==='links'?'1 weniger':'1 mehr'}):<br><b>${m} ${h==='links'?'−':'+'} 1</b> = {?}`,a:tg}]}
 else steps=[{q:`Merke: ${DTXT[d]}.<br><b>${n} ${DIRS[d]<0?'−':'+'} ${Math.abs(DIRS[d])}</b> = {?}`,a:tg}];
 return{kind:'num',prompt:`<span class="q">Welche Zahl steht im Hunderterfeld<br><b>${d}</b> neben ${n}?</span>`,answer:tg,hf:[n,tg],
  diagnose(v){const other=Object.keys(DIRS).find(k=>n+DIRS[k]===v);if(other&&other!==d)return{tag:'richtung',msg:`${v} steht <b>${other}</b> von ${n}. Gesucht ist aber <b>${d}</b>.`};
   if(v-n===DIRS[d]*2)return{tag:'richtung',msg:'Du bist zwei Schritte gegangen. Es ist nur der direkte Nachbar.'};return null},
  steps,after:`Im Hunderterfeld: ${tg} steht ${d} von ${n}.`}}
function genNB(){
 const n=R(1,9)*10+R(1,9),t=pick(['vor','nach','nzk','nzg','rueckVor','rueckNach','rueckVor']);
 const lo=Math.floor(n/10)*10,hi=lo+10;
 const D={vor:[`Wie heißt der <b>Vorgänger</b> von ${n}?`,n-1,n,`Vorgänger = die Zahl <b>davor</b> = 1 weniger.`],
  nach:[`Wie heißt der <b>Nachfolger</b> von ${n}?`,n+1,n,`Nachfolger = die Zahl <b>danach</b> = 1 mehr.`],
  nzk:[`Wie heißt der <b>kleine Nachbarzehner</b> von ${n}?`,lo,n,`Nachbarzehner sind glatte Zehnerzahlen (sie enden mit 0). Der kleine kommt davor.`],
  nzg:[`Wie heißt der <b>große Nachbarzehner</b> von ${n}?`,hi,n,`Nachbarzehner sind glatte Zehnerzahlen (sie enden mit 0). Der große kommt danach.`],
  rueckVor:[`Der <b>Vorgänger</b> ist ${n}.<br>Wie heißt die Zahl?`,n+1,n,`${n} kommt <b>vor</b> der gesuchten Zahl. Die Zahl ist also 1 mehr.`],
  rueckNach:[`Der <b>Nachfolger</b> ist ${n}.<br>Wie heißt die Zahl?`,n-1,n,`${n} kommt <b>nach</b> der gesuchten Zahl. Die Zahl ist also 1 weniger.`]}[t];
 const [q,ans,known,rule]=D;
 return{kind:'num',prompt:`<span class="q">${q}</span>`,answer:ans,strip:[known,ans,t.startsWith('nz')?false:true],
  diagnose(v){
   if((t==='vor'&&v===n+1)||(t==='nach'&&v===n-1))return{tag:'nachbar',msg:`Verwechselt! ${t==='vor'?'Das ist der Nachfolger. Der Vorgänger kommt <b>vorher</b>.':'Das ist der Vorgänger. Der Nachfolger kommt <b>danach</b>.'}`};
   if(t.startsWith('rueck')&&Math.abs(v-n)===1)return{tag:'nachbar',msg:`Trickfrage! ${rule}`};
   if(t.startsWith('nz')&&v%10!==0)return{tag:'nachbar',msg:'Nachbarzehner sind glatte Zehnerzahlen – sie enden immer mit <b>0</b>.'};
   if(t==='nzk'&&v===hi||t==='nzg'&&v===lo)return{tag:'nachbar',msg:`Das ist der ${t==='nzk'?'große':'kleine'} Nachbarzehner. Gesucht ist der ${t==='nzk'?'kleine':'große'}.`};
   return null},
  steps:[{q:`${rule}<br><b>${n} ${ans>n?'+':'−'} ${Math.abs(ans-n)}</b> = {?}`,a:ans}],after:rule.replace(/<[^>]+>/g,'')}}
const HORSES=['Luna','Blitz','Fee','Sternchen','Max','Paula','Flocke','Merlin'],KIDS=['Mia','Lena','Ben','Emma','Jonas','Sophie','Noah','Lotta'];
function two(a){const s=shuffle(a);return[s[0],s[1]]}
function genSach(){
 const t=R(1,5);let story,frage,steps;
 const ask=(ok,o2,o3)=>({kind:'choice',q:'Zuerst: <b>Was wird gefragt?</b>',options:shuffle([ok,o2,o3]),a:ok,diagnose:()=>({msg:'Lies die Frage nochmal genau – achte auf das Wort am Ende.'})});
 const satz=(ok,bad)=>({kind:'choice',q:'Zum Schluss: <b>Welcher Antwortsatz passt zur Frage?</b>',options:shuffle([ok,bad]),a:ok,diagnose:()=>({tag:'sach',msg:'Der Antwortsatz muss genau die <b>Frage</b> beantworten.'})});
 if(t===1){const[h1,h2]=two(HORSES),k=R(6,19),X=2*k;
  story=`Das Pferd <b>${h1}</b> frisst <b>${X}</b> Karotten. Das Pony <b>${h2}</b> schafft nur <b>halb so viele</b>.`;frage=`Wie viele Karotten fressen <b>beide zusammen</b>?`;
  steps=[ask('Wie viele beide zusammen fressen',`Wie viele ${h2} frisst`,`Wie viele mehr ${h1} frisst`),
   {q:`Schritt 1: Wie viele frisst ${h2}? Halb so viele heißt: die Hälfte.<br><b>${X} : 2</b> = {?}`,a:k,hint:`Tipp: Zerlege ${X} in ${Math.floor(X/10)*10} und ${X%10}. Halbiere beide Teile und zähle sie zusammen.`,diagnose:v=>v===2*X?{msg:'Halb so viele ist <b>weniger</b>, nicht mehr!'}:null},
   {q:`Schritt 2: Beide zusammen:<br><b>${X} + ${k}</b> = {?}`,a:X+k,diagnose:v=>v===k?{tag:'sach',msg:`Das ist nur ${h2}! Gefragt ist: <b>beide zusammen</b>.`}:null},
   satz(`Beide fressen zusammen ${X+k} Karotten.`,`${h2} frisst ${k} Karotten.`)]}
 if(t===2){const[p1,p2]=two(KIDS),k=R(6,15);
  story=`<b>${p1}</b> putzt <b>${k}</b> Pferde. <b>${p2}</b> putzt <b>doppelt so viele</b>.`;frage=`Wie viele Pferde putzen <b>beide zusammen</b>?`;
  steps=[ask('Wie viele Pferde beide zusammen putzen',`Wie viele Pferde ${p2} putzt`,'Wie viele Pferde auf dem Hof sind'),
   {q:`Schritt 1: Wie viele putzt ${p2}? Doppelt heißt: zweimal so viele.<br><b>${k} + ${k}</b> = {?}`,a:2*k},
   {q:`Schritt 2: Beide zusammen:<br><b>${k} + ${2*k}</b> = {?}`,a:3*k,diagnose:v=>v===2*k?{tag:'sach',msg:`Das ist nur ${p2}! Gefragt ist: <b>beide zusammen</b>.`}:null},
   satz(`Beide putzen zusammen ${3*k} Pferde.`,`${p2} putzt ${2*k} Pferde.`)]}
 if(t===3){const a=R(18,38),b=R(8,19),c=R(3,9);
  story=`Auf dem Reiterhof liegen <b>${a}</b> Strohballen. Der Bauer bringt <b>${b}</b> neue dazu. Abends werden <b>${c}</b> Ballen verfüttert.`;frage=`Wie viele Strohballen sind <b>jetzt noch da</b>?`;
  steps=[ask('Wie viele Strohballen jetzt noch da sind','Wie viele Ballen der Bauer bringt','Wie viele Ballen verfüttert werden'),
   {q:`Schritt 1: Es kommen Ballen <b>dazu</b> – also plus:<br><b>${a} + ${b}</b> = {?}`,a:a+b},
   {q:`Schritt 2: Ballen werden verfüttert – die sind <b>weg</b>, also minus:<br><b>${a+b} − ${c}</b> = {?}`,a:a+b-c,diagnose:v=>v===a+b+c?{tag:'sach',msg:'Verfüttert heißt: die Ballen sind <b>weg</b> → minus!'}:null},
   satz(`Jetzt sind noch ${a+b-c} Strohballen da.`,`Der Bauer bringt ${b} Strohballen.`)]}
 if(t===4){const[h1,h2]=two(HORSES),a=R(12,30),d=R(5,14);
  story=`Beim Turnier springt <b>${h1}</b> über <b>${a}</b> Hindernisse. <b>${h2}</b> springt über <b>${d} mehr</b> als ${h1}.`;frage=`Über wie viele Hindernisse springen <b>beide zusammen</b>?`;
  steps=[ask('Über wie viele Hindernisse beide zusammen springen',`Über wie viele ${h2} springt`,`Wie viele mehr ${h2} springt`),
   {q:`Schritt 1: Wie viele springt ${h2}? „${d} mehr“ heißt plus:<br><b>${a} + ${d}</b> = {?}`,a:a+d},
   {q:`Schritt 2: Beide zusammen:<br><b>${a} + ${a+d}</b> = {?}`,a:2*a+d,diagnose:v=>v===a+d?{tag:'sach',msg:`Das ist nur ${h2}! Gefragt ist: <b>beide zusammen</b>.`}:null},
   satz(`Beide springen zusammen über ${2*a+d} Hindernisse.`,`${h2} springt über ${a+d} Hindernisse.`)]}
 if(t===5){const[p1,p2]=two(KIDS),a=R(25,44),d=R(5,15);
  story=`<b>${p1}</b> sammelt <b>${a}</b> Äpfel für die Pferde. <b>${p2}</b> sammelt <b>${d} weniger</b>.`;frage=`Wie viele Äpfel sammeln <b>beide zusammen</b>?`;
  steps=[ask('Wie viele Äpfel beide zusammen sammeln',`Wie viele Äpfel ${p2} sammelt`,`Wie viele weniger ${p2} sammelt`),
   {q:`Schritt 1: Wie viele sammelt ${p2}? „${d} weniger“ heißt minus:<br><b>${a} − ${d}</b> = {?}`,a:a-d},
   {q:`Schritt 2: Beide zusammen:<br><b>${a} + ${a-d}</b> = {?}`,a:2*a-d,diagnose:v=>v===a-d?{tag:'sach',msg:`Das ist nur ${p2}! Gefragt ist: <b>beide zusammen</b>.`}:null},
   satz(`Beide sammeln zusammen ${2*a-d} Äpfel.`,`${p2} sammelt ${a-d} Äpfel.`)]}
 return{stepsOnly:true,story,frage,steps}}
function genMix(){return pick([genMinus,genMinus,genPlus,genPH,genHF,genNB,genTU])()}

/* ---------- stations + lessons ---------- */
const ST=[
 {id:'minus',title:'Minus über den Zehner',sub:'Die Umdreh-Falle austricksen',gen:genMinus,n:6,learn:[
  {h:'Achtung: die Umdreh-Falle!',b:`<p>Bei <b>68 − 19</b> denken viele: „8 − 9 geht nicht… dann rechne ich halt 9 − 8 = 1.“</p><div class="wrongeq">68 − 19 = 51</div><p>Das ist falsch! Bei Minus darf man die Einer <b>nicht umdrehen</b>. Die 19 wird von der 68 weggenommen – nicht andersherum.</p>`},
  {h:'Warum geht 8 − 9 nicht?',b:`<p>68 sind <span class="t">6 Zehnerstangen</span> und <span class="o">8 Einzelne</span>.</p><div class="vis">${blocks(68)}</div><p>Du willst 9 Einzelne wegnehmen, hast aber nur 8. Also musst du über die Zehnerzahl hinweg springen.</p>`},
  {h:'Der Trick: in Sprüngen rechnen',b:`<div class="vis">${jumpLine(68,[-10,-8,-1])}</div><ol class="rules"><li>Erst die <span class="t">Zehner</span> weg: 68 − 10 = 58</li><li>Dann bis zur Zehnerzahl: 58 − 8 = 50</li><li>Dann den Rest: 50 − 1 = 49</li></ol><p>Die 9 Einer wurden in <b>8 und 1</b> zerlegt.</p>`},
  {h:'Merksatz',b:`<div class="merk"><small>Merk dir</small>Erst die Zehner weg. Dann die Einer – zuerst bis zur glatten Zehnerzahl, dann den Rest.</div><p>Am Ende machst du die <b>Probe</b> mit Plus:<br>49 + 19 = 68 ✓ Stimmt!</p>`}]},
 {id:'plus',title:'Plus über den Zehner',sub:'Zehner nicht vergessen',gen:genPlus,n:6,learn:[
  {h:'Plus in Sprüngen',b:`<p>Bei <b>52 + 19</b> springst du so:</p><div class="vis">${jumpLine(52,[10,8,1])}</div><ol class="rules"><li>Erst die <span class="t">Zehner</span> dazu: 52 + 10 = 62</li><li>Bis zum nächsten Zehner: 62 + 8 = 70</li><li>Den Rest: 70 + 1 = 71</li></ol>`},
  {h:'Zehnerfreunde helfen',b:`<p>Diese Zahlen ergeben zusammen <b>10</b>:</p><div class="zf"><div>1 + 9</div><div>2 + 8</div><div>3 + 7</div><div>4 + 6</div><div>5 + 5</div></div><p>Bei 62 sind es 2 Einer. Der Zehnerfreund von 2 ist <b>8</b> – also fehlen 8 bis 70.</p>`},
  {h:'Merksatz',b:`<div class="merk"><small>Merk dir</small>Werden die Einer zusammen 10 oder mehr, entsteht ein <b>neuer Zehner</b>. Den darfst du nie vergessen!</div><p>Probe mit Minus: 71 − 19 = 52 ✓</p>`}]},
 {id:'platz',title:'Versteckte Zahlen',sub:'Platzhalter mit dem Streifen-Trick',gen:genPH,n:6,learn:[
  {h:'Eine Zahl hat sich versteckt',b:`<div class="eq">? + 24 = 52</div><p>Hier darfst du <b>nicht einfach 52 + 24</b> rechnen! Gesucht ist die Zahl, die mit 24 zusammen 52 ergibt.</p>`},
  {h:'Der Streifen-Trick',b:`<div class="vis">${barModel(52,28,24,'1')}</div><p>52 ist das <b>Ganze</b>. 24 ist ein <b>Teil</b>. Der andere Teil fehlt.</p><div class="merk">Fehlt ein Teil? → Ganzes minus anderen Teil.<br>52 − 24 = 28</div>`},
  {h:'Auch bei Minus',b:`<div class="eq" style="font-size:2rem">68 − ? = 19</div><div class="vis">${barModel(68,19,49,'2')}</div><p>68 ist das Ganze, 19 ist ein Teil. Also: <b>68 − 19 = 49</b>.</p>`},
  {h:'Wenn das Ganze fehlt',b:`<div class="eq" style="font-size:2rem">? − 19 = 79</div><div class="vis">${barModel(98,19,79,'w')}</div><p>Beide Teile sind da. Dann rechnest du sie zusammen: <b>79 + 19 = 98</b>.</p>`},
  {h:'Merksatz',b:`<div class="merk"><small>Merk dir</small>Fehlt ein Teil → <b>minus</b>.<br>Fehlt das Ganze → <b>plus</b>.<br>Immer Probe: Zahl einsetzen und nachrechnen!</div>`}]},
 {id:'tausch',title:'Tausch- und Umkehraufgabe',sub:'Wer tauscht, wer reitet zurück?',gen:genTU,n:6,learn:[
  {h:'Die Tauschaufgabe',b:`<p>Zwei Pferde tauschen ihren Platz im Stall:</p><div class="eq" style="font-size:2rem"><span class="t">37</span> + <span class="o">26</span> = 63</div><div class="eq" style="font-size:2rem"><span class="o">26</span> + <span class="t">37</span> = 63</div><p>Das <b>Plus bleibt</b>. Das <b>Ergebnis bleibt</b>. Nur die zwei Zahlen vorne tauschen.</p>`},
  {h:'Die Umkehraufgabe',b:`<p>Das Pferd reitet den Weg <b>zurück</b>:</p><div class="eq" style="font-size:2rem">37 + 26 = 63</div><div class="eq" style="font-size:2rem">63 − 26 = 37</div><p>Das Ergebnis kommt nach vorne, aus <b>Plus wird Minus</b>. Auch richtig: 63 − 37 = 26.</p>`},
  {h:'Merksatz',b:`<div class="twocol"><div><b>Tauschaufgabe</b><br>Zahlen tauschen.<br>Plus bleibt Plus.</div><div><b>Umkehraufgabe</b><br>Rückwärts rechnen.<br>Plus wird Minus.</div></div><p>Mit der Umkehraufgabe kannst du jede Rechnung <b>prüfen</b>.</p>`}]},
 {id:'hf',title:'Hunderterfeld',sub:'Oben, unten, links, rechts',gen:genHF,n:6,learn:[
  {h:'So ist das Hunderterfeld gebaut',b:`<div class="vis">${hfFull(47,'row')}</div><p>Jede Reihe hat <b>10</b> Zahlen. Nach <b>rechts</b>: 1 mehr. Nach <b>links</b>: 1 weniger.</p>`},
  {h:'Nach oben und unten',b:`<div class="vis">${hfFull(47,'col')}</div><p>Nach <b>unten</b>: 10 mehr. Nach <b>oben</b>: 10 weniger.<br>Die <span class="o">Einer bleiben gleich</span>: 7, 17, 27, 37, 47 …</p>`},
  {h:'Die Nachbarn von 47',b:`<div class="vis">${hfWindow(47,null,false,true)}</div><p>Oben 37, unten 57, links 46, rechts 48.</p>`},
  {h:'Merksatz',b:`<div class="merk"><small>Merk dir</small>Links −1, rechts +1.<br>Oben −10, unten +10.<br>Schräg = zwei Schritte: erst hoch oder runter, dann zur Seite.</div>`}]},
 {id:'nachbar',title:'Nachbarzahlen',sub:'Vorgänger, Nachfolger, Zehner',gen:genNB,n:6,learn:[
  {h:'Vorgänger und Nachfolger',b:`<div class="vis">${strip(53,54,true,true)}</div><p><b>Vorgänger</b> von 53 ist 52 – die Zahl davor (1 weniger).<br><b>Nachfolger</b> von 53 ist 54 – die Zahl danach (1 mehr).</p>`},
  {h:'Nachbarzehner',b:`<p>Die <b>glatten Zehnerzahlen</b> links und rechts von 53:</p><div class="eq" style="font-size:2rem">50 · 53 · 60</div><p>Nachbarzehner enden immer mit <b>0</b>.</p>`},
  {h:'Die Trickfrage',b:`<p>„Der Vorgänger ist 53. Wie heißt die Zahl?“</p><p>53 kommt <b>vor</b> der Zahl. Also ist die Zahl <b>54</b>. Und ihr Nachfolger ist <b>55</b>.</p><div class="merk"><small>Merk dir</small>Erst überlegen: Welche Zahl kenne ich – und wo steht die gesuchte Zahl?</div>`}]},
 {id:'sach',title:'Sachaufgaben',sub:'Jeden Rechenschritt aufschreiben',gen:genSach,n:4,learn:[
  {h:'Wie ein Parcours: 4 Hindernisse',b:`<ol class="rules"><li><b>Lesen</b> – am besten zweimal.</li><li><b>Frage finden</b> – was will ich wissen?</li><li><b>Jeden Rechenschritt</b> einzeln aufschreiben.</li><li><b>Antwortsatz</b> – passt er zur Frage?</li></ol>`},
  {h:'Ein Beispiel',b:`<div class="story">Tim isst <b>24</b> Kekse. Kilian schafft nur <b>halb so viele</b>.<div class="frage">Wie viele essen beide zusammen?</div></div><p>Schritt 1: Kilian: 24 : 2 = 12<br>Schritt 2: Zusammen: 24 + 12 = 36</p><div class="merk">12 ist noch nicht die Antwort! Gefragt war: <b>zusammen</b>.</div>`},
  {h:'Signalwörter',b:`<div class="sig"><b>zusammen</b><span>plus</span><b>dazu</b><span>plus</span><b>mehr als</b><span>plus</span><b>weniger als</b><span>minus</span><b>weg, aufgegessen</b><span>minus</span><b>halb so viele</b><span>durch 2 teilen</span><b>doppelt so viele</b><span>zweimal dazu</span></div>`}]}
];
/* ---------- Thema registrieren ---------- */
registerTopic({
 id:'mathe-kl2',
 title:'Mathe Klasse 2',
 sub:'Rechnen im Zahlenraum bis 100',
 stations:ST,
 turnier:{title:'Turnier-Ritt',sub:'Alles gemischt',n:8,gen:genMix},
 tools:[{id:'calc',title:'Rechen-Erklärer',sub:'Tippe eine Aufgabe ein – ich zeige dir den Weg',icon:'<svg viewBox="0 0 40 40" width="40" height="40"><rect x="4" y="4" width="32" height="32" rx="9" fill="var(--hay-soft)" stroke="var(--hay)" stroke-width="2.5"/><path d="M13 20h14M20 13v14" stroke="var(--ink)" stroke-width="3.2" stroke-linecap="round"/></svg>',open:()=>openCalc()},
  {id:'flip7',title:'Flip-7-Rechenhilfe',sub:'Karten antippen, selbst rechnen, dann vergleichen',icon:'<svg viewBox="0 0 40 40" width="40" height="40"><rect x="9" y="5" width="22" height="30" rx="5" fill="#fff" stroke="var(--grass)" stroke-width="2.5" transform="rotate(-8 20 20)"/><text x="20" y="27" text-anchor="middle" font-size="19" font-weight="800" fill="var(--grass)" transform="rotate(-8 20 20)">7</text></svg>',open:()=>openFlip7()}],
 errNames:{
  umdreh:'Umdreh-Falle (Einer bei Minus vertauscht)',
  zehner:'Zehner vergessen / um 10 daneben',
  platzhalter:'Platzhalter falsch angesetzt',
  tauschumkehr:'Tausch- und Umkehraufgabe verwechselt',
  richtung:'Richtung im Hunderterfeld',
  nachbar:'Vorgänger / Nachfolger / Nachbarzehner',
  sach:'Zwischenergebnis als Antwort angegeben'},
 parentNote:'Typische Stolperstellen in Klasse 2: Minus mit Zehnerübergang (Einer werden umgedreht, z. B. 68 − 19 = 51), Platzhalteraufgaben, Tausch- vs. Umkehraufgabe, Hunderterfeld, Nachbarzahlen und zweischrittige Sachaufgaben.'
});
