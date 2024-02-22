import {dbConnection} from './mongoConnection.js'; // database connection function from mongoConnection.js

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  // collection = is the name of the collection ('dogs' or 'posts')
  let _col = undefined; // setting collection to undefined

  return async () => {
    if (!_col) {
      // if the connection is undefined
      const db = await dbConnection(); // connects to the database
      _col = await db.collection(collection); // sets the collection to the inputted name
    }

    return _col; // return that collection
  };
};

// BELOW is what you change for the labs
/* Now, you can list your collections here: */
// we can export the desired collections
export const posts = getCollectionFn('posts');
export const dogs = getCollectionFn('dogs');

// WE CAN USE settings.js, mongoConnection.js, and mongoCollections.js for all upcoming assignments
// HOWEVER: change the following: database name in settings.js and the collection file exports above
// i.e. export const authors = getCollectionFn('authors');