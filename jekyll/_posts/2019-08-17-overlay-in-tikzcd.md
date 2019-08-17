---
magiccomment: "-*- engine: liquid -*-"
layout: post
lang: ja
title: beamer のスライドにおいて，tikzcd内でoverlayみたいなことをする
toc: true
tags:
  - latex
---

## やりたいこと
下の画像のように， `tikzcd` 内に overlay っぽい効果を反映させたい．

![overlay_in_tikzcd-1.jpg]({{ site.baseurl }}/assets/img/overlay_in_tikzcd-1.jpg "overlay_in_tikzcd-1")
![overlay_in_tikzcd-2.jpg]({{ site.baseurl }}/assets/img/overlay_in_tikzcd-2.jpg "overlay_in_tikzcd-2")


## 結論
[StackExchange](https://tex.stackexchange.com/questions/230943/beamer-tikz-cd-uncover-does-not-work){:target="_blank"} の回答(とそのコメント)に書いてある通りにすれば良い．

```tex{%raw%}
\documentclass[dvipdfmx]{beamer}

\usetheme{Copenhagen}
\useoutertheme{infolines}
\date{}

\usepackage{autonum}

\usepackage{tikz-cd}
\tikzcdset{ampersand replacement=\&}
\tikzset{
  invisible/.style={opacity=0.2}, % 透明度はここで調整
  visible on/.style={alt={#1{}{invisible}}},
  alt/.code args={<#1>#2#3}{%
    \alt<#1>{\pgfkeysalso{#2}}{\pgfkeysalso{#3}}%
  }
}

\begin{document}
\begin{frame}{hoge}
  \begin{equation}
    \begin{tikzcd}
      A \ar[r] \ar[d] \& B \ar[d, visible on=<2->]\\
      C \ar[r, visible on=<2->]\& |[visible on=<2->]| D
    \end{tikzcd}
  \end{equation}
\end{frame}

\end{document}{%endraw%}
```

## 解説
### `\tikzset`
{{ "post:tikz" | refer | refer_link }} を参照．

### `visible on` の適用
- arrow に適用するには，単に `\ar` コマンドのオプションとして
  `\ar[r, visible on=<2->]` などと記述すれば良い
- node に適用するには `|[...]|` なる構文を用いて，
  `|[visible on=<2->]| D` などと書く．
  この構文は [pgfmanual.pdf](http://mirrors.ctan.org/graphics/pgf/base/doc/pgfmanual.pdf){:target="_blank"} の "57 Matrix Library"(p. 646) で説明されている．
