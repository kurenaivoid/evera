/* ===== 作品・MV・ストーリー・リンク・自己紹介のデータは js/KURENAIVOID-site-data.js にまとめました ===== */
const {releases:RELEASES,mvs:MVS,stories:STORIES,links:LINKS,people:PEOPLE,world:WORLD}=EVERA_DATA;





const $=id=>document.getElementById(id),NOW=new Date();
const open=r=>!!r.title&&(!r.date||new Date(r.date+'T00:00:00')<=NOW);

/* オープニング */
const intro=$('intro'),body=document.body;let timers=[];
function endIntro(){timers.forEach(clearTimeout);intro.classList.add('out');body.classList.remove('lock');timers.push(setTimeout(()=>{intro.style.display='none'},1000))}
function loadPic(){const u=getComputedStyle(document.documentElement).getPropertyValue('--visual').trim().replace(/^url\(["']?/,'').replace(/["']?\)$/,'');return new Promise(r=>{const im=new Image();im.onload=im.onerror=()=>r();im.src=new URL(u,document.querySelector('link[rel=stylesheet]').href).href;setTimeout(r,2500)})}
function playIntro(){
  intro.style.display='flex';intro.classList.remove('go','flip','out');body.classList.add('lock');void intro.offsetWidth;
  loadPic().then(()=>{if(intro.classList.contains('out'))return;intro.classList.add('go');timers.push(setTimeout(()=>intro.classList.add('flip'),1950));timers.push(setTimeout(()=>{endIntro();try{sessionStorage.setItem('evera-intro','1')}catch(e){}},2600))})
}
$('skip').onclick=()=>{endIntro();try{sessionStorage.setItem('evera-intro','1')}catch(e){}};
let seen=false;try{seen=!!sessionStorage.getItem('evera-intro')}catch(e){}
if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches){intro.style.display='none';body.classList.remove('lock')}else playIntro();
$('replay').onclick=e=>{e.preventDefault();try{sessionStorage.removeItem('evera-intro')}catch(e){}scrollTo(0,0);playIntro()};

/* ナビ・スクロールで出てくる動き・文字のブレ・光 */
$('menu').onclick=()=>$('links-nav').classList.toggle('open');
document.querySelectorAll('#links-nav a').forEach(a=>a.addEventListener('click',()=>$('links-nav').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
const watch=()=>document.querySelectorAll('.rv:not(.in)').forEach(e=>io.observe(e));
const gl=$('gl');const burst=()=>{gl.classList.remove('on');void gl.offsetWidth;gl.classList.add('on')};gl.addEventListener('mouseenter',burst);(function lp(){setTimeout(()=>{burst();lp()},3000+Math.random()*3500)})();
if(matchMedia('(hover:hover)').matches){const c=document.createElement('div');c.id='cur';document.body.appendChild(c);addEventListener('pointermove',e=>{c.style.opacity=1;c.style.transform=`translate(${e.clientX}px,${e.clientY}px)`})}

/* 作品（ジャケット・最新リリース） */
const grid=$('jackets');
RELEASES.forEach(r=>{
  const o=open(r),el=document.createElement('div');el.className='jk rv'+(o?'':' lk');
  let lab='COMING SOON',sub='準備中';const d=r.date?new Date(r.date+'T00:00:00'):null;
  if(!o&&d){lab='COMING SOON<br>'+r.date.replace(/-/g,'.');sub='公開まで あと '+Math.ceil((d-NOW)/864e5)+' 日'}
  el.innerHTML=(o?`<a href="#music" data-track="${r.track}">`:'')+`<div class="jk-card"${o?` style="background-image:url(${r.art})"`:''}><div class="shine"></div>${o?'':`<div class="lbl">${lab}</div>`}</div>`+(o?'</a>':'')+`<div class="jk-info"><b>${o?r.title:r.kind}</b><span>${o?r.kind+'　公開中':sub}</span></div>`;
  const card=el.querySelector('.jk-card');
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const k=o?14:5;
    el.addEventListener('pointermove',e=>{const b=card.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;card.style.transform=`rotateY(${(x-.5)*k}deg) rotateX(${(.5-y)*k}deg) scale(1.03)`;card.style.setProperty('--mx',x*100+'%');card.style.setProperty('--my',y*100+'%')});
    el.addEventListener('pointerleave',()=>{card.style.transform=''})}
  grid.appendChild(el);
});
const latest=RELEASES.filter(open).sort((a,b)=>b.date>a.date?1:-1)[0];
if(latest)$('latest').innerHTML=`<a class="latest" style="margin:0;border:0;padding:0;background:none;backdrop-filter:none" href="#music" data-track="${latest.track}"><img src="${latest.art}" alt=""><div><small>LATEST RELEASE</small><b>${latest.title}</b><span>${latest.kind} ／ LISTEN →</span></div></a>`;else $('latest').remove();

/* MV */
MVS.forEach(m=>{const d=document.createElement('div');d.className='mv rv';
  if(m.youtube)d.innerHTML=`<iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${m.youtube}" title="${m.title}" allowfullscreen></iframe>`;
  else d.innerHTML=`<div><b>${m.title}</b>COMING SOON</div>`;$('mvs').appendChild(d)});
/* ストーリー */
STORIES.forEach((st,i)=>{const no=st.no,t=st.title,s=st.sum;const a=document.createElement('a');a.className='sc rv';a.href='story/index.html#s'+(i+1);a.dataset.open=a.getAttribute('href');a.dataset.kind='story';
  a.style.backgroundImage=`linear-gradient(180deg,rgba(0,0,0,.05) 35%,rgba(0,0,0,.9)),url(${st.thumb})`;
  a.innerHTML=`<div class="cn">${no}</div><h3 class="hv">${t}</h3><p>${s}</p>`;$('stories').appendChild(a)});
/* リンク */
LINKS.forEach(l=>{const a=document.createElement(l.u?'a':'div');a.className='lk2 rv'+(l.u?'':' off');if(l.u){a.href=l.u;a.target='_blank';a.rel='noopener'}a.innerHTML=l.n+`<small>${l.s}</small>`;$('lks').appendChild(a)});
/* プレーヤーは、見える近くまで来てから読み込む */
const pl=$('pl');new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){if(!pl.getAttribute('src'))pl.src=pl.dataset.src;ob.disconnect()}},{rootMargin:'400px'}).observe(pl);

const IMG='assets/images/profile/KURENAIVOID-profile-';


const ageOf=b=>{const d=new Date(b+'T00:00:00'),n=new Date();let a=n.getFullYear()-d.getFullYear();const m=n.getMonth()-d.getMonth();if(m<0||(m===0&&n.getDate()<d.getDate()))a--;return a};
const dToB=b=>{const d=new Date(b+'T00:00:00'),n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate());let x=new Date(n.getFullYear(),d.getMonth(),d.getDate());if(x<t)x=new Date(n.getFullYear()+1,d.getMonth(),d.getDate());return Math.round((x-t)/864e5)};
const pe=$('pfPeople');
PEOPLE.forEach(p=>{
  const bd=dToB(p.birth),dd=bd===0?'今日が誕生日':'次の誕生日まで あと '+bd+' 日';
  const a=document.createElement('article');a.className='pp';
  a.innerHTML=`<div class="pp-img">${p.imgs.map((m,i)=>`<img class="${m[1]?'cut ':''}${i?'':'on'}" src="${IMG+m[0]}" alt="${p.name} ${i+1}" loading="lazy">`).join('')}<button class="nv l" aria-label="前の絵">‹</button><button class="nv r" aria-label="次の絵">›</button><div class="dots">${p.imgs.map((m,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>
  <div class="pp-body"><p class="role">${p.role}</p><h3 class="hv">${p.name}</h3><p class="ja">${p.ja} ／ ${p.ru}</p><p class="tag2">「${p.tag}」</p>
  <dl class="facts"><dt>AGE</dt><dd>${ageOf(p.birth)}歳（${dd}）</dd><dt>BIRTHDAY</dt><dd>${p.birth.replace(/-/g,'.')}</dd><dt>ZODIAC</dt><dd>${p.zodiac}</dd><dt>CHINESE</dt><dd>${p.cz}</dd></dl>
  <button class="btn mb">くわしく</button><div class="more" hidden>${p.more.map(m=>`<h4>${m[0]}</h4><p>${m[1]}</p>`).join('')}</div></div>`;
  const ims=[...a.querySelectorAll('.pp-img img')],ds=[...a.querySelectorAll('.dots i')];let cur=0;
  const go=n=>{cur=(n+ims.length)%ims.length;ims.forEach((e,i)=>e.classList.toggle('on',i===cur));ds.forEach((e,i)=>e.classList.toggle('on',i===cur))};
  a.querySelector('.nv.l').onclick=()=>go(cur-1);a.querySelector('.nv.r').onclick=()=>go(cur+1);ds.forEach((d,i)=>d.onclick=()=>go(i));
  const mb=a.querySelector('.mb'),mo=a.querySelector('.more');mb.onclick=()=>{mo.hidden=!mo.hidden;mb.textContent=mo.hidden?'くわしく':'とじる'};
  pe.appendChild(a);
});
WORLD.forEach(([h,x])=>{const d=document.createElement('div');d.innerHTML=`<h4>${h}</h4>${x}`;$('world').appendChild(d)});
const pfS=$('pfStage'),pfO=$('pfOpen'),pfB=$('pfBack'),vids=[$('pvA'),$('pvB')],calmM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const playIntroOnce=()=>{vids.forEach(v=>{try{v.currentTime=0}catch(e){}});vids.forEach(v=>v.play().catch(()=>{}))};
new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){playIntroOnce();ob.disconnect()}},{threshold:.5}).observe(pfS);
pfO.onclick=()=>{vids.forEach(v=>v.pause());pfS.classList.add('split');setTimeout(()=>{pfS.style.display='none';pe.hidden=false;pfB.hidden=false;$('pfBack').scrollIntoView({block:'center',behavior:'smooth'})},calmM?0:850)};
pfB.onclick=()=>{pe.hidden=true;pfB.hidden=true;pfS.style.display='';void pfS.offsetWidth;pfS.classList.remove('split');playIntroOnce();pfS.scrollIntoView({block:'center',behavior:'smooth'})};
watch();

