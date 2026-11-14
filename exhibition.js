(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 // Questions open an existing, evidence-based chapter rather than an empty destination.
 $$('[data-life-route]').forEach(a=>a.addEventListener('click',()=>{$('[data-life="'+a.dataset.lifeRoute+'"]').click();}));
 // A small set of collection objects invites exploration without an endless first view.
 const grid=$('.symbol-grid'),more=$('#gallery-more'),hint=$('#gallery-shown');let expanded=false;
 function showGallery(){const items=[...grid.children];const full=$('[data-filter="all"]').getAttribute('aria-pressed')==='true'&&!$('#symbol-search').value.trim();items.forEach((x,i)=>x.hidden=full&&!expanded&&i>=6);more.hidden=!full||items.length<=6;hint.hidden=!full||items.length===0;more.setAttribute('aria-expanded',String(expanded));more.innerHTML=expanded?'收起，保留精选六组 <span>−</span>':'展开全部十三组 <span>＋</span>';hint.textContent=expanded?'已展开全部十三组图形。':'先读六组图形，再展开更多线索。';}
 new MutationObserver(showGallery).observe(grid,{childList:true});more.addEventListener('click',()=>{expanded=!expanded;showGallery();if(!expanded)$('#atlas').scrollIntoView({behavior:'instant'});});showGallery();
 // A single highlighted original follows pointer or keyboard focus.
 const originals=$$('.original-item');function feature(item){originals.forEach(x=>x.classList.toggle('is-featured',x===item));}
 originals.forEach(x=>{x.addEventListener('pointerenter',()=>feature(x));x.addEventListener('focusin',()=>feature(x));});if(originals[0])feature(originals[0]);
 // Archive remains fully accessible, with an explicit secondary place in the story.
 const archive=$('#design-annex');archive.addEventListener('toggle',()=>{archive.querySelector('.annex-action').innerHTML=archive.open?'收起设计档案 <i>−</i>':'展开设计档案 <i>＋</i>';});
 window.addEventListener('hashchange',()=>{if(['#process','#archive'].includes(location.hash)){archive.open=true;document.querySelector(location.hash)?.scrollIntoView({behavior:'instant'});}});
 if(['#process','#archive'].includes(location.hash))archive.open=true;
})();
