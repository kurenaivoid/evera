ビンタでお仕置き（音ゲー）の置き場所と、曲の読み込み方

■ Gitでの場所
  game/oshioki-binta/KURENAIVOID-oshioki-binta.html ... 音ゲー本体（これを開く）
  game/oshioki-binta/assets/game/ ........................ 画像・タイトルBGM
  game/oshioki-binta/assets/music/mission/ ............... ミッション曲（M1〜M3）

■ 曲について
  サイトの曲（1st Albumなど）は、リポジトリのいちばん上の assets/ にあります。
    assets/data/KURENAIVOID-tracks.js … 曲の名簿（サイトと共通）
    assets/music/album01/ ............ 曲のmp3
  音ゲーは、この名簿を読んで曲の一覧を作ります。
  新しい曲は「mp3を置く」→「名簿に1行足す」だけで、音ゲーにも出ます。
  譜面は、曲の音から自動で作られるので、譜面のファイルは要りません。

■ 音ゲーだけの曲（EX・M1〜M3）
  このフォルダの中だけで使います。サイトの曲一覧には出ません。

■ 注意
  パソコンで直接このHTMLを開くと、名簿とmp3を読めません（その場合は「自分の音源ファイル」で曲を選べます）。
  GitHub Pages などに置くと、曲は自動で読み込まれます。
