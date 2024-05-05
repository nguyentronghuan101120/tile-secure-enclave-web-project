
class CustomInput extends HTMLElement {
  static get observedAttributes() {
    return ["type", "id", "label", "disabled", "background-color", "tt-text", "tt-position"];
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .custom-input {
          position: relative;
          width: 100%;
          border: 1px solid var(--gray-400);
          border-radius: 4px;
          transition: 0.5s ease;
          margin-top: 8px;
        }
        
        .custom-input .labelline{
          position: absolute;
          display: grid;
          top: -8px;
          left: 12px;
          grid-template-columns: auto auto auto;
          grid-template-rows: auto auto auto;
          background-color: transparent;
          transition: 0.5s ease;
        }
        
        .custom-input .labelline .information-icon{
          padding: 0 4px;
          width: 16px;
          height: 16px;
          filter: invert(79%) sepia(5%) saturate(44%) hue-rotate(202deg) brightness(83%) contrast(81%);
        }
        
        .custom-input .labelline .label {
          padding: 0 4px;
          margin: 0;
          transform: translateY(22px) translateX(-28px);
          line-height: 20px;
          font-size: 16px;
          transition: 0.5s ease;
          font-family: var(--app-font);
        }
        
        .custom-input input{
          width: 100%;
          padding: 14px;
          height: 48px;
          border: none;
          outline: none;
          background: transparent;
          box-sizing: border-box;
          font-family: var(--app-font);
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          color: var(--gray-900);
        }
        
        .custom-input.active .labelline{
          transition: 0.5s ease;
        }
        
        .custom-input.active {
          border: 1px solid var(--primary-500);
          transition: 0.5s ease;
        }
        
        .custom-input.active .labelline .label{
          background: transparent;
          transform: translateY(0) translateX(0);
          line-height: 16px;
          font-size: 12px;
          transition: 0.5s ease;
          color: var(--primary-500);
          font-size: var(--text-s-size);
          height: var(--text-s-height);
          font-weight: var(--semiBold-font-weight);
          font-family: var(--app-font);
          padding-left: 0;
        }
        
        .custom-input.inactive {
          border: 1px solid var(--gray-400);
          transition: 0.5s ease;
        }
        
        .custom-input.inactive .labelline {
          transition: 0.5s ease;
        }
        
        .custom-input.inactive .labelline .label{
          transform: translateY(0) translateX(0);
          line-height: 16px;
          font-size: 12px;
          transition: 0.5s ease;
          color: var(--gray-400);
          font-size: var(--text-s-size);
          height: var(--text-s-height);
          font-weight: var(--semiBold-font-weight);
          font-family: var(--app-font);
        }
        
        .custom-input.error {
          border: 1px solid var(--error-500) !important;
          transition: 0.5s ease;
        }
        
        .custom-input.error .labelline .label {
          color: var(--error-500) !important;
          transition: 0.5s ease;
        }
        
        .eye_closed_icon, .eye_open_icon {
          position: absolute;
          right: 14px;
          top: 0;
          width: 18px;
          height: 100%;
          cursor: pointer;
          transition: 0.5s ease;
        }

        .eye_closed_icon.invisible, .eye_open_icon.invisible {
          opacity: 0;
          transition: 0.5s ease;
          cursor: default;
          z-index: -5;
        }

        .custom-input.disabled {
          border: 1px solid var(--gray-300) !important;
        }
        .custom-input.disabled .labelline p {
          color: var(--gray-300) !important;
          cursor: default;
        }
        .custom-input.disabled input {
          color: var(--gray-300) !important;
        }

        .helper-text ul {
          margin: 0 !important;
          background-color: red !important;
        }

        .helper-text, .helper-text div, .helper-text li {
          font-size: 14px;
          line-height: 18px;
          font-style: italic;
          height: auto;
          width: 100%;
          position: relative;
          margin: 0;
        }

        .custom-input.disabled .helper-text {
          color: var(--gray-300) !important;
          cursor: default;
        }

        .custom-input.error .helper-text {
          color: var(--error-500) !important;
        }

        ::slotted(*) {
          margin-top: 4px;
          position: relative
        }

        ::slotted(ul) {
          margin: 0;
        }


      </style>
      <div>
        <div class="custom-input">
          <div class="labelline">
            <div class="tooltip-container"></div>
            <p class="label"></p>
          </div>
          <input>
          <img class="eye_closed_icon" src="../../assets/icons/eye_closed.svg" alt="eye_closed-icon">
          <img class="eye_open_icon" src="../../assets/icons/eye_open.svg" alt="eye_open-icon">
        </div>
        <slot class="helper-text" name="helper"></slot>
      </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector(".custom-input");

    this.labelline = this._shadowRoot.querySelector(".labelline");
    this.informationIcon = this._shadowRoot.querySelector(".information-icon");
    
    this.tooltipContainer = this._shadowRoot.querySelector(".labelline .tooltip-container");
    const tooltip = document.createElement('custom-tooltip');
    tooltip.setAttribute('text', this.getAttribute('tt-text'));
    tooltip.setAttribute('position', this.getAttribute('tt-position'));
    
    const img = document.createElement('img');
    img.setAttribute('src', '../../assets/icons/information_circle_contained.svg');
    img.setAttribute('alt', 'information-icon');
    img.classList.add('information-icon');
    tooltip.appendChild(img);

    this.tooltipContainer.appendChild(tooltip)


    this.label = this._shadowRoot.querySelector(".label");

    this.input = this._shadowRoot.querySelector("input");

    this.eyeOpenIcon = this._shadowRoot.querySelector(
      'img[alt="eye_open-icon"]'
    );
    this.eyeClosedIcon = this._shadowRoot.querySelector(
      'img[alt="eye_closed-icon"]'
    );
  }

