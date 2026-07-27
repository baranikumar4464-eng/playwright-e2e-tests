// (function sum(a, b) {
//     total = a + b
//     console.log(total);
    
// })(2,5)
//self invoking function- one function at a time
(function greeting(name, greet = "Hello") {
    console.log(`${greet},${name}`);
})("Rob")