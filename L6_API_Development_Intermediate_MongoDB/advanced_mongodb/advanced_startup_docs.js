import {dbConnection} from './mongoConnection.js';

import {v4} from 'uuid';

async function runSetup() {
  const db = await dbConnection();

  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection('advancedMovies').drop();
  } catch (e) {
    // the collection does not exist yet!
  }

  const movieCollection = await db.collection('advancedMovies');
  let docId = 0; // we use integers in this case instead of objectIds, incremented for each makeDoc() called

  const makeDoc = function (title, rating, released, director) {
    return {
      _id: ++docId,
      title: title,
      rating: rating,
      reviews: [],
      cast: [],
      info: {
        release: released,
        director: director
      }
    };
  };

  // movie parameter is an entire object (like the one made in makeDoc() above)
  const addReview = function (movie, title, comment, reviewer, rating) {
    const newReview = {
      _id: v4(), // generate a new uuid
      title: title,
      comment: comment,
      reviewer: reviewer,
      rating: rating
    };

    movie.reviews.push(newReview); // push the new review into the review array of movie
  };

  const listOfMovies = []; // collects all created movies to insert into database all in one

  const inception = makeDoc('Inception', 4.5, 2015, 'Christopher Nolan');
  inception.cast.push(
    'Leonardo DiCaprio',
    'Elliot Page',
    'Ken Watanabe',
    'Joseph Gordon-Levitt',
    'Marion Cotillard',
    'Tom Hardy'
  );
  // make 3 reviews, added into the reviews subdocument of Inception document
  addReview(
    inception,
    'Really Good',
    'This movie was so interesting.',
    'Phil',
    4.5
  );
  addReview(inception, 'Bad', 'This movie is trite.', 'Agatha', 2);
  addReview(
    inception,
    'Perfect',
    'Leo should win an Oscar for this.',
    'Definitely Not Leo',
    4
  );

  const theLastSamurai = makeDoc('The Last Samurai', 3.8, 2003, 'Edward Zwick');
  theLastSamurai.cast.push(
    'Tom Cruise',
    'Timothy Spall',
    'Ken Watanabe',
    'Billy Connolly',
    'Tony Goldwyn',
    'Masato Harada',
    'Hiroyuki Sanada',
    'Koyuki',
    'Shin Koyamada'
  );

  const darkKnightRises = makeDoc(
    'Batman: The Dark Knight Rises',
    5,
    2012,
    'Christopher Nolan'
  );
  darkKnightRises.cast.push(
    'Christian Bale',
    'Michael Caine',
    'Gary Oldman',
    'Anne Hathaway',
    'Tom Hardy',
    'Marion Cotillard',
    'Joseph Gordon-Levitt',
    'Morgan Freeman'
  );
  addReview(
    darkKnightRises,
    'Aggressively mediocre',
    'Not much to say; it was okay.',
    'Sallie',
    3
  );
  addReview(
    darkKnightRises,
    'The best of the series',
    'This movie was the epitome of the underdog tale',
    'Phil',
    5
  );

  const kingsman = makeDoc(
    'Kingsman: The Secret Service',
    3.2,
    2015,
    'Matthew Vaughn'
  );
  kingsman.cast.push(
    'Colin Firth',
    'Samuel L. Jackson',
    'Mark Strong',
    'Taron Egerton',
    'Sophie Cookson',
    'Jack Davenport',
    'Mark Hamill',
    'Michael Caine'
  );

  addReview(kingsman, 'Unexpectedly good', 'I really liked it!', 'Sallie', 4);
  addReview(
    kingsman,
    'New favorite movie',
    'Wow, that was really fun!',
    'Alexander',
    4.5
  );

  // 2 movies with the same title, but different release years, used to demonstrate sorting by multiple fields
  const flatliners = makeDoc('Flatliners', 6.6, 1990, 'Joel Schumacher');
  flatliners.cast.push(
    'Kiefer Sutherland',
    'Julia Roberts',
    'Kevin Bacon',
    'William Baldwin',
    'Oliver Platt'
  );

  const flatliners2017 = makeDoc('Flatliners', 5.2, 2017, 'Niels Arden Oplev');
  flatliners2017.cast.push(
    'Elliot Page',
    'Diego Luna',
    'Nina Dobrev',
    'James Norton',
    'Kiersey Clemons'
  );

  listOfMovies.push(
    inception,
    theLastSamurai,
    darkKnightRises,
    kingsman,
    flatliners,
    flatliners2017
  );

  await movieCollection.insertMany(listOfMovies); // using the list of movies object to insert all documents in one go

  return await JSON.stringify(movieCollection.find().toArray());
}

// By exporting a function, we can run
export {runSetup};
