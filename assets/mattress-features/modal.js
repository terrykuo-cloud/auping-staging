/* Only the three mattress feature buttons. Media isolation protects the existing
 * snapshot video owner without changing shared scripts or other routes. */
(()=>{'use strict';
 const route=location.pathname.replace(/\/$/,'');
 if(route!=='/auping-staging/mattresses'&&route!=='/mattresses')return;
 const section=document.getElementById('997b15b1-f2e2-4324-a2de-81c400c23ed8');
 const dialog=document.getElementById('mattress-feature-dialog');
 if(!section||!dialog||section.dataset.mattressModalOwner)return;
 section.dataset.mattressModalOwner='v1';
 const content=dialog.querySelector('[data-mf-content]'),close=dialog.querySelector('.mf-close'),error=dialog.querySelector('.mf-error');
 let trigger,video,oldOverflow;
 function cleanup(){
   if(video){video.pause();video.removeAttribute('src');video.load();video=null;}
   content.replaceChildren();error.hidden=true;
   document.documentElement.style.overflow=oldOverflow;
   trigger?.focus({preventScroll:true});
 }
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',cleanup);
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 section.querySelectorAll('[data-mattress-feature]').forEach(button=>button.addEventListener('click',()=>{
   if(dialog.open)return;
   const template=document.getElementById('mattress-feature-'+button.dataset.mattressFeature);
   if(!template)return;
   trigger=button;content.replaceChildren(template.content.cloneNode(true));
   const host=content.querySelector('[data-mf-media]'),mediaTemplate=host.querySelector('template');
   const shadow=host.attachShadow({mode:'open'});shadow.append(mediaTemplate.content.cloneNode(true));
   video=shadow.querySelector('video');const play=shadow.querySelector('button');
   video.addEventListener('error',()=>{error.hidden=false;});
   video.addEventListener('playing',()=>{play.hidden=true;error.hidden=true;});
   play.addEventListener('click',()=>{const active=video;active.play().then(()=>{play.hidden=true;active.focus();}).catch(()=>{error.hidden=false;});});
   oldOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
   dialog.showModal();dialog.scrollTop=0;close.focus({preventScroll:true});
 }));
})();
