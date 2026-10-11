// SY Consulting v2: particle globe, pixel scramble type, floating destination cards, ask box.
// Relies on STAGES, COUNTRIES, FAQ, SERVICES, esc, C, waLink, store, renderCountry and reduce from main.js.
(() => {
const isNarrow = () => window.innerWidth < 860;

/* ---------- Particle globe ---------- */
function startGlobe(){
  const canvas = document.getElementById("globe");
  if(!window.THREE || !canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true}); } catch(e){ return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
  camera.position.set(0, 0, 6);
  const world = new THREE.Group(); scene.add(world);
  const globe = new THREE.Group(); world.add(globe);
  const R = 1.7, DEG = Math.PI/180;

  // round soft sprite
  const sprite = (() => { const c=document.createElement("canvas"); c.width=c.height=64; const g=c.getContext("2d");
    const r=g.createRadialGradient(32,32,0,32,32,32); r.addColorStop(0,"rgba(255,255,255,1)"); r.addColorStop(.35,"rgba(255,255,255,.55)"); r.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=r; g.fillRect(0,0,64,64); return new THREE.CanvasTexture(c); })();

  const ll = (lat, lon, r=R) => { const p=lat*DEG, l=lon*DEG; return new THREE.Vector3(r*Math.cos(p)*Math.cos(l), r*Math.sin(p), -r*Math.cos(p)*Math.sin(l)); };

  // Sphere of dots that assemble from a scattered cloud
  const N = isNarrow() ? 2600 : 5200;
  const target = new Float32Array(N*3), start = new Float32Array(N*3), pos = new Float32Array(N*3), col = new Float32Array(N*3);
  const golden = Math.PI*(3-Math.sqrt(5));
  const cA = new THREE.Color("#8B6CFF"), cB = new THREE.Color("#7EE7FF"), tmp = new THREE.Color();
  for(let i=0;i<N;i++){
    const y = 1 - (i/(N-1))*2, rad = Math.sqrt(1-y*y), th = golden*i;
    target[i*3]=Math.cos(th)*rad*R; target[i*3+1]=y*R; target[i*3+2]=Math.sin(th)*rad*R;
    const u=Math.random()*2-1, a=Math.random()*Math.PI*2, d=5+Math.random()*7, s=Math.sqrt(1-u*u);
    start[i*3]=Math.cos(a)*s*d; start[i*3+1]=u*d; start[i*3+2]=Math.sin(a)*s*d;
    tmp.copy(cA).lerp(cB, (y+1)/2*0.7 + Math.random()*0.3);
    col[i*3]=tmp.r; col[i*3+1]=tmp.g; col[i*3+2]=tmp.b;
  }
  pos.set(reduce ? target : start);
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute("position", new THREE.BufferAttribute(pos,3));
  sGeo.setAttribute("color", new THREE.BufferAttribute(col,3));
  const sMat = new THREE.PointsMaterial({size:.05, map:sprite, vertexColors:true, transparent:true, opacity:.95, depthWrite:false, blending:THREE.AdditiveBlending});
  globe.add(new THREE.Points(sGeo, sMat));

  // Cities: home and the six destinations
  const HOME = {lat:17.4, lon:78.5};
  const CITIES = [{lat:40.7,lon:-74.0},{lat:51.5,lon:-0.1},{lat:43.7,lon:-79.4},{lat:-33.9,lon:151.2},{lat:52.5,lon:13.4},{lat:53.3,lon:-6.3}];
  const markPos=[], markCol=[];
  [HOME,...CITIES].forEach((c,i)=>{ const v=ll(c.lat,c.lon,R*1.01); markPos.push(v.x,v.y,v.z); const k=new THREE.Color(i?"#7EE7FF":"#FFB86B"); markCol.push(k.r,k.g,k.b); });
  const mGeo = new THREE.BufferGeometry();
  mGeo.setAttribute("position", new THREE.Float32BufferAttribute(markPos,3));
  mGeo.setAttribute("color", new THREE.Float32BufferAttribute(markCol,3));
  const mMat = new THREE.PointsMaterial({size:.16, map:sprite, vertexColors:true, transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending});
  globe.add(new THREE.Points(mGeo, mMat));

  // Flight arcs from home to each destination
  const home = ll(HOME.lat, HOME.lon);
  const arcs = CITIES.map(c => {
    const to = ll(c.lat, c.lon), pts=[];
    for(let i=0;i<=64;i++){ const t=i/64; const v=new THREE.Vector3().copy(home).lerp(to,t).normalize(); v.multiplyScalar(R*(1+Math.sin(Math.PI*t)*0.2)); pts.push(v); }
    return pts;
  });
  const arcMat = new THREE.LineBasicMaterial({color:"#B69CFF", transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false});
  arcs.forEach(p => globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p), arcMat)));
  const PLANES = 3, pGeo = new THREE.BufferGeometry(), pPos = new Float32Array(arcs.length*PLANES*3);
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos,3));
  const pMat = new THREE.PointsMaterial({size:.09, map:sprite, color:"#FFE1B0", transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending});
  globe.add(new THREE.Points(pGeo, pMat));

  // Drifting dust around the scene
  const D = isNarrow() ? 300 : 700, dPos = new Float32Array(D*3), dVel = new Float32Array(D);
  for(let i=0;i<D;i++){ dPos[i*3]=(Math.random()-.5)*16; dPos[i*3+1]=(Math.random()-.5)*10; dPos[i*3+2]=(Math.random()-.5)*8-1; dVel[i]=.002+Math.random()*.006; }
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(dPos,3));
  world.add(new THREE.Points(dGeo, new THREE.PointsMaterial({size:.03, map:sprite, color:"#C9B8FF", transparent:true, opacity:.5, depthWrite:false, blending:THREE.AdditiveBlending})));

  // Face home (India) towards the viewer, tilted slightly
  const baseY = -(90 + HOME.lon) * DEG + 0.5, baseX = 0.28;
  globe.rotation.set(baseX, baseY, 0);

  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w/h; camera.updateProjectionMatrix();
    world.position.set(isNarrow() ? 0.4 : 1.6, isNarrow() ? 1.7 : 0, 0);
    world.scale.setScalar(isNarrow() ? .62 : .95);
  }
  resize(); window.addEventListener("resize", resize);

  let mx=0, my=0, tx=0, ty=0;
  window.addEventListener("pointermove", e => { tx = (e.clientX/window.innerWidth-.5); ty = (e.clientY/window.innerHeight-.5); }, {passive:true});

  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if(visible) requestAnimationFrame(frame); }).observe(canvas);

  const t0 = performance.now(), INTRO = 2600;
  const ease = t => 1 - Math.pow(1-t, 4);
  function frame(now){
    const el = Math.max(0, now - t0), k = reduce ? 1 : Math.min(1, el/INTRO), e = ease(k);
    if(k < 1){
      for(let i=0;i<N;i++){ const d = Math.min(1, Math.max(0, e*1.15 - (i%97)/97*0.15));
        pos[i*3]=start[i*3]+(target[i*3]-start[i*3])*d; pos[i*3+1]=start[i*3+1]+(target[i*3+1]-start[i*3+1])*d; pos[i*3+2]=start[i*3+2]+(target[i*3+2]-start[i*3+2])*d; }
      sGeo.attributes.position.needsUpdate = true;
    }
    const after = reduce ? 1 : Math.max(0, Math.min(1, (el-INTRO*0.7)/900));
    mMat.opacity = after; arcMat.opacity = after*0.45; pMat.opacity = after;
    // planes along arcs
    const time = reduce ? 0 : el/1000;
    arcs.forEach((p,a) => { for(let j=0;j<PLANES;j++){ const t=((time*0.12 + j/PLANES + a*0.13)%1); const idx=Math.floor(t*64); const v=p[idx]; const o=(a*PLANES+j)*3; pPos[o]=v.x; pPos[o+1]=v.y; pPos[o+2]=v.z; } });
    pGeo.attributes.position.needsUpdate = true;
    if(!reduce){ for(let i=0;i<D;i++){ dPos[i*3+1]+=dVel[i]; if(dPos[i*3+1]>5) dPos[i*3+1]=-5; } dGeo.attributes.position.needsUpdate = true; }
    mx += (tx-mx)*.04; my += (ty-my)*.04;
    globe.rotation.y = baseY + (reduce ? 0 : Math.sin(time*0.15)*0.35) + mx*0.6;
    globe.rotation.x = baseX + my*0.3;
    world.rotation.y = mx*0.15;
    renderer.render(scene, camera);
    if(visible && !reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- Pixel scramble text ---------- */
const GLYPHS = "█▓▒░#/\\<>*+=-_01";
function scramble(el){
  if(el.dataset.done) return; el.dataset.done = 1;
  const html = el.innerHTML, lines = html.split(/<br\s*\/?>/i).map(s => s.replace(/<[^>]+>/g,""));
  el.setAttribute("aria-label", lines.join(" "));
  if(reduce) return;
  const total = lines.join("").length, dur = 900 + total*18, t0 = performance.now();
  (function step(now){
    const p = Math.min(1, (now-t0)/dur);
    el.innerHTML = lines.map(line => [...line].map((ch,i) => {
      if(ch===" ") return " ";
      const reveal = (i/line.length)*0.7 + 0.3*Math.random()*0;
      return p > reveal + 0.25 ? esc(ch) : (p > reveal ? `<span aria-hidden="true" style="color:var(--cyan)">${GLYPHS[(Math.random()*GLYPHS.length)|0]}</span>` : `<span aria-hidden="true" style="opacity:.25">${GLYPHS[(Math.random()*GLYPHS.length)|0]}</span>`);
    }).join("")).join("<br>");
    if(p < 1) requestAnimationFrame(step); else el.innerHTML = html;
  })(t0);
}
const sio = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ scramble(e.target); sio.unobserve(e.target); } }), {threshold:.4});
document.querySelectorAll("[data-scramble]").forEach(el => sio.observe(el));

