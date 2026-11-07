/* ---------- Grafiken für die Waldreisen (Gedächtnis-Pfad) ----------
   journeyMap(labels, cur, {hide, offset, done})  der Weg mit Stationen
   scene(inner, beschreibung)                      Rahmen für ein Merk-Bild (320 x 170)
   Die Bildbausteine (dachs, pilz, …) zeichnen um den Punkt 0/0, Füße bzw. Boden bei y = 0. */

const jG=(x,y,k,inner,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-k:k} ${k})">${inner}</g>`;
const scene=(inner,label)=>`<svg class="scene" viewBox="0 0 320 170" role="img" aria-label="${label}">${inner}</svg>`;

/* ----- Weg-Karte ----- */
function journeyMap(labels,cur=-1,o={}){
 const n=labels.length,W=340,xs=labels.map((_,i)=>n===1?W/2:30+i*(W-60)/(n-1)),ys=labels.map((_,i)=>i%2?34:44),off=o.offset||0;
 let d=`M${xs[0]-22} 46`;
 xs.forEach((x,i)=>{const px=i?xs[i-1]:xs[0]-22,py=i?ys[i-1]:46;d+=` Q${(px+x)/2} ${i%2?58:14} ${x} ${ys[i]}`});
 d+=` L${xs[n-1]+22} ${ys[n-1]}`;
 const dots=labels.map((l,i)=>{
  const hid=o.hide===i,now=i===cur,past=!hid&&!now&&(o.done||(cur>=0&&i<cur));
  const fill=hid?'var(--surface)':now?'var(--hay)':past?'var(--good)':'var(--surface2)';
  const stroke=hid?'var(--hay)':now?'var(--hay)':past?'var(--good)':'var(--line)';
  const tc=past?'#fff':'var(--ink)';
  return`<g>${now?`<circle cx="${xs[i]}" cy="${ys[i]}" r="21" fill="var(--hay)" opacity=".28"/>`:''}<circle cx="${xs[i]}" cy="${ys[i]}" r="${now?16:14}" fill="${fill}" stroke="${stroke}" stroke-width="${hid?3:2}" ${hid?'stroke-dasharray="4 3"':''}/><text x="${xs[i]}" y="${ys[i]+5.5}" text-anchor="middle" font-size="15" font-weight="800" fill="${tc}">${hid?'?':(past?'✓':i+1+off)}</text><text x="${xs[i]}" y="80" text-anchor="middle" font-size="12.5" font-weight="${now?800:600}" fill="${now?'var(--ink)':'var(--muted)'}">${hid?'?':l}</text></g>`}).join('');
 return`<svg class="jmap" viewBox="0 0 ${W} 86" role="img" aria-label="Der Weg mit ${n} Stationen"><path d="${d}" fill="none" stroke="#e3cfa9" stroke-width="13" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fffaf0" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>${dots}</svg>`}

