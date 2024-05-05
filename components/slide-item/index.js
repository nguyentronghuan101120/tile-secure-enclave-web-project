class SliceItem extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .slice-item {
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="slice-item">
        <slot></slot>
      </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.append(template.content.cloneNode(true));
  }
}

customElements.define("slice-item", SliceItem);
