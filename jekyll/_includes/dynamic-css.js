function apply_theme(theme){
  // document.body.classList.add(theme);
  document.body.setAttribute("theme", theme);
}

function load_theme(){
  theme = localStorage.getItem("theme");
  if (theme) {
    apply_theme(theme);
  }
}

function save_theme(theme){
  localStorage.setItem("theme", theme);
}
