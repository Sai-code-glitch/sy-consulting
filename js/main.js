
const STAGES = [
  {t:"Profile and shortlist", when:"12–15 months before intake",
   items:["Profile review: marks, budget, goals","Country comparison: cost, work rights, stay-back","University and course shortlist (safe, match, reach)","Year-by-year cost and ROI estimate"],
   help:"A personalised shortlist with fees, living costs and admission chances."},
  {t:"Tests and preparation", when:"9–12 months before",
   items:["IELTS, TOEFL, PTE or Duolingo English Test","GRE, GMAT or SAT where required","Test date planning around deadlines","Score report sending to universities"],
   help:"Which tests each university really needs, and when to book them."},
  {t:"Applications and documents", when:"6–10 months before",
   items:["Statement of purpose and personal statement","Letters of recommendation","Resume or CV for admissions","Transcripts, degree and attested copies","Application forms, fees and deadlines","UCAS, Common App and uni-assist portals"],
   help:"SOP editing, document review and a deadline tracker for every application."},
  {t:"Offers, scholarships and loans", when:"3–6 months before",
   items:["Comparing offers and accepting one","Scholarships and fee waivers","Education loans, secured and unsecured","Deposits, I-20, CAS, CoE or LoA"],
   help:"Scholarship applications and loan paperwork with partner lenders."},
  {t:"Student visa", when:"2–4 months before",
   items:["Financial proof and sponsor documents","Visa forms and fee payments","Biometrics and medicals","Interview preparation (mock interviews)","Insurance and health cover"],
   help:"A country-specific visa file, checked line by line before you submit."},
  {t:"Pre-departure", when:"1–2 months before",
   items:["Flights and baggage allowance","Forex card and international transfers","Accommodation: halls or private rental","What to pack and what to buy there","Pre-departure briefing"],
   help:"Flight, forex and housing support so nothing is left to the last week."},
  {t:"Landing and settling in", when:"First 4 weeks abroad",
   items:["Airport pickup and temporary stay","Local SIM and transport card","Bank account","Registration: police, residence or city office","University enrolment and orientation","Part-time job rules and finding work"],
   help:"An advisor on WhatsApp through your first month, for anything that comes up."}
];

