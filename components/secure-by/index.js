const secureByTemplate = `
  <style>
    * {
      margin: 0;
      padding: 0;
      font-size: var(--text-m-size);
      color: var(--gray-700);
      font-family: var(--app-font);
    }

    .display-flex {
      display: flex;
    }
    
    .align-center {
      align-items: center;
    }
    
    .justify-center {
      justify-content: center;
    }

    .tide-logo-icon,
    .information-icon {
      background-repeat: no-repeat;
      background-size: contain;
    }

    .tide-logo-icon {
      background-image: url("../../assets/icons/tide-logo.svg");
      width: 57px;
      height: 24px;
      margin-left: 8px;
    }
    
    .information-icon {
      background-image: url("../../assets/icons/information.svg");
      width: 18px;
      height: 18px;
      filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(387%) hue-rotate(291deg) brightness(96%) contrast(94%);
      margin-left: 8px;
    }
  </style>

  <div class="display-flex justify-center align-center">
    <p>Secured by</p>
    <div class="tide-logo-icon"></div>
    <div class="information-icon"></div>
  </div>
`;

class SecureBy extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = secureByTemplate;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("secure-by", SecureBy);
