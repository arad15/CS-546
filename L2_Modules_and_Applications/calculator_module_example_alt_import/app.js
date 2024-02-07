import * as calculator from './calculator.js';

//Now we can start calling the functions to test out our functions.

try {
  console.log(calculator.addTwoNumbers(5, 1));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.addTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.subtractTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.subtractTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.multiplyTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.multiplyTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.divideTwoNumbers(10, 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.divideTwoNumbers(20, 5));
} catch (e) {
  console.log(e);
}

//now lets do some cases that will fail

try {
  console.log(calculator.divideTwoNumbers(10, 0));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.multiplyTwoNumbers(20, 'Patrick'));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.subtractTwoNumbers('Patrick', 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.addTwoNumbers('Patrick', 'Hill'));
} catch (e) {
  console.log(e);
}
