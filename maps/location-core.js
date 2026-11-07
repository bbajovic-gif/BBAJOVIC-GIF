(function(root){
 function assess(position,now=Date.now()){
  const c=position?.coords||{},lat=c.latitude,lon=c.longitude,accuracy=c.accuracy;
  if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)throw Error('The browser returned an invalid position. Enter your address or choose a point on the map.');
  if(!Number.isFinite(accuracy)||accuracy<=0)return {lat,lon,accuracy:null,usable:false,reason:'The browser did not report location accuracy. Enter your address or choose a point on the map.'};
  if(!Number.isFinite(position.timestamp)||Math.abs(now-position.timestamp)>120000)return {lat,lon,accuracy,usable:false,reason:'This position is out of date. Try again, enter your address, or choose a point on the map.'};
  if(accuracy>1000)return {lat,lon,accuracy,usable:false,reason:'This browser location is too approximate to use reliably. Enter your address or choose the correct point on the map.'};
  return {lat,lon,accuracy,usable:true,reason:'Check the pin before using it. Browser location can be wrong even when it reports good accuracy.'};
 }
 const api={assess};if(typeof module==='object'&&module.exports)module.exports=api;else root.LocationCore=api;
})(typeof window==='undefined'?globalThis:window);
