let trueVar = true;
let falseVar = false;

let nullVar = null;
let undefinedVar = undefined;

let zeroVar = 0;
let oneVar = 1;

let emptyString = '';
let nonEmptyString = 'hello';

if (trueVar) {
  console.log('True is true, it checks out');
} else {
  console.log('True is not true; this is weird');
}

if (falseVar) {
  console.log('falseVar is true, no idea why');
} else {
  console.log('falseVar is not true; this is good');
}

if (nullVar) { // null is treated as True
  console.log('nullVar evaluates to true');
} else {
  console.log('nullVar evaluates to false');
}

if (undefinedVar == true) {
  console.log('undefinedVar evaluates to true');
} else {
  console.log('undefinedVar evaluates to false');
}

if (zeroVar) {
  console.log('zeroVar evaluates to true');
} else {
  console.log('zeroVar evaluates to false');
}

if (oneVar) {
  console.log('oneVar evaluates to true');
} else {
  console.log('oneVar evaluates to false');
}

if (emptyString) {
  console.log('emptyString evaluates to true');
} else {
  console.log('emptyString evaluates to false');
}

if (nonEmptyString) {
  console.log('nonEmptyString evaluates to true');
} else {
  console.log('nonEmptyString evaluates to false');
}

if (undefinedVar == nullVar) { // == converts type based on values, like '2' == 2 is true
  console.log('undefinedVar == nullVar');
} else {
  console.log('undefinedVar != nullVar');
}

if (undefinedVar === nullVar) { // === is strict with type, meaning values AND types have to match
  console.log('undefinedVar === nullVar');
} else {
  console.log('undefinedVar !== nullVar');
}

if (undefinedVar == zeroVar) {
  console.log('undefinedVar == zeroVar');
} else {
  console.log('undefinedVar != zeroVar');
}

if ('0' == zeroVar) {
  console.log('zero the string is == to 0 the number');
} else {
  console.log("These aren't equal");
}

if ('0' === zeroVar) {
  console.log('zero the string is === to 0 the number');
} else {
  console.log("These aren't equal");
}

if ('100' == 100) {
  console.log('They are equal');
}

if ('100' === 100) {
  console.log('They are equal');
} else {
  console.log('They are not equal');
}

if (parseInt('100') === 100) { //recall parseInt() gets an int
  console.log('They are equal');
} else {
  console.log('They are not equal');
}
