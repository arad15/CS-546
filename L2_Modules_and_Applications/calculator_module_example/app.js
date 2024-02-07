import {
  addTwoNumbers,
  divideTwoNumbers,
  subtractTwoNumbers,
  multiplyTwoNumbers
} from './calculator.js';

//Now we can start calling the functions to test out our functions.

try {
  console.log(addTwoNumbers(NaN, 1));
  let x = 25;
  console.log(x);
} catch (e) {
  console.log(e);
}

try {
  console.log(addTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(subtractTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(subtractTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(multiplyTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(multiplyTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(divideTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(divideTwoNumbers(20, 5));
} catch (e) {
  console.log(e);
}

//now lets do some cases that will fail

try {
  console.log(divideTwoNumbers(10, 0));
} catch (e) {
  console.log(e);
}

try {
  console.log(multiplyTwoNumbers(20, 'Patrick'));
} catch (e) {
  console.log(e);
}

try {
  console.log(subtractTwoNumbers('Patrick', 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(addTwoNumbers('Patrick', 'Hill'));
} catch (e) {
  console.log(e);
}
