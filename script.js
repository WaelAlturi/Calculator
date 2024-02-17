document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  let currentNumber = "";
  let firstOperand = null;
  let operator = null;
  let shouldResetDisplay = false;

  const clearDisplay = () => {
    display.textContent = "0";
    currentNumber = "";
    firstOperand = null;
    operator = null;
  };

  const updateDisplay = () => {
    display.textContent = currentNumber;
    console.log(firstOperand);
  };

  const appendNumber = (number) => {
    if (currentNumber === "0" || shouldResetDisplay) {
      currentNumber = "";
      shouldResetDisplay = false;
    }
    if (currentNumber.length < 9) {
      currentNumber += number;
      updateDisplay();
    }
  };

  const setOperator = (op) => {
    if (operator !== null && firstOperand === currentNumber) {
      console.log("hi");
      operate();
    }
    operator = op;
    firstOperand = parseFloat(currentNumber);
    shouldResetDisplay = true;
  };

  const operate = () => {
    if (firstOperand === null || operator === null) {
      currentNumber = "0";
    } else {
      const secondOperand = parseFloat(currentNumber);
      let result;
      if (operator === "+") {
        result = firstOperand + secondOperand;
      } else if (operator === "-") {
        result = firstOperand - secondOperand;
      } else if (operator === "×") {
        result = firstOperand * secondOperand;
      } else if (operator === "÷") {
        if (secondOperand === 0) {
          currentNumber = "Error";
          updateDisplay();
          return;
        } else {
          result = firstOperand / secondOperand;
        }
      }

      if (isNaN(result) || !isFinite(result)) {
        currentNumber = "Error";
      } else {
        const resultString = result.toString();
        if (resultString.length > 9) {
          result = parseFloat(result.toFixed(9));
        } else {
          result = result.toString();
        }
        currentNumber = result;
      }
    }
    updateDisplay();
    firstOperand = parseFloat(currentNumber);
    operator = null;
  };

  const handleButtonClick = (e) => {
    const { target } = e;
    if (target.classList.contains("number")) {
      appendNumber(target.textContent);
    }
    if (target.classList.contains("operator")) {
      setOperator(target.textContent);
    }
    if (target.classList.contains("equals")) {
      operate();
    }
    if (target.classList.contains("clear")) {
      clearDisplay();
    }
    if (target.classList.contains("decimal")) {
      if (!currentNumber.includes(".")) {
        appendNumber(".");
      }
    }
    if (target.classList.contains("backspace")) {
      currentNumber = currentNumber.slice(0, -1);
      if (currentNumber === "") {
        currentNumber = "0";
      }
      updateDisplay();
    }
  };

  document.querySelectorAll(".calculator button").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || key === ".") {
      appendNumber(key);
    }
    if (["+", "-", "*", "/"].includes(key)) {
      setOperator(key === "*" ? "×" : key === "/" ? "÷" : key);
    }
    if (key === "Enter") {
      operate();
    }
    if (key === "Escape") {
      clearDisplay();
    }
    if (key === "Backspace") {
      currentNumber = currentNumber.slice(0, -1);
      if (currentNumber === "") {
        currentNumber = "0";
      }
      updateDisplay();
    }
  });
});
