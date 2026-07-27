/**
Arrow functions
*
* @scenario
* 1. Convert a normal function to arrow funtion
* 2. No param
3. Single param
* 4. More than one param(single and more than one statements)
5. forEach() method example
*/

// 1. Convert a normal function to arrow funtion
 let sum = (a, b) => a + b

let k = sum(10, 90)
console.log(`sum value is ${k}`);

// 2. No params
let tf = () => 10>5
let result = tf()
console.log(result);

// 3. Single param
 let greetings = name=>{
    console.log(`Heelo, ${name}`);
}
greetings("Barani")

// 4. More than one param(single and more than one statements)
let sum2 = (a, b) => {
    total = a + b
    console.log(`Total is ${total}`);    
}
sum2(10, 90)

// 5. foreach
let windows = ["google", "mircosoft", "firebox"]; //order is value, index, orginal array

windows.forEach((value, index, arr) => {
    console.log(value, index, arr);
    
})
