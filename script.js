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
  if (firstNumber.includes(".") || lastNumber.includes(".")) {
    return parseFloat(firstNumber) + parseFloat(lastNumber);
  }
  return parseInt(firstNumber) + parseInt(lastNumber);
}
function subtract(firstNumber, lastNumber) {
  return parseFloat(firstNumber) - parseFloat(lastNumber);
}
function multiply(firstNumber, lastNumber) {
  if (firstNumber.includes(".") || lastNumber.includes(".")) {
    return parseFloat(firstNumber) * parseFloat(lastNumber);
  }
  return parseInt(firstNumber) * parseInt(lastNumber);
}
function divide(firstNumber, lastNumber) {
  return parseFloat(firstNumber) / parseFloat(lastNumber);
}

function operate(operator, currentNumber, previousNumber) {
  switch (operator) {
    case "+":
      return add(previousNumber, currentNumber);
    case "-":
      return typeof subtract(previousNumber / currentNumber) === "number" &&
        Number.isInteger(previousNumber / currentNumber)
        ? previousNumber / currentNumber
        : (previousNumber / currentNumber).toFixed(3);
    case "*":
      return multiply(previousNumber, currentNumber);
    case "/":
      return typeof divide(previousNumber / currentNumber) === "number" &&
        Number.isInteger(previousNumber / currentNumber)
        ? previousNumber / currentNumber
        : (previousNumber / currentNumber).toFixed(3);
    default:
      return currentNumber;
  }
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber += button.innerHTML;
    updateScreen();
    console.log(typeof currentNumber);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (previousNumber != "" && currentNumber != "") {
      currentNumber = operate(operator, currentNumber, previousNumber);
      console.log(typeof currentNumber + "HELLO");
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
    currentNumber = currentNumber.slice(0, -1);
    updateScreen();
  }
  if (currentNumber === "") {
    display.innerHTML = "0";
    console.log(display.innerHTML);
    clearScreen();
  }
});

function updateScreen() {
  display.innerHTML = currentNumber;
}
function clearScreen() {
  display.innerHTML = "0";
}
