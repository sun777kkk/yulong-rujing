'use strict';
(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const symbols = {
    dragon: { title:'游龙', en:'DRAGON / 流动的线', description:'绵延起伏的躯体，将人物与行进方向联系起来。曲线的舒展与回转，是整个动态场景的视觉骨架。', shape:'连续曲线 / 伸展形态', motion:'路径行进 / 节奏起伏', detail:'游龙 · 以连续曲线引导行进方向。' },
    person: { title:'人物', en:'FIGURE / 画中的人', description:'侧面的姿态和简练的轮廓，让人物成为画面的观看中心。设计保留平面造型，用衣袖、绶带的局部运动表现行旅。', shape:'侧面轮廓 / 衣袍线条', motion:'局部摆动 / 角色引导', detail:'人物 · 通过衣袖与绶带的轻动，感知行进。' },
    canopy: { title:'华盖', en:'CANOPY / 上方的秩序', description:'华盖与竖直的支杆，在游龙上方建立稳定的空间关系。设计以克制的起伏、下垂的细线，回应画面中动与静的平衡。', shape:'弧线盖面 / 垂直结构', motion:'轻缓起伏 / 细线摆动', detail:'华盖 · 在流动的画面中，建立稳定的上方空间。' },
    cloud: { title:'云气', en:'CLOUD / 留白间的流动', description:'本设计以云气作为场景之间的连接。线条的显隐与疏密变化，让空白具有方向，也让观看从一个片段过渡到另一个片段。', shape:'回旋曲线 / 疏密层次', motion:'流转显隐 / 场景衔接', detail:'云气 · 用流动与显隐，连接行旅中的不同片段。' }
  };
  const chapters = [
    { title:'观画识符', index:'壹 / 观其形', description:'点选下方符号，寻找画面中的视觉联系。' },
    { title:'御龙而行', index:'贰 / 循其势', description:'拖动行旅进程，让游龙、云气与声音一起展开。' },
    { title:'归于帛上', index:'叁 / 会其意', description:'从流动中回到整体，重新观看画中的一瞬。' }
  ];
  const dialog = $('#experience');
  const progress = $('#journey-progress');
  const player = { scene:0, symbol:'dragon', progress:0, playing:false, sound:false };
  let selectedSymbol = 'dragon', frame = 0, lastTone = 0, previousFocus = null;
  let audio = null, master = null;
  const notes = new Set();
  let menuOpen = false;

  function drawStatic() {
    window.drawChu($('#hero-art'), { progress:.24 });
    $$('[data-chapter-art]').forEach(c => window.drawChu(c, { scene:Number(c.dataset.chapterArt), progress:Number(c.dataset.chapterArt)*.32, symbol:c.dataset.chapterArt==='1'?'cloud':'dragon', dark:c.dataset.chapterArt==='1' }));
    window.drawChu($('#symbol-art'), { layout:'symbol', symbol:selectedSymbol, highlight:true, progress:.25 });
  }
  function drawExperience() {
    if (!dialog.open) return;
    window.drawChu($('#experience-art'), { layout:'experience', scene:player.scene, symbol:player.symbol, progress:player.progress/100, highlight:true });
  }
  function selectSymbol(key, focus = false) {
    if (!symbols[key]) return;
    selectedSymbol = key;
    const s = symbols[key];
    $$('[data-symbol]').forEach(b => { const active=b.dataset.symbol===key; b.setAttribute('aria-selected',String(active)); b.tabIndex=active?0:-1; if(active&&focus)b.focus(); });
    $('#symbol-panel').setAttribute('aria-labelledby',`tab-${key}`);
    $('#symbol-title').textContent=s.title;
    $('#symbol-en').textContent=s.en;
    $('#symbol-description').textContent=s.description;
    $('#symbol-shape').textContent=s.shape;
    $('#symbol-motion').textContent=s.motion;
    $('#symbol-art').setAttribute('aria-label',`${s.title}的当代设计示意`);
    window.drawChu($('#symbol-art'),{layout:'symbol',symbol:key,highlight:true,progress:.25});
  }
  $$('[data-symbol]').forEach(b => b.addEventListener('click',()=>selectSymbol(b.dataset.symbol)));
  $('.atlas-menu').addEventListener('keydown',e=>{
    const keys=Object.keys(symbols),i=keys.indexOf(selectedSymbol);let next;
    if(e.key==='ArrowDown'||e.key==='ArrowRight') next=(i+1)%keys.length;
    if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(i+keys.length-1)%keys.length;
    if(e.key==='Home')next=0;if(e.key==='End')next=keys.length-1;
    if(next!==undefined){e.preventDefault();selectSymbol(keys[next],true);}
  });

  function setMenu(open) {
    menuOpen=open;
    $('#main-nav').classList.toggle('open',open);
    $('.menu-toggle').setAttribute('aria-expanded',String(open));
    $('.menu-toggle').setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');
  }
  $('.menu-toggle').addEventListener('click',()=>setMenu(!menuOpen));
  $$('#main-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);$('.menu-toggle').focus();}});
  document.addEventListener('click',e=>{if(menuOpen&&!e.target.closest('.site-header'))setMenu(false);});
  const sectionObserver = new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
    if(!visible.length)return;
    const id=visible[0].target.id;
    $$('#main-nav>a').forEach(a=>{let active=a.hash===`#${id}`;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  },{rootMargin:'-15% 0px -45% 0px',threshold:[0,.15,.3,.6]});
  $$('.section-anchor').forEach(s=>sectionObserver.observe(s));

  function updatePlayer() {
    const c=chapters[player.scene];
    $('#experience-title').textContent=c.title;
    $('#experience-index').textContent=c.index;
    $('#experience-description').textContent=c.description;
    $('#experience-art').setAttribute('aria-label',`${c.title}篇章，当前探索符号：${symbols[player.symbol].title}`);
    $$('[data-experience-scene]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.experienceScene)===player.scene)));
    $$('[data-experience-symbol]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.experienceSymbol===player.symbol)));
    $('#experience-detail').textContent=symbols[player.symbol].detail;
    updateProgress();
  }
  function updateProgress() {
    const rounded=Math.round(player.progress);
    progress.value=String(rounded);
    $('#journey-value').value=`${rounded}%`;
    progress.setAttribute('aria-valuetext',`行旅进程${rounded}%`);
    drawExperience();
  }
  function stopPlaying() {
    player.playing=false;cancelAnimationFrame(frame);
    $('#play-journey').setAttribute('aria-pressed','false');
    $('#play-journey').innerHTML='播放行旅 <span aria-hidden="true">▷</span>';
  }
  function play() {
    if(player.playing){stopPlaying();return;}
    if(player.progress>=100)player.progress=0;
    if(reducedMotion.matches){player.progress=Math.min(100,player.progress+25);updateProgress();tone();return;}
    player.playing=true;
    $('#play-journey').setAttribute('aria-pressed','true');
    $('#play-journey').innerHTML='暂停行旅 <span aria-hidden="true">Ⅱ</span>';
    let previous=performance.now();
    function step(now){
      if(!player.playing||!dialog.open)return;
      player.progress=Math.min(100,player.progress+Math.min(now-previous,100)*.008);previous=now;
      updateProgress();
      if(now-lastTone>1900){tone();lastTone=now;}
      if(player.progress<100)frame=requestAnimationFrame(step);
      else{stopPlaying();$('#experience-detail').textContent='本篇行旅已完成。可选择其他篇章，或再次播放。';}
    }
    tone();frame=requestAnimationFrame(step);
  }
  function openExperience(scene,symbol='dragon') {
    previousFocus=document.activeElement;
    stopPlaying();setMenu(false);player.scene=scene;player.symbol=symbol;player.progress=0;
    if(!dialog.open)dialog.showModal();
    document.body.style.overflow='hidden';
    updatePlayer();
    $('#close-experience').focus();
  }
  function closeExperience(){dialog.close();}
  $$('[data-open]').forEach(b=>b.addEventListener('click',()=>openExperience(Number(b.dataset.open))));
  $('#explore-symbol').addEventListener('click',()=>openExperience(0,selectedSymbol));
  $('#close-experience').addEventListener('click',closeExperience);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeExperience();}});
  dialog.addEventListener('close',()=>{
    stopPlaying();document.body.style.overflow='';player.sound=false;updateSoundButton();
    notes.forEach(o=>{try{o.stop();}catch{}});notes.clear();
    if(audio&&audio.state==='running')audio.suspend().catch(()=>{});
    previousFocus?.focus();
  });
  $$('[data-experience-scene]').forEach(b=>b.addEventListener('click',()=>{stopPlaying();player.scene=Number(b.dataset.experienceScene);player.progress=0;updatePlayer();tone();}));
  $$('[data-experience-symbol]').forEach(b=>b.addEventListener('click',()=>{player.symbol=b.dataset.experienceSymbol;updatePlayer();tone();}));
  progress.addEventListener('input',()=>{stopPlaying();player.progress=Number(progress.value);updateProgress();if(performance.now()-lastTone>350){tone();lastTone=performance.now();}});
  $('#play-journey').addEventListener('click',play);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPlaying();player.sound=false;updateSoundButton();if(audio&&audio.state==='running')audio.suspend().catch(()=>{});}});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)stopPlaying();});

  function updateSoundButton(){
    $('#audio-toggle').textContent=player.sound?'声景：开启':'声景：关闭';
    $('#audio-toggle').setAttribute('aria-pressed',String(player.sound));
    $('#audio-note').textContent=player.sound?'合成声景示意 · 非古乐复原':'声音由体验操作触发';
  }
  async function toggleSound(){
    try{
      if(!audio){const A=window.AudioContext||window.webkitAudioContext;if(!A)throw Error('unsupported');audio=new A();master=audio.createGain();master.gain.value=.55;master.connect(audio.destination);}
      player.sound=!player.sound;
      if(player.sound){await audio.resume();tone();}else{await audio.suspend();}
      updateSoundButton();
    }catch{player.sound=false;updateSoundButton();$('#audio-note').textContent='当前浏览器不支持声音播放';}
  }
  function tone(){
    if(!player.sound||!audio||audio.state!=='running')return;
    const shift={dragon:0,person:2,canopy:4,cloud:7}[player.symbol];
    const base=[146.83,196,164.81][player.scene]*Math.pow(2,shift/12);
    [1,1.5,2].forEach((ratio,i)=>{
      const o=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
      o.type='sine';o.frequency.value=base*ratio;
      gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.07/(i+1),now+.02+i*.04);gain.gain.exponentialRampToValueAtTime(.0001,now+1.6+i*.2);
      o.connect(gain);gain.connect(master);notes.add(o);o.onended=()=>{notes.delete(o);o.disconnect();gain.disconnect();};o.start(now);o.stop(now+2.4);
    });
  }
  $('#audio-toggle').addEventListener('click',toggleSound);
  let resizeFrame=0;
  new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{drawStatic();drawExperience();});}).observe(document.body);
  window.addEventListener('resize',()=>{if(innerWidth>760&&menuOpen)setMenu(false);});
  drawStatic();
})();
