document.addEventListener("DOMContentLoaded", function () {
  const masterKeyNav = document.getElementById("back-button-nav");

  masterKeyNav.addEventListener("click", function () {
    navigateTo("../sign-up/index.html");
  });

  function navigateTo(url) {
    window.location.href = url;
  }
});