  connectedCallback() {
    this.input.addEventListener("click", this.handleInputClick.bind(this));
    this.label.addEventListener("click", this.handleInputClick.bind(this));
    document.addEventListener("click", this.handleOutsideClick.bind(this));
    this.eyeClosedIcon.addEventListener(
      "click",
      this.togglePasswordVisibility.bind(this)
    );
    this.eyeOpenIcon.addEventListener(
      "click",
      this.togglePasswordVisibility.bind(this)
    );
    this.render();
  }

  disconnectedCallback() {
    this.input.removeEventListener("click", this.handleInputClick.bind(this));
    this.label.removeEventListener("click", this.handleInputClick.bind(this));
    document.removeEventListener("click", this.handleOutsideClick.bind(this));
    this.eyeClosedIcon.addEventListener(
      "click",
      this.togglePasswordVisibility.bind(this)
    );
    this.eyeOpenIcon.addEventListener(
      "click",
      this.togglePasswordVisibility.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "id") {
        this.input.setAttribute("id", newValue);
      }
      this.render();
    }
  }

  handleInputClick() {
    this.container.classList.add("active");
    this.container.classList.remove("inactive");
    if (this.getAttribute("type") === "password") {
      if (this.input.type === "password") {
        this.eyeClosedIcon.classList.remove("invisible");
      } else if (this.input.type === "text") {
        this.eyeOpenIcon.classList.remove("invisible");
      }
    }

    if (this.hasAttribute("background-color")) {
      this.labelline.style.backgroundColor =
        this.getAttribute("background-color");
    } else {
      this.labelline.style.backgroundColor = "white";
    }

    this.input.focus()
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      if (this.input.value.trim("") === "") {
        this.container.classList.remove("active");
        this.labelline.style.background = "transparent";
        this.eyeClosedIcon.classList.add("invisible");
        this.eyeOpenIcon.classList.add("invisible");
      } else {
        this.container.classList.remove("active");
        this.container.classList.add("inactive");
      }
    }
  }

  togglePasswordVisibility() {
    if (this.input.type === "password") {
      this.input.type = "text";
      this.eyeClosedIcon.classList.add("invisible");
      this.eyeOpenIcon.classList.remove("invisible");
    } else {
      this.input.type = "password";
      this.eyeClosedIcon.classList.remove("invisible");
      this.eyeOpenIcon.classList.add("invisible");
    }
  }

  render() {
    this.input.setAttribute("type", this.getAttribute("type") || "text");
    this.label.textContent = this.getAttribute("label") || "";
    if (
      this.getAttribute("type") === "password" &&
      (this.input.classList.contains("active") ||
        this.input.classList.contains("inactive"))
    ) {
      if ((this.input.type = "password")) {
        this.eyeClosedIcon.classList.remove("invisible");
        this.eyeOpenIcon.classList.add("invisible");
      } else if ((this.input.type = "text")) {
        this.eyeClosedIcon.classList.add("invisible");
        this.eyeOpenIcon.classList.remove("invisible");
      }
    } else {
      this.eyeClosedIcon.classList.add("invisible");
      this.eyeOpenIcon.classList.add("invisible");
    }

    if (this.hasAttribute("background-color")) {
      this.tooltipContainer.style.backgroundColor =
        this.getAttribute("background-color");
    } else {
      this.tooltipContainer.style.backgroundColor = "white";
    }

    if (this.hasAttribute("disabled")) {
      this.input.disabled = true;
      this.container.classList.add("disabled");
    } else {
      this.input.disabled = false;
      this.container.classList.remove("disabled");
    }
  }
}

customElements.define("custom-input", CustomInput);
