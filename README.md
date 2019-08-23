# 概要
- [https://www.ms.u-tokyo.ac.jp/~swaka/](https://www.ms.u-tokyo.ac.jp/~swaka/) のソースコード．
- [Jekyll](https://jekyllrb.com/) を使っているので，サーバーにアップロードする前にローカルでビルドする必要がある．

# install
- `ruby`, `gem`, `bundler` あたりをインストール
- `jekyll/` ディレクトリで `bundle update` で必要な gem をインストール

# build, test
## build
`jekyll/` ディレクトリで `jekyll build`

## test
- `jekyll serve`
    - 以前は `hawkins` プラグインの `jekyll liveserve` を使ってたけど，
      割と最近 `jekyll` 本体に `livereload` として組込まれたみたいなので，こっちを使うことにした．

## スマホでのテスト
[Connect to a locally built Jekyll Server using mobile devices in the LAN](https://stackoverflow.com/questions/16608466/connect-to-a-locally-built-jekyll-server-using-mobile-devices-in-the-lan)
ローカルネットワークを使うので，wifi環境下で行う．
1. `--host=0.0.0.0` オプションをつけるか， `_config.yml_` 内に `host: 0.0.0.0` と記述
2. `hostname -I` で ip アドレスを調べる (`192.168.1.10` みたいなローカルなアドレスが出るはず？)
3. `jekyll (live)serve`
4. スマホから `192.168.1.10:4000` にアクセス (ポート番号は `jekyll serve` の出力を見て確認)

## deploy
- local は `_site/`
- sftp 接続した remote は `public_html/`

にそれぞれ移動した状態で， `put -r .` すれば上書きとかも上手くいく．
ただし，「全てのファイル」をアップロードするので無駄が多い．

## 注意点
- (要調査) `jekyll serve` で生成したサイトをそのままアップロードしても平気？
  (`livereload` あたりが気になる)
  駄目ならアップロード前に改めて `jekyll build` する
- サイト内のリンクを書く際は，必ず `{{ site.baseurl }}/hoge.html` みたいにする

# References
全部列挙はさすがにできないので，主なもののみ

- [Jekyll公式](https://jekyllrb.com/docs/)
- [Liquid公式](https://shopify.github.io/liquid/)
- [30分のチュートリアルでJekyllを理解する](https://melborne.github.io/2012/05/13/first-step-of-jekyll/)
  初めて `jekyll` を使うならとりあえずこれを読めば良さそう．
  2012年の記事なので割と古いけど，2019年時点ではチュートリアルとして概ね問題なく機能した．
  たまにエラーは発生したけど，エラーメッセージが親切だったので特に問題はなかった．
  (後から気付いたけど，2013年に改訂版[Jekyllいつやるの？ジキやルの？今でしょ！](http://melborne.github.io/2013/05/20/now-the-time-to-start-jekyll/)が書かれていたので，こちらを読んだ方が良さそう)
- [Making Jekyll multilingual – Sylvain Durand](https://www.sylvaindurand.org/making-jekyll-multilingual/)
  多言語対応などの，上の「30分のチュートリアル」よりも進んだ内容が書かれている．
- [Jekyll Date Formatting Examples - Alan W. Smith](http://alanwsmith.com/jekyll-liquid-date-formatting-examples)
  日付のフォーマットの例がたくさん載ってる
- [How to properly indicate an error during site generation?](https://talk.jekyllrb.com/t/how-to-properly-indicate-an-error-during-site-generation/447)
  エラーをraiseする方法
- [icooon-mono](http://icooon-mono.com/)
  新しいタブで開くリンクにつけている画像([target_blank.png](/jekyll/img/target_blank.png))はここから取得
- [CSSだけで簡単！ハンバーガーメニューの作り方（スマホ対応）](https://saruwakakun.com/html-css/reference/nav-drawer)
- [Jekyll cheatsheet](https://devhints.io/jekyll)
- [Syntax Highlighting in Jekyll](https://mycyberuniverse.com/syntax-highlighting-jekyll.html)
    - [richleland/pygments-css](https://github.com/richleland/pygments-css) `rouge` は `pygments` のものを流用できる
    - [themesのプレビュー](http://richleland.github.io/pygments-css/)
- Jekyll のプラグイン作成について
    - [Outputting Markdown from Jekyll using hooks](https://humanwhocodes.com/blog/2019/04/jekyll-hooks-output-markdown/)
    - [jekyllプラグインの作り方 ジェネレータ編 -- ぺけみさお](https://www.xmisao.com/2013/08/06/how-to-make-a-jekyll-plugin.html)
    - [avillafiorita/jekyll-datapage_gen: Generate one page per yaml record in Jekyll sites.](https://github.com/avillafiorita/jekyll-datapage_gen)

# TODO
- デプロイ方法をどうにかしたい．
    - 自動化したい
    - 重いPDFをいちいち upload するのは無駄
- `include_md_filter.rb`
    - ドキュメントを整える
    - ついでに `others/include-test.md` で試したやつがどう上手くいかないかも記録しておく？
    - include される側の markdown で `page.ref` とすると，
      include する側の `ref` が表示されるバグがある．
      色々試したけど直すの難しそう…
- 講演・論文の一覧の表示形式を設定可能にする．
  jekyll で静的に解決するよりも， javascript で動的に解決した方が良い？
    - 表示順序の反転
    - 国内/国際集会での講演をまとめるか否か
    - list, table, latex
    - 動的に `<a>` タグを追加すると， `target="_blank"` の画像が追加されない
