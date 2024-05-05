document.addEventListener("DOMContentLoaded", function () {
  const signUpNav = document.getElementById("sign-up-nav");
  const settingNav = document.getElementById("setting-nav");
  const forgotPasswordNav = document.getElementById("forgot-password-nav");

  signUpNav.addEventListener("click", function () {
    navigateTo("../sign-up/index.html");
  });

  settingNav.addEventListener("click", function () {
    navigateTo("../settings/index.html");
  });

  forgotPasswordNav.addEventListener("click", function () {
    navigateTo("../forgot-password/index.html");
  });

  function navigateTo(url) {
    window.location.href = url;
  }
});
