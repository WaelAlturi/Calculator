const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const remove = document.querySelector(".remove");
let currentNumber = "";
let previousNumber = "";
let operator = "";

function add(firstNumber, lastNumber) {
  return parseFloat(firstNumber) + parseFloat(lastNumber);
}
function subtract(firstNumber, lastNumber) {
  return parseFloat(firstNumber) - parseFloat(lastNumber);
}
function multiply(firstNumber, lastNumber) {
  return parseFloat(firstNumber) * parseFloat(lastNumber);
}
function divide(firstNumber, lastNumber) {
  return parseFloat(firstNumber) / parseFloat(lastNumber);
}

function operate(operator, currentNumber, previousNumber) {
  switch (operator) {
    case "+":
      return add(previousNumber, currentNumber).toString().includes(".")
        ? add(previousNumber, currentNumber).toFixed(3)
        : add(previousNumber, currentNumber);
    case "-":
      return subtract(previousNumber, currentNumber).toString().includes(".")
        ? subtract(previousNumber, currentNumber).toFixed(3)
        : subtract(previousNumber, currentNumber);
    case "*":
      return multiply(previousNumber, currentNumber).toString().includes(".")
        ? multiply(previousNumber, currentNumber).toFixed(3)
        : multiply(previousNumber, currentNumber);
    case "/":
      return divide(previousNumber, currentNumber).toString().includes(".")
        ? divide(previousNumber, currentNumber).toFixed(3)
        : divide(previousNumber, currentNumber);
    default:
      return currentNumber;
  }
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber += button.innerHTML;
    updateScreen();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (previousNumber != "" && currentNumber != "") {
      currentNumber = operate(operator, currentNumber, previousNumber);
      updateScreen();
    }
    if (currentNumber !== "") {
      previousNumber = currentNumber;
      currentNumber = "";
    }
    if (button.innerHTML === "AC") {
      currentNumber = "";
      previousNumber = "";
      operator = "";
      clearScreen();
    }
    operator = button.innerHTML;
  });
});

equals.addEventListener("click", () => {
  if (operator && previousNumber !== "" && currentNumber !== "") {
    currentNumber = operate(operator, currentNumber, previousNumber);
    previousNumber = "";
    operator = "";
    updateScreen();
  }
});

decimal.addEventListener("click", () => {
  if (!display.innerHTML.includes(".")) {
    currentNumber += ".";
    updateScreen();
  }
});

remove.addEventListener("click", () => {
  if (currentNumber != "") {
    currentNumber = currentNumber.toString().slice(0, -1);
    updateScreen();
  }
  if (currentNumber === "") {
    display.innerHTML = "0";
    clearScreen();
  }
});

function updateScreen() {
  display.innerHTML = currentNumber;
}
function clearScreen() {
  display.innerHTML = "0";
}
