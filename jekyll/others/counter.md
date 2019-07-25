---
lang: ja
ref: counter
title: アクセスカウンター
access_counter: true
backref: others
layout: mylayout
---

## アクセスカウンター
アクセスカウンターを試しに置いてみた．
他のページでは表示はされないがカウントはされている．
扱いをどうするかは検討中．
(このページにも表示されていない場合は，広告ブロッカーをオフにしてみて下さい)

<script type="text/javascript">
 function save(){
   const button_true = document.getElementById("show-counter-true");
   const button_false = document.getElementById("show-counter-false");
   if (button_true.checked){
     localStorage.setItem("show-counter", true);
   }
   if (button_false.checked){
     localStorage.setItem("show-counter", false);
   }
 }
 function initialize(){
   const button_true = document.getElementById("show-counter-true");
   const button_false = document.getElementById("show-counter-false");
   if (localStorage.getItem("show-counter") === "true"){
     button_true.checked = true;
   } else {
     button_false.checked = true;
   }
 }
 document.addEventListener("DOMContentLoaded", initialize);
</script>

<div>
  <input type="radio" name="show-counter" value="true" id="show-counter-true" onchange="save()" />
  <label for="show-counter-true">表示する</label>  <br/>
  <input type="radio" name="show-counter" value="false" id="show-counter-false" onchange="save()" />
  <label for="show-counter-false">表示しない</label> <br/>
  <!-- <input type="button" id="show-counter-button" name="show-counter-save" value="設定" onclick="save()" /> -->
</div>

## テーマ

<script type="text/javascript">
 {% include dynamic-css.js %}
</script>

<table id="select-css">
  <tr>
    <td>light</td>
    {% assign max_style_num = site.num_styles | minus: 1 %}
    {% for i in (0..max_style_num) %}
    <td>
      <input type="radio"
             name="select-css"
             class="select-css"
             value="{{ i }}"
             id="select-css-{{ i }}"
             onchange='apply_theme("light-{{i}}");' />
      {{ i }}
      <label for="select-css-{{ i }}"></label>
    </td>
    {% endfor %}
  </tr>
  <tr>
    <td>dark</td>

    {% assign max_style_num = site.num_styles | minus: 1 %}
    {% for i in (0..max_style_num) %}
    <td>
      <input type="radio"
             name="select-css-dark"
             class="select-css-dark"
             value="{{ i }}"
             id="select-css-{{ i }}-dark"
             onchange='load_css({{ i }}, "dark")' />
      {{ i }}
      <label for="select-css-{{ i }}-dark"></label>
    </td>
    {% endfor %}
  </tr>
</table>
