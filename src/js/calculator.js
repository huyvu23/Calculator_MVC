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

  delete = () => {
    document.querySelector(".clear-button").addEventListener("click", (e) => {
      e = this.clearAll();
    });
  };

  number1 = () => {
    document.querySelector(".number1").addEventListener("click", (e) => {
      e = this.numberButton("1");
    });
  };

  number2 = () => {
    document.querySelector(".number2").addEventListener("click", (e) => {
      e = this.numberButton("2");
    });
  };

  number3 = () => {
    document.querySelector(".number3").addEventListener("click", (e) => {
      e = this.numberButton("3");
    });
  };

  number4 = () => {
    document.querySelector(".number4").addEventListener("click", (e) => {
      e = this.numberButton("4");
    });
  };

  number5 = () => {
    document.querySelector(".number5").addEventListener("click", (e) => {
      e = this.numberButton("5");
    });
  };
  number6 = () => {
    document.querySelector(".number6").addEventListener("click", (e) => {
      e = this.numberButton("6");
    });
  };
  number7 = () => {
    document.querySelector(".number7").addEventListener("click", (e) => {
      e = this.numberButton("7");
    });
  };
  number8 = () => {
    document.querySelector(".number8").addEventListener("click", (e) => {
      e = this.numberButton("8");
    });
  };
  number9 = () => {
    document.querySelector(".number9").addEventListener("click", (e) => {
      e = this.numberButton("9");
    });
  };

  number0 = () => {
    document.querySelector(".number0").addEventListener("click", (e) => {
      e = this.numberButton("0");
    });
  };

  dot = () => {
    document.querySelector(".dot").addEventListener("click", (e) => {
      e = this.numberButton(".");
    });
  };

  plus = () => {
    document.querySelector("#plus").addEventListener("click", (e) => {
      e = this.operatorButton("+");
    });
  };

  minus = () => {
    document.querySelector("#minus").addEventListener("click", (e) => {
      e = this.operatorButton("-");
    });
  };

  multiply = () => {
    document.querySelector("#multiply").addEventListener("click", (e) => {
      e = this.operatorButton("*");
    });
  };
  divide = () => {
    document.querySelector("#multiply").addEventListener("click", (e) => {
      e = this.operatorButton("/");
    });
  };
  equal = () => {
    document.querySelector("#equal").addEventListener("click", (e) => {
      e = this.calculateQueue(this.queue);
    });
  };

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
    this.model.number1();
    this.model.number2();
    this.model.number3();
    this.model.number4();
    this.model.number5();
    this.model.number6();
    this.model.number7();
    this.model.number8();
    this.model.number9();
    this.model.number0();
    this.model.plus();
    this.model.minus();
    this.model.multiply();
    this.model.divide();
    this.model.equal();
    this.model.delete();
  }
}

const app = new Controller(new Model(), new View());
const app2 = new Controller(new Model(), new View());
