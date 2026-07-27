/**
* Rest parameter and arguments object
*
* @definition
* 1. The rest param is denoted by ...<paramName>
* The rest parameter syntax allows us to represent an indefinite number of arguments as an array
* 2. arguments object made available within the function body
* 3. The arguments can be access by array-like notation arguments [i]
4. It has a length property
*
*/

function summation(num1, num2,...num){
    console.log(arguments);
    console.log(arguments[1]);
    console.log(arguments.length);
    let total=0
    for(i=0;i<arguments.length;i++){
        total+= arguments[i]
    }
    return total;
}

let value= summation(5,6,4,8)
console.log(`Total is ${value}`);
