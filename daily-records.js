/* Shared daily homepage selection and complete available-record listing. */
(function () {
  const dayKey = (date = new Date()) => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date);
  function hash(text) {
    let n = 2166136261;
    for (const c of text) n = Math.imul(n ^ c.charCodeAt(0), 16777619);
    n ^= n >>> 16; n = Math.imul(n, 0x7feb352d);
    n ^= n >>> 15; n = Math.imul(n, 0x846ca68b);
    return (n ^ (n >>> 16)) >>> 0;
  }
  const eligible = r => r.can_buy === true && Number.isFinite(r.asking_price) && r.asking_price > 0
    && /^assets\//.test(r.primary_image || '') && /^records\/[a-z0-9-]+\.html$/.test(r.record_url || '');
  function select(records, day) {
    const ordered = records.filter(eligible).slice().sort((a, b) =>
      hash(day + a.record_url) - hash(day + b.record_url) || a.record_url.localeCompare(b.record_url));
    const picked = [], seen = new Set();
    function add(r) {
      const key = JSON.stringify([r.artist, r.title]);
      if (!seen.has(key)) { seen.add(key); picked.push(r); }
    }
    for (const family of ['vinyl', 'cd', 'cassette']) {
      const r = ordered.find(r => r.format_family === family);
      if (r) add(r);
    }
    for (const r of ordered) { if (picked.length >= 12) break; add(r); }
    return picked;
  }
  if (typeof module !== 'undefined') module.exports = { dayKey, eligible, select };
  if (typeof document === 'undefined') return;
  const section = document.querySelector('#bbaya-offers, #all-featured-records');
  if (!section) return;
  const all = section.id === 'all-featured-records', prefix = all ? '' : 'library/';
  const grid = section.querySelector('.records');
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => 'CA$' + Number(v).toFixed(2);
  let records = [], lastDay = '';
  function card(r) {
    const url = prefix + r.record_url;
    const condition = [r.media_condition_code || r.media_condition, r.sleeve_condition_code || r.sleeve_condition].filter(Boolean).join(' / ') || 'Condition: see details';
    const comparison = Number(r.discogs_suggested) > r.asking_price ? `<p class="price-comparison">Discogs suggested: ${money(r.discogs_suggested)}</p>` : '';
    return `<article class="record"><a href="${esc(url)}"><div class="sleeve"><img src="${esc(prefix + r.primary_image)}" alt="${esc(r.artist)} — ${esc(r.title)}" loading="lazy"><span class="home-format-badge">${esc(r.format_code || r.format || 'MUSIC')}</span>${r.on_promotion === true ? '<span class="home-sale-badge">◆ ON SALE</span>' : ''}</div><h3>${esc(r.artist)}</h3><p class="record-title">${esc(r.title)}</p></a><p>${esc(r.format)} · ${esc(condition)}</p><div class="price">${money(r.asking_price)}</div>${comparison}<a class="record-link" href="${esc(url)}">View record →</a></article>`;
  }
  function draw() {
    lastDay = dayKey();
    const q = section.querySelector('input')?.value.trim().toLowerCase() || '';
    const visible = all ? records.filter(r => [r.artist, r.title].join(' ').toLowerCase().includes(q)) : select(records, lastDay);
    grid.innerHTML = visible.length ? visible.map(card).join('') : '<p>No available records match this selection.</p>';
    const count = section.querySelector('[data-record-count]');
    if (count) count.textContent = `${visible.length} available records`;
  }
  async function load() {
    try {
      const response = await fetch(prefix + 'canada.json', { cache: 'no-store' });
      if (!response.ok) throw Error('Catalog unavailable');
      const data = await response.json();
      if (!Array.isArray(data.records)) throw Error('Invalid catalog');
      records = data.records.filter(eligible); draw();
    } catch (_) {
      if (Array.isArray(window.BBAYA_LIBRARY_DATA?.records)) {
        records = window.BBAYA_LIBRARY_DATA.records.filter(eligible); draw();
      } else grid.innerHTML = '<p>The catalog is temporarily unavailable. Please try again later.</p>';
    }
  }
  section.querySelector('input')?.addEventListener('input', draw);
  load();
  setInterval(() => { if (dayKey() !== lastDay) load(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
})();
