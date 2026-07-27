// //standard for loop
// for (let i = 0; i <= 10; i++) {
//     console.log(i);
// }

// for (let i = 10; i>= 1; i--) {
//     console.log(i);
// }
// //array in for loop
// let sum=0
// let arr = [10,"Apple","Orange",40,100,"Mango"];

// for(i=0;i<arr.length;i++){

//     let arrEle = arr[i];
//     // if(typeof arrEle==="number") sum+=arrEle

//     // console.log(arr[i]);
//     //or
//     if(typeof arrEle!=="number") continue;
//     sum+=arrEle
// }
// console.log(sum);

// arr.forEach((x,y,z) => {
//     console.log(x,y,z);
// })

let count = 1;
let isdatareturned = false;
while (isdatareturned === false) {
    console.log(count);
    if (count == 5) {
        //we got api response
        isdatareturned = true;
    }

    count++;
}
//for in loop --Objects

let obj = {
    a: 10,
    b: "Apple",
    c: 30
}

for (let key in obj) {
    console.log(`key is ${key} and \n value is "${obj[key]}"`);
}
//for of loop --Arrays
let arr = [10, "Apple", "Orange", 40, 100, "Mango"];
for (let ele of arr) {
    console.log(ele);
}

//foreach
let windows = ["google", "mircosoft", "firebox"];

windows.forEach((value,index, arr) => {
    console.log(value,index,arr);
    
})