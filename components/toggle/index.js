class CustomToggle extends HTMLElement {
  static get observedAttributes() {
    return ["state"];
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      .toggle {
        width: 44px;
        height: 24px;
        border-radius: 40px;
        padding: 3px;
        box-sizing: border-box;
        cursor: pointer;
        transition: 0.3s ease-in-out;
      }

      .toggle.off {
        background-color: var(--gray-200);
      }

      .toggle.on {
        background-color: var(--primary-500);
      }

      .toggle .button {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: var(--white);
        transition: 0.3s ease-in-out;
      }

      .toggle.on .button {
        transform: translateX(20px);
        transition: 0.3s ease-in-out;
      }
    
    </style>

    <div class="toggle">
      <div class="button"></div>
    </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector(".toggle");
    this.button = this._shadowRoot.querySelector(".toggle .button");
  }

  connectedCallback() {
    this.container.addEventListener("click", this.toggleState.bind(this));
    this.render()
  }

  disconnectedCallback() {
    this.container.removeEventListener("click", this.toggleState.bind(this));
  }

  toggleState() {
    if (this.container.classList.contains("off")) {
      this.container.classList.remove("off");
      this.container.classList.add("on");
      this.setAttribute("state", 'on');
    } else {
      this.container.classList.remove("on");
      this.container.classList.add("off");
      this.setAttribute("state", 'off');
    }
  }

  render() {
    this.container.classList.add(this.getAttribute("state") || "off")
    this.setAttribute("state", this.getAttribute("state") || "off")
  }
}

customElements.define("custom-toggle", CustomToggle);