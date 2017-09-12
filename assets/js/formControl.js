window.toggleMenu = function toggleMenu() {
  if(document.getElementsByClassName('slide-menu-active').length == 1){
     document.getElementById("slide-menu").classList.remove("slide-menu-active")
     document.getElementById("app").classList.remove("search-active")
  }

  else {
     document.getElementById("slide-menu").classList.add("slide-menu-active")
     document.getElementById("app").classList.add("search-active")
  }

}
