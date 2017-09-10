$(function() {
  $("#main-form").validate({
    errorElement : 'div',
    errorClass : 'error'
  });
})

window.checkForm = function checkForm(e) {
  let atLeastOneSec = document.getElementsByClassName("section").length;
  if (atLeastOneSec == 0) {
   e.preventDefault()
   raiseFlag("add-section-flag")
  }
  let atLeastOneResource = document.getElementsByClassName("resource").length;
  if (atLeastOneResource == 0) {
   e.preventDefault()
   raiseFlag("add-link-flag")
  }

  function raiseFlag(div) {
   document.getElementById(div).classList.add("show-flag");
   setTimeout(function removeFlag() {document.getElementById(div).classList.remove("show-flag"); }, 3000)
  }
}

