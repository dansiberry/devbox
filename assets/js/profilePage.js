window.showUserKits = function showUserKits() {
  document.getElementById("userkits-container").classList.remove("out-of-view")
  document.getElementById("favorites-container").classList.add("out-of-view")

  document.getElementById("my-boxes").classList.add("active-tab")
  document.getElementById("favorites").classList.remove("active-tab")
}

window.showFavorites = function showFavorites() {
  document.getElementById("favorites-container").classList.remove("out-of-view")
  document.getElementById("userkits-container").classList.add("out-of-view")

  document.getElementById("my-boxes").classList.remove("active-tab")
  document.getElementById("favorites").classList.add("active-tab")
}
