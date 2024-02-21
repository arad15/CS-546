import {dbConnection} from './mongoConnection.js';

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection(); // connects to the database
      _col = await db.collection(collection); // connects to the collection
    }

    return _col;
  };
};

// BELOW is what you change for the labs
/* Now, you can list your collections here: */
export const posts = getCollectionFn('posts');
export const dogs = getCollectionFn('dogs');
