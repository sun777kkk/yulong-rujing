(()=>{'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const scenes=[{id:'heaven',cn:'第一境 · 天上',note:'日月相望，飞龙游天。'},{id:'earth',cn:'第二境 · 人间',note:'华盖舒展，礼序相接。'},{id:'underworld',cn:'第三境 · 地下',note:'万象有托，双鱼成环。'}];
 let sceneIndex=0;
 function changeScene(i){sceneIndex=(i+3)%3;const s=scenes[sceneIndex];$('#exhibit-art').src='assets/silk/'+s.id+'-01.svg';$('#exhibit-art').alt=s.cn+'整体图形的古金色展陈演绎';$('#hero-caption-title').textContent=s.cn;$('#hero-caption-note').textContent=s.note;$('#hero-position').textContent='0'+(sceneIndex+1)+' / 03';$('.museum-hero').dataset.scene=s.id;$$('[data-hero-scene]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.heroScene===s.id));}
 $$('[data-hero-scene]').forEach(b=>b.addEventListener('click',()=>changeScene(scenes.findIndex(s=>s.id===b.dataset.heroScene))));
 $('#hero-prev').addEventListener('click',()=>changeScene(sceneIndex-1));$('#hero-next').addEventListener('click',()=>changeScene(sceneIndex+1));
 function enterRealm(id){const tab=$('[data-realm="'+id+'"]');if(tab)tab.click();}
 $('#hero-enter').addEventListener('click',()=>enterRealm(scenes[sceneIndex].id));
 $$('[data-enter-realm]').forEach(a=>a.addEventListener('click',()=>enterRealm(a.dataset.enterRealm)));
 const header=$('.museum-header');let ticking=false;
 function updateHeader(){header.classList.toggle('is-scrolled',window.scrollY>80);ticking=false;}
 window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateHeader);ticking=true;}},{passive:true});updateHeader();
 $('.museum-search').addEventListener('click',()=>{$('#atlas').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#symbol-search').focus({preventScroll:true});});
 const keeper=$('.curator-note');keeper.addEventListener('toggle',()=>{keeper.querySelector('summary span').textContent=keeper.open?'−':'＋';});
})();
