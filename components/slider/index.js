class Slider extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .slider-container {
          display: flex;
        }

        .slider-button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        .button-wrapper {
          width: 138px;
        }

        .prev-button, .next-button {
          visibility: hidden;
          width: 98px;
          display: block;
        }

        .prev-button.active, .next-button.active {
          visibility: visible;
        }

        .slider-progress {
          width: 100%;
          height: 4px;
          background-color: var(--gray-50);
          margin-top: 12px;
        }

        .active-progress {
          width: 0;
          height: 100%;
          background-color: var(--primary-500);
          transition: width 0.3s ease-in-out;
        }

        .slider-count {
          padding: 4px 8px;
          color: var(--gray-500);
        }

        ::slotted(slide-item) {
          width: 100%;
          height: 100%;
          display: none;
        }

        ::slotted(slide-item.active) {
          display: block;
        }
      </style>
      <div>
        <div class="slider-container">
          <slot></slot>
        </div>
        <div class="slider-button-container">
          <div class="button-wrapper">
            <custom-button full-width class="prev-button">Prev</custom-button>
          </div>
          <div class="button-wrapper">
            <custom-button full-width class="next-button active">Next</custom-button>
          </div>
        </div>
        <div class="slider-progress">
          <div class="active-progress"></div>
        </div>
        <div class="slider-count"></div>
        </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.append(template.content.cloneNode(true));

    this.container = this.shadowRoot.querySelector(".slider-container");
    this.activeProgress = this.shadowRoot.querySelector(".active-progress");
    this.sliderCount = this.shadowRoot.querySelector(".slider-count");
    this.currentSlideIndex = 0;
    this.slides = Array.from(this.querySelectorAll("slide-item"));

    this.prevButton = this.shadowRoot.querySelector(".prev-button");
    this.nextButton = this.shadowRoot.querySelector(".next-button");
  }

  connectedCallback() {
    this.prevButton.addEventListener("click", this.prev.bind(this));
    this.nextButton.addEventListener("click", this.next.bind(this));
    this.showCurrentSlide();
  }

  next() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.showCurrentSlide();
  }

  prev() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.showCurrentSlide();
  }

  showCurrentSlide() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlideIndex);
    });

    this.prevButton.classList.toggle("active", this.currentSlideIndex > 0);
    this.nextButton.classList.toggle(
      "active",
      this.currentSlideIndex < this.slides.length - 1
    );

    this.activeProgress.style.width = `${
      ((this.currentSlideIndex + 1) / this.slides.length) * 100
    }%`;

    this.sliderCount.innerHTML = `${this.currentSlideIndex + 1} / ${
      this.slides.length
    }`;
  }
}

customElements.define("custom-slider", Slider);
