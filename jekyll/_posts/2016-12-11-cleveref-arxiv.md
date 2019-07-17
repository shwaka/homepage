---
layout: post
lang: ja
title: arXivでcleverefを使う
ref: post:cleveref-arxiv
date: 2016-12-11 01:00:00 +09:00
toc: true
---

この記事は，以前 Qiita に書いた
[arXivでcleverefを使う](https://qiita.com/wktkshn/items/f38a759fd6b9e0a81de7) を転載したものです．

## はじめに
- cleverefについては
{{ "post:cleveref" | refer | refer_link}}
を参照してください。

- このページの内容は[ここの回答](http://tex.stackexchange.com/questions/276801/how-does-one-use-cleveref-in-an-arxiv-submission)と[cleverefのマニュアル](http://tug.ctan.org/macros/latex/contrib/cleveref/cleveref.pdf)を参考にしました。

## arXivでcleverefを使う方法
arXivはコンパイルの際に勝手にhyperrefを読み込む[^1]ため、cleverefを用いたコードを何も考えずに投稿すると正しく表示されません。

[^1]: 00README.XXXなる名前のファイルを用いればhyperrefの読み込みを抑制できますが、何故かこの場合でも明示的に`\crefname`によって設定をする必要があります。

しかし、以下の2点を守れば正しく表示されるようになります。

1. `\usepackage{hyperref}`を`\usepackage{cleveref}`よりも前に、ソースコードに自ら書く。
2. `\crefname`を用いて、`\cref`での表示名を明示的に指定する。

[cleverefのマニュアル](http://tug.ctan.org/macros/latex/contrib/cleveref/cleveref.pdf)に書いてあるように、(もし使うなら)hyperrefはcleverefよりも先に読み込まれなければいけません。
そのため、arXivによってcleverefよりも後にhyperrefが読み込まれないように、自ら先にhyperrefを読み込む必要があります。
また、2.に書いてある`\cref`による指定は普段の環境では省略できる場合も多いため、忘れていたりそもそも知らなかったりする可能性がありますね。

## poormanオプション
arXivでは上記の方法でうまく行くと思いますが、他の状況でどうしてもうまく行かない場合にはpoormanオプションを用いることでほぼ確実に解決できます。
このオプションは、cleverefを利用できないような"poor man"の環境でもコンパイルが通るようにするためのものです。

具体例と使い方を述べましょう。

```tex
\documentclass{article}
\usepackage[poorman]{cleveref}
\newtheorem{theorem}{Theorem}
\crefname{theorem}{Theorem}{Theorems}
\begin{document}

\begin{theorem}
 \label{theorem:foo}
 This is a theorem.
\end{theorem}

 By \cref{theorem:foo}, we have ...

\end{document}
```
{:filename="hoge.tex"}

上記のように、cleverefにpoormanオプションを指定して読み込みます。
これをコンパイルすると、同じディレクトリに`hoge.sed`なるファイル[^2]が生成されます。
これは`hoge.tex`からcleveref依存の部分を全て取り去る方法が記されたテキストファイルで、terminal上で次のように入力して利用します[^3]。

[^2]: ファイル名は元々のTeXファイルの名前で決まります。

[^3]: こちらで動作確認したのはubuntuのみ。macはhogeおそらくそのままで使えると思いますが、windowsは自分でsedをインストールする必要があるかもしれません。"windows sed"などでググってください。

```bash
sed -f hoge.sed hoge.tex > hogeforpoorman.tex
```

これを実行すると、次のようなファイルが生成されます。

```tex
\documentclass{article}

\newtheorem{theorem}{Theorem}

\begin{document}

\begin{theorem}
 \label{theorem:hoge}
 This is a theorem.
\end{theorem}

 By Theorem\nobreakspace \ref {theorem:hoge}, we have ...

\end{document}
```
{:filename="hogeforpoorman.tex"}

確かにcleverefに依存する部分が全て取り除かれた上で、元々はcleverefによって補われていた`Theorem`がソースコードに挿入されていますね。
このファイルであれば、おそらくどんな環境のLaTeXでも正しくコンパイルできると思います。

(12/11 25時ごろ追記)
`\cref`と`\Cref`について勘違いしていたことを指摘されたので、修正しておきました。
詳細は[前の記事](http://qiita.com/wktkshn/items/110cd6007837938e6c88)を参照してください。
