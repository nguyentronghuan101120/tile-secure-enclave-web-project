///NOTE: how to use  <list-tile leading-icon-src="./assets/icons/information.svg" label="This is label"></list-tile>

const listTileTemplate = `

<style>
      * {
        padding: 0;
        margin: 0;
        font-family: var(--app-font);
      }

      .container {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: start;
        border-radius: 8px;
      }

      .container:hover {
        background-color: var(--gray-50);
      }

      .container:active {
        background-color: var(--primary-50);
      }

      .leading-icon {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat ;
        border-radius: 50%;
        margin-top: 8px;
      }

      .label {
        margin-left: 4px;
        font-size: var(--text-xl-size);
        height: var(--text-xl-height);
        font-weight: var(--semiBold-font-weight);
        color: var(--text-color);
        margin-top: 5px;
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      
      }

      .trailing-icon {
        background-image: url("../../assets/icons/arrow-right.svg");
        width: 18px;
        height: 20px;
        margin-left: 8px;
      }

      .container:active .label {
        color: var(--primary-500);
      }
    </style>

    <div class="container">
      <div class="leading-icon"></div>
      <p class="label">Nav item</p>
      <div class="trailing-icon"></div>
    </div>
`;

class ListTile extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = listTileTemplate;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const leadingIconSrc = this.getAttribute("leading-icon-src");
    const label = this.getAttribute("label");

    const icon = this._shadowRoot.querySelector(".leading-icon");
    const labelElement = this._shadowRoot.querySelector(".label");

    icon.style.backgroundImage = `url(${leadingIconSrc})`;
    labelElement.textContent = label;
  }
}

customElements.define("list-tile", ListTile);
