function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    
    let arr = [];

    if(!/\s{1}/.test(expr)) {
        arr = expr.trim().split("");
    }        
    else
        arr = expr.trim().split(" ");

    arr = arr.filter(item => {return item != "" && item != " "}); 

    arr.forEach((element, index, arr) => {
        if(/\d+/.test(element) && !+element && element != 0) {            
            throw new Error("ExpressionError: Brackets must be paired");
        }        
    });

    arr.forEach((element, index, arr) => {
        if(element == 0 && arr[index - 1] == "/")
            throw new Error("TypeError: Division by zero.");        
    });
    
    
    let stackNumber = [];
    let stackSymb = [];

    const operators = {
        "*": 1,
        "/": 1,
        "+": 2,
        "-": 2,
    }

    arr.forEach((item, index, arr) => {

        if(/\D{1}/.test(item)) {
            if(stackSymb.length == 0 || item == "(") stackSymb.push(item);
            else {
                for(let i = 0; i < stackSymb.length; i++) {

                    if(operators[item]  >=  operators[stackSymb[stackSymb.length - 1]]  || item == ")") {

                        if(stackSymb[stackSymb.length - 1] == "(") {
                            stackSymb.pop();
                            break;
                        }
                            
                        calculate(stackSymb, stackNumber);
                        i--;
                        continue;

                    }

                    break;
                }

                if(item != ")")
                    stackSymb.push(item);

            }
        }

        if(/\d+/.test(item)) {
            stackNumber.push(item);
        }        

        if(index == arr.length - 1) {
            if(stackSymb.length != 0) {
                while(stackSymb.length != 0) {
                    calculate(stackSymb, stackNumber);
                }                
            }            
        }
    });

    return stackNumber.pop();
}

function calculate(stackSymb, stackNumber) {
    let symbol = stackSymb.pop();
    
    switch(symbol) {
        case "*": {
            stackNumber.push(stackNumber.pop() * stackNumber.pop());
        };
        break;
        case "/": {
            let lst = stackNumber.pop();
            let prev = stackNumber.pop();
            stackNumber.push(prev / lst);
        };
        break;
        case "+": {
            stackNumber.push(+stackNumber.pop() + +stackNumber.pop());
        };
        break;
        case "-": {
            let lst = stackNumber.pop();
            let prev = stackNumber.pop();
            stackNumber.push(prev - lst);
        };
        break;
    }
    
    
}
module.exports = {
    expressionCalculator
}