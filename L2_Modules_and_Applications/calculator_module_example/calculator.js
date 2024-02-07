//This is an internal function that is not exported so it can only be called within this module
function checkIsProperNumber(val, variableName) {
  if (typeof val !== 'number') {
    throw `${variableName || 'provided variable'} is not a number`;
  }

  if (isNaN(val)) {
    throw `${variableName || 'provided variable'} is NaN`;
  }
}
//Our exported methods, this is just an object with the key being the function name and an arrow function as the value
const description = 'This is a calculator for CS-546';

const divideTwoNumbers = (numerator, denominator) => {
  checkIsProperNumber(numerator, 'numerator');
  checkIsProperNumber(denominator, 'denominator');

  if (denominator === 0) {
    throw 'denominator cannot be 0';
  }

  return numerator / denominator;
};
const addTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');
  return num1 + num2;
};
const multiplyTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');

  return num1 * num2;
};
const subtractTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');

  return num1 - num2;
};

export {
  description,
  addTwoNumbers,
  subtractTwoNumbers,
  divideTwoNumbers,
  multiplyTwoNumbers
};
