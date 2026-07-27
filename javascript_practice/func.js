/*Named function
* @definition
* Function that has a name/identifier
*
* @scenario
* 1. function that returns a value
* 2. function that does an action
3. Calling function
4. Any type of data can be provided and no type checking is done
* 5. More or less args can be provided and -
* no check is performed on # number of parameter(s) Vs Number of args received
* 6. Function name and typeof Operator
*

// 1. function that returns a value
function addTwoNumbers(a, b) {
    sum = a + b
    return sum
}
// function that does an action
function click(element) {
    console.log(`clicking the element ${element}`);
}
// Calling functions
let total = addTwoNumbers(245, 255)
console.log(`Total is ${total}`);

click("Loginbtn");
*/

/**
* Anonymous function (function expression)
* @scenario
* 1. function (without name is assigned to a variable)
* 2. function with name is assigned to a variable
*
* @usage
* In callback context (a funtion requires another function at its argument)
*
*/
/*
// 1. function (without name is assigned to a variable)
let addTwoNum = function (num1, num2) {
    let sum = num1 + num2
    return sum
}
console.log(typeof addTwoNum);
let val = addTwoNum(2, 2)
console.log(val);
// 2. function with name is assigned to a variable
let sumFn = function addTwoNum(num1, num2) {
    let sum = num1 + num2
    return sum
}

// addTwoNum(2,2)
let num = sumFn(2, 2)
console.log(num);
*/
/*
let valuation = function(a,b){
    tot = a+b
    return tot
}

let another = function addTwoNumbers(a, b) {
    sum = a + b
    return sum
}

//calling
console.log(valuation(4,20));
console.log(another(4,10));
*/

/**
* Function parameter
*
* @scenario
1. Default param
* 2. Passing undefined/any falsy values if not known
* 3. Passing primitives, object types as arg
*/
// 1. Default param

function greeting(name, greet="Hello"){
    console.log(`the greeting name is ${greet} ${name}`);
}
greeting("Barani")

function greeting2(greet = "Hello", name) {
    if (typeof greet !== "string" || greet==="") {
        greet = "Hello"
    }
     
    console.log(`the greeting name is ${greet}, ${name}`);
}
greeting2("", "Barani")

// 2. Passing undefined/any falsy values if not known

function fullName(fname, mname, lname){
    // console.log(`The full name is ${fname} ${mname} ${lname}`);
    if(mname){
       console.log(`The full name is ${fname} ${mname} ${lname}`) 
    }
    else{
        console.log(`The full name is ${fname} ${lname}`)
    }
}
fullName("Baranikumar","","Subramanian")


// 3. Passing primitives, object types as arg

function printName(personobj){
    console.log(`The person name is ${personobj.firstname} ${personobj.lastname}`);
}
printName({
    firstname: "Baranikumar",
    lastname: "S"
})
