import { dogs } from "./mongoCollections.js"; // import dogs collection for us to reference to
import { ObjectId } from "mongodb"; // special type of ID for mongo, must type convert id to ObjectId

const exportedMethods = {
  // takes an id and returns a dog
  async getDogById(id) {
    let x = new ObjectId();
    // id is provided
    if (!id) throw "You must provide an id to search for";
    // id is a string
    if (typeof id !== "string") throw "Id must be a string";
    // make sure it isn't a string of empty spaces
    if (id.trim().length === 0)
      throw "Id cannot be an empty string or just spaces";
    // overriding id to be trimmed
    id = id.trim();
    // ObjectId.isValid(id) helps with tracking valid ids
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    // define a reference to the dogs collection (what we imported) before we call any of the 4 collection functions
    const dogCollection = await dogs();
    
    // findOne() finds just one document to return, with () holding the condition
    // new ObjectID(id) converts the input into an ObjectId for proper querying (proper id type)
    // (without new) ObjectId.createFromHexString(id) for no false-error
    const doggo = await dogCollection.findOne({ _id: new ObjectId(id) });
    // if it couldn't find a dog with this id
    if (doggo === null) throw "No dog with that id";
    // just for lecture 4 and lab 4, we have to convert the _id field to a string
    doggo._id = doggo._id.toString();
    return doggo;
  },
  async getAllDogs() {
    // no input parameters: there's nothing for us to check for

    // get a reference to the dogs collection
    const dogCollection = await dogs();
    // .find() gets all documents
    // works without {}, it just confirms there's no conditions
    // convert the data to an array for an array of objects
    let dogList = await dogCollection.find({}).toArray();
    if (!dogList) throw "Could not get all dogs";
    // loop through all the dog objects, updating the _id field to its string representation
    dogList = dogList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return dogList;
  },
  async addDog(name, breeds) {
    // takes in name of dog, and an array of breeds
    if (!name) throw "You must provide a name for your dog";
    if (typeof name !== "string") throw "Name must be a string";
    if (name.trim().length === 0)
      throw "Name cannot be an empty string or string with just spaces";
    if (!breeds || !Array.isArray(breeds))
      throw "You must provide an array of breeds";
    if (breeds.length === 0) throw "You must supply at least one breed";
    // check each breed for type and empty string
    for (let i in breeds) {
      if (typeof breeds[i] !== "string" || breeds[i].trim().length === 0) {
        throw "One or more breeds is not a string or is an empty string";
      }
      // trim all the fields to get rid of unnecessary white spaces
      breeds[i] = breeds[i].trim();
    }
    name = name.trim(); // how we store the dog name in the database (after input validation)
    // compose an object with the valid name and breeds
    let newDog = {
      name: name,
      breeds: breeds,
    };
    // take this object and insert it into the database

    // await dog collection before any operation function
    const dogCollection = await dogs();
    const insertInfo = await dogCollection.insertOne(newDog);
    // once insertOne(newDog) is ran, NOW mongoDB Compass will display the new database

    // when inserted, there will be an id returned. Or, an acknowledgement of it going thru
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add dog";

    // convert id to a string because getDogById expects a string
    const newId = insertInfo.insertedId.toString();

    const dog = await this.getDogById(newId);
    return dog; // return the added dog
  },

  async removeDog(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    // await the reference to the dogs collection
    const dogCollection = await dogs();
    // findOneAndDelete will delete AND return what is deleted
    const deletionInfo = await dogCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    // lecture recording makes this condition: deletionInfo.lastErrorObject.n === 0 (number of deleted documents)
    if (!deletionInfo) {
      throw `Could not delete dog with id of ${id}`;
    }
    // lecture recording makes this: deletionInfo.value.name . The last one can be any object field (breed, name)
    return `${deletionInfo.name} has been deleted.`;
  },

  async updateDog(id, name, breeds) {
    // same input validation checks (in bulk), will explain next lecture why he did it like this
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "Id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    if (!name) throw "You must provide a name for your dog";
    if (typeof name !== "string") throw "Name must be a string";
    if (name.trim().length === 0)
      throw "Name cannot be an empty string or string with just spaces";
    if (!breeds || !Array.isArray(breeds))
      throw "You must provide an array of breeds";
    if (breeds.length === 0) throw "You must supply at least one breed";

    for (let i in breeds) {
      if (typeof breeds[i] !== "string" || breeds[i].trim().length === 0) {
        throw "One or more breeds is not a string or is an empty string";
      }
      breeds[i] = breeds[i].trim();
    }
    name = name.trim();
    // don't pass in id, it will be used to query the data
    const updatedDog = {
      name: name,
      breeds: breeds,
    };
    // await the reference to the dogs collection (always do this before operations)
    const dogCollection = await dogs();

    const updatedInfo = await dogCollection.findOneAndUpdate(
      // where _id field === ObjectId representation of the inputted id
      { _id: new ObjectId(id) },
      // updates all the specified fields in the updatedDog object
      { $set: updatedDog },
      // return the document AFTER the update, not before (return the updated, not old data)
      // "before" is on by default
      { returnDocument: "after" }
    );
    // lecture recording has this as (updatedInfo.lastErrorObject.n === 0)
    if (!updatedInfo) {
      throw "could not update dog successfully";
    }
    updatedInfo._id = updatedInfo._id.toString(); // revert ObjectId back into string
    return updatedInfo; // lecture recording has this as updatedInfo.value (return the whole dog)
  },
};

export default exportedMethods; // exporting all methods
