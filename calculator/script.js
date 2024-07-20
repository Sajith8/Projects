const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "+", "=", "AC", "DEL"];
let output = "";
let firstValue = "";
let secondValue = "";
let currentOperation = null;

const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && currentOperation) {
    secondValue = output;
    let result;
    switch (currentOperation) {
      case "*":
        result = parseFloat(firstValue) * parseFloat(secondValue);
        break;
      case "/":
        if (parseFloat(secondValue) === 0) {
          alert("Cannot divide by zero.");
          return;
        }
        result = parseFloat(firstValue) / parseFloat(secondValue);
        break;
      case "-":
        result = parseFloat(firstValue) - parseFloat(secondValue);
        break;
      case "+":
        result = parseFloat(firstValue) + parseFloat(secondValue);
        break;
      default:
        return;
    }
    output = result;
    currentOperation = null;
  } else if (specialChars.includes(btnValue)) {
    if (btnValue === "AC") {
      output = "";
      firstValue = "";
      secondValue = "";
      currentOperation = null;
    } else if (btnValue === "DEL") {
      output = output.slice(0, -1);
    } else if (currentOperation) {
      if (output === "") return;
      secondValue = output;
    } else {
      if (output === "") return;
      firstValue = output;
      currentOperation = btnValue;
      output = "";
    }
  } else {
    output += btnValue;
  }
  updateDisplay();
};

const updateDisplay = () => {
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculate(e.target.dataset.value);
  });
});
