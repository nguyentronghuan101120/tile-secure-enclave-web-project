var customInputName = document.querySelector('custom-input#sign_in-input_name');
var fieldNameInput = customInputName.shadowRoot.querySelector("input#sign_in-input_name");
var customInputNameContainer = customInputName.shadowRoot.querySelector(".custom-input");

var customInputPassword = document.querySelector('custom-input#sign_in-input_password');
var passwordInput = customInputPassword.shadowRoot.querySelector("input#sign_in-input_password");
var customInputPasswordContainer = customInputPassword.shadowRoot.querySelector(".custom-input");


var background = document.querySelector(".sign_in .background");
var backgroundResponsive1 = document.querySelector(".sign_in .background_responsive_1");
var backgroundResponsive2 = document.querySelector(".sign_in .background_responsive_2");
var background1 = document.querySelector(".sign_in .background_1");
var background2 = document.querySelector(".sign_in .background_2");

var signinButton = document.querySelector(".sign_in .sign_in-button");


function handleFocus() {
  if (fieldNameInput.value.trim() === '' && passwordInput.value.trim() === '') {
    backgroundResponsive1.classList.add('active');
    background1.classList.add('active');

    backgroundResponsive2.classList.remove('active');
    background2.classList.remove('active');
  } else {
    backgroundResponsive2.classList.add('active');
    background2.classList.add('active');

    backgroundResponsive1.classList.remove('active');
    background1.classList.remove('active');
  }

  background.classList.remove('active');
}

fieldNameInput.addEventListener('focus', handleFocus);
passwordInput.addEventListener('focus', handleFocus);

function handleClickOutside(event) {
  if (!customInputName.contains(event.target) && !customInputPassword.contains(event.target)) {
    if (fieldNameInput.value.trim() === '' && passwordInput.value.trim() === '') {
      background.classList.add('active');
      backgroundResponsive1.classList.remove('active');
      backgroundResponsive2.classList.remove('active');
      background1.classList.remove('active');
      background2.classList.remove('active');
    } else {
      background.classList.remove('active');
      backgroundResponsive1.classList.remove('active');
      backgroundResponsive2.classList.add('active');
      background1.classList.remove('active');
      background2.classList.add('active');
    }
  }
}

document.addEventListener('click', handleClickOutside);

function signIn() {
  if (fieldNameInput.value.trim() === '') {
    customInputNameContainer.classList.add("error")
  } else {
    customInputNameContainer.classList.remove("error")
  }

  if (passwordInput.value.trim() === '') {
    customInputPasswordContainer.classList.add("error")
  } else {
    customInputPasswordContainer.classList.remove("error")
  }

  if ((fieldNameInput.value.trim() !== '' && passwordInput.value.trim() !== '')) {
    signinButton.classList.add("processing")
  }
}

signinButton.addEventListener('click', signIn)