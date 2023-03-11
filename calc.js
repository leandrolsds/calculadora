const previousOperationText = document.querySelector("#previous-operatior");
const currentOperationText = document.querySelector("#current-operatior");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText =currentOperationText;
        this.currentOperation = "";
    };
    // add digit to Calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen()
    }
    //process all calculator orerations
    processOperation(operation) {
       //check if current is empty 
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //chage operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
       //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;

            default:
                return;
        }
    }

    // change values of calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null,
        previous = null) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }
            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //change math operation
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"];
        if(!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //Delete the last digit 
    processDelOperation() {
        this.currentOperationText.innerText = currentOperationText.innerText.slice(0, -1);
    }
    //Clear current operation
    processClearOperation() {
        this.currentOperationText.innerText = "";
    }
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    //process an operations
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

};
const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});