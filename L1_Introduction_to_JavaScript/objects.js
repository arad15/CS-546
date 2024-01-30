let myBlankObj = {};

let myObj = {
  hello: 'World',
  num: 1,
  bool: true,
  myFn: (message) => {
    return message;
  }
};

console.log(myObj);

// adding key/values
myObj['new-Key1'] = 'I am a new key!';
console.log(myObj);

myObj.directlyAddedKey = "I've been added!";
console.log(myObj);

let keyName = 'myStrKey';
myObj[keyName] = 'This was made dynamically';
console.log(myObj);

myObj.hello = 'Hello, world!';
console.log(myObj);

console.log(myObj.myFn('Hey Patrick'));

//we can use numbers as keys, however, they will be cast to strings.  We also cannot use dot notation for keys that are numbers. so myObj.7 would not work, we need to use bracket notation.
myObj[7] = "I'm 7";
console.log(myObj);

//spread opeator
let mySpreadObj1 = {a: 1, b: 2, c: 3};
let mySpreadObj2 = {a: 25, d: 4, e: 5};
let myCombinedObj = {...mySpreadObj2, ...mySpreadObj1};
console.log(myCombinedObj);
// myObj["hello"]
// myObj.hello

//object as a constat.
const myConstObj = {a: 1, b: 2, c: 3};
console.log(myConstObj);
myConstObj.c = 4;
console.log(myConstObj);
myConstObj.d = 6;
console.log(myConstObj);

myConstObj = {a: 1, b: 2};
//object equality
/*
  we CANNOT check if two objects are equal to each other using == or ===
  The order of the keys does not matter in objects and the order of the keys are not
  guaranteed. You would need to iterate over each key in each object checking each value
*/

//The below two objects ARE equal to each other. The each have the same keys, with the same values for those keys
let myObj2 = {a: 1, b: 2, c: 3};
let myObj3 = {c: 3, a: 1, b: 2};

//The below two objects ARE NOT equal to each other. they each have the same keys, but one of the values for a key is different
let myObj4 = {a: 1, b: 2, c: 3};
let myObj5 = {c: 3, a: 1, b: 10};

//The below two objects ARE equal to each other. The each have the same keys, with the same values for those keys (even the nested object)
let myObj6 = {a: 1, b: 2, c: {d: 4, e: 5, f: 6}};
let myObj7 = {c: {e: 5, f: 6, d: 4}, a: 1, b: 2};
