// console.log("Plant corn");
// console.log("Water plant"); // pretend watering plant takes longer using setTimeout
// console.log("Add fertilizer");

// console.log("Plant corn");

// setTimeout(function () {
//   // takes in a function to execute and a delay
//   console.log("Water plant"); // Second Water plant comes after console.log("Add fertilizer").
// }, 3000);

// console.log("Add fertilizer"); // Put inside setTimeout to make dependent/synchronous

/* Why? The setTimeout function makes the operation asynchronous by deferring plant watering to occur after 3 seconds. 
The whole operation doesn’t pause for 3 seconds so it can log “Water plant”. Rather, the system goes ahead to apply 
fertilizers and then water plant after 3 seconds.
*/

/* Callback Functions
When a function simply accepts another function as an argument, this contained function is known as a callback function. 
Using callback functions is a core functional programming concept, and you can find them in most JavaScript code; 
either in simple functions like setInterval, event listening or when making API calls.

*/

// //Callback functions are written like so:

// //The set interval function will fire the callback function every second
// //so we can expect 'hello!' to be outputted every second.

// setInterval(function () {
//   console.log("hello!");
// }, 1000);

// // console.log('I AM HERE!!!!');
// //another example using the .map() function

// const list = ["super", "bat", "spider"];

// // create a new array
// // loop over the array and map the data to new content

// const newList = list.map((val) => {
//   return val + "man";
// });

// //newList = ['mankind', 'womankind', 'childkind'];

// newList.forEach((val) => {
//   console.log(val);
// });

// /*In the example above, we used the .map() method to iterate through the array list,
// the method accepts a callback function which states how each element of the array will be manipulated.
// Callback functions can also accept arguments as well.*/

// /* Naming Callback functions
// Callback functions can be named or anonymous functions. In our first examples,
// we used anonymous callback functions. Let’s look at a named callback function:*/

// // NAMED callback function (should have a return value, but this is for demo purposes)
// function greeting(name) {
//   console.log(`Hello ${name}, welcome to CS-546!`);
// }

// // a function that takes in a callback parameter
// function introduction(firstName, lastName, callback) {
//   const fullName = `${firstName} ${lastName}`;

//   callback(fullName);
// }

// introduction("Patrick", "Hill", greeting); 

function study(subject, callback) {
  console.log(`I am about to study ${subject}`);
  callback(subject);
}

function afterStudy(subject) {
  console.log(`I'm done studying ${subject}.  Now it's time to Party!`);
}

study("Web Programming", afterStudy);

// anonymous arrow callback function
study("MongoDB", (subject) => {
  console.log(`I have studied too much ${subject} and I am tired`);
});
