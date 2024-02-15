// async function myFavMovie() {
//   return "blah blah";
// }
// // is the same as
// function myFavMovie2() {
//   return Promise.resolve("blah blah");
// }
// // making an async arrow function
// const myAsyncArrow = async () => {};

// function foo(){
//     return Promise.reject(25);
// }
// // is the same as
// async function foo2 (){
//     throw 25;
// }
/* throwing in an async function is like Promise rejecting, 
and returning in an async function is like Promise resolving */

//Let's bring the two promises we were using in the previous promises example
let weather = true;

function date() {
  if (weather) {
    const dateDetails = {
      name: "Sparks Steakhouse",
      location: "46th Street",
      table: 5,
    };
    for (let i = 0; i <= 10; i++) {
      let x = i;
    }

    return Promise.resolve(dateDetails);
  } else {
    return Promise.reject("Bad weather, so no Date");
  }
}

const orderUber = (details) => {
  return Promise.resolve(
    `Get me an Uber ASAP to ${details.location}, so we are going on a date!`
  );
};

// now let's rewrite the Promise consumption with async-await notation
const myDate = async () => {
  try {
    let myDateDetails = await date(); // wait for date() Promise to resolve/reject
    let message = await orderUber(myDateDetails); // okay to have in same try block, as it depends on prev line
    console.log(message);
  } catch (e) {
    // if await date() is rejected (Promise rejects), we throw an error on the awaited line (date() Promise.reject())
    console.log(e);
  }
};

myDate();
// unelated code to MyDate. Has nothing to do with myDate so it shouldn't be blocked while myDate is running.
console.log("AFTER MY DATE HAS BEEN CALLED");
for (let i = 0; i < 11; i++) {
  console.log(i);
}
