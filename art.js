/* Original, code-drawn interpretive artwork. No historical reconstruction is claimed. */
window.drawChu=function(canvas,options={}){
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const state={scene:options.scene||0,symbol:options.symbol||'dragon',view:'art'};
 const design={accent:options.accent||'#95442f',detail:0.65};
 const phase=(options.progress||0)*2.1;
 const isolated=options.layout==='symbol';
 const color=v=>!options.dark?v:({'#42382a':'#c9b38a','#4a3a2a':'#bc9e72','#3c3225':'#b69b72','#342e25':'#d9c79f','#95442f':'#c99372','#87402e':'#d2ab83','#9d8358':'#ad966e','#d4be91':'#2d382e','#9c4931':'#c08b67'}[v]||v);
function path(d,fill,stroke,width=1){let p=new Path2D(d);if(fill){ctx.fillStyle=color(fill);ctx.fill(p);}if(stroke){ctx.strokeStyle=color(stroke);ctx.lineWidth=width;ctx.stroke(p);}}
function line(d,color,width=1){path(d,null,color,width);}
function cloud(x,y,s,alpha,offset=0){ctx.save();ctx.translate(x+offset,y);ctx.scale(s,s);ctx.globalAlpha=alpha;for(let j=0;j<5;j++){ctx.save();ctx.translate(j*7,-j*8);line('M-130 28 C-80 52 -20 28 0 0 C18 -29 48 -29 60 -13 C74 5 52 25 36 15 C23 7 29 -8 40 -4 M-40 26 C24 58 102 35 140 5 C171 -20 212 -20 233 -5',design.accent,.8);ctx.restore();}ctx.restore();}
function draw(){
 const box=canvas.getBoundingClientRect();if(!box.width||!box.height)return;
 const dpr=Math.min(window.devicePixelRatio||1,2);
 const pw=Math.round(box.width*dpr),ph=Math.round(box.height*dpr);
 if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph;}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,box.width,box.height);
 const red=design.accent,ink='#342e25',gold='#9d8358';
 if(options.background){ctx.fillStyle=options.background;ctx.fillRect(0,0,box.width,box.height);}
 let target={x:370,y:57,w:620,h:470};
 if(options.layout==='symbol'){
   target=state.symbol==='dragon'?{x:385,y:185,w:580,h:320}:state.symbol==='person'?{x:565,y:150,w:190,h:220}:state.symbol==='canopy'?{x:590,y:80,w:220,h:275}:{x:500,y:260,w:415,h:275};
 }
 let area={x:0,y:0,w:box.width,h:box.height};
 if(options.layout==='experience'){
   area=box.width<650?{x:0,y:135,w:box.width,h:box.height-145}:{x:box.width*.30,y:0,w:box.width*.69,h:box.height};
 }
 const scale=Math.min(area.w/target.w,area.h/target.h)*.93;
 const ox=area.x+(area.w-target.w*scale)/2-target.x*scale;
 const oy=area.y+(area.h-target.h*scale)/2-target.y*scale;
 ctx.setTransform(dpr*scale,0,0,dpr*scale,dpr*ox,dpr*oy);
 ctx.save();
 const rise=state.scene===1?-15:state.scene===2?7:0;ctx.translate(0,rise);
 if(!isolated){ctx.save();ctx.globalAlpha=.25;ctx.strokeStyle=gold;ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(718,245,200,198,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(718,245,211,209,0,0,Math.PI*2);ctx.stroke();for(let i=0;i<44;i++){let a=i*Math.PI/22;ctx.beginPath();ctx.moveTo(718+202*Math.cos(a),245+200*Math.sin(a));ctx.lineTo(718+208*Math.cos(a),245+206*Math.sin(a));ctx.stroke();}ctx.restore();
 cloud(556,175,.9,.20,phase*15);cloud(820,473,1.1,.23,-phase*22);cloud(534,502,.9,.16,phase*18);cloud(900,80,.6,.12,-phase*5);
 }
 ctx.save();ctx.translate(Math.sin(phase)*5,-Math.sin(phase*.7)*7);
 // Long, ribbon-like body and upturned neck of the imagined dragon.
 if(!isolated||state.symbol==='dragon'){
 const body='M450 410 C493 452 581 445 622 411 C663 377 654 323 706 311 C744 300 780 326 808 310 C838 294 826 252 852 223 C871 204 895 211 904 231 L916 238 L896 245 C893 257 878 260 867 252 C849 270 862 310 838 334 C806 366 766 337 729 346 C690 355 685 416 642 448 C589 489 498 474 452 432 C436 417 416 415 402 426 C406 406 427 397 450 410 Z';
 path(body,state.symbol==='dragon'&&options.highlight?'#87402e':'#42382a',state.symbol==='dragon'?red:ink,1.3);
 const belly='M414 419 C458 405 477 469 560 462 C641 466 663 420 682 378 C700 334 718 323 746 328 C791 342 824 348 841 321 C861 294 847 261 869 242';
 line(belly,'#d4be91',2.2);line('M438 416 C478 440 535 454 579 442 C635 427 649 370 677 335 C714 293 753 325 790 319',gold,1.6);
 path('M851 224 C848 211 834 205 832 192 C846 200 853 204 862 205 L855 188 C870 198 874 206 875 216 C883 204 894 200 907 201 L892 216 L904 222','#42382a',red,1.1);
 path('M900 229 Q915 223 926 229 L915 234 L931 238 L907 244','#42382a',red,1);
 line('M905 241 C932 244 937 263 955 253 M902 244 C930 251 923 277 950 270',red,1.1);
 ctx.fillStyle='#d4be91';ctx.beginPath();ctx.ellipse(889,226,3.2,2.2,-.2,0,7);ctx.fill();ctx.fillStyle=ink;ctx.beginPath();ctx.arc(890,226,1.3,0,7);ctx.fill();
 path('M702 353 C721 374 727 391 717 413 L707 420 L719 422 L730 413 L731 393 L742 402 L752 401 L739 392 L725 361',null,red,2);
 path('M620 435 L635 461 L626 481 L616 487 L630 489 L642 475 L645 460 L657 466 L666 462 L650 455 L641 435',null,red,2);
 // Fine scale strokes maintain the graphic rather than volumetric character.
 ctx.save();ctx.globalAlpha=design.detail;for(let i=0;i<55;i++){let t=i/54,x=459+365*t,y=427-87*t+28*Math.sin(t*7);line(`M${x} ${y} q4 -10 10 -5`,gold,.7);}ctx.restore();
 }
 // Figure, robe, belt and extended sleeve.
 if(!isolated||state.symbol==='person'){
 ctx.save();if(state.symbol==='person'){ctx.shadowBlur=12;ctx.shadowColor='#b77d4c66';}
 path('M647 254 L661 254 C668 274 671 298 681 321 L689 331 L626 330 C640 308 641 283 647 254 Z','#4a3a2a',red,1.3);
 path('M651 259 C632 267 613 274 601 268 L598 274 C620 289 640 286 654 278 L678 294 L689 287 L667 267 Z','#4a3a2a',red,1);
 line('M649 262 L659 292 L654 325 M657 276 L671 321 M640 294 L633 326 M662 284 C669 294 676 304 681 319',gold,1.1);
 line('M641 288 L670 287',red,4);
 path('M648 244 L649 255 L661 257 L662 246','#c2a57b',ink,1.3);
 path('M644 221 C643 210 650 202 660 206 L671 216 L671 224 L680 230 L673 234 L673 243 L662 248 L649 239 Z','#be9d72',ink,1.3);
 path('M643 223 C637 209 639 198 651 193 L665 197 L671 211 L659 211 L651 218 L650 231 Z','#3c3225',ink,1.2);
 path('M648 195 L639 183 L659 180 L666 197','#3c3225',red,1);
 line('M665 220 L670 221 M668 233 L673 234',ink,1);
 line('M650 327 L646 340 L663 340 M669 328 L673 339 L687 340',ink,3);
 ctx.restore();
 }
 // Canopy, central pole, tassels and floating silk ribbon.
 if(!isolated||state.symbol==='canopy'){
 const cancol=state.symbol==='canopy'?red:gold;
 line('M699 156 L699 332',ink,2);
 path('M625 157 Q696 128 772 158 Q705 149 625 157 Z','#9c4931',ink,1);
 path('M625 157 Q643 164 654 157 Q675 167 694 157 Q714 168 734 158 Q753 167 772 158',null,cancol,1.2);
 line('M699 134 L699 124',ink,1.8);
 for(let i=0;i<7;i++){let x=638+i*20;line(`M${x} 160 q${Math.sin(i+phase)*6} 15 ${Math.sin(i+phase)*8} 23`,cancol,.8);}
 }
 if(!isolated){
 line('M665 292 C729 278 736 222 776 231 C808 239 804 278 846 265',red,2.1);
 line('M662 299 C734 293 741 233 774 240 C797 244 805 286 850 271',gold,1);
 // A small fish and minimal waves below the journey.
 path('M757 461 Q790 442 812 454 L826 445 L822 462 L834 474 L814 468 Q784 480 757 461 Z',null,ink,1.1);
 line('M767 461 Q790 452 809 461 M783 457 L791 450 M779 466 L790 473',red,.8);
 ctx.fillStyle=ink;ctx.beginPath();ctx.arc(765,460,1.4,0,7);ctx.fill();
 }
 ctx.restore();
 if(state.symbol==='cloud'){cloud(705,400,.8,.62,phase*20);cloud(720,330,.7,.4,-phase*8);}
 if(state.scene===2&&!isolated){ctx.strokeStyle='#8d775277';ctx.lineWidth=1;ctx.strokeRect(390,87,548,414);ctx.strokeRect(396,93,536,402);}
 ctx.restore();
}

 draw();
};
