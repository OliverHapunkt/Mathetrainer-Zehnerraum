/* =====================================================================
   „Reise im Kopf“ für das HSU-Thema Der Wald (Gedächtnis-Pfad / Routen-Methode)
   Das Kind geht in Gedanken einen Weg mit festen Stationen. Jede Station hat
   ein Merk-Bild, das man sich gut vorstellen kann. So bleiben Reihenfolge und
   Inhalte besser hängen. Am Ende steht eine verrückte Geschichte, die alle
   Merk-Bilder verbindet.

   Eine Reise (J) hat:
     id, title, sub, n        Übungsplatz (Kachel) und Aufgaben pro Runde
     noun                     für die Frage „Zu welchem … gehört dieses Bild?“
     intro                    HTML der ersten Lernkarte
     chain                    verrückte Geschichte (HTML), verbindet alle Merk-Bilder
     offset                   Nummerierung der Stationen (z. B. 5 = Station 6 bis 10)
     stops[]: name, short, anchor, img, hook, story, facts, scene, qa:[[Frage, richtig, [falsch, falsch]]]
   ===================================================================== */
(function(){

const J_STOCK={
 id:'wald-reise',title:'Waldreise: Stockwerke',sub:'Geh von unten nach oben durch den Wald',n:6,
 noun:'Stockwerk',zuWelch:'Zu welchem Stockwerk',offset:0,
 intro:`<p>Heute machst du eine <b>Reise im Kopf</b>. Du gehst mit ${PONY} durch den Wald und schaust ganz langsam <b>von unten nach oben</b>.</p><p>An jeder Station siehst du ein <b>Merk-Bild</b>. Wer sich die Bilder merkt, weiß auch die Stockwerke!</p><div class="merk"><small>Tipp</small>Mach nach jeder Station kurz die Augen zu und stell dir das Bild vor.</div>`,
 chain:`Der <b>Dachs</b> schrubbt mit dem <b>Schwamm</b> das <b>Pony</b>. Das Pony pustet die <b>Giraffe</b> an. Die Giraffe winkt dem <b>Eichhörnchen</b> ganz oben zu.`,
 stops:[
  {name:'Wurzelschicht',short:'Wurzel',anchor:'Unter deinen Füßen',img:'der Dachs',
   hook:'Unter deinen Füßen wohnt der Dachs.',
   story:`Stopp! Unter deinen Füßen scharrt und klopft es. Dort wohnt der <b>Dachs</b> in seiner Höhle zwischen den dicken Wurzeln. Im Winter graben sich auch Frösche und Kröten ein und schlafen.`,
   facts:`<b>Hier leben:</b> Fuchs, Dachs, Maus, Hase, Tausendfüßer, Regenwürmer. <b>Hier sind:</b> die Wurzeln aller Pflanzen.`,
   qa:[['Du hörst es unter deinen Füßen scharren. Wer wohnt dort in seiner Höhle?','der Dachs',['das Eichhörnchen','die Giraffe']],
       ['Wo verbringen Frösche und Kröten den Winter?','unter der Erde',['hoch in den Ästen','in einem Vogelnest']],
       ['Welcher Wurm lebt unter der Erde?','der Regenwurm',['das Glühwürmchen','der Seidenwurm']]]},
  {name:'Moosschicht',short:'Moos',anchor:'Ganz unten am Boden',img:'der Schwamm',
   hook:'Das Moos ist weich wie ein Schwamm.',
   story:`Du kniest dich hin. Der Boden ist weich wie ein <b>Schwamm</b>! Das Moos saugt Wasser auf und gibt es an die Pflanzen weiter. Eine Schnecke kriecht vorbei, daneben steht ein Pilz.`,
   facts:`<b>Nur etwa 5 cm hoch.</b> <b>Hier wachsen:</b> Moos, Pilze, Flechten. <b>Hier leben:</b> Schnecken, Asseln, Spinnen, Salamander.`,
   qa:[['Der Boden saugt Wasser auf und gibt es weiter – wie ein …?','Schwamm',['Stein','Eimer']],
       ['Welches Tier kriecht mit seinem Haus über das Moos?','die Schnecke',['die Biene','der Dachs']],
       ['Was wächst in der Moosschicht?','Moos, Pilze und Flechten',['Holunder und Haselstrauch','Gräser und Farne']]]},
  {name:'Krautschicht',short:'Kraut',anchor:`Bis zu ${PONY}s Rücken`,img:'das Pony',
   hook:`Die Blumen reichen bis zu ${PONY}s Rücken.`,
   story:`Jetzt wachsen Gräser, Farne und Blumen bis zu ${PONY}s Rücken. Bienen und Hummeln summen von Blüte zu Blüte. Am Abend leuchten manchmal Glühwürmchen.`,
   facts:`<b>Etwa 1 Meter hoch.</b> <b>Hier wachsen:</b> Gräser, Farne, Kräuter, Blütenpflanzen, Frühblüher. <b>Hier leben:</b> Bienen, Hummeln, Käfer, Schmetterlinge, Glühwürmchen.`,
   qa:[['Welche Tiere summen hier von Blüte zu Blüte?','Bienen und Hummeln',['Dachs und Fuchs','Specht und Eule']],
       ['Wie hoch ist die Krautschicht ungefähr?','etwa 1 Meter',['etwa 5 Zentimeter','etwa 5 Meter']],
       ['Was leuchtet am Abend manchmal in der Krautschicht?','Glühwürmchen',['Schnecken','Pilze']]]},
  {name:'Strauchschicht',short:'Strauch',anchor:'Höher als dein Kopf',img:'die Giraffe',
   hook:'Die Büsche sind so hoch wie eine Giraffe.',
   story:`Autsch! Die Brombeeren piksen. Hier wachsen Büsche, die so hoch sind wie eine <b>Giraffe</b>: Holunder, Haselsträucher und junge Bäume. In den Dornen ist ein Vogelnest gut geschützt. Eine Haselmaus klettert durch die Zweige.`,
   facts:`<b>Bis zu 5 Meter hoch.</b> <b>Hier wachsen:</b> Holunder, Haselstrauch, Brombeere, junge Bäume. <b>Hier leben:</b> Vögel, Haselmaus, Füchse, Rehe, Wildschweine.`,
   qa:[['Wie hoch ist die Strauchschicht ungefähr?','bis zu 5 Meter',['bis zu 1 Meter','nur 5 Zentimeter']],
       ['Was schützt die Vogelnester in der Strauchschicht?','die Dornen',['der Dachs','das Moos']],
       ['Was piekst mit Dornen?','die Brombeere',['der Farn','das Moos']]]},
  {name:'Baumschicht',short:'Baum',anchor:'Hoch über dir im Himmel',img:'das Eichhörnchen',
   hook:'Ganz oben springt das Eichhörnchen von Ast zu Ast.',
   story:`Kopf in den Nacken! Ganz oben wiegen sich die Baumkronen. Ein <b>Eichhörnchen</b> springt von Ast zu Ast und ein Specht klopft am Stamm. Die Blätter stellen Sauerstoff her.`,
   facts:`<b>Das höchste Stockwerk.</b> <b>Hier wachsen:</b> Laubbäume und Nadelbäume. <b>Hier leben:</b> Eichhörnchen, Specht und viele Vögel.`,
   qa:[['Wer springt in den Baumkronen von Ast zu Ast?','das Eichhörnchen',['der Dachs','die Schnecke']],
       ['Welches Stockwerk ist ganz oben?','die Baumschicht',['die Moosschicht','die Wurzelschicht']]]}
 ]};

const J_BAUM={
 id:'wald-reise-baum',title:'Baumhaus-Reise',sub:'Keller, Aufzug und Dach-Fabrik',n:5,
 noun:'Baumteil',zuWelch:'Zu welchem Teil des Baumes',offset:0,
 intro:`<p>Stell dir vor, ein Baum ist ein <b>Haus</b>. Du gehst mit ${PONY} von unten nach oben durch das Baumhaus.</p><p>Im Keller, im Erdgeschoss und auf dem Dach siehst du Merk-Bilder für die drei Teile des Baumes.</p><div class="merk"><small>Tipp</small>Stell dir vor, du fährst im Aufzug durch den Baumstamm.</div>`,
 chain:`Im Keller trinkt jemand mit einem riesigen <b>Strohhalm</b>. Dann fährst du im <b>Aufzug</b> nach oben. Auf dem Dach fliegen bunte <b>Luftballons</b> in den Himmel.`,
 stops:[
  {name:'die Wurzel',short:'Wurzel',anchor:'Der Keller',img:'der Strohhalm',
   hook:'Im Keller trinkt die Wurzel mit einem riesigen Strohhalm.',
   story:`Du gehst in den Keller des Baumhauses. Die Wurzeln halten das ganze Haus fest, damit es nicht umfällt. Und sie trinken Wasser, mit einem riesigen <b>Strohhalm</b>.`,
   facts:`<b>Die Wurzel</b> hält den Baum fest und saugt Wasser auf.`,
   qa:[['Welcher Teil hält den Baum fest, damit er nicht umfällt?','die Wurzel',['die Baumkrone','der Baumstamm']],
       ['Welcher Teil saugt Wasser auf wie ein Strohhalm?','die Wurzel',['die Baumkrone','der Baumstamm']]]},
  {name:'der Baumstamm',short:'Stamm',anchor:'Das Erdgeschoss',img:'der Aufzug',
   hook:'Im Stamm fährt ein Aufzug mit Wasser und Nährstoffen nach oben.',
   story:`Im Erdgeschoss steht ein <b>Aufzug</b>. Er fährt Wasser und Nährstoffe nach oben. Außen trägt das Haus einen Schutzpanzer aus Rinde. Schädlinge prallen ab: Boing!`,
   facts:`<b>Der Baumstamm</b> leitet Wasser und Nährstoffe und schützt den Baum vor Schädlingen.`,
   qa:[['Welcher Teil leitet Wasser und Nährstoffe nach oben – wie ein Aufzug?','der Baumstamm',['die Wurzel','die Baumkrone']],
       ['Welcher Teil schützt den Baum vor Schädlingen?','der Baumstamm',['die Wurzel','die Baumkrone']]]},
  {name:'die Baumkrone',short:'Krone',anchor:'Das Dach',img:'der Luftballon',
   hook:'Auf dem Dach steigen Luftballons voller Sauerstoff auf.',
   story:`Oben auf dem Dach ist die Fabrik: Die Blätter stellen mit Sonnenlicht Sauerstoff her. Die <b>Luftballons</b> steigen auf. Das nennt man <b>Fotosynthese</b>.`,
   facts:`<b>Die Baumkrone</b> hat Äste und Blätter. Die Blätter stellen Sauerstoff her (Fotosynthese).`,
   qa:[['Welcher Teil stellt mit seinen Blättern Sauerstoff her?','die Baumkrone',['die Wurzel','der Baumstamm']],
       ['Wie nennt man es, wenn Blätter Sauerstoff herstellen?','Fotosynthese',['Winterschlaf','Verdunstung']]]}
 ]};

const J_NADEL={
 id:'wald-reise-nadel',title:'Nadelwald-Weg',sub:'Lärche, Tanne, Kiefer und Fichte treffen',n:6,
 noun:'Nadelbaum',zuWelch:'Zu welchem Nadelbaum',offset:0,
 intro:`<p>Du gehst im Herbst mit ${PONY} auf dem <b>Nadelwald-Weg</b>. Am Wegrand stehen vier Nadelbäume nacheinander.</p><p>Jeder Baum zeigt dir sein Merk-Bild. So kannst du sie nie wieder verwechseln!</p><div class="merk"><small>Tipp</small>Stell dir vor, du gibst jedem Baum die Hand.</div>`,
 chain:`Die <b>Lärche</b> tanzt im <b>Goldkleid</b> mit der Tanne. Die hat einen <b>Silberstreifen</b> um den Hals. Zusammen öffnen sie den <b>Küchenschrank</b> der Kiefer. Darin sitzt ein <b>Igel</b>, der sticht wie die Fichte.`,
 stops:[
  {name:'die Lärche',short:'Lärche',anchor:'Im Herbst: Goldkleid',img:'das Goldkleid',
   hook:'Die Lärche zieht im Herbst ihr Goldkleid aus.',
   story:`Im Herbst steht am Weg ein Baum im <b>Goldkleid</b>. Seine weichen, schmalen Nadeln wachsen in Büscheln. Dann zieht er das Kleid aus: Alle Nadeln fallen ab! Seine kleinen Zapfen stehen aufrecht auf dem Zweig.`,
   facts:`<b>Die Lärche</b> ist der einzige Nadelbaum, der im Herbst goldgelb wird und seine Nadeln verliert.`,
   qa:[['Welcher Nadelbaum verliert im Herbst seine Nadeln?','die Lärche',['die Tanne','die Fichte']],
       ['Welche Farbe haben die Lärchennadeln im Herbst?','goldgelb',['rot','silberweiß']],
       ['Wie wachsen die weichen Nadeln der Lärche?','in Büscheln',['in zwei Reihen','einzeln']]]},
  {name:'die Tanne',short:'Tanne',anchor:'Ein Baum zum Kuscheln',img:'der Silberstreifen',
   hook:'Die Tanne hat weiche Nadeln mit Silberstreifen.',
   story:`Der nächste Baum streichelt dich: Seine Nadeln sind stumpf, flach und weich. Unten haben sie zwei <b>Silberstreifen</b>. Die Zapfen stehen aufrecht und fallen nie im Ganzen herunter. Nur die Schuppen fallen einzeln ab.`,
   facts:`<b>Die Tanne</b> sticht nicht! Merkspruch: <b>Die Fichte sticht, die Tanne nicht.</b>`,
   qa:[['Was haben die Tannennadeln auf der Unterseite?','zwei silberweiße Streifen',['zwei rote Punkte','gar nichts']],
       ['Welche Nadeln sind stumpf, flach und weich?','die Tannennadeln',['die Fichtennadeln','die Kiefernnadeln']],
       ['Welche Zapfen fallen nie im Ganzen herunter?','die Tannenzapfen',['die Fichtenzapfen','die Lärchenzapfen']]]},
  {name:'die Kiefer',short:'Kiefer',anchor:'Ein Baum mit Schrank',img:'der Küchenschrank',
   hook:'Aus Kiefernholz baut man gern Möbel, zum Beispiel einen Küchenschrank.',
   story:`Dieser Baum hat lange, blau- oder graugrüne Nadeln. Sie sind leicht gedreht, spitz und starr. Seine Zapfen sehen aus wie kleine Eier. Aus seinem Holz baut man gern Möbel. Du siehst einen <b>Küchenschrank</b>.`,
   facts:`<b>Die Kiefer</b> hat ziemlich lange Nadeln und eiförmige, graugrüne Zapfen. Ihr Holz ist beliebt für Möbel.`,
   qa:[['Aus welchem Holz baut man besonders gern Möbel?','Kiefernholz',['Lärchenholz','Fichtenholz']],
       ['Welcher Baum hat ziemlich lange, blau- oder graugrüne Nadeln?','die Kiefer',['die Tanne','die Lärche']],
       ['Wie sehen die Zapfen der Kiefer aus?','eiförmig',['kugelrund','ganz flach']]]},
  {name:'die Fichte',short:'Fichte',anchor:'Aua, das sticht!',img:'der Igel',
   hook:'Die Fichte sticht wie ein Igel, und ihre Zapfen hängen nach unten.',
   story:`Aua! Die Fichte <b>sticht</b> wie ein <b>Igel</b>. Ihre Nadeln sind spitz und kantig. Ihre Zapfen hängen nach unten. Sie ist der häufigste Baum in Deutschland: Hier steht ein ganzer Fichtenwald!`,
   facts:`<b>Die Fichte</b> erkennt man am besten an den Zapfen: Sie hängen nach unten.`,
   qa:[['Welcher Nadelbaum ist der häufigste in Deutschland?','die Fichte',['die Lärche','die Kiefer']],
       ['Welche Zapfen hängen nach unten?','die Fichtenzapfen',['die Tannenzapfen','die Lärchenzapfen']],
       ['Welche Nadeln stechen, weil sie spitz und kantig sind?','die Fichtennadeln',['die Tannennadeln','die Lärchennadeln']],
       ['Ergänze den Merkspruch: Die Fichte …, die Tanne nicht.','sticht',['singt','schläft']]]}
 ]};

const REGELN=[
 {n:'Wir lassen keinen Müll liegen!',short:'Müll',anchor:'Der Rucksack',img:'der Rucksack',hook:'Das Papier springt in den Rucksack.',story:`Du hast dein Pausenbrot gegessen. Das Papier springt in deinen <b>Rucksack</b>. Es ruft: „Ich komme mit nach Hause!“`},
 {n:'Wir fassen keine Wildtiere an!',short:'Tiere',anchor:'Das Rehkitz',img:'das Rehkitz',hook:'Das Rehkitz liegt im Gras: nicht anfassen.',story:`Im Gras liegt ein <b>Rehkitz</b>. Es hat ein Schild um den Hals: „Bitte nicht anfassen!“ Seine Mutter kommt bald zurück.`},
 {n:'Wir bleiben auf den Wegen!',short:'Wege',anchor:'Die Hufspuren',img:'die Hufspuren',hook:`${PONY} läuft brav auf dem Weg, man sieht die Hufspuren.`,story:`${PONY} trabt brav auf dem Weg. Du siehst ihre <b>Hufspuren</b> im Sand. Wer auf dem Weg bleibt, stört keine Tiere.`},
 {n:'Wir schreien im Wald nicht herum!',short:'Leise',anchor:'Der Zeigefinger',img:'der Zeigefinger',hook:'Der Zeigefinger vor dem Mund sagt: Pst!',story:`Ein Kind hält den <b>Zeigefinger</b> vor den Mund: „Pst!“ Im Wald sind wir leise, damit die Tiere keine Angst bekommen.`},
 {n:'Wir achten auf Schilder und Warnhinweise!',short:'Schilder',anchor:'Das Warndreieck',img:'das Warndreieck',hook:'Das Warndreieck zeigt: Achtung!',story:`Am Weg steht ein <b>Warndreieck</b> mit einem Ausrufezeichen. Du bleibst stehen und liest, was es dir sagen will.`},
 {n:'Wir achten auf unsere Mitmenschen!',short:'Mitmenschen',anchor:'Der Radfahrer',img:'der Radfahrer',hook:'Dem Radfahrer machen wir Platz.',story:`Auf dem schmalen Weg kommt ein <b>Radfahrer</b>. Du trittst zur Seite und machst Platz. Er sagt: „Danke!“`},
 {n:'Wir zerstören keine Pflanzen!',short:'Pflanzen',anchor:'Die Blume',img:'die Blume',hook:'Die Blume mit Herz lassen wir stehen.',story:`Am Wegrand blüht eine <b>Blume</b> mit einem Herz in der Mitte. Du schaust sie an, aber du pflückst sie nicht.`},
 {n:'Wir machen kein offenes Feuer im Wald!',short:'Feuer',anchor:'Die Flamme',img:'die Flamme',hook:'Die durchgestrichene Flamme: kein Feuer im Wald.',story:`Ein Kind will ein Lagerfeuer machen. Da siehst du die <b>Flamme</b> mit dem roten Verbotszeichen. Im Wald ist Feuer viel zu gefährlich.`},
 {n:'Wir essen keine Beeren und Pilze!',short:'Beeren',anchor:'Die Beere',img:'die Beere',hook:'Die rote Beere und der Pilz sind tabu.',story:`Am Weg hängt eine rote <b>Beere</b> und daneben steht ein Pilz. Sie sehen lecker aus, aber sie könnten giftig sein. Du lässt sie hängen.`},
 {n:'Wir achten auf den Wald!',short:'Wald',anchor:'Das Herz',img:'das Herz',hook:'Der Baum mit Herz: Wir achten auf den Wald.',story:`Am Ende des Weges steht ein großer Baum mit einem <b>Herz</b>. Der Wald ist das Zuhause von vielen Tieren und Pflanzen. Wir achten gut auf ihn.`}
];
const regelStops=(a,b)=>REGELN.slice(a,b).map((r,i)=>({name:r.n,short:r.short,anchor:r.anchor,img:r.img,hook:r.hook,story:r.story,facts:`<b>Waldregel:</b> ${r.n}`,qa:[]}));
const J_REGEL1={id:'wald-reise-regeln1',title:'Regel-Weg 1',sub:'Die ersten fünf Waldregeln',n:5,noun:'Waldregel',zuWelch:'Zu welcher Waldregel',offset:0,
 intro:`<p>Auf diesem Weg stehen <b>Schilder und Bilder</b> für die Waldregeln. Du gehst mit ${PONY} von Station zu Station.</p><p>Merke dir das Bild, dann fällt dir die Regel von allein ein.</p><div class="merk"><small>Tipp</small>Sag die Regel laut, wenn du das Bild siehst.</div>`,
 chain:`Der <b>Rucksack</b> nimmt das Papier mit. Das <b>Rehkitz</b> läuft über die <b>Hufspuren</b>. Der <b>Zeigefinger</b> sagt „Pst!“ zum <b>Warndreieck</b>.`,
 stops:regelStops(0,5)};
const J_REGEL2={id:'wald-reise-regeln2',title:'Regel-Weg 2',sub:'Die letzten fünf Waldregeln',n:5,noun:'Waldregel',zuWelch:'Zu welcher Waldregel',offset:5,
 intro:`<p>Jetzt gehst du den <b>zweiten Teil</b> des Regel-Weges. Die Stationen sind Nummer 6 bis 10.</p><div class="merk"><small>Tipp</small>Denk an das Bild und sag dazu die Regel laut.</div>`,
 chain:`Der <b>Radfahrer</b> fährt an der <b>Blume</b> vorbei. Die <b>Flamme</b> setzt sich neben die <b>Beere</b>. Zum Schluss malt jemand ein <b>Herz</b> auf den Wald.`,
 stops:regelStops(5,10)};

/* Szenen den Stationen zuordnen */
J_STOCK.stops.forEach((s,i)=>s.scene=SCEN_STOCK[i]);
J_BAUM.stops.forEach((s,i)=>s.scene=SCEN_BAUM[i]);
J_NADEL.stops.forEach((s,i)=>s.scene=SCEN_NADEL[i]);
J_REGEL1.stops.forEach((s,i)=>s.scene=SCEN_REGEL[i]);
J_REGEL2.stops.forEach((s,i)=>s.scene=SCEN_REGEL[5+i]);

/* ---------- Lernkarten ---------- */
function learnCards(J){
 const labels=J.stops.map(s=>s.short),N=J.stops.length;
 const map=(cur,o={})=>`<div class="vis">${journeyMap(labels,cur,Object.assign({offset:J.offset},o))}</div>`;
 const cards=[{h:'So geht die Reise',b:`${map(-1)}${J.intro}`}];
 J.stops.forEach((s,i)=>cards.push({
  h:`Station ${i+1+J.offset}: ${s.anchor}`,
  b:`${map(i)}${s.scene()}<p class="story2">${s.story}</p><div class="merk"><small>Merk-Bild</small>${s.img}${J.noun==='Waldregel'?`<br><span style="font-weight:700">${s.name}</span>`:` = ${s.name}`}</div><p class="facts">${s.facts}</p>`}));
 cards.push({h:'Dein Merk-Bilder-Weg',b:`${map(-1,{done:true})}<p class="chain">${J.stops.map(s=>`<span>${s.img}</span>`).join('<i>→</i>')}</p><p class="story2">${J.chain}</p><div class="merk"><small>Jetzt du!</small>Mach die Augen zu und geh den Weg im Kopf noch einmal. Dann übe mit Sternchen.</div>`});
 return cards}

/* ---------- Quiz: Reise im Kopf ---------- */
function makeGen(J){
 const N=J.stops.length,names=J.stops.map(s=>s.name),imgs=J.stops.map(s=>s.img),labels=J.stops.map(s=>s.short),off=J.offset;
 const three=(arr,a)=>shuffle([a,...shuffle(arr.filter(x=>x!==a)).slice(0,2)]);
 const chain=imgs.join(' → '),hint=`Geh den Weg im Kopf noch einmal: ${chain}.`;
 const isRule=J.noun==='Waldregel';
 const aft=i=>`<b>${imgs[i]}</b> ${isRule?'→ '+esc(names[i]):'= '+names[i]}<br>${J.stops[i].hook}`;
 const dName=v=>{const k=names.indexOf(v);return{tag:'reise',msg:k>=0?`Merk-Bild: ${isRule?esc(v):v} → <b>${imgs[k]}</b>. ${hint}`:hint}};
 const dImg=v=>{const k=imgs.indexOf(v);return{tag:'reise',msg:k>=0?`Merk-Bild: <b>${v}</b> → ${isRule?esc(names[k]):names[k]}. ${hint}`:hint}};
 const modes=[];
 modes.push('map','img2name','name2img');
 if(N>2)modes.push('next','img2name','name2img');
 modes.push('qa','qa','qa');
 if(isRule)modes.push('img2name','name2img');
 return function(){
  const mode=pick(modes);
  if(mode==='qa'){const withQ=J.stops.map((s,i)=>[s,i]).filter(([s])=>s.qa.length);
   if(withQ.length){const[s,i]=pick(withQ),q=pick(s.qa);
    return{kind:'choice',key:'qa:'+q[0],prompt:q[0],answer:q[1],options:shuffle([q[1],...q[2]]),diagnose:()=>({tag:'reise',msg:`Denk an dein Merk-Bild: <b>${imgs[i]}</b>. ${s.hook}`}),explain:s.story,after:aft(i),say:q[0]}}}
  if(mode==='next'&&N>2){const i=R(0,N-2);
   return{kind:'choice',key:'next'+i,prompt:`Station ${i+1+off} ist:<br><b>${isRule?esc(names[i]):names[i]}</b><br>Welche Station ist Station ${i+2+off}?`,answer:names[i+1],options:three(names,names[i+1]),
    diagnose:dName,explain:hint,after:aft(i+1),say:`Station ${i+1+off}. Welche Station ist Station ${i+2+off}?`}}
  if(mode==='map'){const i=R(0,N-1);
   return{kind:'choice',key:'map'+i,prompt:`<b>Welche Station fehlt auf dem Weg?</b>`,vis:solved=>journeyMap(labels,-1,{hide:solved?-1:i,offset:off}),answer:names[i],options:three(names,names[i]),
    diagnose:dName,explain:hint,after:aft(i),say:'Welche Station fehlt auf dem Weg?'}}
  if(mode==='name2img'){const i=R(0,N-1);
   return{kind:'choice',key:'n2i'+i,prompt:`Merk-Bild gesucht!<br><b>${isRule?esc(names[i]):names[i]}</b><br>Welches Bild gehört dazu?`,answer:imgs[i],options:three(imgs,imgs[i]),
    diagnose:dImg,explain:hint,after:aft(i),say:`Welches Merk-Bild gehört dazu? ${names[i]}`}}
  const i=R(0,N-1);
  return{kind:'choice',key:'i2n'+i,prompt:`${J.zuWelch} gehört dieses Merk-Bild?`,vis:()=>J.stops[i].scene(),answer:names[i],options:three(names,names[i]),
   diagnose:dName,explain:hint,after:aft(i),say:`${J.zuWelch} gehört dieses Merk-Bild?`}}}

function station(J){
 const gen0=makeGen(J);
 const gen=()=>{let t;do{t=gen0()}while(!t);return t};
 return{id:J.id,group:'Reise im Kopf',title:J.title,sub:J.sub,n:J.n,gen,learn:learnCards(J)}}

/* wird von hsu-wald.js eingebunden */
globalThis.WALDREISE_STATIONS=[station(J_STOCK),station(J_BAUM),station(J_NADEL),station(J_REGEL1),station(J_REGEL2)];
globalThis.WALDREISE_ERR={reise:'Reise im Kopf: Station oder Merk-Bild verwechselt'};
})();