/* ---------- Floating destination cards ---------- */
const HUES = {USA:[228,350], UK:[262,205], Canada:[355,20], Australia:[32,190], Germany:[44,0], Ireland:[145,95]};
const deck = document.getElementById("deck");
deck.innerHTML = Object.entries(COUNTRIES).map(([k,c]) => `
  <button class="card" type="button" data-k="${k}" aria-label="${esc(c.name)}: see visa and document checklist">
    <canvas aria-hidden="true"></canvas><span class="glass" aria-hidden="true"></span>
    <span class="tag">${esc(c.visa)}</span>
    <span class="meta"><span class="code">${esc(k)}</span><span class="line">${esc(c.name)} · ${esc(c.intakes)}</span></span>
  </button>`).join("");

function paintCard(card){
  const cv = card.querySelector("canvas"), r = card.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio||1, 2);
  cv.width = Math.max(1, r.width*dpr); cv.height = Math.max(1, r.height*dpr);
  const g = cv.getContext("2d"), W = cv.width, H = cv.height, [h1,h2] = HUES[card.dataset.k] || [260,190];
  let seed = [...card.dataset.k].reduce((a,ch)=>a*31+ch.charCodeAt(0),7) >>> 0;
  const rnd = () => (seed = (seed*1664525 + 1013904223) >>> 0) / 4294967296;
  g.fillStyle = `hsl(${h1} 45% 7%)`; g.fillRect(0,0,W,H);
  const blobs = [[rnd()*W, rnd()*H*.7, W*.55, h1],[rnd()*W, rnd()*H, W*.45, h2],[rnd()*W, rnd()*H*.5, W*.35, (h1+h2)/2]];
  blobs.forEach(([x,y,rad,h]) => { const gr=g.createRadialGradient(x,y,0,x,y,rad); gr.addColorStop(0,`hsla(${h} 85% 60% / .55)`); gr.addColorStop(1,`hsla(${h} 85% 50% / 0)`); g.fillStyle=gr; g.fillRect(0,0,W,H); });
  // halftone particle grid
  const step = 7*dpr;
  for(let y=step/2;y<H;y+=step) for(let x=step/2;x<W;x+=step){
    let v=0; blobs.forEach(([bx,by,rad]) => { const d=Math.hypot(x-bx,y-by)/rad; v+=Math.max(0,1-d); });
    v = Math.min(1, v*0.9) * (0.4 + rnd()*0.6);
    if(v < .08) continue;
    g.fillStyle = `hsla(${rnd()<.5?h1:h2} 90% ${60+v*30}% / ${v})`;
    g.beginPath(); g.arc(x,y,Math.max(.6*dpr, v*2.4*dpr),0,Math.PI*2); g.fill();
  }
  // orbit ring
  g.strokeStyle = "rgba(255,255,255,.18)"; g.lineWidth = dpr;
  g.beginPath(); g.ellipse(W*.68, H*.38, W*.38, H*.16, -.35, 0, Math.PI*2); g.stroke();
}
const cards = [...deck.querySelectorAll(".card")];
const paintAll = () => cards.forEach(paintCard);
paintAll();
let rz; window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(paintAll, 150); });

