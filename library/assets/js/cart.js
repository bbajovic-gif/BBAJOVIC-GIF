window.BBayaCart={
  key:'bbaya-cart-v1',
  get(){try{return JSON.parse(localStorage.getItem(this.key)||'[]')}catch(e){return[]}},
  save(items){localStorage.setItem(this.key,JSON.stringify(items));this.updateCount();this.render()},
  add(record){const items=this.get();if(!items.some(x=>x.slug===record.slug))items.push(record);this.save(items)},
  remove(slug){this.save(this.get().filter(x=>x.slug!==slug))},
  updateCount(){document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=this.get().length)},
  money(v){return v==null?'—':'CA$'+Number(v).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})},
  imageUrl(record){
    const inLibrary=location.pathname.replace(/\\/g,'/').includes('/library/');
    const slug=String(record?.slug||'').trim();

    // Published covers now use one stable filename per record. Building the
    // path from the slug also repairs older cart entries that still contain
    // obsolete numbered cover filenames from an earlier publication.
    if(slug){
      const stable='assets/covers/'+slug+'.jpg';
      return inLibrary?stable:'library/'+stable;
    }

    const src=String(record?.primary_image||'');
    if(!src||/^(?:https?:|data:|\/)/i.test(src))return src;
    return inLibrary?src:(src.startsWith('assets/')?'library/'+src:src);
  },
  escape(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))},
  render(){
    const root=document.querySelector('#cart-items');if(!root)return;
    const items=this.get();
    root.innerHTML=items.length?items.map(r=>`<article class="cart-line"><img src="${this.escape(this.imageUrl(r))}" alt=""><div class="cart-line-copy"><strong>${this.escape(r.artist)}</strong><span>${this.escape(r.title)}</span></div><strong>${this.money(r.asking_price)}</strong><button type="button" data-remove="${this.escape(r.slug)}">Remove</button></article>`).join(''):'<div class="cart-empty"><h2>Your cart is empty</h2><p>Browse the Library and add the records you are interested in.</p><a href="library/index.html">Browse the Library →</a></div>';
    const total=items.reduce((sum,r)=>sum+Number(r.asking_price||0),0);
    const subtotal=document.querySelector('#cart-subtotal');if(subtotal)subtotal.textContent=this.money(total);
    document.querySelectorAll('[data-cart-has-items]').forEach(el=>el.hidden=!items.length);
  }
};
document.addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(remove)window.BBayaCart.remove(remove.dataset.remove);const add=e.target.closest('[data-add-cart]');if(add&&window.BBAYA_RECORD)window.BBayaCart.add(window.BBAYA_RECORD)});
document.addEventListener('DOMContentLoaded',()=>{window.BBayaCart.updateCount();window.BBayaCart.render()});

// MOD6 COPY CART ADAPTER START
// Use the selected physical copy's actual image, including own photos and placeholders.
window.BBayaCart.imageUrl=function(record){
    const source=String(record?.primary_image||record?.images?.[0]||'');
    if(!source||/^(?:https?:|data:|\/)/i.test(source))return source;
    const path=String(location.pathname);
    if(path.includes('/library/records/'))return '../'+source;
    return path.includes('/library/')?source:'library/'+source;
};
const bbayaCopyAdd=window.BBayaCart.add.bind(window.BBayaCart);
window.BBayaCart.add=function(record){if(record&&record.can_buy)bbayaCopyAdd(record)};
// MOD6 COPY CART ADAPTER END
/* Refresh saved selections from current catalog prices when opening the cart. */
(()=>{
  const src=document.currentScript?.src;
  if(!src||!window.BBayaCart||!window.BBayaCart.get().length)return;
  Promise.all(['canada','serbia'].map(name=>fetch(new URL('../../'+name+'.json',src),{cache:'no-store'}).then(r=>r.ok?r.json():{records:[]}).catch(()=>({records:[]}))))
    .then(catalogs=>{
      const current=new Map(catalogs.flatMap(c=>c.records||[]).map(r=>[r.copy_id,r]));
      const items=window.BBayaCart.get().map(old=>{
        const r=current.get(old.copy_id);
        return r&&r.can_buy?{...old,asking_price:r.asking_price,regular_price:r.regular_price,promotion_price:r.promotion_price,on_promotion:r.on_promotion}:old;
      });
      window.BBayaCart.save(items);
    });
})();
