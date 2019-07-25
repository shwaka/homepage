function apply_theme(theme){
   document.body.classList.add(theme);
}

function load_theme(){
  theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);
  }
}

function save_theme(theme){
  localStorage.setItem("theme", theme);
}
