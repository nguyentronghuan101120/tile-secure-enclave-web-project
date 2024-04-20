const tooltipContent = `
      <style>
        .tooltip {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        
        .tooltip .tooltip-container {
          visibility: hidden;
          max-width: 400px;
          width: max-content;
          background-color: var(--white);
          border-radius: 8px;
          padding: 8px 12px;
          position: absolute;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .tooltip[trigger="hover"]:hover .tooltip-container {
          visibility: visible;
          opacity: 1;
        }

        .tooltip .tooltip-title {
          color: var(---gray-700);
          font-size: var(--text-m-size);
        }
        
        /* Position styles */
        .tooltip[position="top"] .tooltip-container {
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          border-color: transparent transparent var(--white) transparent;
          top: auto;
        }
        
        .tooltip[position="bottom"] .tooltip-container {
          top: 125%;
          left: 50%;
          transform: translateX(-50%);
          border-color: var(--white) transparent transparent transparent;
          bottom: auto;
        }
        
        .tooltip[position="left"] .tooltip-container {
          top: 50%;
          right: 125%;
          transform: translateY(-50%);
          border-color: transparent var(--white) transparent transparent;
          left: auto;
        }
        
        .tooltip[position="right"] .tooltip-container {
          top: 50%;
          left: 125%;
          transform: translateY(-50%);
          border-color: transparent transparent transparent var(--white);
          right: auto;
        }

        .tooltip[position="top-left"] .tooltip-container {
          bottom: 125%;
          right: 80%;
          transform: translateX(0);
          border-color: transparent transparent var(--white) transparent;
          top: auto;
        }

        .tooltip[position="top-right"] .tooltip-container {
          bottom: 125%;
          left: 80%;
          transform: translateX(0);
          border-color: transparent transparent var(--white) transparent;
          top: auto;
        }

        .tooltip[position="bottom-left"] .tooltip-container {
          top: 125%;
          right: 80%;
          transform: translateX(0);
          border-color: var(--white) transparent transparent transparent;
          bottom: auto;
        }

        .tooltip[position="bottom-right"] .tooltip-container {
          top: 125%;
          left: 80%;
          transform: translateX(0);
          border-color: var(--white) transparent transparent transparent;
          bottom: auto;
        }
      </style>
      <div class="tooltip">
        <slot></slot>
        <div class="tooltip-container">
          <div class="tooltip-title"></div>
          <slot name="tooltip-content"></slot>
        </div>
      </div>
    `;

class Tooltip extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = tooltipContent;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.append(template.content.cloneNode(true));

    this.tooltip = this._shadowRoot.querySelector(".tooltip");
    this.tooltipContainer =
      this._shadowRoot.querySelector(".tooltip-container");
    this.tooltipText = this._shadowRoot.querySelector(".tooltip-title");
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this.getAttribute("trigger") === "click") {
      this.tooltip.removeEventListener("click", this.handleClick.bind(this));
    }
  }

  render() {
    const tooltipText = this.getAttribute("text") || "";
    const position = this.getAttribute("position") || "top";
    const trigger = this.getAttribute("trigger") || "hover";

    this.tooltip.setAttribute("position", position);
    this.tooltip.setAttribute("trigger", trigger);
    this.tooltipText.textContent = tooltipText;

    if (trigger === "click") {
      this.tooltip.addEventListener("click", this.handleClick.bind(this));
    }
  }

  handleClick() {
    const visibility = this.tooltipContainer.style.visibility;

    if (visibility === "visible") {
      this.tooltipContainer.style.visibility = "hidden";
      this.tooltipContainer.style.opacity = "0";
    } else {
      this.tooltipContainer.style.visibility = "visible";
      this.tooltipContainer.style.opacity = "1";
    }
  }
}

customElements.define("custom-tooltip", Tooltip);
