'use strict';
let savedHome='';
try{const value=localStorage.getItem('thrift-atlas-home-v1');if(value&&value.length<=200)savedHome=value}catch{}
function showHome(){const hasHome=!!savedHome;$('#homeDisplay').textContent=savedHome||'Save your starting address on this device.';$('#useHome').hidden=!hasHome;$('#editHome').textContent=hasHome?'Edit':'Set home';$('#homeAddress').value=savedHome;$('#homeForm').hidden=true}
function useSavedHome(open=true){if(!savedHome)return;invalidateTrip();delete pinnedAddresses.tripStart;$('#tripStart').value=savedHome;$('#tripStatus').textContent='Home is set as your starting address. Check the matched address before routing.';if(open)openTool('tripPlanner')}
$('#editHome').addEventListener('click',()=>{$('#homeForm').hidden=!$('#homeForm').hidden;if(!$('#homeForm').hidden)$('#homeAddress').focus()});
$('#useHome').addEventListener('click',()=>useSavedHome());
$('#homeForm').addEventListener('submit',e=>{e.preventDefault();const value=$('#homeAddress').value.trim();if(!value){$('#homeStatus').textContent='Enter the street number, street name and city.';return}try{localStorage.setItem('thrift-atlas-home-v1',value)}catch{$('#homeStatus').textContent='This browser could not save the address. You can still enter it in the trip planner.';return}savedHome=value;showHome();$('#homeStatus').textContent='Home saved on this device.';useSavedHome()});
$('#clearHome').addEventListener('click',()=>{try{localStorage.removeItem('thrift-atlas-home-v1')}catch{$('#homeStatus').textContent='Could not clear this browser’s saved address. Please check browser storage settings.';return}if($('#tripStart').value===savedHome){invalidateTrip();$('#tripStart').value='';delete pinnedAddresses.tripStart}savedHome='';showHome();$('#homeStatus').textContent='Home address removed from this browser.'});
showHome();if(savedHome&&!$('#tripStart').value)$('#tripStart').value=savedHome;
