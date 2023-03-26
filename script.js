const displayContent = document.querySelector('.input-content');
const numberButtons = document.querySelectorAll('.btn-container button:not(.top)');
const division = document.querySelector('.divide');
const addition = document.querySelector('.add');
const multiplication = document.querySelector('.multiply');
const subtraction = document.querySelector('.subtract');
const summation = document.querySelector('#equal');
const values = [];
let displayValue = '0';
let currentOperator = null;

function sum(values) {
    if (values.length === 0) {
        return 0;
    }
    const total = values.reduce((acc, curr) => acc + curr);
    return total;
}

function subtract(values) {
    if (values.length === 0) {
        return 0;
    }
    const total = values.reduce((acc, curr) => acc - curr);
    return total;
}

function multiply(values) {
    if (values.length === 0) {
        return 0;
    }
    const total = values.reduce((acc, curr) => acc * curr);
    return total;
}

function divide(values) {
    if (values.length === 0) {
        return 0;
    }
    const total = values.reduce((acc, curr) => acc / curr);
    return total;
}

function operate(operator, values) {
    switch (operator) {
        case '+':
            return sum(values);
        case '-':
            return subtract(values);
        case '*':
            return multiply(values);
        case '/':
            return divide(values);
        default:
            return 'Invalid operator';
    }
}

function updateDisplay(value) {
    displayContent.textContent = value;
}

function clearDisplay() {
    values.length = 0;
    displayValue = '0';
    updateDisplay(displayValue);
    currentOperator = null;
}

function handleNumberButtonClick(button) {
    const buttonValue = button.textContent;
    values.push(parseFloat(buttonValue));

    if (displayValue === '0') {
        displayValue = buttonValue;
    } else {
        displayValue += buttonValue;
    }

    updateDisplay(displayValue);
}

function handleOperatorButtonClick(button) {
    const operator = button.textContent;

    if (currentOperator && values.length >= 2) {
        const result = operate(currentOperator, values);
        values.length = 0;
        values.push(result);
        displayValue = result.toString();
        updateDisplay(displayValue);
    }

    currentOperator = operator;
    displayValue = '0';
}

function handleSummationButtonClick() {
    if (values.length >= 2 && currentOperator) {
        const result = operate(currentOperator, values);
        values.length = 0;
        values.push(result);
        updateDisplay(result.toString());
        currentOperator = null;
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        handleNumberButtonClick(button);
    });
});

division.addEventListener('click', () => {
    handleOperatorButtonClick(division);
});

addition.addEventListener('click', () => {
    handleOperatorButtonClick(addition);
});

multiplication.addEventListener('click', () => {
    handleOperatorButtonClick(multiplication);
});

subtraction.addEventListener('click', () => {
    handleOperatorButtonClick(subtraction);
});

summation.addEventListener('click', () => {
    handleSummationButtonClick();
});

document.querySelector('.ac').addEventListener('click', () => {
    clearDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }

    updateDisplay(displayValue);
});
