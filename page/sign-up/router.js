document.addEventListener("DOMContentLoaded", function () {
  const masterKeyNav = document.getElementById("master-key-nav");
  const loginNav = document.getElementById("login-nav");

  masterKeyNav.addEventListener("click", function () {
    navigateTo("../manage-master-key/index.html");
  });

  loginNav.addEventListener("click", function () {
    navigateTo("../sign-in/index.html");
  });

  function navigateTo(url) {
    window.location.href = url;
  }
});