const COUNTRIES = {
  USA:{name:"United States", iso:"US", visa:"F-1 student visa", proof:"I-20 from your university", work:"20 hrs/week on campus in term; OPT after graduation (STEM OPT extension for eligible degrees)", intakes:"Fall (Aug/Sep), Spring (Jan)",
    lists:{
      "Admission":["Valid passport (at least 6 months beyond your stay)","Academic transcripts and degree certificates","English test score (TOEFL, IELTS or Duolingo)","GRE, GMAT or SAT if your program requires it","Statement of purpose","2–3 letters of recommendation","Resume","Application fee payment"],
      "Visa":["Form I-20 issued by your university","SEVIS I-901 fee receipt","DS-160 confirmation page","Visa fee (MRV) receipt and interview appointment","Bank statements and sponsor letters covering the I-20 amount","Loan sanction letter if funding by loan","Passport-size photo to US specification","Original academic documents for the interview"],
      "Before you fly":["Health insurance (often university plan)","Immunisation records the university asks for","Housing confirmation","Copies of I-20, visa and admission letter in hand luggage"]
    }},
  UK:{name:"United Kingdom", iso:"GB", visa:"Student visa", proof:"CAS from your university", work:"Up to 20 hrs/week in term for degree-level study; Graduate Route after your degree", intakes:"September (main), January",
    lists:{
      "Admission":["Valid passport","Transcripts and degree certificates","IELTS for UKVI or an accepted English test","Personal statement (UCAS for undergraduate)","Reference letters","Resume for postgraduate courses"],
      "Visa":["Confirmation of Acceptance for Studies (CAS)","Funds for tuition balance and living costs, held for 28 consecutive days","Tuberculosis test certificate (required for applicants from India and some other countries)","Immigration Health Surcharge (IHS) payment","ATAS certificate if your course requires one","Biometrics appointment","UKVI account to access your eVisa"],
      "Before you fly":["Accommodation contract","Proof of eVisa status (share code)","Copies of CAS and offer letter","Register with a GP after arrival"]
    }},
  Canada:{name:"Canada", iso:"CA", visa:"Study permit", proof:"Letter of acceptance from a DLI", work:"Off-campus work within the weekly limit set by IRCC; PGWP for eligible programs", intakes:"September, January, May",
    lists:{
      "Admission":["Valid passport","Transcripts and degree certificates","IELTS, TOEFL, PTE or CELPIP score","Statement of purpose","Letters of recommendation","Resume"],
      "Study permit":["Letter of acceptance from a Designated Learning Institution (DLI)","Provincial or Territorial Attestation Letter (PAL/TAL), where required","Proof of funds for tuition and living costs (a GIC is the usual route)","Tuition fee payment receipt","Biometrics","Upfront medical exam by a panel physician","Statement of purpose for the study permit"],
      "Before you fly":["Port of Entry letter of introduction","Provincial health insurance or private cover until it starts","Accommodation booking","Copies of all documents for the border officer"]
    }},
  Australia:{name:"Australia", iso:"AU", visa:"Student visa (subclass 500)", proof:"Confirmation of Enrolment (CoE)", work:"Limited hours per fortnight in term; post-study work visa (subclass 485) for eligible graduates", intakes:"February, July",
    lists:{
      "Admission":["Valid passport","Transcripts and degree certificates","IELTS, PTE or TOEFL score","Statement of purpose","Resume and work experience letters"],
      "Visa":["Confirmation of Enrolment (CoE)","Genuine Student (GS) statement","Overseas Student Health Cover (OSHC) for the whole visa period","Evidence of funds for tuition, living and travel","English test score","Health examination","Biometrics if asked","ImmiAccount application and visa fee"],
      "Before you fly":["Accommodation booking","Tax File Number (apply after arrival)","Copy of visa grant notice (VEVO)","OSHC membership card"]
    }},
  Germany:{name:"Germany", iso:"DE", visa:"National (D) student visa", proof:"Admission letter (Zulassungsbescheid)", work:"Limited full or half days per year; 18-month job-seeker residence permit after graduation", intakes:"Winter (Oct), Summer (Apr)",
    lists:{
      "Admission":["Valid passport","Transcripts and degree certificates","APS certificate (required for applicants from India, China and Vietnam)","English (IELTS/TOEFL) or German (TestDaF, DSH, Goethe) certificate","Motivation letter","Resume in European format","uni-assist evaluation (VPD) where the university uses it"],
      "Visa":["Admission letter","Blocked account (Sperrkonto) confirmation for the required yearly amount","Health insurance (travel cover first, then public or private student cover)","Visa application form and appointment via the embassy or VFS","Biometric photos","APS certificate","Proof of accommodation, if available"],
      "After landing":["City registration (Anmeldung) within 14 days","University enrolment (Immatrikulation)","Activate public health insurance","Residence permit appointment at the Ausländerbehörde","Open a German bank account; unlock monthly blocked-account payouts","Tax ID arrives by post after registration"]
    }},
  Ireland:{name:"Ireland", iso:"IE", visa:"Study (D) visa, Stamp 2 permission", proof:"Letter of acceptance", work:"20 hrs/week in term, 40 hrs/week in holiday periods; Stamp 1G stay-back for graduates", intakes:"September, January",
    lists:{
      "Admission":["Valid passport","Transcripts and degree certificates","IELTS, TOEFL, PTE or Duolingo score","Statement of purpose","Letters of recommendation","Resume"],
      "Visa":["Letter of acceptance from an eligible (ILEP-listed) course","Proof of fees paid","Evidence of funds for living costs","Private medical insurance","Online AVATS application and signed summary","Explanation of any gaps in education","Visa fee"],
      "After landing":["Register with immigration (IRP card) at your local office","PPS number for work","Irish bank account","Accommodation lease"]
    }}
};

