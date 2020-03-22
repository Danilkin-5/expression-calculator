function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let regexp = /\([0-9\+\-\*\/\s]+\)/ig;
    let arr = [];
    let result = 0;
    if(~expr.indexOf("("))
        arr = regexp.exec(expr);
    if(arr.length == 0) {
        result = calculate(expr);
    }
    return result;
}

function calculate (str) {
    let symb = /[\+\-\*\/]/;
    let bufferArr = str.split(symb);
    while(bufferArr.length != 1) {        
       
    }
}

module.exports = {
    expressionCalculator
}