cards.forEach((card,i) => {
  card.addEventListener("pointermove", e => { const r=card.getBoundingClientRect(); card.style.setProperty("--ry", ((e.clientX-r.left)/r.width-.5)*14+"deg"); card.style.setProperty("--rx", -((e.clientY-r.top)/r.height-.5)*12+"deg"); });
  card.addEventListener("pointerleave", () => { card.style.setProperty("--rx","0deg"); card.style.setProperty("--ry","0deg"); });
  card.addEventListener("click", () => {
    const tab = document.querySelector(`.tab[data-k="${card.dataset.k}"]`);
    if(tab) tab.click();
    document.getElementById("countries").scrollIntoView({behavior: reduce ? "auto" : "smooth"});
  });
});
if(!reduce){
  let deckVisible = false;
  new IntersectionObserver(es => { deckVisible = es[0].isIntersecting; if(deckVisible) requestAnimationFrame(bob); }).observe(deck);
  function bob(now){ cards.forEach((c,i) => c.style.setProperty("--fy", (Math.sin(now/1400 + i*1.3)*9).toFixed(2)+"px")); if(deckVisible) requestAnimationFrame(bob); }
}

/* ---------- Ask me anything (answers from the site's own guides) ---------- */
const STOP = new Set("a an the i me my to for of in on and or is are do does can how what which when where who why with be it this that you your we our need about get go much will should any".split(" "));
const ALIAS = {us:"usa",america:"usa",american:"usa",states:"usa",f1:"usa",britain:"uk",england:"uk",london:"uk",british:"uk",scotland:"uk",canadian:"canada",toronto:"canada",aus:"australia",australian:"australia",sydney:"australia",german:"germany",berlin:"germany",irish:"ireland",dublin:"ireland",
  cost:"price",fee:"price",fees:"price",charge:"price",charges:"price",pay:"price",payment:"price",cheap:"price",expensive:"price",package:"price",packages:"price",
  loans:"loan",scholarships:"scholarship",funding:"scholarship",visas:"visa",permit:"visa",sop:"statement",lor:"recommendation",ielts:"test",toefl:"test",gre:"test",gmat:"test",sat:"test",pte:"test",duolingo:"test",exam:"test",exams:"test",tests:"test",
  job:"work",jobs:"work",parttime:"work",stay:"work",opt:"work",psw:"work",accommodation:"housing",hostel:"housing",room:"housing",rent:"housing",flat:"housing",
  call:"consultation",meeting:"consultation",appointment:"consultation",book:"consultation",contact:"consultation",phone:"consultation",whatsapp:"consultation",email:"consultation",start:"when",early:"when",deadline:"when",deadlines:"when",
  documents:"document",docs:"document",papers:"document",paperwork:"document",checklist:"document",guarantee:"guarantee",admit:"admission",admission:"admission",university:"university",universities:"university",college:"university",colleges:"university"};