const SERVICES = [
  ["Career and country counselling","Profile review, country choice and a shortlist that fits your budget and goals."],
  ["Test guidance","IELTS, TOEFL, PTE, Duolingo, GRE, GMAT and SAT planning and prep partners."],
  ["Applications and SOP","SOP and LOR editing, resume, and every application form filed on time."],
  ["Scholarships and loans","Scholarship search and applications, and education loan paperwork."],
  ["Visa filing and mock interviews","A complete visa file, checked before submission, plus interview practice."],
  ["Travel and forex","Student fares, extra baggage, forex cards and money transfers."],
  ["Accommodation","Student halls, shared flats and temporary stays booked before you fly."],
  ["Arrival support","Airport pickup, SIM, bank account and local registration help."],
  ["Part-time jobs and careers","Work-hour rules, resume for local jobs, and post-study work visas."]
];

const FAQ = [
  ["When should I start?","Ideally 12 to 15 months before your intake. Tests, applications and visas each take time, and scholarship deadlines are often earlier than admission deadlines. If your intake is closer, we can still help; we'll tell you honestly what's realistic."],
  ["Is the first consultation really free?","Yes. The first 30-minute call is free and there's no obligation. You'll leave with a shortlist and a timeline either way."],
  ["Can you guarantee admission or a visa?","No one honestly can. Decisions are made by universities and governments. What we do is make sure your application and visa file are complete, accurate and as strong as they can be."],
  ["Do you help with education loans?","Yes. We help you compare secured and unsecured loans, prepare the documents lenders ask for, and get the sanction letter you need for your visa."],
  ["I only need help with my visa. Can I book just that?","Yes. Every service can be booked on its own, or you can take the full journey package."],
  ["Which countries do you cover?","The USA, UK, Canada, Australia, Germany and Ireland today, with more destinations being added."],
  ["Do you help after I land?","Yes. We arrange airport pickup and help with your SIM, bank account and local registration, and you keep a WhatsApp line to your advisor through your first month."],
  ["Are the checklists on this site final?","They're a strong starting point. Visa rules and amounts change often, so we confirm every requirement against the official government source when we prepare your file."]
];

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

// Journey
document.getElementById("stages").innerHTML = STAGES.map((s,i)=>`
  <div class="stage">
    <div class="stage-num">0${i+1}</div>
    <div class="stage-body">
      <span class="when">${esc(s.when)}</span>
      <h3>${esc(s.t)}</h3>
      <ul>${s.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      <p class="help"><b>How we help:</b> ${esc(s.help)}</p>
    </div>
  </div>`).join("");

