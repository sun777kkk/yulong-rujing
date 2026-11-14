(()=>{'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const scenes=[{id:'t-banner',src:'t-banner-user.png',cn:'马王堆一号汉墓 T 形帛画',note:'西汉 / 三界图像的比较线索'},{id:'dragon',src:'dragon.jpg',cn:'人物御龙帛画',note:'战国 / 衣冠与形象的观看线索'},{id:'phoenix',src:'phoenix.jpg',cn:'人物龙凤帛画',note:'战国 / 人与龙凤的图像关系'}];
 let sceneIndex=0;
 function changeScene(i){sceneIndex=(i+3)%3;const s=scenes[sceneIndex];$('#exhibit-art').src='assets/originals/'+s.src;$('#exhibit-art').alt=s.cn+'原作';$('#hero-caption-title').textContent=s.cn;$('#hero-caption-note').textContent=s.note;$('#hero-position').textContent='0'+(sceneIndex+1)+' / 03';$('.editorial-hero').dataset.scene=s.id;$('#hero-artwork-open').setAttribute('aria-label','查看'+s.cn);$$('[data-hero-scene]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.heroScene===s.id));}
 $$('[data-hero-scene]').forEach(b=>b.addEventListener('click',()=>changeScene(scenes.findIndex(s=>s.id===b.dataset.heroScene))));
 $('#hero-prev').addEventListener('click',()=>changeScene(sceneIndex-1));$('#hero-next').addEventListener('click',()=>changeScene(sceneIndex+1));
 $('#hero-artwork-open').addEventListener('click',()=>$('.original-picture[data-original="'+scenes[sceneIndex].id+'"]').click());
 $$('[data-enter-realm]').forEach(a=>a.addEventListener('click',()=>{const tab=$('[data-realm="'+a.dataset.enterRealm+'"]');if(tab)tab.click();}));
 const header=$('.museum-header');let ticking=false;
 function update(){header.classList.toggle('is-scrolled',window.scrollY>80);const max=document.documentElement.scrollHeight-innerHeight;header.style.setProperty('--reading',max>0?Math.min(100,window.scrollY/max*100)+'%':'0%');ticking=false;}
 window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});update();
 $('.museum-search').addEventListener('click',()=>{$('#atlas').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#symbol-search').focus({preventScroll:true});});
 const keeper=$('.curator-note');keeper.addEventListener('toggle',()=>{keeper.querySelector('summary span').textContent=keeper.open?'−':'＋';});
})();
