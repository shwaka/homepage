---
layout: post
lang: ja
title: ハイライトと画像のテスト
syntax-highlighting: true
ref: post:highlight-and-image
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


## 画像の読み込み

```markdown
![数学者の画像(いらすとや)]({{ site.baseurl }}/assets/img/job_suugakusya.png "数学者"){:width="40%"}
```

![数学者の画像(いらすとや)]({{ site.baseurl }}/assets/img/job_suugakusya.png "数学者"){:width="40%"}