// Services
document.getElementById("svc").innerHTML = SERVICES.map(([t,d])=>`<div class="svc"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");

// FAQ
document.getElementById("faqList").innerHTML = FAQ.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

// Country checklists
const store = {
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
let ticks = store.get("sy-ticks",{});
let current = store.get("sy-country","USA");
if(!COUNTRIES[current]) current="USA";
const tabsEl=document.getElementById("tabs"), countryEl=document.getElementById("country");
tabsEl.innerHTML = Object.entries(COUNTRIES).map(([k,c])=>`<button class="tab" role="tab" id="tab-${k}" data-k="${k}" aria-selected="false"><span class="iso">${c.iso}</span>${esc(k)}</button>`).join("");
tabsEl.addEventListener("click",e=>{const b=e.target.closest(".tab"); if(b){current=b.dataset.k; store.set("sy-country",current); renderCountry();}});

function renderCountry(){
  const c=COUNTRIES[current];
  tabsEl.querySelectorAll(".tab").forEach(b=>b.setAttribute("aria-selected", b.dataset.k===current));
  const lists=Object.entries(c.lists);
  countryEl.innerHTML = `
    <aside class="facts">
      <h3>${esc(c.name)}</h3>
      <dl>
        <div><dt>Visa</dt><dd>${esc(c.visa)}</dd></div>
        <div><dt>Key document</dt><dd>${esc(c.proof)}</dd></div>
        <div><dt>Intakes</dt><dd>${esc(c.intakes)}</dd></div>
        <div><dt>Work while studying</dt><dd>${esc(c.work)}</dd></div>
      </dl>
      <div class="progress"><span class="field-k" id="progLabel"></span><div class="bar"><span id="progBar"></span></div></div>
      <p class="note warn">Fees, fund amounts and work-hour limits change. We confirm each one with the official source when we build your file.</p>
    </aside>
    <div class="checklists">${lists.map(([title,items],li)=>`
      <div class="cl"><h3>${esc(title)}<span class="count" data-li="${li}"></span></h3>
        ${items.map((it,ii)=>{const id=`${current}-${li}-${ii}`;return `<label for="ck-${id}"><input type="checkbox" id="ck-${id}" data-id="${id}" ${ticks[id]?"checked":""}><span>${esc(it)}</span></label>`}).join("")}
      </div>`).join("")}</div>`;
  updateProgress();
}
function updateProgress(){
  const boxes=[...countryEl.querySelectorAll("input[type=checkbox]")];
  const done=boxes.filter(b=>b.checked).length;
  document.getElementById("progLabel").textContent=`${done} of ${boxes.length} documents ready`;
  document.getElementById("progBar").style.width=(boxes.length?done/boxes.length*100:0)+"%";
  countryEl.querySelectorAll(".count").forEach(el=>{
    const cl=el.closest(".cl"), bs=[...cl.querySelectorAll("input")];
    el.textContent=`${bs.filter(b=>b.checked).length}/${bs.length}`;
  });
}
countryEl.addEventListener("change",e=>{
  const b=e.target; if(b.dataset.id){ if(b.checked) ticks[b.dataset.id]=1; else delete ticks[b.dataset.id]; store.set("sy-ticks",ticks); updateProgress(); }
});
renderCountry();

// Hero destination cycle
const codes=Object.keys(COUNTRIES); let ci=0;
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduce) setInterval(()=>{ci=(ci+1)%codes.length; const el=document.getElementById("destCode"); el.style.opacity=0; setTimeout(()=>{el.textContent=codes[ci]; el.style.opacity=1;},250);},2600);


// ---- Settings-driven pieces: contact, packages, WhatsApp ----
const C = window.SY_CONFIG || {};
const waLink = text => C.whatsapp ? `https://wa.me/${C.whatsapp.replace(/\D/g,"")}${text?`?text=${encodeURIComponent(text)}`:""}` : "";

// Packages
document.getElementById("pkgs").innerHTML = (C.packages||[]).map(p=>{
  const price = p.price || "Price on request";
  const cta = p.price==="Free" ? `<a class="btn ghost" href="#book">Book free call</a>`
    : C.paymentUrl && p.price ? `<a class="btn${p.featured?"":" ghost"}" href="${esc(C.paymentUrl)}" target="_blank" rel="noopener">Pay and start</a>`
    : `<a class="btn${p.featured?"":" ghost"}" href="#book">Enquire</a>`;
  return `<div class="pkg${p.featured?" featured":""}">
    ${p.featured?`<span class="pkg-flag">Most chosen</span>`:""}
    <h3>${esc(p.name)}</h3>
    <div class="pkg-price">${esc(price)}<small>${esc(p.note||"")}</small></div>
    <ul>${(p.items||[]).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
    ${cta}</div>`;
}).join("");

// Contact block, footer and floating WhatsApp
const contacts=[];
if(C.phoneDisplay) contacts.push(`<div><dt>Phone</dt><dd><a href="tel:${esc(C.phoneDisplay.replace(/[^\d+]/g,""))}">${esc(C.phoneDisplay)}</a></dd></div>`);
if(C.whatsapp) contacts.push(`<div><dt>WhatsApp</dt><dd><a href="${waLink("Hi SY Consulting, I'd like help with studying abroad.")}" target="_blank" rel="noopener">Chat with an advisor</a></dd></div>`);
if(C.email) contacts.push(`<div><dt>Email</dt><dd><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></dd></div>`);
if(C.address) contacts.push(`<div><dt>Office</dt><dd>${esc(C.address)}</dd></div>`);
const cBox=document.getElementById("contactList");
if(contacts.length){ cBox.innerHTML=contacts.join(""); cBox.hidden=false; }
if(C.bookingUrl){ const b=document.getElementById("pickTime"); b.href=C.bookingUrl; b.hidden=false; }
if(C.whatsapp){ const f=document.getElementById("waFloat"); f.href=waLink("Hi SY Consulting, I'd like help with studying abroad."); f.hidden=false; }
const soc=[]; if(C.instagram) soc.push(`<a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a>`); if(C.linkedin) soc.push(`<a href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
const fc=[C.phoneDisplay,C.email].filter(Boolean).map(esc);
document.getElementById("footContact").innerHTML=[...fc,...soc,`<a href="privacy.html">Privacy</a>`].join(" · ");

// ---- Enquiry form ----
const picks=(id,name,opts)=>document.getElementById(id).innerHTML=opts.map((o,i)=>`<label class="pick" for="${name}-${i}"><input type="checkbox" id="${name}-${i}" name="${name}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join("");
picks("destPicks","dest",[...codes,"Not sure"]);
picks("svcPicks","svc",["Choosing a university","Tests","Applications and SOP","Scholarships","Education loan","Visa","Flights and forex","Accommodation","Arrival support"]);

const form=document.getElementById("enq"), err=document.getElementById("err"), done=document.getElementById("done");
form.addEventListener("submit",async e=>{
  e.preventDefault(); err.hidden=true;
  if(document.getElementById("company").value) return; // spam trap
  const v=id=>document.getElementById(id).value.trim();
  const checked=n=>[...form.querySelectorAll(`input[name=${n}]:checked`)].map(i=>i.value);
  const data={name:v("name"),phone:v("phone"),email:v("email"),course:v("level"),intake:v("intake"),best_time_to_call:slotText(),countries:checked("dest").join(", ")||"Not sure",help_with:checked("svc").join(", ")||"Not specified",message:v("msg"),consent:document.getElementById("consent").checked?"yes":"no"};
  const missing=[];
  if(!data.name) missing.push("your name");
  if(!/[0-9]{7,}/.test(data.phone.replace(/\D/g,""))) missing.push("a phone or WhatsApp number");
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) missing.push("a valid email");
  if(data.consent!=="yes") missing.push("your consent to be contacted");
  if(missing.length){ err.textContent="Please add "+missing.join(", ")+"."; err.hidden=false; return; }
  const summary=`New enquiry for SY Consulting
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Course: ${data.course} · Intake: ${data.intake}
Countries: ${data.countries}
Help with: ${data.help_with}
Call slot: ${data.best_time_to_call}${data.message?"\nNotes: "+data.message:""}`;
  const btn=document.getElementById("send"); btn.disabled=true; btn.textContent="Sending…";
  let ok=false;
  if(C.formEndpoint){
    try{
      const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({...data,_subject:`Study abroad enquiry: ${data.name}`,_template:"table",_replyto:data.email})});
      const j=await r.json().catch(()=>({}));
      ok=r.ok && (j.success===undefined || String(j.success)==="true");
    }catch(x){ ok=false; }
  }
  btn.disabled=false; btn.textContent="Request my free call";
  done.hidden=false;
  const first=esc(data.name.split(" ")[0]);
  if(ok){
    done.innerHTML=`<b>Thanks, ${first}. Your enquiry has been sent.</b><p>${slot?`We'll confirm your call for <b>${esc(slotLocal(slot))}</b> by WhatsApp or email.`:`An advisor will contact you on ${esc(data.phone)} to set up your free call.`}</p>${slot?`<a class="btn ghost" href="${gcalLink(slot)}" target="_blank" rel="noopener">Add to Google Calendar</a>`:""}${C.bookingUrl?`<a class="btn ghost" href="${esc(C.bookingUrl)}" target="_blank" rel="noopener">Or pick a time now</a>`:""}`;
    form.reset(); slot=null; renderTimes();
  } else if(C.whatsapp){
    done.innerHTML=`<b>One more step, ${first}.</b><p>Tap below to send your details to us on WhatsApp.</p><a class="btn" href="${waLink(summary)}" target="_blank" rel="noopener">Send on WhatsApp</a>`;
  } else {
    done.innerHTML=`<b>We couldn't send your enquiry right now.</b><p>Please try again in a few minutes${C.email?` or email us at ${esc(C.email)}`:""}.</p>`;
  }
  done.scrollIntoView({block:"nearest",behavior:reduce?"auto":"smooth"});
});

