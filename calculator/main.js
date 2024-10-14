let equation = [];
let equationHistory = [];
let operator;

let displayValue = document.querySelector(".input");
let calcNumberBtns = document.querySelectorAll(".btn");
let operatorBtns = document.querySelectorAll(".operator");
let equalBtn = document.querySelector(".equal");
let answerScreen = document.querySelector(".answer");
let displayEquation = document.querySelector(".display-equation");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".backspace");
let periodBtn = document.querySelector(".period");

function deleteNumber(e) {
  const currentValue = displayValue.textContent.split("");
  currentValue.pop();
  displayValue.textContent = currentValue.join("");
}

function clearScreen(e) {
  equation = [];
  operator = undefined;
  displayValue.textContent = "";
  answerScreen.textContent = "";
  displayEquation.textContent = "";
}

function inputNumber(e) {
  displayValue.textContent += e.target.textContent;
}

function inputOperator(e) {
  if (displayValue.textContent === "") {
    equation.push(parseInt(answerScreen.textContent));
  } else {
    equation.push(parseInt(displayValue.textContent));
  }

  if (equation.length === 2) {
    displayEquation.textContent =
      equation[0] + " " + operator + " " + equation[1];
    equation = [operate(equation[0], equation[1], operator)];

    answerScreen.textContent = equation[0];
  }

  displayValue.textContent = "";

  operator = e.target.textContent;
}

function inputEqual(e) {
  if (equation.length === 0) return;
  equation.push(parseInt(displayValue.textContent));
  displayEquation.textContent =
    equation[0] + " " + operator + " " + equation[1];
  equation = [operate(equation[0], equation[1], operator)];
  answerScreen.textContent = equation[0];
  displayValue.textContent = "";
  equation = [];
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function modulo(num1, num2) {
  return num1 % num2;
}

function operate(num1, num2, operator) {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "×") return multiply(num1, num2);
  if (operator === "÷") return divide(num1, num2);
  if (operator === "%") return modulo(num1, num2);
}

calcNumberBtns.forEach((button) => {
  button.addEventListener("click", inputNumber);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", inputOperator);
});

equalBtn.addEventListener("click", inputEqual);
clearBtn.addEventListener("click", clearScreen);
deleteBtn.addEventListener("click", deleteNumber);
periodBtn.addEventListener("click", (e) => {
  for (i = 0; i < displayValue.textContent.length; i++) {
    if (displayValue.textContent[i] === ".") return;
  }
  inputNumber(e);
});
