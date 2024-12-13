const buttons = document.querySelectorAll(".buttons button");
const resultDisplay = document.querySelector(".result");
const operationsDisplay = document.querySelector(".operations");
let currOperation = "";
let currResult = "";
let lastResult = null;

function updateDisplay() {
  operationsDisplay.textContent = currOperation;
  resultDisplay.textContent = currResult || "0";
}

// calculate the result
function calculate() {
  try {
    // resolve divide by zero error
    if (currOperation.includes("/0")) {
      currResult = "Can't divide by 0";
      lastResult = null;
      return;
    }

    const result = eval(currOperation);
    currResult = result.toString();
    lastResult = result;
  } catch {
    currResult = "Error";
    lastResult = null;
  }
}

// for click events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      // AC -> ALL CLEAR -> RESET TO INITIAL PHASE
      currOperation = "";
      currResult = "";
      lastResult = null;
    }
    // DEL -> delete the last digit/operation
    else if (value === "DEL") {
      currOperation = currOperation.slice(0, -1);
    }
    // return
    else if (value === "=") {
      calculate();
    }
    // handle digits/operations and update
    else {
      // if any operation, append it
      if (lastResult !== null && ["+", "-", "*", "/"].includes(value)) {
        currOperation = `${lastResult}${value}`;
        lastResult = null;
      }
      // if any digit, start new opeartion
      else if (lastResult !== null) {
        currOperation = value;
        lastResult = null;
      }
      // else append value
      else {
        currOperation += value;
      }
    }
    updateDisplay();
  });
});

// for keyboard
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // DEL -> backspace
  if (key === "Backspace") {
    currOperation = currOperation.slice(0, -1);
  }
  // return
  else if (key === "Enter" || key === "=") {
    calculate();
  }
  // handle digits/operations and update
  else if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    // if any operation, append it
    if (lastResult !== null && ["+", "-", "*", "/"].includes(key)) {
      currOperation = `${lastResult}${key}`;
      lastResult = null;
    }
    // if any digit, start new opeartion
    else if (lastResult !== null) {
      currOperation = key;
      lastResult = null;
    }
    // else append key
    else {
      currOperation += key;
    }
  }
  updateDisplay();
});
updateDisplay();
