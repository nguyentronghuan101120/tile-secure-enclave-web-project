class CustomAddressSelectorOption extends HTMLElement {
    static get observedAttributes() {
      return ["adr", "score", "speed", "src", "id" ];
    }
  
    constructor() {
      super();
    
      const template = document.createElement('template');
      template.innerHTML = `
      <style>
        .custom-address-selector-option {
          width: 100%;
          border-radius: 4px;
        }
  
        .custom-address-selector-option .cas_header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          border-radius: 4px;
          min-height: 44px;
          box-sizing: border-box;
        }
  
        .custom-address-selector-option .cas_header .container-1{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          gap: 6px;
        }
  
        .custom-address-selector-option .cas_header .container-1 .cas_img {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          background-color: var(--gray-300);
          border-radius: 4px;
          overflow: hidden;
        }
  
        .custom-address-selector-option .cas_header .container-1 .cas_img img {
          width: 28px;
          height: 28px;
        }
  
        .custom-address-selector-option .cas_header .container-1 .cas_adr .cas_adr-text, 
        .custom-address-selector-option .cas_header .container-1 .separator p, 
        .custom-address-selector-option .cas_header .container-1 .cas_score p, 
        .custom-address-selector-option .cas_body .show_more-text {
          font-family: var(--app-font);
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          margin: 0;
        }
  
        .custom-address-selector-option .cas_header .container-1 .cas_score {
          display: flex;
          gap: 2px;
          justify-content: center;
          align-items: center;
        }
  
        .custom-address-selector-option .cas_header .container-2 {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
        }
  
        .custom-address-selector-option .cas_header .container-2 p {
          font-family: var(--app-font);
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: var(--success-500);
        }
  
        .custom-address-selector-option .cas_header .container-2 img {
          width: 20px;
          height: 20px;
        }
  
        .custom-address-selector-option .cas_header .container-3 {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--primary-500);
          display: grid;
          align-items: center;
          justify-items: center;
          position: relative;
          cursor: pointer;
        }
     
      </style>
  
      <div class="custom-address-selector-option">
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
            <img class="switch icon" src="../../assets/icons/switch.svg" alt="switch-icon">
          </div>
        </div>
      </div>
      `;
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
  
      this.container = this._shadowRoot.querySelector('.custom-address-selector-option');
      this.addressText = this._shadowRoot.querySelector('.custom-address-selector-option .cas_adr-text');
      this.scoreText = this._shadowRoot.querySelector('.custom-address-selector-option .score-text');
      this.speedText = this._shadowRoot.querySelector('.custom-address-selector-option .speed-text');
  
      this.imageHolder = this._shadowRoot.querySelector('.custom-address-selector-option .cas_img');
  
  
      if (this.getAttribute('src')) {
        const img = document.createElement('img');
        img.setAttribute('src', this.getAttribute('src'));
        img.classList.add('img');
        this.imageHolder.appendChild(img);
      }
    }
  
    connectedCallback() {
      this.render()
    }
  
    disconnectedCallback() {
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (this.hasAttribute("id")) {
          if (name === 'id') {
            this.container.setAttribute('id', newValue);
          }
        }
        this.render();
      }
    }
  
    render() {
      this.addressText.textContent = this.getAttribute("address") || "";
      this.scoreText.textContent = this.getAttribute("score") || "";
      this.speedText.textContent = this.getAttribute("speed") || "";
  
  
      // this.container.setAttribute("id", this.getAttribute("id"))
    }
  }
  
  customElements.define('custom-address-selector-option', CustomAddressSelectorOption);