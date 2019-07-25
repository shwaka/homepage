function apply_theme(theme){
  // document.body.classList.add(theme);
  document.body.setAttribute("theme", theme);
}

function get_theme(){
  const theme = localStorage.getItem("theme");
  if (theme === "" || theme === null){
    return "default";
  }
  return theme;
}

function load_theme(){
  theme = get_theme();
  if (theme) {
    apply_theme(theme);
  }
}

function save_theme(theme){
  localStorage.setItem("theme", theme);
}
