# install
- `ruby`, `gem`, `bundler` あたりをインストール
- `jekyll/` ディレクトリで `bundle update` で必要な gem をインストール

# build, test
## build
`jekyll build`

## test
- `jekyll serve --watch` が良いかも
- `hawkins` プラグインの `jekyll liveserve` の方が便利
  (ブラウザでのリロードが不要)
- いずれにしても， `--baseurl ""` をつけないと localhost の url が変なことになる
  (`_config.yml` の `baseurl:` のせい)

## 注意点
- (要調査) `jekyll liveserve` で生成したサイトをそのままアップロードしても平気？
  駄目ならアップロード前に改めて `jekyll build` する
- アップロード前の build は `git commit` した後に行う．
  そうしないと `last-modified-at` プラグインが更新時刻を検出できない．

# References
全部列挙はさすがにできないので，主なもののみ

- [Jekyll公式](https://jekyllrb.com/docs/)
- [Liquid公式](https://shopify.github.io/liquid/)
- [30分のチュートリアルでJekyllを理解する](https://melborne.github.io/2012/05/13/first-step-of-jekyll/)
  初めて `jekyll` を使うならとりあえずこれを読めば良さそう．
- [Making Jekyll multilingual – Sylvain Durand](https://www.sylvaindurand.org/making-jekyll-multilingual/)
  多言語対応などの，上の「30分のチュートリアル」よりも進んだ内容が書かれている．

# TODO
- 論文・講演一覧が見辛いので，斜体にしたりする？
- 日付表示
    - 英語のときに Jan. とかにする？
    - 「2019年08月08日」みたいに一桁の数字に 0 がついてるのはダサい
- 言語選択のあたりの style
- 画面の幅が広いと "last modified" が左にはみ出る
- baseurl のあたりを整理する．
  参考: [jekyllで構築したサイト、本番へアップしたらcssが適用されない場合に試しておきたいbaseurlの便利な変更の仕方。](https://qiita.com/woopsdez/items/cc2b64800a6de3112920)
- デプロイ方法をどうにかしたい．
  とくに，重いPDFをいちいち upload するのは無駄
