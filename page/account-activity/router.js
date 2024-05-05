document.addEventListener("DOMContentLoaded", function () {
  const masterKeyNav = document.getElementById("back-button-nav");

  masterKeyNav.addEventListener("click", function () {
    window.history.back();
  });
});
