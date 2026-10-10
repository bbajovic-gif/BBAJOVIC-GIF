/* Six stable daily picks, keyed to the Budapest calendar day. */
(function () {
  const dayKey = (date = new Date()) => new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Budapest',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  function hash(text) { let n=2166136261; for(const c of text)n=Math.imul(n^c.charCodeAt(0),16777619); return n>>>0; }
  const eligible=r=>r.section==='video'&&r.can_buy===true&&Number.isFinite(r.asking_price)&&r.asking_price>0&&/^assets\/video-covers\/[a-z0-9_.-]+$/.test(r.front||'');
  function select(records,day){const seen=new Set();return records.filter(eligible).sort((a,b)=>hash(day+'|'+a.copy_id)-hash(day+'|'+b.copy_id)||a.copy_id.localeCompare(b.copy_id)).filter(r=>{const key=r.title.toLowerCase();if(seen.has(key))return false;seen.add(key);return true}).slice(0,6);}
  if(typeof module!=='undefined')module.exports={dayKey,eligible,select};
  if(typeof document==='undefined')return;
  const grid=document.querySelector('#bbaya-video-offers .records');if(!grid)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let records=[],lastDay='';
  function draw(){lastDay=dayKey();const selected=select(records,lastDay);grid.innerHTML=selected.length?selected.map(r=>{const url='library/video.html?availability=AVAILABLE&id='+encodeURIComponent(r.copy_id);return `<article class="record"><a href="${esc(url)}"><div class="sleeve"><img src="library/${esc(r.front)}" alt="${esc(r.title)}" loading="lazy"><span class="home-format-badge">${esc(r.format)}${r.kind==='Box Set'?' · BOX SET':''}</span></div><h3>${esc(r.title)}</h3></a><p>${esc(r.year)} · ${esc(r.kind==='TV'?'TV':r.kind==='Box Set'?'Complete box set':'Movie')}</p><div class="price">CA$${Number(r.asking_price).toFixed(2)}</div><a class="record-link" href="${esc(url)}">View video →</a></article>`}).join(''):'<p>Videos for sale are coming soon. <a href="library/video.html">Explore the Video Library →</a></p>';}
  fetch('library/video.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{records=Array.isArray(data.records)?data.records:[];draw()}).catch(()=>{if(Array.isArray(window.VIDEO_RECORDS)){records=window.VIDEO_RECORDS;draw();return;}grid.innerHTML='<p><a href="library/video.html">Explore the Video Library →</a></p>';});
  setInterval(()=>{if(dayKey()!==lastDay)draw()},60000);
})();
