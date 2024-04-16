import bcrypt from 'bcrypt';
const saltRounds = 16;

const plainTextPassword = 'mySuperAwesomePassword';
const hash = await bcrypt.hash(plainTextPassword, saltRounds);
console.log(hash);

let compareToSherlock = false;

try {
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
