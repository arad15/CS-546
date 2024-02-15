const weather = true;

// First Method of Defining a Promise
// const date = new Promise((resolve, reject) => {
//   if (weather) {
//     const dateDetails = {
//       name: "Sparks Steakhouse",
//       table: 5,
//     };
//     resolve(dateDetails);
//   } else {
//     reject("Bad weather so no date!");
//   }
// });

// Second Method of Defining a Promise
const date = () => {
  if (weather) {
    const dateDetails = {
      name: "Sparks Steakhouse",
      table: 5,
    };
    return Promise.resolve(dateDetails);
  } else {
    return Promise.reject("Bad weather so no date!");
  }
};

// date() // if second method, include (). If first, just date.
//   .then((fulfilled) => {
//     console.log(fulfilled);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const myDate = () => {
  // making promise consumption a function to call
  date() // if second method, include (). If first, just date.
    .then((fulfilled) => {
      console.log(fulfilled);
    })
    .catch((error) => {
      console.log(error);
    });
};

const orderUber = (dDetails) => {
  return Promise.resolve(
    `Get me an Uber ASAP to ${dDetails.location}, we are going on a date`
  );
};

const myDate2 = () => {
  date()
    .then(orderUber)
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });
};
myDate();

// unelated code to MyDate. Has nothing to do with myDate so it shouldn't be blocked while myDate is running.
console.log("AFTER MY DATE HAS BEEN CALLED");
for (let i = 0; i < 11; i++) {
  console.log(i);
}
