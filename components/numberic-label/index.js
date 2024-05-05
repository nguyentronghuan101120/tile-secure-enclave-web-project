const numbericLabelTemplate = `
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: var(--app-font);
    }

    .numberic-container {
      display: flex;
    }

    .text-l-regular {
      font-size: var(--text-l-size);
      color: var(--gray-500);
      margin-right: 6px;
      width: 32px;
      flex-shrink: 0;
      line-height: 20px;
    }

    .text-l-semi-bold {
      font-size: var(--text-l-size);
      font-weight: var(--semiBold-font-weight);
      color: var(--gray-700);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .skeleton {
      animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200, 20%, 80%);
      }
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }

    .skeleton-text {
      width: 100%;
      height: 16px;
      border-radius: 2px;
    }
  </style>

 <div class="numberic-container"><div>
`;

class NumbericLabel extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = numbericLabelTemplate;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const numberic = this.getAttribute("numberic");
    const content = this.getAttribute("content");
    const status = this.getAttribute("status");

    const numbericContainer = this._shadowRoot.querySelector(
      ".numberic-container"
    );

    const numbericLabel = document.createElement("p");
    const contentLabel = document.createElement("p");
    const skeleton = document.createElement("div");

    numbericLabel.classList.add("text-l-regular");
    contentLabel.classList.add("text-l-semi-bold");

    skeleton.classList.add("skeleton");
    skeleton.classList.add("skeleton-text");

    numbericLabel.textContent = numberic + ".";
    contentLabel.textContent = content;

    numbericContainer.appendChild(numbericLabel);
    if (status === "loading") {
      numbericContainer.appendChild(skeleton);
    } else {
      numbericContainer.appendChild(contentLabel);
    }
  }
}

customElements.define("numberic-label", NumbericLabel);
