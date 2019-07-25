---
magiccomment: "-*- engine: liquid -*-"
lang: ja
ref: config
title: 設定
access_counter: true
backref: others
layout: mylayout
lightness_list:
  - light
  - dark
---

## テーマ

カラーテーマを選択できる．
他のページでも有効．
ただし，一部対象外のページもある．

<script type="text/javascript">
 {% include dynamic-css.js %}
 function update_theme_button(style_id, lightness){
   document.getElementById(`select-css-default`).checked = false;
   for (var i = 0; i < {{ site.num_styles }}; i++){
     document.getElementById(`select-css-light-${i}`).checked = false;
     document.getElementById(`select-css-dark-${i}`).checked = false;
   }
   const theme = get_theme();
   if (theme){
     document.getElementById(`select-css-${theme}`).checked = true;
   }
 }
 document.addEventListener("DOMContentLoaded", update_theme_button);
</script>

<table id="select-css">
  <tr>
    <td>
      default
    </td>
    <td>
      <input type="radio"
             name="select-css"
             class="select-css"
             value="0"
             id="select-css-default"
             onchange='theme="";apply_theme(theme);save_theme(theme);' />
      <label for="select-css-default"></label>
    </td>
  </tr>
  {% for lightness in page.lightness_list %}
    <tr>
      <td>{{lightness}}</td>
      {% assign max_style_num = site.num_styles | minus: 1 %}
      {% for i in (0..max_style_num) %}
        <td>
          <input type="radio"
                 name="select-css"
                 class="select-css"
                 value="{{ i }}"
                 id="select-css-{{lightness}}-{{ i }}"
                 onchange='theme="{{lightness}}-{{i}}";apply_theme(theme);save_theme(theme);' />
          {{ i }}
          <label for="select-css-{{lightness}}-{{ i }}"></label>
        </td>
      {% endfor %}
    </tr>
  {% endfor %}
</table>


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
