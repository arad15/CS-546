/*
A promise is used to handle the asynchronous result of an operation. 
JavaScript is designed to not wait for an asynchrnous block of code to completely execute before other synchronous parts of the code can run. 
For instance, when making API requests to servers, we have no idea if these servers are offline or online, or how long it takes to process the server request.

With Promises, we can defer execution of a code block until an async request is completed. 
This way, other operations can keep running without interruption.

Promises have three states:

Pending: This is the initial state of the Promise before an operation begins
Fulfilled: This means the specified operation was completed
Rejected: The operation did not complete; an error value is usually thrown

The Promise object is created using the new keyword and contains the promise; this is an executor function which has a resolve and a reject callback. 
As the names imply, each of these callbacks returns a value with the reject callback returning an error object.

const promise = new Promise(function(resolve, reject) {
    // promise description
  })

*/

//If weather is true, resolve the promise returning the data dateDetails, else return an error object with data Bad weather, so no Date.
const weather = false;
const date = new Promise(function (resolve, reject) {
  if (weather) {
    const dateDetails = {
      name: 'Cubana Restaurant',
      location: '55th Street',
      table: 5
    };

    resolve(dateDetails);
  } else {
    reject('Bad weather, so no Date');
  }
});

// function date() {
//   if (weather) {
//     const dateDetails = {
//       name: 'Cubana Restaurant',
//       location: '55th Street',
//       table: 5
//     };

//     return Promise.resolve(dateDetails);
//   } else {
//     return Promise.reject('Bad weather, so no Date');
//   }
// }

/* Using Promises
Using a promise that has been created is relatively straightforward; we chain .then() and .catch() to our Promise like so */

date
  .then(function (dateDetails) {
    console.log(dateDetails);
  })
  .catch(function (error) {
    console.log(error);
  });

// //Using the promise we created above, let's take this a step further:

const myDate1 = function () {
  date
    .then(function (details) {
      console.log('We are going on a date!');
      console.log(details);
    })
    .catch(function (error) {
      console.log(error);
    });
};

myDate1();
console.log('AFTER myDate1 called');

//Since the weather value is true, we call mydate() and our console logs:

/* Chaining Promises
Sometimes we may need to execute two or more asynchronous operations based on the result of preceding promises. 
In this case, promises are chained. Still using our created promise, let’s order an uber if we are going on a date.

So we create another promise: 

const orderUber = function(dateDetails) {
    return new Promise(function(resolve, reject) {
      const message = `Get me an Uber ASAP to ${dateDetails.location}, we are going on a date!`;
  
      resolve(message)
    });
  }

*/

//we can shorten the promise to
const orderUber = function (dateDetails) {
  const message = `Get me an Uber ASAP to ${dateDetails.location}, we are going on a date!`;
  return Promise.resolve(message);
};

// //We chain this promise to our earlier date operation like so:
const myDate2 = function () {
  date
    .then(orderUber)
    .then(function (message) {
      console.log(message);
    })
    .catch(function (error) {
      console.log(error);
    });
};

myDate2();

console.log('AFTER myDate2 is called');
//Since our weather is true, the output to our console is: Get me an Uber ASAP to 55th Street, we are going on a date!
