class CustomAccordion extends HTMLElement {
  static get observedAttributes() {
    return ["title", "content", "src"];
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      .custom-faq {
        width: 100%;
        border-radius: 8px;
        transition: 0.5s ease;
      }
    
      .custom-faq .header {
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        box-sizing: border-box;
        cursor: pointer;
      }
    
      .custom-faq .header .title {
        font-size: var(--text-l-size);
        height: var(--text-l-height);
        font-weight: var(--semiBold-font-weight);
        color: var(--gray-900);
        font-family: var(--app-font)
      }

      .custom-faq .header .arrow-icon{
        transition: 0.5s ease;
      }
    
      .custom-faq .body {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        box-sizing: border-box;
        transition: 0.5s ease;
      }
    
      .custom-faq .body .content{
        width: 100%;
        margin: 0;
        padding: 0 16px 16px 16px;
        box-sizing: border-box;
        font-family: var(--app-font);
        color: var(--gray-700);
        font-size: var(--text-l-size);
        font-weight: 400;
        line-height: 20px;
      }

      .content{
        color: var(--gray-700)
      }

      .custom-faq .body .img-holder {
        padding: 0 16px 16px 16px;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 4px;
      }

      .custom-faq .body .img-holder .img {
        max-width: 100%;
        max-heigt: 100%;
        display: block;
        margin: auto;
        overflow: hidden;
        border-radius: 4px;
      }
    
      .custom-faq.active .header .arrow-icon{
        transform: rotate(180deg);
        transition: 0.5s ease;
      }

      .custom-faq.active {
        background-color: var(--gray-50);
        transition: 0.2s ease;
      }
    
      .custom-faq.active .body {
        max-height: 500px;
        transition: 0.5s ease;
      }
    
    </style>

      <div class="custom-faq">
        <div class="header">
          <p class="title"></p>
          <img class="arrow-icon" src="../../assets/icons/arrow_down.svg" alt="arrow-icon">
        </div>
        <div class="body">
          <p class="content"></p>
          <div class="img-holder"></div>
        </div>
      </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector(".custom-faq");

    this.faqHeader = this._shadowRoot.querySelector(".custom-faq .header");
    this.faqTitle = this._shadowRoot.querySelector(
      ".custom-faq .header .title"
    );
    this.arrowIcon = this._shadowRoot.querySelector(".arrow-icon");

    this.faqBody = this._shadowRoot.querySelector(".custom-faq .body");
    this.faqContent = this._shadowRoot.querySelector(
      ".custom-faq .body .content"
    );
    this.faqImgHolder = this._shadowRoot.querySelector(
      ".custom-faq .body .img-holder"
    );

    if (this.getAttribute("src")) {
      const img = document.createElement("img");
      img.setAttribute("src", this.getAttribute("src"));
      img.classList.add("img");
      this.faqImgHolder.appendChild(img);
    }
  }

  connectedCallback() {
    this.faqHeader.addEventListener("click", this.toggleActive.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.faqHeader.removeEventListener("click", this.toggleActive.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "id") {
        this.input.setAttribute("id", newValue);
      }
      this.render();
    }
  }

  toggleActive() {
    if (this.container.classList.contains("active")) {
      this.container.classList.remove("active");
    } else {
      this.container.classList.add("active");
    }
    this.arrowIcon.toggleAttribute("active");
  }

  render() {
    this.faqTitle.textContent = this.getAttribute("title") || "";
    this.faqContent.textContent = this.getAttribute("content") || "";
  }
}

customElements.define("custom-accordion", CustomAccordion);
