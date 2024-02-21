import dogData from './dogs.js';
import postData from './posts.js';
import {dbConnection, closeConnection} from './mongoConnection.js';
//lets drop the database each time this is run (we get the connection to drop the database)
//this ensures that we don't have 50 versions of the same database

const db = await dbConnection();
await db.dropDatabase();

//defining these here so I can use them later in the function (not exclusively in the try-catch block)
let sasha = undefined;
let max = undefined;
let porkChop = undefined;
let maxPost = undefined;
let porkChopPost = undefined;
let sashaPost = undefined;

console.log("Let's add some dogs!");

try {
  sasha = await dogData.addDog('Sasha   ', ['Cheagle', 'Chihuaha', 'Beagle']);
  console.log('Sasha the dog has been added, now she will blog!');
  console.log(sasha);
} catch (e) {
  console.log(e);
}

try {
  max = await dogData.addDog('Max', ['Mastiff']);
  console.log('Max the dog has been added, now she will blog!');
  console.log(max);
} catch (e) {
  console.log(e);
}

try {
  porkChop = await dogData.addDog('Pork Chop', [
    'Golden Retriever',
    'Labrador'
  ]);
  console.log('Pork Chop the dog has been added, now she will blog!');
  console.log(porkChop);
} catch (e) {
  console.log(e);
}

console.log('Lets now get all dogs from the DB');

try {
  const dogList = await dogData.getAllDogs();
  console.log(dogList);
} catch (e) {
  console.log(e);
}

console.log('Now lets add some posts!');

try {
  maxPost = await postData.addPost(
    'The Case of the Stolen Bone',
    "It was 2015 when it happened. Someone stole the bone, and hid it in a hole outside. It's a good thing that I hide all my bones in holes outside, or I would have never found. I then realized that, all along, it was me who hid the bone.",
    max._id.toString()
  );
  console.log(maxPost);
} catch (e) {
  console.log(e);
}

try {
  porkChopPost = await postData.addPost(
    'Who Am I?',
    "They call me Pork Chop. I don't like Pork! I only eat Turkey! I DON'T KNOW WHO I AM!",
    porkChop._id.toString()
  );
  console.log(porkChopPost);
} catch (e) {
  console.log(e);
}

try {
  sashaPost = await postData.addPost(
    "A Review of Bleu d'Auvergne",
    "It was 2014 when I was born, and it was 2014 when I received my first taste of Bleu d'Auvergne. I dined upon the delicacy at the home of my grand-papa, known as The Cheese Man for the great varieties of cheese he kept in his abode. I still do not know if the Bleu d'Auvergne was what ignited my love of cheese, or if it was the strange diet of my papa whom kept away from the starches and sugars and replaced them with cheeses and legumes. But truly, I will never forget the strange world of the first taste of Bleu d'Auvergne, to this day the greatest cheese I have ever tasted. It paired very nicely with the cheeseburger I stole from my papa's four year old cousin. No one believed him. It was the perfect crime.",
    sasha._id.toString()
  );
  console.log(sashaPost);
} catch (e) {
  console.log(e);
}

console.log('Now lets get all posts!');

try {
  const postList = await postData.getAllPosts();
  console.log(postList);
} catch (e) {
  console.log(e);
}

console.log("Let's change the title of Sasha's post...");

try {
  const updatedPost = await postData.updatePost(
    sashaPost._id.toString(),
    "For Love of Bleu d'Auvergne",
    sashaPost.body,
    sashaPost.poster.id.toString()
  );
  console.log('Now, the post is:');
  console.log(updatedPost);
} catch (e) {
  console.log(e);
}

console.log("Now let's remove Max's Post");

try {
  let deleted = await postData.removePost(maxPost._id.toString());
  console.log(deleted);
} catch (e) {
  console.log(e);
}

console.log("Let's update a dog");

try {
  const updatedSashasName = await dogData.updateDog(
    sasha._id.toString(),
    'Dharma',
    ['Husky', 'American Eskimo']
  );
  console.log("Now Sasha's name is:");
  console.log(updatedSashasName);
} catch (e) {
  console.log(e);
}

console.log("Let's now delete poor Max");

try {
  const deleted = await dogData.removeDog(max._id.toString());
  console.log(deleted);
} catch (e) {
  console.log(e);
}

console.log("Now let's test some dog cases that fail");

//dog method fails
try {
  const fail = await dogData.addDog('   ', ['Husky']);
} catch (e) {
  console.log(e);
}

try {
  const fail = await dogData.addDog('BowWow', ['', 'husky']);
} catch (e) {
  console.log(e);
}

try {
  const fail = await dogData.addDog('Lucy', [123]);
} catch (e) {
  console.log(e);
}

try {
  const fail = await dogData.addDog(123, ['Husky']);
} catch (e) {
  console.log(e);
}

try {
  const fail = await dogData.addDog();
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.addDog('George');
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.addDog('BooBoo', []);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.updateDog(123, '', []);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.removeDog(123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.removeDog('123');
} catch (e) {
  console.log(e);
}
try {
  const fail1 = await dogData.removeDog();
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.getDogById(123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.getDogById('123');
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await dogData.getDogById();
} catch (e) {
  console.log(e);
}

//posts cases that fail

try {
  const fail1 = await postData.addPost(123, 'Test body', 123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost(
    'The time my band opened for Stone Sour',
    "It was back in 2007 at the Chance theatre in Poughkeepsie NY.  I hung out mostly with Stone Sour's drummer Roy...... Corey Taylor also offered me a sip of his drink which was straight Southern Comfort.. Of course I took it even though I hated Southern Comfort.  When Corey offers you a drink, you take it!......",
    123
  );
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost('It was a clear black night', 789, 123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost();
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost(
    'It was a clear black night',
    'a clear white moon',
    123
  );
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost(
    '    ',
    'this will fail because of first input',
    123
  );
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost('Testing', 'this case will fail', '123');
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await postData.addPost('Testing', 'this case will fail');
} catch (e) {
  console.log(e);
}

await closeConnection();
console.log('Done!');
