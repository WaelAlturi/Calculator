const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");

let currentNumber = "";
let previousNumber = "";
let operator = "";

const add = (firstNumber, lastNumber) =>
  parseInt(firstNumber) + parseInt(lastNumber);
const subtract = (firstNumber, lastNumber) =>
  parseInt(firstNumber) - parseInt(lastNumber);
const multiply = (firstNumber, lastNumber) =>
  parseInt(firstNumber) * parseInt(lastNumber);
const divide = (firstNumber, lastNumber) =>
  parseInt(firstNumber) / parseInt(lastNumber);

function operate(operator, currentNumber, previousNumber) {
  switch (operator) {
    case "+":
      return add(previousNumber, currentNumber);
    case "-":
      return subtract(previousNumber, currentNumber);
    case "*":
      return multiply(previousNumber, currentNumber);
    case "/":
      return divide(previousNumber, currentNumber);
    default:
      return currentNumber;
  }
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber += button.innerText;
    updateScreen();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber !== "") {
      previousNumber = currentNumber;
      currentNumber = "";
    }
    operator = button.innerText;
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

function updateScreen() {
  display.textContent = currentNumber;
}
