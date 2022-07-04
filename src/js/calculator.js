class Model {
  constructor() {
    (this.arrButton = [
      {
        name: "clear",
        label: "AC",
        class: "clear-button",
      },
      {
        name: "1",
        label: 1,
        class: "number",
      },
      {
        name: "2",
        label: 2,
        class: "number",
      },
      {
        name: "3",
        label: 3,
        class: "number",
      },
      {
        name: "4",
        label: 4,
        class: "number",
      },
      {
        name: "5",
        label: 5,
        class: "number",
      },
      {
        name: "6",
        label: 6,
        class: "number",
      },
      {
        name: "7",
        label: 7,
        class: "number",
      },
      {
        name: "8",
        label: 8,
        class: "number",
      },
      {
        name: "9",
        label: 9,
        class: "number",
      },
      {
        name: "0",
        label: 0,
        class: "number",
      },
      {
        name: "dot",
        label: ".",
        class: "dot",
      },
      {
        name: "plus",
        label: "+",
        class: "operator",
      },
      {
        name: "minus",
        label: "-",
        class: "operator",
      },
      {
        name: "multiply",
        label: "*",
        class: "operator",
      },
      {
        name: "divide",
        label: "/",
        class: "operator",
      },
      {
        name: "equal",
        label: "=",
        class: "equal",
      },
    ]),
      (this.queue = []),
      (this.input = 0),
      (this.lastResult = 0);
  }

  calculateQueue = (value) => {
    // value is total element
    if (this.input !== 0) {
      this.input = parseFloat(this.input);
      this.addToQueue(this.input);
    }
    // first element
    var answer = value[0];
    var dividedByZero = 0;
    for (var i = 2; i < value.length; i = i + 2) {
      // index of operator = total - 1
      switch (this.queue[i - 1]) {
        case "+":
          answer += value[i];
          break;
        case "-":
          answer -= value[i];
          break;
        case "/":
          if (value[i] === 0) {
            dividedByZero = 1;
          } else {
            answer = answer / value[i];
          }

          break;
        case "*":
          answer = answer * value[i];
          break;
      }
      this.lastResult = answer;
    }
    // (Number).toFixed(amount number want to show);
    answer = answer.toFixed(10);
    answer = parseFloat(answer);
    if (dividedByZero === 1) {
      this.clearAll();
      document.querySelector(".calculator-screen").innerHTML = "ERROR";
    } else {
      document.querySelector(".calculator-screen").innerHTML = answer;
      this.input = answer;
      this.queue = [];
    }
  };

  addToQueue = (input) => {
    this.queue.push(input);
  };

  // reset all
  clearAll = () => {
    this.queue = [];
    this.input = 0;
    document.querySelector(".calculator-screen").innerHTML = "0";
  };

  numberButton = (arg) => {
    if (this.lastResult != 0) {
      this.clearAll();
      this.lastResult = 0;
    }
    if (
      document.querySelector(".calculator-screen").innerHTML === "ERROR" ||
      (document.querySelector(".calculator-screen").innerHTML == "0" &&
        arg != ".")
    ) {
      document.querySelector(".calculator-screen").innerHTML = "";
    }
    if (!(arg === ".") || !this.input.match(/[.]/)) {
      this.input += arg;
      document.querySelector(".calculator-screen").innerHTML += arg;
    }
  };

  operatorButton = (arg) => {
    if (this.input !== 0 && this.input !== "-") {
      this.input = parseFloat(this.input);
      this.addToQueue(this.input);
      this.addToQueue(arg);
      document.querySelector(".calculator-screen").innerHTML += arg;
      this.input = 0;
    }
    if (arg == "-" && isNaN(this.queue[0]) && this.input !== "-") {
      this.input = "-";
      document.querySelector(".calculator-screen").innerHTML = "-";
    }
  };
}

class View {
  constructor() {
    // this.app = this.getElement("#root");
    this.container = this.createElement("div", "container");
    this.calculator = this.createElement("div", "calculator");
    this.screen = this.createElement("div", "calculator-screen");
    this.button = this.createElement("div", "calculator-button");
    this.calculator.append(this.screen, this.button);
    this.container.append(this.calculator);
    // this.app.append(this.container);
    document.body.appendChild(this.container);
  }
  // updateScreen = (value) =>{

  // }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  render(buttons) {
    buttons.forEach((button) => {
      this.button.innerHTML += `<button id="${button.name}" class="${button.class}"
      value = "${button.label}">${button.label}</button>`;
    });
  }

  // * add event
  bindNumberAndDot = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "number" || e.target.className === "dot") {
        const keyValue = e.target.value;
        handler(keyValue);
      }
    });
  };

  bindClear = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "clear-button") {
        handler();
      }
    });
  };

  bindOperation = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "operator") {
        const keyValue = e.target.value;
        handler(keyValue);
      }
    });
  };

  bindCalculate = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "equal") {
        handler();
      }
    });
  };
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.render(this.model.arrButton);

    this.view.bindNumberAndDot(this.handleButtonAndDot);
    this.view.bindClear(this.handleClear);
    this.view.bindOperation(this.handleOperation);
    this.view.bindCalculate(this.handleCalculate);
  }
  handleButtonAndDot = (char) => {
    this.model.numberButton(char);
  };

  handleClear = () => {
    this.model.clearAll();
  };
  handleOperation = (operator) => {
    this.model.operatorButton(operator);
  };

  handleCalculate = () => {
    this.model.calculateQueue(this.model.queue);
  };
}

const app = new Controller(new Model(), new View());
const app2 = new Controller(new Model(), new View());
