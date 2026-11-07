/* ---------- Grafiken für Sachunterricht (HSU) ----------
   waldSchichten(hl, verbergen)  Stockwerke des Waldes, Stockwerk hl (0–4) hervorgehoben
   baumTeile(hl, verbergen)      Krone / Stamm / Wurzel, Teil hl (0–2) hervorgehoben
   verbergen = true: Name des hervorgehobenen Teils wird durch „?“ ersetzt */
const SCHICHTEN=['Baumschicht','Strauchschicht','Krautschicht','Moosschicht','Wurzelschicht'];
function waldSchichten(hl=-1,verbergen=false){
 const B=[[0,110],[110,165],[165,205],[205,222],[222,282]],W=250;
 const leaf='#4E9F3D',leaf2='#3C8A3F',bush='#6DAA45',moss='#7CB342',soil='#A47148',root='#7A4A2A';
 const tree=(x,cy,r)=>`<rect x="${x-7}" y="${cy}" width="14" height="${222-cy}" fill="var(--horse)"/><circle cx="${x}" cy="${cy}" r="${r}" fill="${leaf}"/><circle cx="${x-r*.6}" cy="${cy+r*.45}" r="${r*.65}" fill="${leaf}"/><circle cx="${x+r*.6}" cy="${cy+r*.45}" r="${r*.65}" fill="${leaf}"/>`;
 const fir=x=>`<rect x="${x-5}" y="40" width="10" height="182" fill="var(--horse)"/><path d="M${x} 6 L${x-28} 52 H${x+28}Z M${x} 30 L${x-36} 90 H${x+36}Z" fill="${leaf2}"/>`;
 const herb=x=>`<path d="M${x} 222 V180 M${x} 200 l-8 -8 M${x} 194 l8 -8" stroke="${leaf2}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="${x}" cy="178" r="5" fill="${x%2?'#F2B632':'#E87AA4'}"/>`;
 let pic=`<rect x="0" y="222" width="${W}" height="60" fill="${soil}" opacity=".45"/>`
  +`<path d="M50 222 q-10 25 -30 40 M50 222 q8 30 25 45 M140 222 q-6 28 -22 48 M140 222 q10 22 34 36 M215 222 q-8 26 -2 50" stroke="${root}" stroke-width="4" fill="none" stroke-linecap="round"/>`
  +`<path d="M95 262 q6 -8 12 0 t12 0 t12 0" stroke="#D9826A" stroke-width="4" fill="none" stroke-linecap="round"/>`
  +tree(50,52,34)+fir(140)+tree(215,62,28)
  +`<ellipse cx="95" cy="182" rx="30" ry="46" fill="${bush}"/><ellipse cx="185" cy="186" rx="26" ry="40" fill="${bush}"/><circle cx="86" cy="170" r="4" fill="#4B2A6B"/><circle cx="100" cy="186" r="4" fill="#4B2A6B"/><circle cx="192" cy="176" r="4" fill="#C0392B"/>`
  +[14,32,68,122,160,200,240].map(herb).join('')
  +`<path d="M0 222 ${Array.from({length:12},()=>'q10 -14 20 0').join(' ')} h10Z" fill="${moss}"/>`
  +`<rect x="229" y="209" width="6" height="13" fill="#F3E6D0"/><path d="M222 211 q10 -16 20 0Z" fill="#D64541"/><circle cx="229" cy="205" r="1.6" fill="#fff"/><circle cx="236" cy="207" r="1.6" fill="#fff"/>`;
 let fade='',hlr='';
 B.forEach(([a,b],i)=>{if(hl>=0&&i!==hl)fade+=`<rect x="0" y="${a}" width="${W}" height="${b-a}" fill="var(--surface)" opacity=".62"/>`;
  if(i===hl)hlr=`<rect x="2" y="${a+2}" width="${W-4}" height="${b-a-4}" rx="6" fill="none" stroke="var(--hay)" stroke-width="4"/>`});
 const lines=[110,165,205,222].map(y=>`<line x1="0" y1="${y}" x2="360" y2="${y}" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4"/>`).join('');
 const labs=B.map(([a,b],i)=>{const y=(a+b)/2,on=i===hl,txt=on&&verbergen?'?':SCHICHTEN[i];
  return`${on?`<rect x="252" y="${y-13}" width="108" height="26" rx="13" fill="var(--hay-soft)" stroke="var(--hay)" stroke-width="2"/>`:''}<text x="306" y="${y+5}" text-anchor="middle" font-size="${on?16:14.5}" fill="${hl>=0&&!on?'var(--muted)':'var(--ink)'}">${txt}</text>`}).join('');
 return`<svg class="wald" viewBox="0 0 360 282" width="360" style="max-width:100%;height:auto" role="img" aria-label="Die Stockwerke des Waldes">${lines}${pic}${fade}${hlr}${labs}</svg>`}

const BAUMTEILE=['Baumkrone','Baumstamm','Wurzel'];
function baumTeile(hl=-1,verbergen=false){
 const op=i=>hl>=0&&i!==hl?.28:1;
 const parts=[
  `<g opacity="${op(0)}"><circle cx="120" cy="62" r="46" fill="#4E9F3D"/><circle cx="82" cy="88" r="32" fill="#4E9F3D"/><circle cx="158" cy="88" r="32" fill="#4E9F3D"/><circle cx="104" cy="52" r="6" fill="#7CC36A"/><circle cx="140" cy="80" r="6" fill="#7CC36A"/></g>`,
  `<g opacity="${op(1)}"><path d="M108 112 L106 192 H134 L132 112Z" fill="var(--horse)"/><path d="M114 130 v20 M126 150 v24" stroke="var(--mane)" stroke-width="2.5" stroke-linecap="round"/></g>`,
  `<g opacity="${op(2)}"><path d="M112 192 q-20 22 -52 32 M116 192 q-6 28 -26 52 M120 192 v56 M124 192 q8 30 30 48 M128 192 q22 18 52 26" stroke="#7A4A2A" stroke-width="5" fill="none" stroke-linecap="round"/></g>`];
 const box=[[60,10,120,112],[98,110,44,84],[54,194,132,60]];
 const ly=[62,150,224];
 const hlr=hl>=0?`<rect x="${box[hl][0]}" y="${box[hl][1]}" width="${box[hl][2]}" height="${box[hl][3]}" rx="10" fill="none" stroke="var(--hay)" stroke-width="4"/>`:'';
 const labs=ly.map((y,i)=>{const on=i===hl,txt=on&&verbergen?'?':BAUMTEILE[i];
  return`<line x1="${i===1?142:184}" y1="${y}" x2="214" y2="${y}" stroke="var(--line)" stroke-width="2"/>${on?`<rect x="214" y="${y-13}" width="96" height="26" rx="13" fill="var(--hay-soft)" stroke="var(--hay)" stroke-width="2"/>`:''}<text x="262" y="${y+5}" text-anchor="middle" font-size="${on?17:15.5}" fill="${hl>=0&&!on?'var(--muted)':'var(--ink)'}">${txt}</text>`}).join('');
 return`<svg class="wald" viewBox="0 0 316 260" width="316" style="max-width:100%;height:auto" role="img" aria-label="Die Teile des Baumes"><line x1="20" y1="193" x2="200" y2="193" stroke="#A47148" stroke-width="3"/>${parts.join('')}${hlr}${labs}</svg>`}
