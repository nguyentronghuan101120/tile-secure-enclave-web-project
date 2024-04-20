const templateContent = `

<style>
* {
  box-sizing: content-box;
  padding: 0;
  margin: 0;
  font-family: var(--app-font);
}

.alert {
  height: 80px;
  border-left: 5px solid;
}

/* The close button */
.closebtn {
  float: right;
  background-image: url("../../assets/icons/x.svg");
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 16px 16px 0 0;
}

.closebtn-error-filter {
  filter: invert(58%) sepia(75%) saturate(2215%) hue-rotate(349deg)
    brightness(98%) contrast(92%);
}

.closebtn-success-filter {
  filter: invert(34%) sepia(91%) saturate(1179%) hue-rotate(127deg) brightness(93%) contrast(98%);
}

.closebtn-warning-filter {
  filter: invert(59%) sepia(100%) saturate(417%) hue-rotate(356deg) brightness(103%) contrast(96%);
}

.closebtn-information-filter {
  filter: invert(37%) sepia(95%) saturate(1608%) hue-rotate(193deg)
    brightness(103%) contrast(101%);
}

/* When moving the mouse over the close button */
.closebtn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.label {
  padding: 16px 0 8px 16px;
  font-size: var(--text-l-size);
  height: var(--text-l-height);
  font-weight: var(--semiBold-font-weight);
  color: var(--text-color);
}

.label-success {
  color: var(--success-500);
}

.label-error {
  color: var(--error-500);
}

.label-information {
  color: var(--link-500);
}

.label-warning {
  color: var(--warning-500);
}


.content {
  padding: 0 0 16px 16px;
  display: flex;
  align-items: center;
  font-size: var(--text-l-size);
  height: var(--text-l-height);
  color: var(--text-color);
}

.content a {
  margin-left: 5px;
  font-size: var(--text-l-size);

  color: var(--text-color);

  text-decoration: var(--underline-text-decoration);
  height: var(--text-l-height);
}

.icon {
  float: left;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 8px;
}


.error-background {
  background-color: var(--error-50);
  border-color: var(--error-500);
}

.error-icon {
  background-image: url("../../assets/icons/alert.svg");
}

.information-background {
  background-color: var(--link-50);
  border-color: var(--link-500);
}

.information-icon {
  background-image: url("../../assets/icons/information.svg");
}

.success-background {
  background-color: var(--success-50);
  border-color: var(--success-500);
}

.success-icon {
  background-image: url("../../assets/icons/success.svg");
}

.warning-background {
  background-color: var(--warning-50);
  border-color: var(--warning-500);
}

.warning-icon {
  background-image: url("../../assets/icons/warning.svg");
}

.custom-background {
  background-color: var(--gray-50);
  border-color: var(--gray-500);
}

.disabled {
  display: none;
}


</style>


<div class="alert type">
  <span class="closebtn"></span>
  <div class="label">
    <span class="icon"></span>
    <span class="label-text">Error</span>
  </div>
  <div class="content">
    <p class="content-message">
      This is an error message
    </p>
    <a href="#"> Read more</a>
  </div>
</div>
`;

class CustomAlert extends HTMLElement {
  //Note:
  // type: used to change type of alert, include: error, information, success, warning and custom

  //Usage: <custom-alert label="This is label" content-message="This is content message" type="error"></custom-alert>

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = templateContent;

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.alert = this._shadowRoot.getElementById("alert");

    this.getElement();
  }

  connectedCallback() {
    this.render();

    this.attachEvents();
  }

  getElement() {
    // Get the span element that needs to be modified
    this.labelText = this._shadowRoot.querySelector(".label-text");
    this.contentMessage = this._shadowRoot.querySelector(".content-message");
    this.type = this._shadowRoot.querySelector(".type");
    this.icon = this._shadowRoot.querySelector(".icon");
    this.closeBtn = this._shadowRoot.querySelector(".closebtn");
    this.alert = this._shadowRoot.querySelector(".alert");
  }

  render() {
    this.labelText.textContent = this.getAttribute("label") || "";
    this.contentMessage.textContent =
      this.getAttribute("content-message") || "";

    if (this.getAttribute("isShowCloseBtn") === "false") {
      this.closeBtn.remove();
    }

    const type = this.getAttribute("type");

    switch (type) {
      case "error":
        this.icon.classList.add("error-icon");
        this.closeBtn.classList.add("closebtn-error-filter");
        this.labelText.classList.add("label-error");
        this.type.classList.add("error-background");
        break;

      case "information":
        this.icon.classList.add("information-icon");
        this.closeBtn.classList.add("closebtn-information-filter");
        this.labelText.classList.add("label-information");
        this.type.classList.add("information-background");
        break;

      case "success":
        this.icon.classList.add("success-icon");
        this.closeBtn.classList.add("closebtn-success-filter");
        this.labelText.classList.add("label-success");
        this.type.classList.add("success-background");
        break;

      case "warning":
        this.icon.classList.add("warning-icon");
        this.closeBtn.classList.add("closebtn-warning-filter");
        this.labelText.classList.add("label-warning");
        this.type.classList.add("warning-background");
        break;

      default:
      case "custom":
        this.icon.classList.add("custom-icon");
        break;
    }
  }

  attachEvents() {
    const closeBtn = this._shadowRoot.querySelector(".closebtn");
    closeBtn.addEventListener("click", () => {
      this.hideAlert();
    });
  }

  hideAlert() {
    this.alert.classList.add("disabled");
  }
}

customElements.define("custom-alert", CustomAlert);