// ---- Built-in call calendar ----
const CAL = Object.assign({timeZone:"America/Detroit",zoneLabel:"ET",days:[1,2,3,4,5,6],hours:[9,10,11,12,18,19,20],daysAhead:14,minHoursNotice:12}, C.calendar||{});
function tzParts(date){
  const f=new Intl.DateTimeFormat("en-US",{timeZone:CAL.timeZone,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const o={}; f.formatToParts(date).forEach(p=>o[p.type]=p.value); return o;
}
function zonedToUtc(y,m,d,h){ // wall-clock time in CAL.timeZone -> Date
  let t=Date.UTC(y,m,d,h);
  for(let i=0;i<2;i++){ const p=tzParts(new Date(t)); const asUtc=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute); t=Date.UTC(y,m,d,h)-(asUtc-t); }
  return new Date(t);
}
const viewerTz=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return ""}})();
const sameZone = viewerTz===CAL.timeZone;
const fmtOwner=(d,o)=>d.toLocaleString("en-US",{timeZone:CAL.timeZone,...o});
const fmtLocal=(d,o)=>d.toLocaleString(undefined,o);
let slot=null, dayKey=null;
function buildDays(){
  const now=new Date(), p=tzParts(now), out=[];
  for(let i=0;i<=CAL.daysAhead;i++){
    const base=new Date(Date.UTC(+p.year,+p.month-1,+p.day+i));
    if(!CAL.days.includes(base.getUTCDay())) continue;
    const y=base.getUTCFullYear(), m=base.getUTCMonth(), d=base.getUTCDate();
    const times=CAL.hours.map(h=>zonedToUtc(y,m,d,h)).filter(t=>t-now>=CAL.minHoursNotice*3600e3);
    if(times.length) out.push({key:`${y}-${m+1}-${d}`,date:base,times});
  }
  return out;
}
const DAYS=buildDays();
function renderDays(){
  document.getElementById("days").innerHTML=DAYS.map(dy=>`<button type="button" class="day" role="radio" aria-checked="${dy.key===dayKey}" data-k="${dy.key}"><small>${dy.date.toLocaleDateString("en-US",{weekday:"short",timeZone:"UTC"})}</small><b>${dy.date.getUTCDate()}</b><small>${dy.date.toLocaleDateString("en-US",{month:"short",timeZone:"UTC"})}</small></button>`).join("");
}
function renderTimes(){
  renderDays();
  const dy=DAYS.find(x=>x.key===dayKey), el=document.getElementById("times");
  el.innerHTML = dy ? dy.times.map(t=>`<button type="button" class="time" role="radio" aria-checked="${slot&&+slot===+t}" data-t="${+t}"><b>${fmtOwner(t,{hour:"numeric",minute:"2-digit"})} ${esc(CAL.zoneLabel)}</b>${sameZone?"":`<small>${esc(fmtLocal(t,{weekday:"short",hour:"numeric",minute:"2-digit"}))} your time</small>`}</button>`).join("") : "";
  document.getElementById("slotNote").textContent = slot ? `Selected: ${slotLocal(slot)}. 30 minutes by phone, WhatsApp or video.` : (dy ? "Choose a time." : "Choose a day to see open times. Prefer we call you? Leave this blank.");
}
function slotLocal(t){ return sameZone ? fmtOwner(t,{weekday:"long",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})+" "+CAL.zoneLabel
  : fmtLocal(t,{weekday:"long",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})+" your time"; }
function slotText(){ if(!slot) return "No slot picked, please call to arrange";
  return fmtOwner(slot,{weekday:"long",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})+" "+CAL.zoneLabel+(sameZone?"":` (student's time: ${fmtLocal(slot,{weekday:"short",hour:"numeric",minute:"2-digit"})}, ${viewerTz})`); }
function gcalLink(t){ const z=d=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""); const e=new Date(+t+30*60e3);
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Free study abroad call with SY Consulting")+"&dates="+z(t)+"/"+z(e)+"&details="+encodeURIComponent("We'll call you on the number you gave us."+(C.whatsapp?" WhatsApp: +"+C.whatsapp:"")); }
document.getElementById("days").addEventListener("click",e=>{const b=e.target.closest(".day"); if(b){dayKey=b.dataset.k; slot=null; renderTimes();}});
document.getElementById("times").addEventListener("click",e=>{const b=e.target.closest(".time"); if(b){slot=new Date(+b.dataset.t); renderTimes();}});
if(DAYS.length){ dayKey=DAYS[0].key; renderTimes(); } else document.getElementById("slotPicker").hidden=true;
