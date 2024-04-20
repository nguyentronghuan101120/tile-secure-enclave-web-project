class CustomAddressSelector extends HTMLElement {
  static get observedAttributes() {
    return ["adr", "score", "speed", "src", "id" ];
  }

  constructor() {
    super();
  
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
      .custom-address-selector {
        width: 100%;
        background-color: var(--gray-50);
        border-radius: 4px;
      }

      .custom-address-selector .cas_header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-radius: 4px;
        min-height: 44px;
        box-sizing: border-box;
      }

      .custom-address-selector .cas_header .container-1{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        gap: 6px;
      }

      .custom-address-selector .cas_header .container-1 .cas_img {
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        background-color: var(--gray-300);
        border-radius: 4px;
        overflow: hidden;
      }

      .custom-address-selector .cas_header .container-1 .cas_img img {
        width: 28px;
        height: 28px;
      }

      .custom-address-selector .cas_header .container-1 .cas_adr .cas_adr-text, 
      .custom-address-selector .cas_header .container-1 .separator p, 
      .custom-address-selector .cas_header .container-1 .cas_score p, 
      .custom-address-selector .cas_body .show_more-text {
        font-family: var(--app-font);
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        margin: 0;
      }

      .custom-address-selector .cas_header .container-1 .cas_score {
        display: flex;
        gap: 2px;
        justify-content: center;
        align-items: center;
      }

      .custom-address-selector .cas_header .container-2 {
        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: center;
      }

      .custom-address-selector .cas_header .container-2 p {
        font-family: var(--app-font);
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: var(--success-500);
      }

      .custom-address-selector .cas_header .container-2 img {
        width: 20px;
        height: 20px;
      }

      .custom-address-selector .cas_header .container-3 {
        width: 24px;
        height: 24px;
        display: grid;
        align-items: center;
        justify-items: center;
        position: relative;
      }

      .custom-address-selector .cas_header .container-3 img {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .custom-address-selector .cas_body {
        box-sizing: border-box;
        border-radius: 4px;
        max-height: 0;
        overflow: hidden;
      }

      .custom-address-selector .cas_body .option-list > *:nth-child(n+4) {
        display: none;
      }

      .custom-address-selector .cas_body .option-list.show-all > *:nth-child(n+4) {
        display: initial;
      }

      .custom-address-selector .cas_body .replace-text,
      .custom-address-selector .cas_body .cyo-text {
        font-family: var(--app-font);
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 12px;
        margin-left: 8px;
        margin-right: 8px;
      }

      .custom-address-selector .cas_body .show_more-text {
        text-decoration: underline;
        cursor: pointer;
        margin-top: 6px; 
        margin-bottom: 12px; 
        margin-left: 8px;
        margin-right: 8px;
      }

      .custom-address-selector .cas_body .show_more-text.hidden {
        display: none;
      }

      .custom-address-selector .cas_body .cyo-text {
        margin-bottom: 6px; 
      }

      .custom-address-selector .cas_body .optional-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
        margin-left: 8px;
        margin-right: 8px;
      }

      .custom-address-selector .cas_body .optional-input input {
        width: 100%;
        padding: 14px;
        border: 1px solid var(--gray-400);
        border-radius: 4px;
        box-sizing: border-box;
        font-family: var(--app-font);
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        outline: none;
      }

      .custom-address-selector .cas_body .optional-input .switch-button {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        border: 1px solid var(--primary-500);
        border-radius: 50%;
        cursor: pointer;
      }

      .custom-address-selector.active {
        background-color: var(--primary-50);
      }

      .custom-address-selector .cas_header .x {
        z-index: -1;
        opacity: 0;
      }
      .custom-address-selector .cas_header .burger_dot {
        z-index: 1;
        opacity: 1;
      }

      .custom-address-selector.active .cas_header .x {
        z-index: 1;
        opacity: 1;
      }
      .custom-address-selector.active .cas_header .burger_dot {
        opacity: 0;
        z-index: -1;
      }

      .custom-address-selector.active .cas_body {
        max-height: 800px;
      }
   
    </style>

    <div class="custom-address-selector">
      <div class="cas_header">
        <div class="container-1">
          <div class="cas_img"></div>
          <div class="cas_adr">
            <p class="cas_adr-text"></p>
          </div>
          <div class="separator">
            <p>|</p>
          </div>
          <div class="cas_score">
            <img class="star icon" src="../../assets/icons/star.svg" alt="star-icon">
            <p class="score-text"></p>
          </div>
        </div>
        <div class="container-2">
          <p class="speed-text"></p>
          <img class="speed icon" src="../../assets/icons/speed.svg" alt="speed-icon">
        </div>
        <div class="container-3">
          <img class="burger_dot icon" src="../../assets/icons/burger_dot.svg" alt="burger_dot-icon">
          <img class="x icon" src="../../assets/icons/x-black.svg" alt="x-icon">
        </div>
      </div>
      <div class="cas_body">
        <p class="replace-text">Replace with...</p>
        <div class="option-list">
        </div>
        <p class="show_more-text">Show more</p>
        <p class="cyo-text">Or choose your own</p>
        <div class="optional-input">
          <input type="text" placeholder="Enter node address">
          <div class="switch-button">
            <img class="switch icon" src="../../assets/icons/switch.svg" alt="switch-icon">
          </div>
        </div>
      </div>
    </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector('.custom-address-selector');
    this.addressText = this._shadowRoot.querySelector('.custom-address-selector .cas_adr-text');
    this.scoreText = this._shadowRoot.querySelector('.custom-address-selector .score-text');
    this.speedText = this._shadowRoot.querySelector('.custom-address-selector .speed-text');
    this.showMoreText = this._shadowRoot.querySelector('.custom-address-selector .show_more-text');

    this.activeButton = this._shadowRoot.querySelector('.custom-address-selector .burger_dot');
    this.inactiveButton = this._shadowRoot.querySelector('.custom-address-selector .x');

    this.optionList = this._shadowRoot.querySelector('.custom-address-selector .option-list');

    this.imageHolder = this._shadowRoot.querySelector('.custom-address-selector .cas_img');


    if (this.getAttribute('src')) {
      const img = document.createElement('img');
      img.setAttribute('src', this.getAttribute('src'));
      img.classList.add('img');
      this.imageHolder.appendChild(img);
    }
  }

  connectedCallback() {
    this.activeButton.addEventListener("click", this.toggleActive.bind(this));
    this.inactiveButton.addEventListener("click", this.toggleActive.bind(this));
    this.showMoreText.addEventListener("click", this.toggleShowAll.bind(this));
    this.render()
  }

  disconnectedCallback() {
    this.activeButton.removeEventListener("click", this.toggleActive.bind(this));
    this.inactiveButton.removeEventListener("click", this.toggleActive.bind(this));
    this.showMoreText.removeEventListener("click", this.toggleShowAll.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (this.hasAttribute("id")) {
        if (name === 'id') {
          this.optionList.setAttribute('id', newValue);
        }
      }
      this.render();
    }
  }

  toggleActive() {
    if (this.container.classList.contains("active")) {
      this.container.classList.remove("active");
      this.optionList.classList.remove("show-all");
      this.showMoreText.classList.remove("hidden");

      if (this.optionList.childElementCount <= 3) {
        this.showMoreText.classList.add("hidden");
      }
    } else {
      this.container.classList.add("active");
    }
  }

  toggleShowAll() {
    this.optionList.classList.add("show-all");
    this.showMoreText.classList.add("hidden");
  }

  render() {
    this.addressText.textContent = this.getAttribute("address") || "";
    this.scoreText.textContent = this.getAttribute("score") || "";
    this.speedText.textContent = this.getAttribute("speed") || "";

    if (this.optionList.childElementCount <= 3) {
      this.showMoreText.classList.add("hidden");
    }
  }
}

customElements.define('custom-address-selector', CustomAddressSelector);