/* ===== 音を切らさない仕組み：ストーリーとDJは、ページを移らず上に重ねて開きます ===== */
(function(){
  const frame=$('pl'),ov=$('ov'),ovf=$('ovf'),mp=$('mp'),mpP=$('mpP'),KEY='evera-resume';
  let ready=false,queue=[],cur={playing:false,num:'',title:'',pos:0,dur:0},pausedByMe=false,lastSave=0;
  const ensure=()=>{if(!frame.getAttribute('src'))frame.src=frame.dataset.src};
  const send=m=>{
    if(ready&&frame.contentWindow)frame.contentWindow.postMessage(Object.assign({evera:1},m),'*');
    else{queue.push(m);ensure()}
  };
  const fmt=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
  function paint(){
    mpP.textContent=cur.playing?'❚❚':'▶';mpP.setAttribute('aria-label',cur.playing?'一時停止':'再生');
    mp.classList.toggle('on',!!cur.playing);
    if(cur.title){$('mpTi').textContent=cur.title;$('mpTm').textContent=fmt(cur.pos)+' / '+fmt(cur.dur)}
  }
  const pauseMain=()=>{if(cur.playing){send({c:'pause'});pausedByMe=true}};
  const resumeMain=()=>{if(pausedByMe){pausedByMe=false;send({c:'play'})}};
  function openOv(url,kind){ovf.src=url;ov.hidden=false;document.body.classList.add('ovopen');if(kind==='dj')pauseMain()}
  function closeOv(){ov.hidden=true;ovf.src='about:blank';document.body.classList.remove('ovopen');resumeMain()}
  addEventListener('message',e=>{
    const d=e.data;if(!d||!d.evera)return;
    if(e.source===frame.contentWindow){
      if(d.t==='ready'){
        ready=true;lastSave=Date.now()+3000;
        let sv=null;try{sv=JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){}
        const q=queue;queue=[];
        if(sv&&sv.num&&!q.some(m=>m.c==='load'))send({c:'restore',num:sv.num,pos:sv.pos||0});
        q.forEach(send);
      }
      if(d.t==='state'){
        cur=d;paint();
        const now=Date.now();
        if(d.ready&&d.num&&d.pos>1&&now-lastSave>2000){lastSave=now;try{localStorage.setItem(KEY,JSON.stringify({num:d.num,pos:d.pos}))}catch(_){}}
      }
    }else if(ovf.contentWindow&&e.source===ovf.contentWindow){
      if(d.t==='close')closeOv();
      if(d.t==='song'){if(d.on)pauseMain();else resumeMain()}
    }
  });
  mp.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;pausedByMe=false;
    if(b.id==='mpP')send({c:cur.playing?'pause':'play'});
    else if(b.id==='mpN')send({c:'next'});
    else if(b.id==='mpPrev')send({c:'prev'});
  });
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[data-open]');
    if(a){e.preventDefault();openOv(a.dataset.open,a.dataset.kind);return}
    const j=e.target.closest('a[data-track]');
    if(j&&j.dataset.track&&j.dataset.track!=='undefined'){
      e.preventDefault();pausedByMe=false;send({c:'load',num:j.dataset.track,play:true});
      frame.scrollIntoView({behavior:'smooth',block:'center'});
    }
  });
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)closeOv()});
})();
