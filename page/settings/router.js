document.addEventListener("DOMContentLoaded", function () {
  const masterKeyNav = document.getElementById("back-button-nav");
  const accountActivityNav = document.getElementById("account-activity-nav");

  masterKeyNav.addEventListener("click", function () {
    window.history.back();
  });

  accountActivityNav.addEventListener("click", function () {
    navigateTo("../account-activity/index.html");
  });

  function navigateTo(url) {
    window.location.href = url;
  }
});
