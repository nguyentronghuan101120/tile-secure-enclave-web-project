document.addEventListener("DOMContentLoaded", function () {
  const settingElement = document.getElementById("settings-option");

  settingElement.addEventListener("click", function () {
    const arrowDownIcon = document.getElementsByClassName("arrow-down-img");
    const arrowUpIcon = document.getElementsByClassName("arrow-up-img");

    const settingOptionContent = document.getElementById(
      "settings-option-content"
    );

    if (arrowDownIcon.length === 1) {
      arrowDownIcon[0].classList.replace("arrow-down-img", "arrow-up-img");
      settingOptionContent.style.display = "none";
    } else if (arrowUpIcon.length === 1) {
      arrowUpIcon[0].classList.replace("arrow-up-img", "arrow-down-img");
      settingOptionContent.style.display = "initial";
    }
  });
});
