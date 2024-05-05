const activityTemplate = `
<style>
  * {
    padding: 0;
    margin: 0;
    font-family: var(--app-font);
  }

  .leading-icon {
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 8px;
    flex-shrink: 0;
  }

  .label-text {
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; 
    font-size: 16px;
    font-weight: 600;
    color: #262627;
    max-width: 100%;
  }

  .label-text.more {
    -webkit-line-clamp: unset;
  }

  .content-text {
    margin-left: 4px;
    margin-right: 4px;
    font-size: 16px;
    color: #5c5c5d;
    font-weight: 400;
  }

  a {
    font-size: 16px;
    color: #5c5c5d;
    font-weight: 400;
    text-decoration: var(--underline-text-decoration);
    margin-left: 5px;
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: background-color 0.3s ease; /* Add transition effect */
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .divider {
    border: 1px solid var(--gray-50);
    width: 100%;
  }

  .menu-icon {
    background-image: url("../../assets/icons/menu.svg");
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 8px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }


  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown a:hover {
    background-color: #ddd;
  }

  .show {
    display: block;
  }
</style>

<div class="container">
  <div class="leading-icon"></div>
  <p class="text-l-semi-bold label-text"></p>
  <div class="dropdown">
    <div class="menu-icon" ></div>
    <div id="myDropdown" class="dropdown-content">
      <a>View detail</a>
      <a>Log out</a>
      <a>I don't recognise this</a>
    </div>
  </div>
</div>

<div style="height: 16px"></div>

<div class="divider"></div>

<div style="height: 16px"></div>
`;

class ActivityTile extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = activityTemplate;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const leadingIconSrc = this.getAttribute("src");
    const title = this.getAttribute("title");
    const content = this.getAttribute("content");

    const leadingIconComponent =
      this._shadowRoot.querySelector(".leading-icon");
    const labelTextComponent = this._shadowRoot.querySelector(".label-text");
    labelTextComponent.textContent = title;

    const contentTextComponent = document.createElement("span");
    contentTextComponent.classList.add("content-text");

    const htmlElement = this;
    let isViewMore = false;

    if (content.length > 60) {
      window.addEventListener("resize", function (event) {
        if (!isViewMore) {
          const containerWidth =
            htmlElement._shadowRoot.querySelector(".container").clientWidth;
          _truncatedRender(Number((containerWidth / 10).toFixed(0)));
        }
      });

      _truncatedRender(60);

      function _truncatedRender(number) {
        let truncated = content.substring(0, number);
        contentTextComponent.textContent = `${truncated}...`;

        const viewMoreTextComponent = document.createElement("a");
        const viewLessTextComponent = document.createElement("a");

        labelTextComponent.appendChild(viewMoreTextComponent);
        contentTextComponent.appendChild(viewLessTextComponent);

        viewMoreTextComponent.textContent = "View more";

        viewMoreTextComponent.addEventListener("click", function () {
          viewLessTextComponent.textContent = "View less";
          contentTextComponent.textContent = content;
          labelTextComponent.classList.add("more");
          isViewMore = true;
          contentTextComponent.appendChild(viewLessTextComponent);
        });

        viewLessTextComponent.addEventListener("click", function () {
          _truncatedRender(number);
        });

        contentTextComponent.appendChild(viewMoreTextComponent);
      }
    } else {
      contentTextComponent.textContent = content;
    }

    labelTextComponent.appendChild(contentTextComponent);

    leadingIconComponent.style.backgroundImage = `url(${leadingIconSrc})`;

    const menuIcon = this._shadowRoot.querySelector(".menu-icon");
    menuIcon.addEventListener("click", function (event) {
      const dropdown = htmlElement._shadowRoot.getElementById("myDropdown");

      dropdown.classList.toggle("show");

      // Stop the event from propagating to the window listener
      // event.stopPropagation();
    });

    // Attach a window click event listener to close the dropdown when clicking outside
    window.addEventListener("click", function (event) {
      const dropdown = htmlElement._shadowRoot.getElementById("myDropdown");

      // Check if the click event occurred outside the dropdown
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  }
}

customElements.define("activity-tile", ActivityTile);
