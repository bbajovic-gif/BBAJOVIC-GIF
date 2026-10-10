(function(){
 const message=document.getElementById('video-promotion-message');if(!message)return;
 const records=Array.isArray(window.VIDEO_RECORDS)?window.VIDEO_RECORDS:[];
 const count=records.filter(r=>r.can_buy===true&&r.on_promotion===true).length;
 if(count){message.replaceChildren(document.createTextNode(count+' promotional video'+(count===1?' is':'s are')+' available. '));const link=document.createElement('a');link.className='shop-link';link.href='video-promotions.html';link.textContent='Browse video promotions →';message.append(link);}
})();
