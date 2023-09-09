document.addEventListener('DOMContentLoaded', function () {
    const previousOperandTextElement = document.querySelector('[data-per-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');

    let previousOperand = '';
    let currentOperand = '';
    let operation = undefined;
    let decimalAdded = false; // Track if decimal point is already added

    function updateDisplay() {
        currentOperandTextElement.innerText = currentOperand;
        previousOperandTextElement.innerText = previousOperand;
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === '.' && decimalAdded) return; // Only one decimal point allowed
            if (currentOperand === '0' && button.innerText === '0') return;
            currentOperand += button.innerText;
            if (button.innerText === '.') {
                decimalAdded = true; // Mark decimal point as added
            }
            updateDisplay();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                compute();
            }
            operation = button.innerText;
            previousOperand = currentOperand;
            currentOperand = '';
            decimalAdded = false; // Reset decimal flag
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        if (currentOperand === '' || previousOperand === '') return;
        compute();
        operation = undefined;
    });

    deleteButton.addEventListener('click', () => {
        currentOperand = currentOperand.toString().slice(0, -1);
        if (!currentOperand.includes('.')) {
            decimalAdded = false; // Reset decimal flag when deleting the decimal point
        }
        updateDisplay();
    });

    allClearButton.addEventListener('click', () => {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        decimalAdded = false; // Reset decimal flag
        updateDisplay();
    });

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    }
});
