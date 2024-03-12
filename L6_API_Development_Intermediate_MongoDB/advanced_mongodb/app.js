import advMongo from './advanced_mongo.js';
import {runSetup} from './advanced_startup_docs.js';

//First lets run the start up to create the data in the DB Can be commented out after first run to perserve DB
const startUp = await runSetup();

//Now we can experiment calling the advanced query functions.
const findChrisNolan = await advMongo.findByDirector('Christopher Nolan');
console.log(findChrisNolan);

const before2015 = await advMongo.findMoviesReleasedOnOrBefore(2015);
console.log(before2015);

const rating = await advMongo.findByRatings([3.2, 5]);
console.log(rating);

const ratingtwo = await advMongo.findByRatingsNot([3.2, 5]);
console.log(ratingtwo);

const after2015 = await advMongo.findMoviesReleasedAfter(2015);
console.log(after2015);

const directorAndYear = await advMongo.findMoviesWithDirectorAndYear(
  'Christopher Nolan',
  2015
);
console.log(directorAndYear);

const directorOrYear = await advMongo.findMoviesWithDirectorOrYear(
  'Christopher Nolan',
  2015
);
console.log(directorOrYear);

const sortByTitleYearDec = await advMongo.getAllMoviesSortedByTitleAscYearDec();
console.log(sortByTitleYearDec);

const sortByTitleYearAsc = await advMongo.getAllMoviesSortedByTitleAscYearAsc();
console.log(sortByTitleYearAsc);

const selectFields = await advMongo.getAllMoviesTitleDirectorCastOnly();
console.log(selectFields);

const excludeFields = await advMongo.getAllMoviesExcludeReviewsInfoCast();
console.log(excludeFields);

const sortByTitleAsc = await advMongo.getAllMoviesSortedByTitleAsc();
console.log(sortByTitleAsc);

const sortByTitleDec = await advMongo.getAllMoviesSortedByTitleDec();
console.log(sortByTitleDec);

const sortByYearAsc = await advMongo.getAllMoviesSortedByYearAsc();
console.log(sortByYearAsc);

const sortByYearDec = await advMongo.getAllMoviesSortedByYearDec();
console.log(sortByYearDec);

const skipFirstTwo = await advMongo.getAllMoviesSkipFirstTwo();
console.log(skipFirstTwo);

const limitFirstTwo = await advMongo.getAllMoviesLimitOfTwo();
console.log(limitFirstTwo);

const skipAndLimit = await advMongo.getAllMoviesSkipFirstLimitThree();
console.log(skipAndLimit);

const skipLimitSort =
  await advMongo.getAllMoviesSkipFirstLimitThreeSortByTitleDec();
console.log(skipLimitSort);

const updateTitle = await advMongo.updateTitle(1, 'inception');
console.log(updateTitle);

const updateDirector = await advMongo.updateDirector(1, 'Patrick Hill');
console.log(updateDirector);

const incYear = await advMongo.bumpReleaseYearUp(1);
console.log(incYear);

const findElliot = await advMongo.findByCast('Elliot Page');
console.log(findElliot);

const findPhil = await advMongo.findByReviewerName('Phil');
console.log(findPhil);

const addCastNoDup = await advMongo.addCastMemberIfNotExists(
  1,
  'Leonardo DiCaprio'
);
console.log(addCastNoDup);

const addCastDup = await advMongo.addCastMemberAllowDuplicates(
  1,
  'Leonardo DiCaprio'
);
console.log(addCastDup);

//Lets get a single review from a movie
//get the movie and then use one of the id's of the reviews to get the review. (since the data rebuilds after after run, we can't simply hardcode the id of the review)
const inception = await advMongo.getMovie(1);

//Get a single review object without the movie.
const reviewById = await advMongo.findByReviewIdReviewOnly(
  inception.reviews[0]._id
);
console.dir(reviewById);

console.log('done');
process.exit();