const tok = s => s.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w => w && !STOP.has(w)).map(w => ALIAS[w] || w.replace(/s$/,""));
const docs = [];
FAQ.forEach(([q,a]) => docs.push({title:q, text:esc(a), keys:tok(q+" "+q+" "+a)}));
Object.entries(COUNTRIES).forEach(([k,c]) => docs.push({title:`Studying in ${c.name}`, country:k,
  text:`You'll need a <b>${esc(c.visa)}</b>. Key document: ${esc(c.proof)}. Intakes: ${esc(c.intakes)}. Work while studying: ${esc(c.work)}.`,
  keys:tok(`${k} ${k} ${k} ${c.name} ${c.name} ${c.visa} ${c.proof} visa document document work intake when`)}));
STAGES.forEach(s => docs.push({title:s.t, text:`${esc(s.when)}: ${s.items.map(esc).join(", ")}. <b>How we help:</b> ${esc(s.help)}`, keys:tok(`${s.t} ${s.t} ${s.items.join(" ")} ${s.help}`)}));
const priced = (C.packages||[]).map(p => `${esc(p.name)}: ${esc(p.price||"price on request")}`).join(" · ");
docs.push({title:"Packages and prices", text:`${priced}. The first 30-minute consultation is free.`, keys:tok("price price price package free consultation cost")});
docs.push({title:"Talk to an advisor", text:`Book a free 30-minute call with the form below${C.phoneDisplay?`, call ${esc(C.phoneDisplay)}`:""}${C.email?`, or email ${esc(C.email)}`:""}.`, keys:tok("consultation consultation advisor talk call book contact")});
const df = {}; docs.forEach(d => new Set(d.keys).forEach(w => df[w]=(df[w]||0)+1));

