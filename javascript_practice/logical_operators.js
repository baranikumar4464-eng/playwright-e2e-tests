/*
//OR
let target = ""
let a = target || "No value"
console.log(a);

//Ternary oeprator
let val = "";
// loglevel = val === "Maths"? "Yes" : "No";
// console.log(loglevel)

//Add
loglevel = val === "Maths"? "Yes" : val === "Science"? "Expected value": "No expected value";
console.log(loglevel);

//ifelse

let cond = "Presnt"
if(cond==="Present"){
    console.log("Value is Present");
} 
    
else{
    throw Error('>>>Value is not present');
}

//ctrl+k+f --->formatting
let err = "Retry"

if (err === "Retry") {
    console.log("Retry again..")
}
else if (err === "DataValidation") {
    console.log("Data Validation")
}
else if (err === "AssertionError") {
    console.log("Assertion Error")
}
else {
    throw Error("Unknown issue")
}
*/
let browser="Firefox"
//Switch case
switch (browser) {
    case "Chrome":
        console.log("It is Chrome browser")
        break;
    case "Firefox":
        console.log("It is Firefox browser")
        break;
    case "Edge":
        console.log("It is Edge browser")
        break;
    default:
        console.log(`It is not in available case since it is ${browser} browser`)
}

    