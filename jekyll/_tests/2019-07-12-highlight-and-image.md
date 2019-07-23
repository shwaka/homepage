---
layout: post
lang: ja
title: ハイライトと画像のテスト
ref: post:highlight-and-image
toc: true
---

色々とテストしてみる．

## シンタックスハイライト(コードブロック)
2通りのやり方がある．
- `highlight` タグを用いて `{% raw %}{% highlight tex %}{% endraw %}` と
  `{% raw %}{% endhighlight %}{% endraw %}` で囲う
- backquote 3つで囲う

見て分かるように，どっちを使うかによって出力が微妙に変わる

参考: [Syntax Highlighting in Jekyll](http://sangsoonam.github.io/2019/01/20/syntax-highlighting-in-jekyll.html){:target="_blank"}

### `highlight` タグ
{% highlight tex %}
math: $\int_0^1 x dx = \frac{1}{2}$
\textit{hoge}
{% endhighlight %}

### backquote 3つ
```tex
math: $\int_0^1 x dx = \frac{1}{2}$
\textit{hoge}
```

## 行番号つきのコードブロック
`highlight` タグの方に `linenos` オプションをつける

{% highlight python linenos %}
class Hoge:
    def __init__(self, foo):
        self.foo = foo
        self.bar = ("string", 3.14159, True)
        # This is a comment
{% endhighlight %}

## コードブロックにファイル名をつけたい
ここで色々とテストして出来上がったものを
{{ "post:named-codeblock" | refer | refer_link }}
にまとめておいた．

- [Showing file name in Jekyll with Pygments code highlight](https://stackoverflow.com/questions/25881134/showing-file-name-in-jekyll-with-pygments-code-highlight) こっちは微妙だった
- [GitHub Pagesでコードブロックにファイル名を表示する](https://hachy.github.io/2018/11/14/add-file-name-to-code-block-in-jekyll-on-github-pages.html) これを自分好みに修正した

{% highlight ruby %}
def print_hi(name)
    puts "Hi, #{name}"
end
{% endhighlight -%}
{:filename="hoge.rb" .named-block}

{% highlight ruby linenos %}
def print_hi(name)
    puts "Hi, #{name}"
end
{% endhighlight -%}
{:filename="hoge.rb" .named-block}

### class test
```python
def hoge():
    return True
```
{:filename="hoge.py" .named-block}

## 画像の読み込み

```markdown
![数学者の画像(いらすとや)]({{ site.baseurl }}/assets/img/job_suugakusya.png "数学者"){:width="40%"}
```

![数学者の画像(いらすとや)]({{ site.baseurl }}/assets/img/job_suugakusya.png "数学者"){:width="40%"}
