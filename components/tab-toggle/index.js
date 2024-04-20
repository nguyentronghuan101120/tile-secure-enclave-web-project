class CustomTabToggle extends HTMLElement {
  static get observedAttributes() {
    return ['content1', 'src1', 'content2', 'src2', 'id', 'state', 'background-color'];
  }

  constructor() {
    super();
  
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
      .custom-tab-toggle {
        display: flex;
        align-items: stretch;
        justify-content: center;
        width: 100%;
        padding: 8px;
        gap: 8px;
        border-radius: 8px;
        box-sizing: border-box;
        position: relative;
        transition: 0.5s ease;
      }

      .custom-tab-toggle > * {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        padding: 16px;
        z-index: 2;
        transition: 0.5s ease;
        cursor: pointer;
      }

      .custom-tab-toggle > * .img-holder .icon {
        width: 24px;
        height: 24px;
        transition: 0.5s ease;
        filter: invert(37%) sepia(6%) saturate(65%) hue-rotate(201deg) brightness(92%) contrast(88%);
      }

      .custom-tab-toggle .tab1 p,
      .custom-tab-toggle .tab2 p {
        margin: 0;
        text-align: center;
        font-family: var(--app-font);
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        transition: 0.5s ease;
        color: var(--gray-700);
      }

      .custom-tab-toggle.state1 .tab1 p,
      .custom-tab-toggle.state2 .tab2 p {
        transition: 0.5s ease;
        color: var(--gray-900);
      }

      .custom-tab-toggle.state1 .tab1 .img-holder .icon,
      .custom-tab-toggle.state2 .tab2 .img-holder .icon {
        transition: 0.5s ease;
        filter: invert(26%) sepia(100%) saturate(1718%) hue-rotate(204deg) brightness(88%) contrast(115%);
      }

      .custom-tab-toggle.state1 .tab1 p,
      .custom-tab-toggle.state2 .tab2 p, {
        transition: 0.5s ease;
        color: var(--gray-900) !important;
      }

      .custom-tab-toggle .slider {
        position: absolute;
        top: 8px;
        left: 8px;
        background-color: var(--white);
        box-sizing: border-box;
        width: calc(50% - 12px);
        height: calc(100% - 16px);
        border-radius: 8px;
        box-shadow: 0px 4px 12px -4px #10182814;
        transition: 0.5s ease;
        z-index: 1;
      }

      .custom-tab-toggle.state2 .slider {
        transform: translateX(calc(100% + 6px));
        transition: 0.5s ease;
      }

    </style>

    <div class="custom-tab-toggle">
      <div class="tab1">
        <div class="img-holder"></div>
        <p class="content"></p>
      </div>
      <div class="tab2">
        <div class="img-holder"></div>
        <p class="content"></p>
      </div>
      <div class="slider"></div>
    </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector('.custom-tab-toggle');

    this.tab1 = this._shadowRoot.querySelector('.custom-tab-toggle .tab1');
    this.img_holder1 = this._shadowRoot.querySelector('.custom-tab-toggle .tab1 .img-holder');
    this.content1 = this._shadowRoot.querySelector('.custom-tab-toggle .tab1 .content');

    this.tab2 = this._shadowRoot.querySelector('.custom-tab-toggle .tab2');
    this.img_holder2 = this._shadowRoot.querySelector('.custom-tab-toggle .tab2 .img-holder');
    this.content2 = this._shadowRoot.querySelector('.custom-tab-toggle .tab2 .content');

    this.slider = this._shadowRoot.querySelector('.custom-tab-toggle .slider');

    const img1 = document.createElement('img');
    img1.setAttribute('src', this.getAttribute("src1"));
    img1.classList.add('icon');
    this.img_holder1.appendChild(img1);

    const img2 = document.createElement('img');
    img2.setAttribute('src', this.getAttribute("src2"));
    img2.classList.add('icon');
    this.img_holder2.appendChild(img2);
  }

  connectedCallback() {
    this.tab1.addEventListener("click", this.changeToState1.bind(this));
    this.tab2.addEventListener("click", this.changeToState2.bind(this));
    this.render()
  }

  disconnectedCallback() {
    this.tab1.removeEventListener("click", this.changeToState1.bind(this));
    this.tab2.removeEventListener("click", this.changeToState2.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'id') {
        this.container.setAttribute('id', newValue);
      }
      this.render();
    }
  }

  changeToState1() {
    this.container.classList.add('state1')
    this.container.classList.remove('state2')
  }

  changeToState2() {
    this.container.classList.add('state2')
    this.container.classList.remove('state1')
  }

  render() {
    this.content1.textContent = this.getAttribute('content1') || '';
    this.content2.textContent = this.getAttribute('content2') || '';
    this.container.classList.add(this.getAttribute('state'))

    if (this.hasAttribute("background-color")) {
      this.container.style.backgroundColor = this.getAttribute("background-color");
    } else {
      this.container.style.backgroundColor = "var(--gray-50)"
    }
  }
}

customElements.define('custom-tab-toggle', CustomTabToggle);