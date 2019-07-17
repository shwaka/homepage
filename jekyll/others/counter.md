---
layout: mylayout
lang: ja
ref: counter
title: アクセスカウンター
access_counter: true
backref: others
---

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
  <input type="radio" name="show-counter" value="true" id="show-counter-true" />
  <label for="show-counter-true">表示する</label>  <br/>
  <input type="radio" name="show-counter" value="false" id="show-counter-false" />
  <label for="show-counter-false">表示しない</label> <br/>
  <input type="button" id="show-counter-button" name="show-counter-save" value="設定" onclick="save()" />
</div>
