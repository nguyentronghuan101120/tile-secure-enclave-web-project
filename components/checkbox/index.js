class CustomCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'id', 'state', 'disabled'];
  }

  constructor() {
    super();
  
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
      .custom-checkbox {
        box-sizing: border-box;
        display: grid;
        align-content: center;
        justify-content: center;
        position: relative;
      }

      .custom-checkbox .icon {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .custom-checkbox.checkbox {
        border-radius: 2px;
      }

      .custom-checkbox.radio, .custom-checkbox.check-circle {
        border-radius: 50%;
      }

      .custom-checkbox.unchecked {
        border: 1px solid var(--gray-400);
        background-color: var(--white);
      }

      .custom-checkbox.checked, .custom-checkbox.indeterminate {
        border: 1px solid var(--primary-500);
        background-color: var(--primary-50);
      }

      .custom-checkbox.check-circle.checked {
        background-color: var(--primary-500);
      }

      .custom-checkbox.checkbox.checked .check.icon{
        filter: invert(24%) sepia(52%) saturate(3955%) hue-rotate(208deg) brightness(96%) contrast(108%);
        display: block;
      }

      .custom-checkbox.checkbox.indeterminate .indeterminate.icon{
        filter: invert(24%) sepia(52%) saturate(3955%) hue-rotate(208deg) brightness(96%) contrast(108%);
        display: block;
      }

      .custom-checkbox.check-circle.checked .check.icon{
        filter: invert(1);
        display: block;
      }

      .custom-checkbox.radio.checked .radio.icon{
        filter: invert(24%) sepia(52%) saturate(3955%) hue-rotate(208deg) brightness(96%) contrast(108%);
        display: block;
      }

      .custom-checkbox.sm {
        width: 16px;
        height: 16px;
      }

      .custom-checkbox.sm .icon {
        width: 12px;
        height: 12px;
      }

      .custom-checkbox.sm .radio.icon {
        width: 6px;
        height: 6px;
      }

      .custom-checkbox.md {
        width: 20px;
        height: 20px;
      }

      .custom-checkbox.md .icon {
        width: 14px;
        height: 14px;
      }

      .custom-checkbox.md .radio.icon {
        width: 8px;
        height: 8px;
      }

      .custom-checkbox:hover {
        border: 1px solid var(--primary-500);
        background-color: var(--primary-50);
      }

      .custom-checkbox.disabled {
        border: 1px solid var(--gray-300);
        background-color: var(--gray-50);
      }

      .custom-checkbox.disabled .icon {
        filter: invert(96%) sepia(0%) saturate(2005%) hue-rotate(180deg) brightness(77%) contrast(91%) !important;
      }
    </style>

    <div class="custom-checkbox">
      <img class="radio icon" src="../../assets/icons/dot.svg" alt="radio-icon">
      <img class="check icon" src="../../assets/icons/check.svg" alt="check-icon">
      <img class="indeterminate icon" src="../../assets/icons/minus.svg" alt="indeterminate-icon">
    </div>
    `;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector('.custom-checkbox');

    if (this.getAttribute('type') === "radio") {
      const img = document.createElement('img');
      img.setAttribute('src', "../../assets/icons/dot.svg");
      img.classList.add('icon');
      this.container.appendChild(img);
    } else {

    }
  }

  connectedCallback() {
    this.container.addEventListener("click", this.toggleState.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.container.removeEventListener("click", this.toggleState.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (this.hasAttribute("id")) {
        if (name === 'id') {
          this.input.setAttribute('id', newValue);
        }
      }
      this.render();
    }
  }

  toggleState() {
    if (!this.container.classList.contains("disabled")) {
      if (this.container.classList.contains("unchecked") || this.container.classList.contains("indeterminate")) {
        this.container.classList.add("checked");
        this.container.classList.remove("unchecked");
        this.container.classList.remove("indeterminate");
      } else {
        this.container.classList.add("unchecked");
        this.container.classList.remove("checked");
        this.container.classList.remove("indeterminate");
      }
    }
  }

  render() {
    this.container.classList.add(this.getAttribute('type'));
    this.container.classList.add(this.getAttribute('size'));

    if (this.hasAttribute("state")) {
      this.container.classList.add(this.getAttribute('state'));
    } else {
      this.container.classList.add('default');
    }

    if (this.hasAttribute("disabled")) {
      if( this.getAttribute('disabled') == "true") {
        this.container.classList.add("disabled");
      } else {
        this.container.classList.remove("disabled");
      }
    }
  }
}

customElements.define('custom-checkbox', CustomCheckbox);