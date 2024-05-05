const sizedBoxTemplate = `
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .sized-box {
    // background: red;
  }
</style>

<div class="sized-box"></div>
`;

class SizedBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = sizedBoxTemplate;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._sizedBox = this._shadowRoot.querySelector(".sized-box");
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["width", "height"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");

    if (width) {
      this._sizedBox.style.width = width;
    } else {
      this._sizedBox.style.removeProperty("width");
    }

    if (height) {
      this._sizedBox.style.height = height;
    } else {
      this._sizedBox.style.removeProperty("height");
    }
  }
}

customElements.define("sized-box", SizedBox);