const askForm = document.getElementById("askForm"), askInput = document.getElementById("askInput"), ans = document.getElementById("askAnswer");
askForm.addEventListener("submit", e => {
  e.preventDefault();
  const q = askInput.value.trim(); if(!q) return;
  const qt = tok(q); let best = null, bestScore = 0;
  let bestHits = 0;
  docs.forEach(d => { let s=0, hits=0; qt.forEach(w => { const n=d.keys.filter(x=>x===w).length; if(n){ hits++; s += Math.log(1+docs.length/df[w]) * (1+Math.log(n)); } }); if(s>bestScore){bestScore=s; best=d; bestHits=hits;} });
  const confident = best && (bestHits >= 2 || bestHits/Math.max(1,qt.length) >= 0.6);
  const wa = C.whatsapp ? `<a href="${waLink("Hi SY Consulting, I have a question: "+q)}" target="_blank" rel="noopener">Ask an advisor on WhatsApp</a>` : `<a href="#book">Ask an advisor</a>`;
  ans.hidden = false;
  if(confident){
    ans.innerHTML = `<b>${esc(best.title)}</b><p>${best.text}</p>${best.country?`<a href="#countries" data-k="${best.country}" class="see">See the full ${esc(COUNTRIES[best.country].name)} checklist</a>`:""}<p class="note">From our guides. ${wa} for advice on your own case.</p>`;
  } else {
    ans.innerHTML = `<b>Good question</b><p>That one needs a person. ${wa} and we'll reply quickly.</p>`;
  }
  const see = ans.querySelector(".see");
  if(see) see.addEventListener("click", () => { const t=document.querySelector(`.tab[data-k="${see.dataset.k}"]`); if(t) t.click(); });
});

const bar = document.querySelector(".topbar");
const onScroll = () => bar.classList.toggle("solid", window.scrollY > window.innerHeight*0.6);
window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

startGlobe();
})();
