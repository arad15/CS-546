function myFunction() {
  return "I'm a global function";
}

console.log(myFunction());

function printThisMessage(message) {
  console.log("We've received a message!");
  return message;
}

printThisMessage('Hello, CS-546');

let doubleUpAnonymous = function (x) {
  return x * 2;
};

console.log(doubleUpAnonymous(5));

let doubleUpArrow = (x) => {
  return x * 2;
};

console.log(doubleUpArrow(10));

let doubleUpArrow2 = (x) => x * 2;

console.log(doubleUpArrow2(25));

let addToTheNumber = (num) => {
  let numToAdd = num;

  return (addThisMuch) => {
    return numToAdd + addThisMuch;
  };
};

let addToTwelve = addToTheNumber(12);
console.log(addToTwelve);
console.log(addToTwelve(8));

function haveAnInnerFunction() {
  function myInnerFunction() {
    return "Hello, I'm an inner function!";
  }

  if (true) {
    console.log(myInnerFunction());
  }
}

//haveAnInnerFunction().myInnerFunction();

// myInnerFunction();

function demonstrateVarVersusLet() {
  // Say you want to do some basic counts, like count the number of odds and then
  // the number of event numbers from 0 to 12

  // Change this between "odd", "even", and "both";
  const whatDoICount = 'both';
  const howManyToCount = 12;
  let count;
  if (whatDoICount === 'odd' || whatDoICount === 'both') {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    //let count;
    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 1) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} odd numbers`);
    }
  }

  if (whatDoICount === 'even' || whatDoICount === 'both') {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    //let count;
    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 0) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} even numbers`);
    }
  }

  //console.log(count);
}

demonstrateVarVersusLet();
