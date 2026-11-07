/* Mathe-Grafiken (Rechenstrich, Streifenmodell, Hunderterfeld …) – von Mathe-Themen genutzt */
/* ---------- visuals ---------- */
function jumpLine(start,jumps,shown){
 const pts=[start];jumps.forEach(j=>pts.push(pts[pts.length-1]+j));
 if(shown===undefined)shown=pts.length;
 const lo=Math.min(...pts),hi=Math.max(...pts),W=600,pad=44;
 const x=v=>pad+(v-lo)/(hi-lo||1)*(W-2*pad);
 let s=`<svg viewBox="0 0 ${W} 156" width="${W}" role="img" aria-label="Rechenstrich mit Sprüngen"><line x1="16" y1="112" x2="${W-16}" y2="112" class="axis"/>`;
 jumps.forEach((j,i)=>{if(i>=shown)return;const x1=x(pts[i]),x2=x(pts[i+1]),mid=(x1+x2)/2,h=Math.min(64,16+Math.abs(x2-x1)*.4),c=Math.abs(j)>=10?'tens':'ones';
  s+=`<path d="M${x1} 106 Q${mid} ${106-2*h} ${x2} 106" class="arc ${c}"/><circle cx="${x2}" cy="106" r="5" class="arc ${c}" style="fill:currentColor"/><text x="${mid}" y="${100-h}" class="jlab ${c}">${j>0?'+':'−'}${Math.abs(j)}</text>`});
 pts.forEach((p,i)=>{const vis=i<=shown;s+=`<line x1="${x(p)}" y1="102" x2="${x(p)}" y2="122" class="tick"/><text x="${x(p)}" y="148" class="lbl ${i===0?'start':(i===pts.length-1&&vis?'end':'')} ${vis?'':'hid'}">${vis?p:'?'}</text>`});
 return s+'</svg>'}
function barModel(w,p1,p2,miss,reveal){
 const W=520,x0=10,iw=W-20,w1=Math.max(90,Math.min(iw-90,iw*p1/w));
 const L=(v,m)=>m&&!reveal?'?':v;
 return `<svg viewBox="0 0 ${W} 170" width="${W}" role="img" aria-label="Teil-Teil-Ganzes Streifen">
 <text x="${x0}" y="16" class="barcap">GANZES</text>
 <rect x="${x0}" y="22" width="${iw}" height="56" rx="10" class="bar ${miss==='w'&&!reveal?'miss':'whole'}"/>
 <text x="${x0+iw/2}" y="51" class="barlbl">${L(w,miss==='w')}</text>
 <text x="${x0}" y="104" class="barcap">TEIL</text><text x="${x0+w1+6}" y="104" class="barcap">TEIL</text>
 <rect x="${x0}" y="110" width="${w1-3}" height="56" rx="10" class="bar ${miss==='1'&&!reveal?'miss':'part1'}"/>
 <rect x="${x0+w1+3}" y="110" width="${iw-w1-3}" height="56" rx="10" class="bar ${miss==='2'&&!reveal?'miss':'part2'}"/>
 <text x="${x0+(w1-3)/2}" y="139" class="barlbl">${L(p1,miss==='1')}</text>
 <text x="${x0+w1+3+(iw-w1-3)/2}" y="139" class="barlbl">${L(p2,miss==='2')}</text></svg>`}
const OFF=[-11,-10,-9,-1,0,1,9,10,11];
function hfWindow(n,target,reveal,all){
 return `<div class="hfw" role="img" aria-label="Ausschnitt aus dem Hunderterfeld">${OFF.map(o=>{const v=n+o;
  if(o===0)return `<div class="c">${n}</div>`;
  if(v===target)return reveal?`<div class="sol">${v}</div>`:`<div class="q">?</div>`;
  return `<div>${all?v:''}</div>`}).join('')}</div>`}
function hfFull(me,mode){
 let h='<div class="hff" role="img" aria-label="Hunderterfeld">';
 for(let k=1;k<=100;k++){let c='';if(k===me)c='me';else if(mode!=='none'&&Math.ceil(k/10)===Math.ceil(me/10)&&mode!=='col')c='row';else if(mode==='col'&&k%10===me%10)c='col';h+=`<div class="${c}">${k}</div>`}
 return h+'</div>'}
function strip(known,target,reveal,labelEnds){
 const T0=Math.floor(Math.min(known,target)/10)*10,W=600,pad=36,x=v=>pad+(v-T0)/10*(W-2*pad);
 let s=`<svg viewBox="0 0 ${W} 120" width="${W}" role="img" aria-label="Zahlenstrahl"><line x1="16" y1="60" x2="${W-16}" y2="60" class="axis"/>`;
 for(let v=T0;v<=T0+10;v++){const big=v%10===0;s+=`<line x1="${x(v)}" y1="${big?44:50}" x2="${x(v)}" y2="${big?76:70}" class="tick ${big?'big':''}"/>`;
  if(labelEnds&&big&&v!==known&&v!==target)s+=`<text x="${x(v)}" y="100" class="lbl">${v}</text>`}
 s+=`<circle cx="${x(known)}" cy="60" r="11" fill="var(--hay)"/><text x="${x(known)}" y="100" class="lbl start">${known}</text>`;
 s+=`<circle cx="${x(target)}" cy="60" r="11" fill="none" stroke="var(--tens)" stroke-width="3" stroke-dasharray="4 3"/><text x="${x(target)}" y="30" class="lbl ${reveal?'end':'start'}">${reveal?target:'?'}</text>`;
 return s+'</svg>'}
function blocks(n,cross){const t=Math.floor(n/10),o=n%10;let h='<div class="blocks" role="img" aria-label="Zehnerstangen und Einer">';for(let i=0;i<t;i++)h+=`<div class="ten"></div>`;h+='<div class="ones">';for(let i=0;i<o;i++)h+=`<div class="one ${cross&&i<cross?'x':''}"></div>`;return h+'</div></div>'}

