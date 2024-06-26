//This is an internal function that is not exported so it can only be called within this module
const checkIsProperNumber = (val, variableName) => {
  if (typeof val !== "number") {
    throw `${variableName || "provided variable"} is not a number`; // template literal to inject variable name, if available
  }

  if (isNaN(val)) {
    // IMPORTANT FOR INPUT VALIDATION + ERROR HANDLING: typeof NaN outputs 'number'
    throw `${variableName || "provided variable"} is NaN`;
  }
};
//Our exported methods, this is just an object with the key being the function name and an arrow function as the value
export const description = "This is a calculator for CS-546";

export const divideTwoNumbers = (numerator, denominator) => {
  checkIsProperNumber(numerator, "numerator");
  checkIsProperNumber(denominator, "denominator");

  if (denominator === 0) {
    throw "denominator cannot be 0";
  }

  return numerator / denominator;
};
export const addTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, "first number");
  checkIsProperNumber(num2, "second number");

  return num1 + num2;
};
export const multiplyTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, "first number");
  checkIsProperNumber(num2, "second number");

  return num1 * num2;
};
export const subtractTwoNumbers = (num1, num2) => {
  checkIsProperNumber(num1, "first number");
  checkIsProperNumber(num2, "second number");

  return num1 - num2;
};
