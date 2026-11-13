/* =====================================================================
   KURENAIVOID-tracks.js  ―  曲の名簿（サイトと音ゲーで共通。ここだけ見ます）
   場所：assets/data/KURENAIVOID-tracks.js

   ■ 新しい曲を足すとき（2つだけ）
     ① mp3を assets/music/（作品ごとのフォルダ）に置く
     ② 下の一覧に1行足す
        kind … 作品の名前（例 "1st Album"）  num … 番号  title … 曲名
        rel  … mp3の場所（assets/ からの道すじ）  date … 公開日（これより前は「準備中」）
        single … 単独シングル扱いにしたい曲だけ true
     ※ file（完全URL）は、下で自動で作ります。書かなくて大丈夫です。
     ※ kind と date だけの行は「COMING SOON」の枠です。曲ができたら、その行を書き換えます。
   ===================================================================== */
(function(){
  var base=document.currentScript.src;
  var url=function(p){return new URL('../'+p,base).href};
  var L=[
  {"kind": "1st Album", "num": "00", "title": "Cathedral of Heavy Iron", "rel": "music/album01/KURENAIVOID-album01-00-cathedral-of-heavy-iron.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "01", "title": "Lethal Grin", "rel": "music/album01/KURENAIVOID-album01-01-lethal-grin.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "02", "title": "Leave a Burning Mark", "rel": "music/album01/KURENAIVOID-album01-02-leave-a-burning-mark.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "03", "title": "Teni v tumane", "rel": "music/album01/KURENAIVOID-album01-03-teni-v-tumane.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "04", "title": "Brucia nel buio", "rel": "music/album01/KURENAIVOID-album01-04-brucia-nel-buio.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "05", "title": "Oye Beratna", "rel": "music/album01/KURENAIVOID-album01-05-oye-beratna.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "06", "title": "Plus de larmes", "rel": "music/album01/KURENAIVOID-album01-06-plus-de-larmes.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "07", "title": "ILIMināt", "rel": "music/album01/KURENAIVOID-album01-07-iliminat.mp3", "date": "2026-01-01", "single": true},
  {"kind": "1st Album", "num": "08", "title": "S.H.T.L. -愛執歪-", "rel": "music/album01/KURENAIVOID-album01-08-shtl.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "09", "title": "Сквозь вечный хлад", "rel": "music/album01/KURENAIVOID-album01-09-skvoz-vechnyj-khlad.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "10", "title": "Shadow of Tngri", "rel": "music/album01/KURENAIVOID-album01-10-shadow-of-tngri.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "11", "title": "Terminal Liturgy", "rel": "music/album01/KURENAIVOID-album01-11-terminal-liturgy.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "12", "title": "Cold Iron Prayer", "rel": "music/album01/KURENAIVOID-album01-12-cold-iron-prayer.mp3", "date": "2026-01-01"},
  {"kind": "1st Album", "num": "13", "title": "Where the Broken Spirits Sleep", "rel": "music/album01/KURENAIVOID-album01-13-where-the-broken-spirits-sleep.mp3", "date": "2026-01-01"},
  {"kind": "Twin Single", "date": "2027-01-01"},
  {"kind": "Twin Single", "date": "2027-01-01"},
  {"kind": "2nd Album", "date": null}
  ];
  window.EVERA_TRACKS=L.map(function(t){return t.rel?Object.assign({},t,{file:url(t.rel)}):t});

  /* ひみつの曲（子守唄）。見つけるまで、プレーヤー・DJには出ません。音ゲーは、この一覧を読みません。
     secret … 見つけたかどうかの目印（ja / ru）。rel … mp3の場所 */
  window.EVERA_SECRET=[
    {"kind": "Lullaby", "num": "S1", "title": "ちっちゃなニナ", "rel": "music/lullaby/KURENAIVOID-lullaby-ja.mp3", "date": null, "secret": "ja"},
    {"kind": "Lullaby", "num": "S2", "title": "Малышка Нина", "rel": "music/lullaby/KURENAIVOID-lullaby-ru.mp3", "date": null, "secret": "ru"}
  ].map(function(t){return Object.assign({},t,{file:url(t.rel)})});
})();
