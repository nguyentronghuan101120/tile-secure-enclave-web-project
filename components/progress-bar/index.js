/// NOTE: <progress-bar count-of-progress="4" current-step="3" content-of-circle="hello;hello2;hello3;hello4;" ></progress-bar>

const progressBarTemplate = `
<style>
* {
  margin: 0px;
  padding: 0;
  box-sizing: border-box;
  font-size: var(--text-xl-size);
  font-weight: var(--semiBold-font-weight);
  font-family: var(--app-font);

}

/* TODO: Remove this later */
body {
  display: flex;
  align-items: center;
  justify-content: center;

}


.progress-bar-container .steps {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
}

.steps .circle {
  height: 32px;
  width: 32px;
  background: var(--primary-50);
  border: 2px solid var(--gray-200);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-300);
  transition: all 200ms ease;
  transition-delay: 0s;
}

.steps .circle.activating {
  transition-delay: 100ms;
  border: 4px solid var(--gray-100);
  background-color: var(--primary-500);
  color: var(--white);
}

.steps .circle.activated {
  transition-delay: 100ms;
  border: 2px solid var(--primary-500);
  background-color: var(--gray-100);
  color: var(--primary-500);
}

.steps .progress-bar {
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--gray-100);
  z-index: -1;
  top: 35px;
}

.progress-bar .indicator {
  position: absolute;
  height: 100%;
  width: 30%;
  background: var(--primary-500);
  transition: all 200ms ease;
}

.step-child-container{
  display: flex;
  flex-direction: column;
  
  justify-content: center; /* Align items (circles) vertically at the center */
  width: 100px;
  height: 100px;
  word-wrap: break-word;
}

.step-child-container.align-items-end{
  align-items: end;
}

.step-child-container.align-items-center{
  align-items: center;
}

.content-of-circle{
  margin-top: 8px;
  color: var(--gray-300);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
          line-clamp: 1; 
  -webkit-box-orient: vertical;
  
}

.content-of-circle.activating{
  color: var(--primary-700)
}

.content-of-circle.activated{
  color: var(--gray-700)
}

</style>
<div class="progress-bar-container">
  <div class="steps">
    <div class="progress-bar">
      <span class="indicator"></span>
    </div>
  </div>
</div>

`;

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = progressBarTemplate;

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const countOfProgress = this.getAttribute("count-of-progress") || 0;
    const currentStep = this.getAttribute("current-step") || 0;
    const contentOfCircleString = this.getAttribute("content-of-circle");
    const stepsContainer = this._shadowRoot.querySelector(".steps");
    const progressBar = this._shadowRoot.querySelector(".indicator");

    for (let i = 1; i <= countOfProgress; i++) {
      const stepChildContainer = document.createElement("div");
      const circle = document.createElement("span");
      const contentOfCircle = document.createElement("p");

      stepChildContainer.classList.add("step-child-container");

      circle.classList.add("circle");
      contentOfCircle.classList.add("content-of-circle");

      stepChildContainer.classList.add("align-items-center");
      if (i === parseInt(currentStep)) {
        circle.classList.add("activating");
        contentOfCircle.classList.add("activating");
      } else if (i <= parseInt(currentStep)) {
        if (i === 1) {
          stepChildContainer.classList.remove("align-items-center");
        }

        circle.classList.add("activated");
        contentOfCircle.classList.add("activated");
      }

      if (i === parseInt(countOfProgress)) {
        stepChildContainer.classList.remove("align-items-center");
        stepChildContainer.classList.add("align-items-end");
      }

      const listConentOfCircle = contentOfCircleString.split(";");

      circle.textContent = i;
      contentOfCircle.textContent = listConentOfCircle[i - 1];
      stepsContainer.appendChild(stepChildContainer);
      stepChildContainer.appendChild(circle);
      stepChildContainer.appendChild(contentOfCircle);
    }

    const circles = this._shadowRoot.querySelectorAll(".circle");

    progressBar.style.width = `${
      ((parseInt(currentStep) - 1) / (parseInt(circles.length) - 1)) * 100
    }%`;
  }
}

customElements.define("progress-bar", ProgressBar);
