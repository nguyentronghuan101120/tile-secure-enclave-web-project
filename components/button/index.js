const templateContent = `
<style>
  .base-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 30px;
    cursor: pointer;
    width: fit-content;
  }

  .base-button.full-width {
    width: 100%;
  }

  .base-button.disabled {
    cursor: auto;
    pointer-events: none;
  }

  .base-button.processing {
    cursor: auto;
  }

  .base-button .dot-processing {
    display: none;
  }

  .base-button.processing .dot-processing {
    display: flex;
    gap: 4px;
    align-items: end;
    height: 10px;
  }

  .dot-1, .dot-2, .dot-3 {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    opacity: 0.4;
  }

  .dot-1 {
    animation: dot-move 4s infinite;
  }

  .dot-2 {
    animation: dot-move 4s infinite;
    animation-delay: 1s;
  }

  .dot-3 {
    animation: dot-move 4s infinite;
    animation-delay: 2s;
  }

  .base-button.small-button {
    padding: 12px 20px;
    font-size: var(--text-button-s-size);
  }

  .base-button.large-button {
    padding: 16px 24px;
    font-size: var(--text-button-l-size);
  }

  .base-button.icon-button.small-button {
    padding: 8px;
  }

  .base-button.icon-button.large-button {
    padding: 12px;
  }

  .primary-button {
    background-color: var(--primary-500);
    color: var(--white);
  }

  .primary-button svg, 
  .primary-button svg path {
    stroke: var(--white);
  }
  
  .primary-button:hover {
    background-color: var(--primary-700);
  }
  
  .primary-button.disabled {
    background-color: var(--gray-100);
    color: var(--gray-300);
  }

  .primary-button.disabled svg, 
  .primary-button.disabled svg path {
    stroke: var(--gray-300);
  }
  
  .primary-button.processing {
    background-color: var(--primary-400);
  }

  .primary-button.processing svg, 
  .primary-button.processing svg path {
    stroke: var(--primary-400);
  }

  .primary-button.processing .dot-1,
  .primary-button.processing .dot-2,
  .primary-button.processing .dot-3 {
    background-color: var(--white);
  }

  .secondary-button {
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
  }

  .secondary-button svg, 
  .secondary-button svg path {
    stroke: var(--primary-500);
  }

  .secondary-button:hover {
    color: var(--primary-700);
    border: 1px solid var(--primary-700);
    background-color: var(--primary-50);
  }

  .secondary-button:hover svg, 
  .secondary-button:hover svg path {
    stroke: var(--primary-700);
  }

  .secondary-button.disabled {
    color: var(--gray-300);
    border: 1px solid var(--gray-300);
    background-color: var(--gray-100);
  }

  .secondary-button.disabled svg, 
  .secondary-button.disabled svg path {
    stroke: var(--gray-300);
  }

  .secondary-button.processing {
    color: var(--primary-400);
    border: 1px solid var(--primary-400);
    background-color: var(--primary-50);
  }

  .secondary-button.processing svg, 
  .secondary-button.processing svg path {
    stroke: var(--primary-400);
  }

  .secondary-button.processing .dot-1,
  .secondary-button.processing .dot-2,
  .secondary-button.processing .dot-3 {
    background-color: var(--primary-400);
  }

  @keyframes dot-move {
    0% {
      transform: translateY(0px);
      opacity: 0.4
    }
  
    10% {
      transform: translateY(-10px);
      opacity: 1
    }
  
    20% {
      transform: translateY(0px);
      opacity: 0.4
    }
  
    100% {
      transform: translateY(0px);
      opacity: 0.4
    }
  }
</style>
<div id="custom-button" class="base-button">
  <slot name="start-adornment"></slot>
  <slot></slot>
  <div class="dot-processing">
    <span class="dot-1"></span>
    <span class="dot-2"></span>
    <span class="dot-3"></span>
  </div>
  <slot name="end-adornment"></slot>
</div>
`;

class Button extends HTMLElement {
  static observedAttributes = [
    "disabled",
    "variant",
    "size",
    "processing",
    "full-width",
  ];

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = templateContent;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.append(template.content.cloneNode(true));

    this.button = this._shadowRoot.getElementById("custom-button");
    this.onclick = null;
  }

  connectedCallback() {
    this.button.addEventListener("click", this.handleButtonClick.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.handleButtonClick.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "processing" && newValue === "true") {
      this.button.classList.add("processing");
    }
  }

  handleButtonClick() {
    if (this.onclick) {
      this.onclick();
    }
  }

  render() {
    if (this.hasAttribute("disabled")) {
      this.button.disabled = true;
      this.button.classList.add("disabled");
    }

    if (this.hasAttribute("full-width")) {
      this.button.classList.add("full-width");
    }

    const variant = this.getAttribute("variant");

    switch (variant) {
      case "secondary":
        this.button.classList.add("secondary-button");
        break;
      case "icon-primary":
        this.button.classList.add("icon-button");
        this.button.classList.add("primary-button");
        break;
      case "icon-secondary":
        this.button.classList.add("secondary-button");
        this.button.classList.add("icon-button");
        break;
      default:
        this.button.classList.add("primary-button");
        break;
    }

    const size = this.getAttribute("size");

    switch (size) {
      case "large":
        this.button.classList.add("large-button");
        break;
      default:
        this.button.classList.add("small-button");
        break;
    }
  }
}

customElements.define("custom-button", Button);
