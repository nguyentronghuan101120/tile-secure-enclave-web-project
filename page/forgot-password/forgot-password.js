var tabToggle = document.querySelector('.forgot-password .recover-pass custom-tab-toggle');
var tabToggleContainer = tabToggle.shadowRoot.querySelector(".custom-tab-toggle");
var tab1 = tabToggle.shadowRoot.querySelector(".custom-tab-toggle .tab1");
var tab2 = tabToggle.shadowRoot.querySelector(".custom-tab-toggle .tab2");

var tabContent1 = document.querySelector('.forgot-password .recover-pass .recovery-email-links-container')
var tabContent2 = document.querySelector('.forgot-password .recover-pass .qr-code-container')


function toggleTab1() {
  tabContent1.classList.remove("hidden")
  tabContent2.classList.add("hidden")
}

function toggleTab2() {
  tabContent1.classList.add("hidden")
  tabContent2.classList.remove("hidden")
}

tab1.addEventListener('click', toggleTab1);
tab2.addEventListener('click', toggleTab2);


var dataList = [
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910',
  '012345678910'
]

var leftContainer = document.querySelector('.forgot-password .recovery-email-links-container .left-list');
var rightContainer = document.querySelector('.forgot-password .recovery-email-links-container .right-list');

var leftList = dataList.slice(0, Math.ceil(dataList.length / 2));
var rightList = dataList.slice(Math.ceil(dataList.length / 2), dataList.length);

for (let i = 0; i < leftList.length; i++) {
  var numLabel = document.createElement("numberic-label");
  numLabel.setAttribute('numberic', `${i+1}`);
  numLabel.setAttribute('content', leftList[i]);
  leftContainer.appendChild(numLabel);
}

for (let i = 0; i < rightList.length; i++) {
  var numLabel = document.createElement("numberic-label");
  numLabel.setAttribute('numberic', `${i+1+leftList.length}`);
  numLabel.setAttribute('content', rightList[i]);
  rightContainer.appendChild(numLabel);
}