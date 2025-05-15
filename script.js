function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Bro just tried to divide by 0 💀");
        return 0;
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            throw new Error("Unknown operator: " + operator);
    }
}

let firstOperand = ""; 
let currentOperator = ""; 
let secondOperand = ""; 
let resultDisplayed = false;
let expression = ""; // holds the full expression for display

const display = document.querySelector('.display');

function updateDisplay(value) {
    display.value = value;
}

function formatResult(num) {
    return parseFloat(num.toFixed(6)).toString();
}

function formatResult(num) {
    return parseFloat(num.toFixed(6)).toString();
}

const digitButtons = Array.from(document.querySelectorAll('.keys button'))
    .filter(btn =>
        !btn.classList.contains('operator') &&
        !btn.classList.contains('clear') &&
        !btn.classList.contains('equal') &&
        !btn.classList.contains('backspace')
    );

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.textContent;
        if (digit === ".") {
            if (currentOperator === "" && firstOperand.includes(".")) return;
            if (currentOperator !== "" && secondOperand.includes(".")) return;
        }
        if (resultDisplayed) {
            firstOperand = "";
            currentOperator = "";
            secondOperand = "";
            resultDisplayed = false;
            expression = "";
        }
        if (currentOperator === "") {
            firstOperand += digit;
        } else {
            secondOperand += digit;
        }
        expression += digit;
        updateDisplay(expression);
    });
});

const operatorButtons = document.querySelectorAll('.keys button.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            resultDisplayed = false;
            expression = firstOperand;
        }
        if (firstOperand !== "") {
            if (secondOperand !== "") {
                const result = operate(
                    currentOperator,
                    parseFloat(firstOperand),
                    parseFloat(secondOperand)
                );
                const formatted = formatResult(result);
                firstOperand = formatted;
                secondOperand = "";
                expression = formatted;
            }
            currentOperator = button.textContent;
            expression += ` ${currentOperator} `;
            updateDisplay(expression);
        }
    });
});

const equalButton = document.querySelector('.keys button.equal');
equalButton.addEventListener('click', () => {
    if (firstOperand !== "" && currentOperator !== "" && secondOperand !== "") {
        const a = parseFloat(firstOperand);
        const b = parseFloat(secondOperand);
        const result = operate(currentOperator, a, b);
        const formatted = formatResult(result);
        expression = formatted;
        updateDisplay(formatted);
        firstOperand = formatted;
        currentOperator = "";
        secondOperand = "";
        resultDisplayed = true;
    }
});

const clearButton = document.querySelector('.keys button.clear');
clearButton.addEventListener('click', () => {
    firstOperand = "";
    currentOperator = "";
    secondOperand = "";
    expression = "";
    updateDisplay("");
})

const backspaceButton = document.querySelector('.keys button.backspace');
if (backspaceButton) {
    backspaceButton.addEventListener('click', () => {
        if (resultDisplayed) {
            firstOperand = "";
            currentOperator = "";
            secondOperand = "";
            resultDisplayed = false;
            expression = "";
            updateDisplay(expression);
            return;
        }

        if (currentOperator !== "" && secondOperand !== "") {
            secondOperand = secondOperand.slice(0, -1);
            expression = expression.slice(0, -1);
            updateDisplay(expression);
        }
        else if (currentOperator !== "" && secondOperand === "") {
            currentOperator = "";
            expression = expression.slice(0, -1);
            updateDisplay(expression);
        }
        else {
            firstOperand = firstOperand.slice(0, -1);
            expression = expression.slice(0, -1);
            updateDisplay(expression);
        }
    });
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        const digitBtn = Array.from(document.querySelectorAll('.keys button'))
            .find(btn => btn.textContent === key);
        if (digitBtn) digitBtn.click();
        return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
        const opBtn = Array.from(document.querySelectorAll('.keys button.operator'))
            .find(btn => btn.textContent === key);
        if (opBtn) opBtn.click();
        return;
    }

    if (key === 'Enter' || key === '=') {
        equalButton.click();
        return;
    }

    if (key === 'Backspace') {
        backspaceButton.click();
        return;
    }

    if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearButton.click();
        return;
    }
});