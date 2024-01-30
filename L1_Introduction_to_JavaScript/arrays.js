let myStringArray = ['hello', 'world', 'my', 'name', 'is', 'Patrick', 'world'];
let myNumArray = [1, 2, 3, 4, 5];

//We can have mixed type arrays in JS and we can also have functions as elements!
let mixedArray = [
  1,
  'Hello',
  undefined,
  true,
  (message) => {
    return message;
  }
];

//Calling the function in the array
console.log(mixedArray[4]('Hello world!'));

myStringArray.forEach((value) => {
  console.log(value);
});

let myNumArraySquared = myNumArray.map((x) => {
  return x * x;
});

console.log(myNumArray);
console.log(myNumArraySquared);

let oddNumbers = myNumArray.filter((num) => {
  return num % 2 === 1;
});

console.log(oddNumbers);

let worldArray = myStringArray.filter((element) => {
  return element === 'world';
});

console.log(worldArray);

let findPatrick = myStringArray.find((element) => {
  return element === 'world';
});

console.log(findPatrick);

// let findWorld = myStringArray.find((element, index) => {
//   console.log(index);
//   return element === 'world';
// });

// console.log(findWorld);

// // console.log(myNumArray);
myNumArray.push(6);
console.log(myNumArray);
myNumArray.push('Patrick');
console.log(myNumArray);
let popped = myNumArray.pop();
console.log(popped);
console.log(myNumArray);

// // console.log(myNumArray.join('&&'));
