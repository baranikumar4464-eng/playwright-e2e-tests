/**
Return statement
*
* @scenario
* 1. Return a single primitive value
* 2. Returns an expression [that evaluates to a value]
* 3. Return an object type
* 4. Return a function itself
* 5. Return statement in conditional statement
*/

// 1. Return a single primitive value
function sum(a, b) {
    total = a + b
    return total;
}

let k = sum(10, 90)
console.log(`first value is ${k}`);

// 2. Returns an expression [that evaluates to a value]
function sum2(a, b) {
    return a + b
}

let j = sum2(10, 90)
console.log(`second value is ${j}`);

// 3. Return an object type
function sum3(a, b) {
    total = a + b
    return {Amount:total};
}

let value = sum3(10,90)
console.log(`third value is ${value.Amount}`);

// 4. Return a function itself
function sum4(a, b) {
    return function(){
        return a+b;
    }
}
let p= sum4(10,90)
console.log(`fourth value is ${p()}`);

// 5. Return statement in conditional statement
function sum5(num1, num2) {
    if(!num1 && !num2){
        return {number1 : num1, number2 : num2}
    }
    if (!num1) {
        return num1
    }
    if(!num2) return num2
    
    return num1 +num2;

}

let u = sum5(undefined, NaN)
console.log(u);