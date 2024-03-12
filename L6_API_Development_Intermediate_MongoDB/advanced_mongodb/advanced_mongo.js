// Here is where we develop all of our data functions
import { advancedMovies } from "./mongoCollections.js";

const exportedMethods = {
  async getAllMovies() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection.find({}).toArray();
    return movieList;
  },

  // more simple stuff
  async getMovie(id) {
    if (id === undefined) throw "You must provide an ID";
    const movieCollection = await advancedMovies();
    const movie = await movieCollection.findOne({ _id: id });

    if (!movie) {
      throw "Could not find movie with id of " + id;
    }
    return movie;
  },

  // =================
  // Advanced finding/querying
  // =================

  //Including or excluding certain fields
  async getAllMoviesTitleDirectorCastOnly() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({}) // get all movies
      .project({ _id: 0, title: 1, "info.director": 1, cast: 1 }) // 0 exludes _id, info.director is in quotes because it is a subdocument field
      .toArray();
    return movieList;
  },
  async getAllMoviesExcludeReviewsInfoCast() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      // can't have a mix of 1s and 0s: either one 0 and the rest are 1s or vice versa
      .project({ _id: 1, reviews: 0, info: 0, cast: 0 })
      .toArray();
    return movieList;
  },
  //Sorting
  async getAllMoviesSortedByTitleAsc() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: 1 }) // 1 means ascending
      .toArray();
    return movieList;
  },
  async getAllMoviesSortedByTitleDec() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: -1 }) // -1 means descending
      .toArray();
    return movieList;
  },
  async getAllMoviesSortedByYearAsc() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ "info.release": 1 }) // recall info.release is in quotes because release is a subdocument field
      .toArray();
    return movieList;
  },
  async getAllMoviesSortedByYearDec() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ "info.release": -1 })
      .toArray();
    return movieList;
  },
  async getAllMoviesSortedByTitleAscYearDec() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: 1, "info.release": -1 }) // sort by multiple fields
      .toArray();
    return movieList;
  },

  async getAllMoviesSortedByTitleAscYearAsc() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: 1, "info.release": 1 })
      .toArray();
    return movieList;
  },

  //skip and limit
  //skip
  async getAllMoviesSkipFirstTwo() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection.find({}).skip(2).toArray(); // skips the first 2 queried documents
    return movieList;
  },
  //limit
  async getAllMoviesLimitOfTwo() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection.find({}).limit(2).toArray(); // returns only the first 2 queried documents
    return movieList;
  },

  //limit and skip
  async getAllMoviesSkipFirstLimitThree() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection.find({}).skip(2).limit(3).toArray();
    return movieList;
  },

  //limit skip and sort
  async getAllMoviesSkipFirstLimitThreeSortByTitleDec() {
    const movieCollection = await advancedMovies();
    const movieList = await movieCollection
      .find({})
      .skip(2)
      .limit(3)
      .sort({ title: -1 })
      .toArray();
    return movieList;
  },

  // We can query on subdocuments very easily
  async findByDirector(directorName) {
    if (!directorName) throw "You must provide a director name";
    const movieCollection = await advancedMovies();
    // to query on a subdocument field, just provide the path to the field as a string key;
    // so when you have {info: {director: someName}}, just find on {"info.director": someName}
    return await movieCollection
      .find({ "info.director": directorName })
      .toArray();
  },

  // For demonstration purposes, let's take an array of ratings and search by that
  async findByRatings(potentialRatings) {
    if (!potentialRatings)
      throw "You must provide an array of potentially matching ratings";
    const movieCollection = await advancedMovies();
    // ie, passing [3.2, 5] would find movies that have a rating field with 3.2 or 5 [3.2,5]
    return await movieCollection
      .find({ rating: { $in: potentialRatings } })
      .toArray();
  },
  async findByRatingsNot(potentialRatings) {
    if (!potentialRatings)
      throw "You must provide an array of potentially matching ratings";
    const movieCollection = await advancedMovies();
    // ie, passing [3.2, 5] would find movies that DON'T have a rating field with 3.2 or 5 [3.2,5]
    return await movieCollection
      .find({ rating: { $nin: potentialRatings } })
      .toArray();
  },

  async findMoviesReleasedBefore(startingYear) {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";
    const movieCollection = await advancedMovies();
    return await movieCollection
      .find({ "info.release": { $lt: startingYear } }) // less than startingYear (noninclusive)
      .toArray();
  },

  async findMoviesReleasedOnOrBefore(startingYear) {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";
    const movieCollection = await advancedMovies();
    return await movieCollection
      .find({ "info.release": { $lte: startingYear } }) // less than or equal to startingYear (inclusive)
      .toArray();
  },

  async findMoviesReleasedAfter(startingYear) {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";
    const movieCollection = await advancedMovies();
    return await movieCollection
      .find({ "info.release": { $gt: startingYear } })
      .toArray();
  },

  async findMoviesReleasedOnOrAfter(startingYear) {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";
    const movieCollection = await advancedMovies();
    return await movieCollection
      .find({ "info.release": { $gte: startingYear } })
      .toArray();
  },

  async findMoviesWithDirectorAndYear(directorName, releaseYear) {
    if (!directorName) throw "You must provide a director name";
    if (releaseYear === undefined) throw "You must give a release year";

    // you can pass any number of arguments to your $and, meaning you can also query different
    // things on the same field -- you can check, for example, that it matches 2 text expression
    // or that it exists AND that it is less than a certain value
    const movieCollection = await advancedMovies();
    // test with: findMoviesWithDirectorAndYear("Christopher Nolan", 2012)
    return await movieCollection
      .find({
        $and: [
          // $and takes in an array of expressions where it returns only those that match every expression
          { "info.release": releaseYear },
          { "info.director": directorName },
        ],
      })
      .toArray();
  },

  async findMoviesWithDirectorOrYear(directorName, releaseYear) {
    if (!directorName) throw "You must provide a director name";
    if (releaseYear === undefined) throw "You must give a release year";
    const movieCollection = await advancedMovies();
    // you can pass any number of arguments to your $or, just like $and;
    // This works pretty much as you'd expect, and matches any documents that match ANY of the conditions

    // test with: findMoviesWithDirectorOrYear("Christopher Nolan", 2015)
    return await movieCollection
      .find({
        $or: [
          { "info.release": releaseYear },
          { "info.director": directorName },
        ],
      })
      .toArray();
  },

  // =================
  // Advanced Updating
  // =================

  async updateTitle(id, newTitle) {
    if (id === undefined) throw "No id provided";
    if (!newTitle) throw "No title provided";
    const movieCollection = await advancedMovies();
    // we use $set to update only the fields specified
    await movieCollection.updateOne({ _id: id }, { $set: { title: newTitle } });

    return await this.getMovie(id);
  },

  async updateDirector(id, newDirector) {
    if (id === undefined) throw "No id provided";
    if (!newDirector) throw "No newDirector provided";
    const movieCollection = await advancedMovies();
    // we use $set to update only the fields specified
    await movieCollection.updateOne(
      { _id: id },
      { $set: { "info.director": newDirector } }
    );

    return await this.getMovie(id);
  },

  async bumpReleaseYearUp(id) {
    if (id === undefined) throw "No id provided";
    const movieCollection = await advancedMovies();
    // Can increment positively or negatively by any value using the $inc operator
    await movieCollection.updateOne(
      { _id: id },
      { $inc: { "info.release": 1 } }
    );

    return await this.getMovie(id);
  },

  async doubleRating(id) {
    if (id === undefined) throw "No id provided";
    const movieCollection = await advancedMovies();
    // Can multiply positively or negatively by any value using the $mul operator
    await movieCollection.updateOne({ _id: id }, { $mul: { rating: 2 } });

    return await this.getMovie(id);
  },

  async removeRating(id) {
    if (id === undefined) throw "No id provided";
    const movieCollection = await advancedMovies();
    // using the $unset operator, setting the current value in the field to ""
    await movieCollection.updateOne({ _id: id }, { $unset: { rating: "" } });

    return await this.getMovie(id);
  },

  async updateRatingToMinValue(id, newRating) {
    if (id === undefined) throw "No id provided";
    if (newRating === undefined) throw "no rating provided";
    const movieCollection = await advancedMovies();
    // if the value is higher than newRating, it will change to newRating; otherwise, it
    // will stay as is. This is done with the $min operator, comparing the current field
    // value to the input parameter newRating
    await movieCollection.updateOne(
      { _id: id },
      { $min: { rating: newRating } }
    );

    return await this.getMovie(id);
  },

  async updateRatingToMaxValue(id, newRating) {
    if (id === undefined) throw "No id provided";
    if (newRating === undefined) throw "no rating provided";
    const movieCollection = await advancedMovies();
    // if the value is lower than newRating, it will change to newRating; otherwise, it
    // will stay as is. This is done using the $max operator (similar to $min above).
    await movieCollection.updateOne(
      { _id: id },
      { $max: { rating: newRating } }
    );

    return await this.getMovie(id);
  },

  // =================
  // Array based querying
  // =================

  async findByCast(name) {
    if (!name) throw "You must provide a name for the cast member";
    const movieCollection = await advancedMovies();
    return await movieCollection.find({ cast: name }).toArray();
  },

  async findByReviewerName(reviewerName) {
    if (!reviewerName) throw "You must provide a name for the reviewer";
    const movieCollection = await advancedMovies();
    // pass 'Phil' or 'Sallie' to find multiple matches, or 'Definitely Not Leo' to find a suspicious review.
    return await movieCollection
      .find({ "reviews.reviewer": reviewerName })
      .toArray();
  },

  // IMPORTANT: return JUST a single review without the movie information
  async findByReviewIdReviewOnly(reviewId) {
    if (!reviewId) throw "You must provide a name for the reviewer";
    const movieCollection = await advancedMovies();
    const foundReview = await movieCollection.findOne(
      { "reviews._id": reviewId }, // find the matching reviewId
      { projection: { _id: 0, "reviews.$": 1 } } // exclude reviewId, "reviews.$" finds the matching review in the array reviews
    );
    if (!foundReview) throw "Review Not found";
    console.log(foundReview.reviews);
    return foundReview.reviews[0]; // reviews is an array of reviews, and "reviews.$" in projection only gets the 1 matching review
  },

  // =================
  // Updating arrays
  // =================

  async addCastMemberIfNotExists(id, newCastMember) {
    if (id === undefined) throw "No id provided";
    if (newCastMember === undefined) throw "no newCastMember provided";
    const movieCollection = await advancedMovies();
    // if our new cast member is already listed, this will be ignored
    // Try it out -- add Matthew McConaughey
    await movieCollection.updateOne(
      { _id: id },
      { $addToSet: { cast: newCastMember } } // Set: every element must be unique. Makes sure duplicate Cast Members can't be added
    );

    return await this.getMovie(id);
  },

  async addCastMemberAllowDuplicates(id, newCastMember) {
    if (id === undefined) throw "No id provided";
    if (newCastMember === undefined) throw "no newCastMember provided";
    const movieCollection = await advancedMovies();
    // if our new cast member is already listed, we will be left with 2 copies of them
    // Try this a few times. Remember, you can never have enough Matthew McConaughey
    await movieCollection.updateOne(
      { _id: id },
      { $push: { cast: newCastMember } } // $push updates an array regardless of duplicate
    );

    return await this.getMovie(id);
  },

  async popLastCastMember(id) {
    if (id === undefined) throw "No id provided";
    const movieCollection = await advancedMovies();
    // removes last
    await movieCollection.updateOne({ _id: id }, { $pop: { cast: 1 } }); // $pop with 1 removes the last array element

    return await this.getMovie(id);
  },

  async popFirstCastMember(id) {
    if (id === undefined) throw "No id provided";
    const movieCollection = await advancedMovies();
    // removes first
    await movieCollection.updateOne({ _id: id }, { $pop: { cast: -1 } }); // $pop with -1 removes the first array element

    return await this.getMovie(id);
  },

  // We can also remove based on value, or by matching fields the same way we can query for documents
  async removeCastMember(id, memberToRemove) {
    if (id === undefined) throw "No id provided";
    if (!memberToRemove) throw "No memberToRemove provided";
    const movieCollection = await advancedMovies();
    // removes all matching array entry; remember, if you add
    // you can use $pullAll to pull multiple entries
    await movieCollection.updateOne(
      { _id: id },
      { $pull: { cast: memberToRemove } } // $pull allows us to specify the array element to remove
    );

    return await this.getMovie(id);
  },

  async removeReview(id, reviewId) {
    if (id === undefined) throw "No id provided";
    if (!reviewId) throw "No reviewId provided";
    const movieCollection = await advancedMovies();
    await movieCollection.updateOne(
      { _id: id },
      { $pull: { reviews: { _id: reviewId } } } // pull the whole review with the matching reviewId
    );

    return await this.getMovie(id);
  },
};
export default exportedMethods;
