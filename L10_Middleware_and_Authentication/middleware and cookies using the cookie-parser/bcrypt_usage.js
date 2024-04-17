import bcrypt from 'bcrypt';
// salt adds random characters to the password before hashing 
// it deters brute-force hacking (recommended 10-15)
// decrease this to help with runtime if needed
const saltRounds = 16; 

// bcrypt.hash and bcrypt.compare usually take a while to complete
const plainTextPassword = 'mySuperAwesomePassword'; // i.e. a user submitted pw in a form to be in the req.body
// hash the password, and store THIS in the database
const hash = await bcrypt.hash(plainTextPassword, saltRounds);
console.log(hash);

let compareToSherlock = false;

try {
  // compares attempted pw (i.e. one submitted at log-in) to hash password we stored
  // returns true or false
  compareToSherlock = await bcrypt.compare('elementarymydearwatson', hash);
} catch (e) {
  //no op
}

if (compareToSherlock) {
  console.log("The passwords match.. this shouldn't be");
} else {
  console.log('The passwords do not match');
}

let compareToMatch = false;

try {
  compareToMatch = await bcrypt.compare('mySuperAwesomePassword', hash);
} catch (e) {
  //no op
}

if (compareToMatch) {
  console.log('The passwords match.. this is good');
} else {
  console.log(
    'The passwords do not match, this is not good, they should match'
  );
}
