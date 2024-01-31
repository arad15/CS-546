const x = 12;
const y = 25;

let multiplied = x * y;
let divided = y / x;
let subtracted = x - y;
let added = x + y;

console.log(multiplied, divided, subtracted, added);

let toThePowerOf = Math.pow(x, y);
console.log(toThePowerOf);

let multipliedString = multiplied.toString(); //toString, output has numbers in yellow, strings in white
console.log(multipliedString);

console.log(multipliedString + 5);  // concatenates '300' + '5' to '3005'

// //console.log(multipliedString);
multipliedString = '5';
console.log(parseInt(multipliedString) + 5); //parseInt gets an identifiable integer from a string
