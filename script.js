const button=document.querySelector('.menu-button');const nav=document.querySelector('.main-nav');if(button&&nav){button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');}));}

document.querySelector('.newsletter form')?.addEventListener('submit',e=>{e.preventDefault();alert('Subscription form is ready to connect to your mailing service.');});

document.querySelectorAll('[data-open-dialog]').forEach(control=>control.addEventListener('click',()=>{const dialog=document.getElementById(control.dataset.openDialog);if(dialog?.showModal){dialog.showModal();if(dialog.id==='site-search')setTimeout(()=>document.getElementById('site-search-input')?.focus(),50);}}));
document.querySelectorAll('.site-dialog').forEach(dialog=>dialog.addEventListener('click',e=>{const box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}));
const searchPages=[
['Library','library/index.html','Browse the collection and storefront'],['Discogs Toolkit','toolkit/index.html','Collector and seller software suite'],['RDM Play Studio','rdmplaystudio/index.html','Organize and play a Real-Debrid media library'],['IconLab','iconlab/index.html','Six visual asset preparation and organization tools'],['Learn','learn.html','Guides and workflows'],['Community','community.html','Collector meeting place'],['Support Center','support.html','Help across all BBaya projects'],['About Me','about.html','The collector and developer behind BBaya'],['Shipping','shipping.html','Rates, packaging and delivery'],['Accurate Grading','grading.html','Condition and listing standards'],['Secure Packaging','packaging.html','How orders are protected'],['Returns & Guarantee','returns.html','Problem resolution'],['Payment Methods','payments.html','Checkout information'],['Contact','contact.html','Reach BBaya']];
const input=document.getElementById('site-search-input'),results=document.getElementById('search-results');function renderSearch(q=''){if(!results)return;const term=q.trim().toLowerCase();const list=term?searchPages.filter(x=>x.join(' ').toLowerCase().includes(term)):searchPages.slice(0,6);results.innerHTML=list.length?list.map(([name,url,desc])=>`<a href="${url}"><span>${name}</span><small>${desc}</small></a>`).join(''):'<p>No matching page found yet.</p>';}input?.addEventListener('input',()=>renderSearch(input.value));renderSearch();

/* BBaya shared cart bridge — keeps the root homepage synchronized with the MOD6 Library cart. */
(() => {
  const CART_KEY = 'bbaya-cart-v1';

  function getCartItems() {
    try {
      const value = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function money(item) {
    const value = Number(item?.asking_price ?? item?.price ?? 0);
    const currency = String(item?.currency || 'CAD').toUpperCase();
    const prefix = currency === 'CAD' ? 'CA$' : `${currency} `;
    return `${prefix}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  function updateRootCart() {
    const items = getCartItems();
    document.querySelectorAll('.cart-button span,[data-cart-count]').forEach(el => {
      el.textContent = String(items.length);
    });

    const dialog = document.getElementById('site-cart');
    const content = dialog?.querySelector('.dialog-content');
    if (!content) return;

    if (!items.length) {
      content.innerHTML = `
        <p class="dialog-kicker">Your cart</p>
        <h2>Your cart is empty</h2>
        <p>Items added from the BBaya Library will appear here.</p>
        <a class="dialog-link" href="library/index.html">Browse the Library →</a>`;
      return;
    }

    const rows = items.map(item => `
      <div style="display:grid;grid-template-columns:1fr auto;gap:14px;padding:12px 0;border-bottom:1px solid #252b32">
        <div><strong>${escapeHtml(item.artist || '')}</strong><br><span style="color:#aeb5bf">${escapeHtml(item.title || '')}</span></div>
        <strong style="color:#ff6500">${money(item)}</strong>
      </div>`).join('');

    content.innerHTML = `
      <p class="dialog-kicker">Your cart</p>
      <h2>${items.length} ${items.length === 1 ? 'item' : 'items'} selected</h2>
      <div>${rows}</div>
      <a class="dialog-link" href="cart.html">Open full cart →</a>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[ch]);
  }

  document.addEventListener('DOMContentLoaded', updateRootCart);
  window.addEventListener('storage', event => {
    if (event.key === CART_KEY) updateRootCart();
  });
  document.querySelectorAll('[data-open-dialog="site-cart"]').forEach(button => {
    button.addEventListener('click', updateRootCart);
  });
})();
