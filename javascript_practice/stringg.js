/*
let s="Hellow world";
console.log(s.charAt(4));
console.log(s.charAt(6));
console.log(s.length);


* Creating a string - 2 ways
1. Literals
* - Single quote
* Double quotes
* - Template literals
* 2. Object
*

let str1 = 'Hello World'
let str2 = "Hello World"
let str3 = 'Hello World' // preferred
let str4 = String("Hello World")
console.log(str3 === str4);

Compare string
1. Full match
* 2. Partial match
* - includes()
* - startsWith()
* - ebndsWith()
*
* @questions:
* 1. Is this a case sensitive comparison?
* 2. Does the string needs to be trimmed ?
*
*/

let filename = " Invoice_123.pdf"

if(filename.toUpperCase().trim() ==="INVOICE_123.PDF"){
    console.log(`File name is correct...`)
}

/**
* Extract substring - use of slice method
* rules
* 1. slice method requires start (inclusive) and end index (end index is not included)
* 2. You can specify only the start index
* 3. You can specific the negative range


* Scenario
* 1. Extract only yy-mm-dd format
* 2. Extract year (4 digits) - 0 index
* 3. Ectract month - 5 index
* 4. Extract date - 8 index


let dob = "2000-10-05"

let year = dob.slice(0, 4);
console.log(`year is ${year}`);

let month = dob.slice(5, 7);
console.log(`month is ${month}`);

//let day = dob.slice(8,10);
//let day = dt.slice(8)
let day = dob.slice(-2)
console.log(`day is ${day}`);

//replace
let txtfile = filename.replace(".pdf",".txt");
console.log(`txtfile is ${txtfile}`);

// let dobupdated = dob.replace("-","");
let dobupdated = dob.replace(/-/g,"");
console.log(`dobupdated is ${dobupdated}`);


* @rule
* 1. The separator(string | regexp) is omitted from the returned array
* 2. If the very first/last char is provided as a separator, it adds an empty string as in the first/last positions
*
* @returns
* string []
*/
/**
* Scenario
* 1. Get only the date part of the timestamp
2. Split by space/first or last char
* 3. Get only the filename

let tstamp = "2022-02-26T10:51:52.207Z";
let str = "Hello World";
let filename2 = "invoice_123.pdf";

// 1. Get only the date part of the timestamp

console.log(tstamp.split("T"));

// 2. Split by space/first or last char
console.log(str.split(""));
console.log(str.split(" "));
console.log(str.split("W"));

// 3. Get only the filename
let fprint = filename2.split(".")
console.log(fprint[0]);

/**
*Use of index of method
*

let str = "App # {12345} submitted"
let start = str.indexOf("{")
let end = str.lastIndexOf("}")
console.log(end);
let appNum = str.slice(start + 1, end)
console.log(appNum);
*/