/* ----- Bildbausteine ----- */
const jDachs=`<rect x="-16" y="-8" width="9" height="9" rx="3" fill="#3a3a3a"/><rect x="18" y="-8" width="9" height="9" rx="3" fill="#3a3a3a"/><ellipse cx="8" cy="-15" rx="30" ry="14" fill="#7b7b7b"/><ellipse cx="8" cy="-10" rx="24" ry="8" fill="#9b9b9b"/><ellipse cx="-27" cy="-17" rx="15" ry="11" fill="#f4f1ea"/><path d="M-42 -24 Q-27 -33 -12 -23 L-12 -18 Q-27 -27 -42 -19Z" fill="#2b2b2b"/><path d="M-42 -13 Q-27 -6 -12 -14 L-12 -18 Q-27 -12 -42 -17Z" fill="#2b2b2b"/><circle cx="-31" cy="-20" r="1.8" fill="#fff"/><circle cx="-42" cy="-17" r="3.6" fill="#222"/>`;
const jSchnecke=`<path d="M-26 0 Q-28 -8 -20 -9 L24 -9 Q32 -9 30 -2 L30 0Z" fill="#d9b27c"/><circle cx="6" cy="-19" r="14" fill="#b4693a"/><circle cx="6" cy="-19" r="8" fill="none" stroke="#7a4524" stroke-width="3"/><circle cx="6" cy="-19" r="2" fill="#7a4524"/><path d="M-22 -9 l-4 -11 M-15 -9 l0 -13" stroke="#d9b27c" stroke-width="2.5" stroke-linecap="round"/><circle cx="-26" cy="-22" r="2.2" fill="#222"/><circle cx="-15" cy="-24" r="2.2" fill="#222"/>`;
const jPilz=`<rect x="-5" y="-22" width="10" height="22" rx="4" fill="#f3e6d0"/><path d="M-23 -20 Q-21 -47 0 -47 Q21 -47 23 -20Z" fill="#d64541"/><circle cx="-9" cy="-33" r="3.6" fill="#fff"/><circle cx="6" cy="-39" r="3" fill="#fff"/><circle cx="13" cy="-28" r="2.6" fill="#fff"/>`;
const jSchwamm=`<rect x="-46" y="-54" width="92" height="54" rx="17" fill="#f2c94c"/><ellipse cx="-22" cy="-38" rx="7" ry="5" fill="#d4a62a"/><ellipse cx="6" cy="-28" rx="9" ry="6" fill="#d4a62a"/><ellipse cx="26" cy="-42" rx="6" ry="4.5" fill="#d4a62a"/><ellipse cx="-12" cy="-13" rx="6" ry="4" fill="#d4a62a"/><ellipse cx="30" cy="-15" rx="5" ry="4" fill="#d4a62a"/><ellipse cx="-34" cy="-18" rx="4" ry="3" fill="#d4a62a"/>`;
const jTropfen=`<path d="M0 -14 Q-8 -2 0 2 Q8 -2 0 -14Z" fill="#5aa9e6"/>`;
const jBlume=(c='#f6a5c0')=>`<path d="M0 0 V-36" stroke="#3c8a3f" stroke-width="3.6"/><path d="M0 -12 q-13 -4 -15 -15 q13 0 15 15z" fill="#4e9f3d"/>${[0,72,144,216,288].map(a=>`<circle cx="${(Math.sin(a*Math.PI/180)*8.5).toFixed(1)}" cy="${(-42-Math.cos(a*Math.PI/180)*8.5).toFixed(1)}" r="6.5" fill="${c}"/>`).join('')}<circle cx="0" cy="-42" r="5" fill="#f2b632"/>`;
const jFarn=`<path d="M0 0 V-62" stroke="#2e7d32" stroke-width="3" fill="none"/>${[1,2,3,4,5,6].map(i=>`<ellipse cx="${-9-(7-i)}" cy="${-8-i*9}" rx="${12-i*.6}" ry="3.2" fill="#3d9142" transform="rotate(-25 ${-9-(7-i)} ${-8-i*9})"/><ellipse cx="${9+(7-i)}" cy="${-8-i*9}" rx="${12-i*.6}" ry="3.2" fill="#3d9142" transform="rotate(25 ${9+(7-i)} ${-8-i*9})"/>`).join('')}`;
const jBiene=`<ellipse cx="-4" cy="-11" rx="7" ry="4.5" fill="#cfe8f6" opacity=".95" transform="rotate(-20 -4 -11)"/><ellipse cx="5" cy="-11" rx="7" ry="4.5" fill="#cfe8f6" opacity=".95" transform="rotate(20 5 -11)"/><ellipse cx="0" cy="0" rx="12" ry="8" fill="#f2c94c"/><path d="M-3 -8 v16 M4 -8 v16" stroke="#222" stroke-width="3"/><circle cx="-13" cy="-1" r="3.2" fill="#222"/>`;
const jGluehwurm=`<circle cx="0" cy="0" r="15" fill="#fff59d" opacity=".45"/><circle cx="0" cy="0" r="7.5" fill="#fff176"/><ellipse cx="-13" cy="-2" rx="10" ry="4.8" fill="#4a3b2a"/><circle cx="-21" cy="-2" r="3.2" fill="#4a3b2a"/>`;
const jBrombeere=`<path d="M-44 4 Q-12 -22 44 -4" stroke="#5d4037" stroke-width="4.5" fill="none" stroke-linecap="round"/>${[-30,-12,8,28].map((x,i)=>`<path d="M${x} ${-4-(i%2)*8} l4 -9 l3 9z" fill="#5d4037"/>`).join('')}${[[-24,10],[2,12],[26,6]].map(([x,y])=>`<g>${[[0,0],[8,2],[-8,2],[4,-8],[-4,-8],[0,9]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="5.2" fill="#4b2a6b"/>`).join('')}<circle cx="${x-2}" cy="${y-2}" r="1.4" fill="#9b7bc0"/></g>`).join('')}<path d="M-38 -2 q-10 -12 2 -16 q8 6 -2 16z M14 -12 q-4 -14 8 -14 q4 10 -8 14z" fill="#4e9f3d"/>`;
const jNest=`<ellipse cx="0" cy="-2" rx="28" ry="12" fill="#9c6b3a"/><path d="M-28 -2 Q0 20 28 -2 Q0 8 -28 -2Z" fill="#7d522b"/><path d="M-22 4 l16 5 M22 4 l-16 5 M-10 10 l10 2" stroke="#b78a52" stroke-width="2"/><circle cx="-9" cy="-13" r="9" fill="#f6d05c"/><path d="M-9 -15 l-9 -4 l0 8z" fill="#e8743b"/><circle cx="-11" cy="-15" r="1.6" fill="#222"/><circle cx="10" cy="-13" r="9" fill="#f6d05c"/><path d="M10 -15 l9 -4 l0 8z" fill="#e8743b"/><circle cx="12" cy="-15" r="1.6" fill="#222"/>`;
const jMaus=`<path d="M12 -8 Q30 -2 26 -22" stroke="#d98c3f" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-9" rx="14" ry="9.5" fill="#d98c3f"/><circle cx="-13" cy="-12" r="7.5" fill="#d98c3f"/><circle cx="-14" cy="-20" r="4.2" fill="#e8a05c"/><circle cx="-17" cy="-13" r="1.7" fill="#222"/><circle cx="-21" cy="-10" r="2" fill="#e57373"/>`;
const jEichhoernchen=`<path d="M8 -4 Q40 -2 32 -36 Q26 -54 8 -42 Q20 -36 17 -20Z" fill="#d98241"/><ellipse cx="0" cy="-16" rx="10" ry="15" fill="#c46a2c"/><ellipse cx="-1" cy="-12" rx="6" ry="10" fill="#f0d9b5"/><circle cx="-5" cy="-35" r="9" fill="#c46a2c"/><path d="M-11 -41 l-2 -10 l8 5z M-1 -42 l3 -10 l4 9z" fill="#c46a2c"/><circle cx="-8" cy="-36" r="1.9" fill="#222"/><circle cx="-13" cy="-33" r="2.2" fill="#222"/>`;
const jSpecht=`<ellipse cx="0" cy="-18" rx="8.5" ry="17" fill="#222"/><ellipse cx="3.5" cy="-15" rx="5" ry="11" fill="#f5f5f5"/><circle cx="-2" cy="-39" r="8.5" fill="#222"/><path d="M-10 -46 q9 -7 15 0 q-7 3 -15 0z" fill="#d62828"/><path d="M-10 -39 l-14 1 l14 6z" fill="#f2c94c"/><circle cx="-4" cy="-40" r="2" fill="#fff"/><path d="M4 0 l8 6 M-2 0 l-2 8" stroke="#222" stroke-width="3" stroke-linecap="round"/>`;
const jGiraffe=`<rect x="-24" y="-54" width="8" height="54" fill="#e8b84a"/><rect x="-7" y="-54" width="8" height="54" fill="#d9a63a"/><rect x="8" y="-54" width="8" height="54" fill="#e8b84a"/><rect x="23" y="-54" width="8" height="54" fill="#d9a63a"/><ellipse cx="2" cy="-64" rx="35" ry="19" fill="#f0c04f"/><path d="M14 -72 L33 -140 L47 -136 L35 -64Z" fill="#f0c04f"/><ellipse cx="47" cy="-143" rx="17" ry="10" transform="rotate(-18 47 -143)" fill="#f0c04f"/><circle cx="53" cy="-146" r="2.4" fill="#222"/><rect x="35" y="-160" width="4" height="12" rx="2" fill="#a0522d"/><rect x="45" y="-162" width="4" height="12" rx="2" fill="#a0522d"/><circle cx="-10" cy="-68" r="5.5" fill="#b5651d"/><circle cx="10" cy="-60" r="4.8" fill="#b5651d"/><circle cx="-20" cy="-58" r="3.6" fill="#b5651d"/><circle cx="26" cy="-100" r="4" fill="#b5651d"/><circle cx="31" cy="-124" r="3.4" fill="#b5651d"/><path d="M-34 -70 Q-46 -62 -44 -46" stroke="#8b5a2b" stroke-width="3" fill="none"/>`;
const jZapfenHang=`<path d="M0 -4 V-12" stroke="#5d4037" stroke-width="2.5"/><ellipse cx="0" cy="12" rx="9" ry="17" fill="#8d5a34"/>${[2,10,18,26].map(y=>`<path d="M-8 ${y-4} q8 8 16 0" stroke="#5f3a1f" stroke-width="1.6" fill="none"/>`).join('')}`;
const jFrosch=`<ellipse cx="0" cy="-8" rx="15" ry="9" fill="#6fae4a"/><circle cx="-8" cy="-17" r="5" fill="#6fae4a"/><circle cx="8" cy="-17" r="5" fill="#6fae4a"/><path d="M-12 -17 h8 M4 -17 h8" stroke="#2b4a1f" stroke-width="2" stroke-linecap="round"/>`;
const jIgel=`<path d="M-30 0 Q-34 -32 0 -38 Q34 -32 30 0Z" fill="#7a5230"/>${Array.from({length:11},(_,i)=>{const a=(-70+i*14)*Math.PI/180;return`<path d="M${(Math.sin(a)*22).toFixed(1)} ${(-18-Math.cos(a)*14).toFixed(1)} L${(Math.sin(a)*38).toFixed(1)} ${(-18-Math.cos(a)*30).toFixed(1)}" stroke="#4a2f17" stroke-width="3" stroke-linecap="round"/>`}).join('')}<ellipse cx="-30" cy="-8" rx="12" ry="8" fill="#e8c9a0"/><circle cx="-38" cy="-8" r="2.6" fill="#222"/><circle cx="-31" cy="-12" r="1.8" fill="#222"/>`;
const jNadelBueschel=(c)=>[0,40,80,120,160,200,240,280,320].map(a=>`<path d="M0 0 L${(Math.sin(a*Math.PI/180)*9).toFixed(1)} ${(-Math.cos(a*Math.PI/180)*9).toFixed(1)}" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>`).join('');
const jSchrank=`<rect x="-30" y="-70" width="60" height="70" rx="3" fill="#d9a35f"/><rect x="-26" y="-66" width="24" height="62" fill="#c48a45"/><rect x="2" y="-66" width="24" height="62" fill="#c48a45"/><circle cx="-6" cy="-36" r="2.4" fill="#5f3a1f"/><circle cx="6" cy="-36" r="2.4" fill="#5f3a1f"/><rect x="-32" y="-76" width="64" height="7" rx="2" fill="#b57a35"/>`;
const jRucksack=`<path d="M-26 -58 Q0 -72 26 -58 V-6 Q26 0 20 0 H-20 Q-26 0 -26 -6Z" fill="#3b82c4"/><rect x="-18" y="-30" width="36" height="24" rx="5" fill="#2b6aa6"/><path d="M-8 -30 v8 h16 v-8" stroke="#1f4f80" stroke-width="2.5" fill="none"/><path d="M-12 -66 Q0 -82 12 -66" stroke="#1f4f80" stroke-width="4" fill="none"/>`;
const jPapier=`<path d="M-12 -6 L-5 -16 L6 -13 L12 -4 L4 4 L-7 3Z" fill="#fffdf5" stroke="#bbb" stroke-width="1.5"/><path d="M-5 -16 L-2 -4 L12 -4 M-7 3 L-2 -4" stroke="#ccc" stroke-width="1.2" fill="none"/>`;
const jRehkitz=`<rect x="-24" y="-30" width="5" height="30" rx="2" fill="#a86b3a"/><rect x="-12" y="-30" width="5" height="30" rx="2" fill="#a86b3a"/><rect x="12" y="-30" width="5" height="30" rx="2" fill="#a86b3a"/><rect x="24" y="-30" width="5" height="30" rx="2" fill="#a86b3a"/><ellipse cx="2" cy="-38" rx="32" ry="16" fill="#c98a52"/>${[[-14,-42],[-2,-46],[10,-40],[18,-47],[-8,-34],[6,-33]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4" fill="#fff4e0"/>`).join('')}<path d="M28 -46 L40 -66 L48 -62 L40 -40Z" fill="#c98a52"/><ellipse cx="46" cy="-64" rx="11" ry="8" fill="#c98a52"/><path d="M40 -70 l-3 -10 l8 5z M50 -71 l4 -10 l3 9z" fill="#c98a52"/><circle cx="50" cy="-66" r="2" fill="#222"/><circle cx="56" cy="-63" r="2.4" fill="#222"/>`;
const jVerbot=(c='#d62828')=>`<circle r="26" fill="rgba(255,255,255,.55)" stroke="${c}" stroke-width="7"/><path d="M-18 -18 L18 18" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
const jFlamme=`<path d="M0 0 Q-24 -2 -20 -26 Q-18 -38 -8 -50 Q-8 -36 0 -34 Q-2 -52 12 -66 Q10 -44 22 -32 Q28 -14 18 -4 Q10 2 0 0Z" fill="#f08a24"/><path d="M0 0 Q-12 -2 -10 -16 Q-8 -26 0 -32 Q4 -22 10 -16 Q12 -4 0 0Z" fill="#f6d05c"/>`;
const jBeere=`<path d="M0 -40 Q-2 -52 6 -58" stroke="#5d7f2d" stroke-width="3" fill="none"/><path d="M4 -52 q12 -8 22 0 q-10 8 -22 0z" fill="#4e9f3d"/>${[[0,-22],[-14,-14],[14,-14],[0,-6],[-7,-30],[8,-30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#c0392b"/><circle cx="${x-3}" cy="${y-3}" r="2.2" fill="#f2a79c"/>`).join('')}`;
const jRad=`<circle cx="-24" cy="-16" r="16" fill="none" stroke="#333" stroke-width="4"/><circle cx="26" cy="-16" r="16" fill="none" stroke="#333" stroke-width="4"/><path d="M-24 -16 L-6 -40 L14 -40 L26 -16 M-6 -40 L4 -16 L-24 -16 M14 -40 L18 -48 L26 -48" stroke="#d62828" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="2" cy="-64" r="8" fill="#f2c9a0"/><path d="M-4 -56 L4 -42 L12 -42" stroke="#3b82c4" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M4 -42 L-4 -40" stroke="#3b82c4" stroke-width="6" stroke-linecap="round"/>`;
const jHuf=`<path d="M-10 -14 L-12 -2 A12 12 0 1 0 12 -2 L10 -14" fill="none" stroke="#9aa3ad" stroke-width="5" stroke-linecap="round"/>`;
const jWarn=`<path d="M0 -62 L34 0 H-34Z" fill="#fff" stroke="#d62828" stroke-width="8" stroke-linejoin="round"/><rect x="-3.5" y="-40" width="7" height="22" rx="3" fill="#222"/><circle cx="0" cy="-9" r="4" fill="#222"/>`;
const jFinger=`<circle cx="0" cy="-40" r="34" fill="#f8d9b4"/><circle cx="-12" cy="-48" r="3.4" fill="#222"/><circle cx="12" cy="-48" r="3.4" fill="#222"/><path d="M-9 -22 q9 5 18 0" stroke="#c0675a" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-5.5" y="-34" width="11" height="48" rx="5.5" fill="#f1c398" stroke="#d9a578" stroke-width="2"/><circle cx="0" cy="12" r="13" fill="#f1c398" stroke="#d9a578" stroke-width="2"/>`;
const jHerz=(c='#e84a6a',k=1)=>`<path d="M0 ${10*k} C-${22*k} -${8*k} -${14*k} -${26*k} 0 -${14*k} C${14*k} -${26*k} ${22*k} -${8*k} 0 ${10*k}Z" fill="${c}"/>`;
const jBaum=(r=30)=>`<rect x="-6" y="-44" width="12" height="44" fill="#8d5a34"/><circle cx="0" cy="-62" r="${r}" fill="#4e9f3d"/><circle cx="-${r*.65}" cy="-46" r="${r*.7}" fill="#4e9f3d"/><circle cx="${r*.65}" cy="-46" r="${r*.7}" fill="#3c8a3f"/>`;
const jStrohhalm=`<path d="M0 0 V-120 Q0 -136 16 -136 H46" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="M0 0 V-120 Q0 -136 16 -136 H46" fill="none" stroke="#e63946" stroke-width="13" stroke-linecap="round" stroke-dasharray="10 10"/>`;
const jBallon=(c,t)=>`<path d="M0 0 Q4 16 -2 30" stroke="#999" stroke-width="1.5" fill="none"/><ellipse cx="0" cy="-16" rx="15" ry="18" fill="${c}"/><path d="M-3 2 l3 5 l3 -5z" fill="${c}"/><text x="0" y="-12" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${t}</text>`;

