(function(root){
 'use strict';
 function distanceKm(a,b){const rad=Math.PI/180,dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad;const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 6371.0088*2*Math.asin(Math.sqrt(Math.min(1,Math.max(0,h))))}
 function permutations(xs){if(!xs.length)return [[]];return xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>i!==j)).map(p=>[x,...p]))}
 function cost(order,matrix){let total=0;for(let i=1;i<order.length;i++){const d=matrix[order[i-1]]?.[order[i]];if(d===null||d===undefined||!Number.isFinite(d)||d<0)return Infinity;total+=d}return total}
 function optimize(matrix,roundTrip){if(matrix.length<2||matrix.length>4)throw Error('Enter one to three stops.');const stops=Array.from({length:matrix.length-1},(_,i)=>i+1);const input=[0,...stops,...(roundTrip?[0]:[])];let best=input,bestCost=cost(input,matrix);for(const p of permutations(stops)){const order=[0,...p,...(roundTrip?[0]:[])],c=cost(order,matrix);if(c<bestCost){best=order;bestCost=c}}if(!Number.isFinite(bestCost))throw Error('No connected driving route was found for these stops.');return {order:best,distance:bestCost,inputDistance:cost(input,matrix),combinations:permutations(stops).length}}
 function mapsURL(points,order){const coord=i=>`${points[i].lat},${points[i].lon}`;const p=new URLSearchParams({api:'1',origin:coord(order[0]),destination:coord(order.at(-1)),travelmode:'driving'});const via=order.slice(1,-1).map(coord);if(via.length)p.set('waypoints',via.join('|'));return 'https://www.google.com/maps/dir/?'+p}
 const api={distanceKm,cost,optimize,mapsURL};if(typeof module==='object'&&module.exports)module.exports=api;else root.TripCore=api;
})(typeof window==='undefined'?globalThis:window);
