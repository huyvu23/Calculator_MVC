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
        class: "number1",
      },
      {
        name: "2",
        label: 2,
        class: "number2",
      },
      {
        name: "3",
        label: 3,
        class: "number3",
      },
      {
        name: "4",
        label: 4,
        class: "number4",
      },
      {
        name: "5",
        label: 5,
        class: "number5",
      },
      {
        name: "6",
        label: 6,
        class: "number6",
      },
      {
        name: "7",
        label: 7,
        class: "number7",
      },
      {
        name: "8",
        label: 8,
        class: "number8",
      },
      {
        name: "9",
        label: 9,
        class: "number9",
      },
      {
        name: "0",
        label: 0,
        class: "number0",
      },
      {
        name: "dot",
        label: ".",
        class: "number",
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
        class: "operator",
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
    this.app = this.getElement("#root");
    this.container = this.createElement("div", "container");
    this.calculator = this.createElement("div", "calculator");
    this.screen = this.createElement("div", "calculator-screen");
    this.button = this.createElement("div", "calculator-button");
    this.calculator.append(this.screen, this.button);
    this.container.append(this.calculator);
    this.app.append(this.container);
  }

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
    >${button.label}</button>`;
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.render(this.model.arrButton);
    this.view.getElement(".clear-button").addEventListener("click", (e) => {
      e = this.model.clearAll();
    });

    this.view.getElement(".number1").addEventListener("click", (e) => {
      e = this.model.numberButton("1");
    });

    this.view.getElement(".number2").addEventListener("click", (e) => {
      e = this.model.numberButton("2");
    });

    this.view.getElement(".number3").addEventListener("click", (e) => {
      e = this.model.numberButton("3");
    });

    this.view.getElement(".number4").addEventListener("click", (e) => {
      e = this.model.numberButton("4");
    });

    this.view.getElement(".number5").addEventListener("click", (e) => {
      e = this.model.numberButton("5");
    });

    this.view.getElement(".number6").addEventListener("click", (e) => {
      e = this.model.numberButton("6");
    });

    this.view.getElement(".number7").addEventListener("click", (e) => {
      e = this.model.numberButton("7");
    });

    this.view.getElement(".number8").addEventListener("click", (e) => {
      e = this.model.numberButton("8");
    });

    this.view.getElement(".number9").addEventListener("click", (e) => {
      e = this.model.numberButton("9");
    });

    this.view.getElement(".number0").addEventListener("click", (e) => {
      e = this.model.numberButton("0");
    });

    this.view.getElement(".number").addEventListener("click", (e) => {
      e = this.model.numberButton(".");
    });

    this.view.getElement("#plus").addEventListener("click", (e) => {
      e = this.model.operatorButton("+");
    });

    this.view.getElement("#minus").addEventListener("click", (e) => {
      e = this.model.operatorButton("-");
    });

    this.view.getElement("#multiply").addEventListener("click", (e) => {
      e = this.model.operatorButton("*");
    });

    this.view.getElement("#divide").addEventListener("click", (e) => {
      e = this.model.operatorButton("/");
    });

    this.view.getElement("#equal").addEventListener("click", (e) => {
      e = this.model.calculateQueue(this.model.queue);
    });
  }
}

const app = new Controller(new Model(), new View());