/* ----- Szenen: Stockwerke des Waldes (Reise von unten nach oben) ----- */
const SCEN_STOCK=[
 /* 0 Wurzelschicht: Dachs */
 ()=>scene(`<rect width="320" height="170" fill="#cfe8f6"/><rect y="26" width="320" height="12" fill="#6fae4a"/><rect y="38" width="320" height="132" fill="#9b6a42"/><rect y="118" width="320" height="52" fill="#86583a"/>
  <rect x="40" y="0" width="26" height="40" fill="#8d5a34"/><rect x="258" y="0" width="26" height="40" fill="#8d5a34"/>
  <path d="M53 38 Q38 72 14 100 M53 38 Q62 84 84 112 M53 38 V96 M271 38 Q288 70 308 98 M271 38 Q252 78 232 108 M271 38 V90" stroke="#5d3a1f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="160" cy="108" rx="66" ry="36" fill="#4e2f1a"/>${jG(170,128,1.15,jDachs)}
  <path d="M30 148 q10 -14 22 -4 t22 -2" stroke="#e08a7a" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${jG(274,152,1.1,jFrosch)}<text x="292" y="130" font-size="13" font-weight="800" fill="#e8d9c5">Zzz</text>`,'Unter der Erde: Ein Dachs in seiner Höhle zwischen den Wurzeln'),
 /* 1 Moosschicht: Schwamm */
 ()=>scene(`<rect width="320" height="170" fill="#eaf5dd"/>
  <path d="M0 96 Q40 82 80 94 T160 92 T240 94 T320 90 V170 H0Z" fill="#7cb342"/><path d="M0 130 Q60 116 120 128 T240 126 T320 128 V170 H0Z" fill="#689f38"/>
  ${[[30,110],[96,118],[210,108],[290,114],[60,146],[250,148]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="22" ry="8" fill="#8bc34a" opacity=".8"/>`).join('')}
  ${jG(160,138,1.05,jSchwamm)}${jG(160,28,1,jTropfen)}${jG(138,52,.8,jTropfen)}${jG(184,50,.9,jTropfen)}${jG(160,76,.7,jTropfen)}
  ${jG(52,140,.95,jPilz)}${jG(268,142,.9,jSchnecke)}`,'Moosschicht: Der Boden ist weich wie ein Schwamm'),
 /* 2 Krautschicht: Pony */
 ()=>scene(`<rect width="320" height="170" fill="#dff1fb"/><circle cx="286" cy="30" r="16" fill="#fff3b0"/><rect y="118" width="320" height="52" fill="#8bc34a"/>
  <g transform="translate(112 22)">${pony('happy',96).replace(/ class="[^"]*"/,'')}</g>
  ${jG(30,160,1,jFarn)}${jG(290,160,1,jFarn)}${jG(78,160,1.1,jFarn,true)}${jG(250,160,1.1,jFarn)}
  ${jG(52,162,1.05,jBlume('#f6a5c0'))}${jG(96,164,1.2,jBlume('#fff'))}${jG(136,166,1.25,jBlume('#f2b632'))}${jG(180,166,1.25,jBlume('#b39ddb'))}${jG(222,164,1.2,jBlume('#f6a5c0'))}${jG(268,162,1.05,jBlume('#fff'))}
  ${jG(58,66,.9,jBiene)}${jG(252,86,.8,jBiene)}${jG(28,98,1,jGluehwurm)}`,'Krautschicht: Blumen und Farne so hoch wie Sternchens Rücken'),
 /* 3 Strauchschicht: Giraffe */
 ()=>scene(`<rect width="320" height="170" fill="#dff1fb"/><rect y="150" width="320" height="20" fill="#8bc34a"/>
  <ellipse cx="60" cy="100" rx="58" ry="62" fill="#4e9f3d"/><ellipse cx="132" cy="108" rx="52" ry="56" fill="#3c8a3f"/><ellipse cx="190" cy="118" rx="38" ry="44" fill="#5aa845"/>
  ${[[28,70],[48,96],[74,64],[96,120],[44,128]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#4b2a6b"/><circle cx="${x-1.5}" cy="${y-1.5}" r="1.4" fill="#9b7bc0"/>`).join('')}
  <path d="M10 140 q20 -14 40 -4 M80 144 q20 -12 36 -2" stroke="#5d4037" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${jG(112,104,1,jNest)}${jG(160,152,.9,jMaus)}${jG(244,162,.98,jGiraffe)}`,'Strauchschicht: Büsche, so hoch wie eine Giraffe'),
 /* 4 Baumschicht: Eichhörnchen */
 ()=>scene(`<defs><linearGradient id="skyb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f7"/><stop offset="1" stop-color="#eaf7fd"/></linearGradient></defs><rect width="320" height="170" fill="url(#skyb)"/><circle cx="276" cy="120" r="14" fill="#fff3b0"/><rect y="152" width="320" height="18" fill="#8bc34a"/>
  <rect x="86" y="40" width="22" height="116" fill="#8d5a34"/><rect x="214" y="44" width="22" height="112" fill="#7a4a2a"/>
  <path d="M88 104 Q60 104 36 92" stroke="#8d5a34" stroke-width="9" fill="none" stroke-linecap="round"/>
  <circle cx="40" cy="30" r="34" fill="#4e9f3d"/><circle cx="92" cy="14" r="40" fill="#3c8a3f"/><circle cx="150" cy="26" r="38" fill="#4e9f3d"/><circle cx="206" cy="12" r="40" fill="#3c8a3f"/><circle cx="262" cy="28" r="36" fill="#4e9f3d"/><circle cx="120" cy="50" r="26" fill="#5aa845"/><circle cx="190" cy="52" r="26" fill="#5aa845"/>
  ${jG(52,98,1,jEichhoernchen)}${jG(210,128,1,jSpecht,true)}
  <path d="M158 150 v-40 m-8 12 l8 -12 l8 12" stroke="#f2b632" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,'Baumschicht: Ein Eichhörnchen und ein Specht hoch in den Baumkronen')
];

/* ----- Szenen: Der Baum als Haus ----- */
const SCEN_BAUM=[
 ()=>scene(`<rect width="320" height="170" fill="#cfe8f6"/><rect y="26" width="320" height="12" fill="#6fae4a"/><rect y="38" width="320" height="132" fill="#9b6a42"/><rect x="40" y="0" width="30" height="40" fill="#8d5a34"/>
  <path d="M55 38 Q40 74 14 104 M55 38 Q64 92 90 128 M55 38 V110 M55 38 Q100 70 130 110" stroke="#5d3a1f" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="190" cy="152" rx="72" ry="14" fill="#5aa9e6"/>${jG(196,150,1,jStrohhalm)}<path d="M130 110 Q150 130 170 146" stroke="#5d3a1f" stroke-width="5" fill="none" stroke-linecap="round"/>${jG(120,100,.8,jTropfen)}${jG(236,100,.7,jTropfen)}`,'Der Keller: Wurzeln halten den Baum fest und trinken mit einem riesigen Strohhalm'),
 ()=>scene(`<rect width="320" height="170" fill="#e8f4fb"/><rect y="152" width="320" height="18" fill="#8bc34a"/>
  <rect x="116" y="0" width="88" height="156" rx="6" fill="#8d5a34"/>${[20,50,82,114,140].map(y=>`<path d="M118 ${y} q40 8 84 0" stroke="#6b4226" stroke-width="3" fill="none"/>`).join('')}
  <rect x="138" y="52" width="44" height="64" rx="5" fill="#f2c94c" stroke="#b8860b" stroke-width="3"/><path d="M160 68 v32 m-9 -22 l9 -10 l9 10" stroke="#5f3a1f" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M36 56 H100 V106 Q100 136 68 148 Q36 136 36 106Z" fill="#3b82c4" stroke="#1f4f80" stroke-width="4" stroke-linejoin="round"/><path d="M68 72 l6 13 14 2 -10 9 3 14 -13 -7 -13 7 3 -14 -10 -9 14 -2z" fill="#f2c94c"/>
  <ellipse cx="248" cy="108" rx="14" ry="10" fill="#4a3b2a"/><path d="M236 100 l-10 -10 M260 100 l10 -10 M236 116 l-10 10 M260 116 l10 10" stroke="#4a3b2a" stroke-width="3" stroke-linecap="round"/><text x="232" y="74" font-size="15" font-weight="800" fill="#d62828">Boing!</text>`,'Der Stamm: ein Aufzug für Wasser und Nährstoffe, außen ein Schutzpanzer gegen Schädlinge'),
 ()=>scene(`<defs><linearGradient id="skyk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f7"/><stop offset="1" stop-color="#eaf7fd"/></linearGradient></defs><rect width="320" height="170" fill="url(#skyk)"/>
  <circle cx="44" cy="40" r="22" fill="#ffe066"/>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M${44+Math.sin(a*Math.PI/180)*28} ${40-Math.cos(a*Math.PI/180)*28} L${44+Math.sin(a*Math.PI/180)*38} ${40-Math.cos(a*Math.PI/180)*38}" stroke="#ffe066" stroke-width="4" stroke-linecap="round"/>`).join('')}
  <rect x="150" y="112" width="20" height="58" fill="#8d5a34"/><circle cx="160" cy="92" r="40" fill="#4e9f3d"/><circle cx="124" cy="112" r="28" fill="#3c8a3f"/><circle cx="198" cy="112" r="28" fill="#5aa845"/>
  ${jG(112,64,.9,jBallon('#e56b8c','O₂'))}${jG(204,50,1,jBallon('#4aa3df','O₂'))}${jG(262,84,.85,jBallon('#f2b632','O₂'))}${jG(70,110,.8,jBallon('#7cc36a','O₂'))}`,'Die Krone: Die Blätter stellen mit Sonnenlicht Sauerstoff her, wie Luftballons')
];

/* ----- Szenen: Nadelbäume ----- */
const SCEN_NADEL=[
 ()=>scene(`<rect width="320" height="170" fill="#fdf1c9"/><rect y="150" width="320" height="20" fill="#e3b94f"/>
  <rect x="148" y="40" width="10" height="112" fill="#7a4a2a"/>
  ${[[153,40],[132,60],[176,64],[118,84],[190,88],[104,108],[204,112],[132,100],[176,104],[153,74],[153,110],[92,128],[218,130]].map(([x,y])=>`<g transform="translate(${x} ${y}) scale(1.7)">${jNadelBueschel('#d9a420')}</g>`).join('')}
  ${[[60,50],[84,74],[236,58],[262,86],[40,110],[280,120]].map(([x,y],i)=>`<path d="M${x} ${y} l${i%2?5:-5} 14" stroke="#e3a418" stroke-width="3" stroke-linecap="round"/>`).join('')}
  ${[[110,152],[150,156],[200,152],[240,158],[70,158]].map(([x,y])=>`<path d="M${x-12} ${y} h24" stroke="#e3a418" stroke-width="3" stroke-linecap="round"/>`).join('')}
  <ellipse cx="228" cy="30" rx="8" ry="11" fill="#b8864a"/><ellipse cx="248" cy="34" rx="8" ry="11" fill="#b8864a"/>`,'Die Lärche trägt im Herbst ein goldenes Kleid und wirft es ab'),
 ()=>scene(`<rect width="320" height="170" fill="#e3f2e6"/><rect y="150" width="320" height="20" fill="#9ccc8a"/><rect x="104" y="112" width="12" height="40" fill="#7a4a2a"/>
  ${[[110,18,26,40],[110,40,40,56],[110,66,54,76],[110,96,68,100]].map(([x,y,w,h])=>`<path d="M${x} ${y} L${x-w} ${y+34} H${x+w}Z" fill="#2e6b3a"/>`).join('')}
  <ellipse cx="110" cy="12" rx="6" ry="12" fill="#8d6e63"/>
  <circle cx="240" cy="78" r="58" fill="#fff" stroke="#9ccc8a" stroke-width="4"/>
  <rect x="196" y="58" width="88" height="40" rx="20" fill="#2e6b3a"/><rect x="206" y="68" width="68" height="7" rx="3.5" fill="#dfe6ea"/><rect x="206" y="81" width="68" height="7" rx="3.5" fill="#dfe6ea"/>
  <path d="M262 44 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z M214 104 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#f2c94c"/>`,'Die Tanne hat weiche, flache Nadeln mit zwei silberweißen Streifen'),
 ()=>scene(`<rect width="320" height="170" fill="#fbe8cf"/><rect y="150" width="320" height="20" fill="#cfa36a"/>
  <rect x="94" y="64" width="12" height="90" fill="#a8683a"/><path d="M100 96 L70 70 M100 112 L134 84" stroke="#a8683a" stroke-width="6" stroke-linecap="round"/>
  ${[[100,40,34],[72,56,26],[130,64,26],[100,66,26]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.62}" fill="#6f9a86"/>`).join('')}
  ${[[74,38],[92,26],[112,32],[130,46],[62,54],[86,50],[108,56],[132,62]].map(([x,y])=>`<path d="M${x} ${y} l-30 -10 M${x} ${y} l32 -8 M${x} ${y} l-10 24 M${x} ${y} l12 22" stroke="#4f7a68" stroke-width="2" stroke-linecap="round"/>`).join('')}
  <ellipse cx="146" cy="96" rx="9" ry="12" fill="#a1887f"/>${jG(234,152,1,jSchrank)}`,'Die Kiefer hat lange Nadeln, eiförmige Zapfen und Holz für Möbel'),
 ()=>scene(`<rect width="320" height="170" fill="#e7efe9"/><rect y="150" width="320" height="20" fill="#9ccc8a"/><rect x="108" y="124" width="12" height="30" fill="#7a4a2a"/>
  ${[[114,10,22],[114,34,34],[114,62,46],[114,92,58]].map(([x,y,w])=>`<path d="M${x} ${y} L${x-w} ${y+40} H${x+w}Z" fill="#1f4d2b"/>`).join('')}
  ${[[78,104],[150,100],[92,76],[136,74],[100,48],[128,50]].map(([x,y])=>jG(x,y,.8,jZapfenHang)).join('')}
  ${jG(246,152,1.25,jIgel)}<text x="262" y="68" font-size="22" font-weight="800" fill="#c0392b">Aua!</text>`,'Die Fichte sticht wie ein Igel, ihre Zapfen hängen nach unten')
];

/* ----- Szenen: Waldregeln ----- */
const bgR=(c,inner,label)=>scene(`<rect width="320" height="170" fill="${c}"/><rect y="148" width="320" height="22" fill="#8bc34a"/>${inner}`,label);
const SCEN_REGEL=[
 ()=>bgR('#e3f2fd',`${jG(150,150,1.5,jRucksack)}${jG(236,100,1.8,jPapier)}<path d="M214 96 Q196 60 176 70" stroke="#3c8a3f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M176 70 l9 -2 l-4 9" stroke="#3c8a3f" stroke-width="4" fill="none" stroke-linecap="round"/>`,'Rucksack: Das Papier kommt wieder mit nach Hause'),
 ()=>bgR('#fff3e0',`${jG(120,150,1.35,jRehkitz)}${jG(254,66,1.4,jVerbot())}<path d="M242 74 q0 -20 6 -22 q4 -8 8 0 q6 -6 8 2 q6 -2 6 6 l-2 14 q-8 10 -20 4z" fill="#f8d9b4" stroke="#c9956a" stroke-width="2"/>`,'Ein Rehkitz im Gras: Bitte nicht anfassen'),
 ()=>bgR('#e8f5e9',`<path d="M120 170 Q150 130 160 100 Q170 70 200 40" stroke="#e3cfa9" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M120 170 Q150 130 160 100 Q170 70 200 40" stroke="#fffaf0" stroke-width="3" stroke-dasharray="4 9" fill="none"/>${[[142,140,-12],[170,128,8],[158,104,-10],[184,88,10],[176,64,-8],[198,52,8]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})">${jHuf}</g>`).join('')}${[[40,150],[60,120],[270,140],[250,110],[290,100]].map(([x,y])=>jG(x,y,.9,jBlume('#f6a5c0'))).join('')}${jG(60,150,.9,jBaum(22))}${jG(268,150,.9,jBaum(24))}`,'Der Weg mit Hufspuren: Wir bleiben auf dem Weg'),
 ()=>bgR('#fce4ec',`${jG(120,160,1.5,jFinger)}<text x="196" y="60" font-size="30" font-weight="800" fill="#c0392b">Pst!</text>${jG(250,150,.9,jEichhoernchen)}`,'Der Zeigefinger vor dem Mund: Pst, wir sind leise im Wald'),
 ()=>bgR('#fffde7',`${jG(160,150,1.9,jWarn)}<rect x="157" y="150" width="6" height="20" fill="#8d6e63"/>${jG(66,150,.9,jBaum(24))}${jG(262,150,.9,jBaum(24))}`,'Das Warndreieck: Wir achten auf Schilder und Warnhinweise'),
 ()=>bgR('#e1f5fe',`<path d="M0 150 H320" stroke="#e3cfa9" stroke-width="30"/>${jG(130,150,1.3,jRad)}<path d="M226 150 h-30 m10 -8 l-10 8 l10 8" stroke="#3c8a3f" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="240" y="154" font-size="16" font-weight="800" fill="#2e7d32">Platz!</text>`,'Ein Radfahrer kommt: Wir machen Platz'),
 ()=>bgR('#f1f8e9',`${jG(160,150,2.4,jBlume('#f6a5c0'))}${jG(160,56,1.3,jHerz('#e84a6a',1))}${jG(64,150,1,jBlume('#fff'))}${jG(256,150,1,jBlume('#b39ddb'))}`,'Eine Blume mit einem Herz: Wir zerstören keine Pflanzen'),
 ()=>bgR('#fff3e0',`${jG(130,150,1.1,jFlamme)}${jG(130,92,1.9,jVerbot())}<rect x="196" y="110" width="40" height="40" rx="6" fill="#5aa9e6"/><path d="M200 110 q16 -18 32 0" stroke="#3b82c4" stroke-width="4" fill="none"/>${jTropfen.length?jG(260,130,1.3,jTropfen):''}`,'Eine durchgestrichene Flamme: Kein offenes Feuer im Wald'),
 ()=>bgR('#f3e5f5',`${jG(120,150,1.6,jBeere)}${jG(238,150,1.2,jPilz)}${jG(150,90,2,jVerbot())}`,'Beeren und Pilze: Wir essen sie nicht'),
 ()=>bgR('#e0f7fa',`${jG(160,152,1.9,jBaum(32))}${jG(160,52,1.6,jHerz('#e84a6a',1))}${jG(62,150,.9,jBaum(22))}${jG(262,150,.9,jBaum(22))}`,'Ein Baum mit einem Herz: Wir achten auf den Wald')
];
