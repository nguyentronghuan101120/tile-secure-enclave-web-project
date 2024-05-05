document.addEventListener("DOMContentLoaded", function () {
  const addEmailButton = document.getElementById("add-email-button");

  let emailCount = 2;

  addEmailButton.addEventListener("click", function () {
    addEmailAddressField();
  });

  function addEmailAddressField() {
    const emailContainer = document.getElementById("email-container");

    // Create a new email input field
    const configDisplayItemContainer = document.createElement("div");
    configDisplayItemContainer.classList.add("display-flex");
    configDisplayItemContainer.classList.add("align-center");

    const emailAddressFieldContainer = document.createElement("div");
    emailAddressFieldContainer.classList.add("email-address-field");

    const customInput = document.createElement("custom-input");
    customInput.setAttribute("id", "text");
    customInput.setAttribute("type", "text");
    customInput.setAttribute("label", `Email address ${emailCount}`);

    emailAddressFieldContainer.appendChild(customInput);

    const removeEmailButtonCircle = document.createElement("div");
    removeEmailButtonCircle.classList.add("remove-email-button");

    const removeEmailButtonChild = document.createElement("div");
    removeEmailButtonChild.classList.add("child");

    removeEmailButtonCircle.appendChild(removeEmailButtonChild);

    removeEmailButtonCircle.addEventListener("click", function () {
      emailContainer.removeChild(configDisplayItemContainer);
      emailContainer.removeChild(sizedBox);
      emailCount--;
    });

    configDisplayItemContainer.appendChild(emailAddressFieldContainer);
    configDisplayItemContainer.appendChild(removeEmailButtonCircle);

    const sizedBox = document.createElement("sized-box");
    sizedBox.setAttribute("height", "16px");

    emailContainer.appendChild(configDisplayItemContainer);
    emailContainer.appendChild(sizedBox);

    emailCount++;
  }
});
