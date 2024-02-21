import { dogs } from "./mongoCollections.js";
import { ObjectId } from "mongodb"; // special type for IDEs

const exportedMethods = {
  async getDogById(id) {
    let x = new ObjectId();
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "Id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID"; // ObjectId.isValid(id) helps with tracking valid ids
    const dogCollection = await dogs(); // await dogs (what we imported)
    const doggo = await dogCollection.findOne({ _id: new ObjectId(id) }); // (without new) ObjectId.createFromHexString(id) for no false-error
    if (doggo === null) throw "No dog with that id";
    doggo._id = doggo._id.toString();
    return doggo;
  },
  async getAllDogs() {
    // no input parameters: there's nothing for us to check for
    const dogCollection = await dogs();
    let dogList = await dogCollection.find({}).toArray(); // works without {}, just confirms there's no conditions
    if (!dogList) throw "Could not get all dogs";
    dogList = dogList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return dogList;
  },
  async addDog(name, breeds) {
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
    name = name.trim(); // how we store the dog name in the database (after input validation)

    let newDog = {
      name: name,
      breeds: breeds,
    };
    const dogCollection = await dogs();
    const insertInfo = await dogCollection.insertOne(newDog);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add dog";

    const newId = insertInfo.insertedId.toString();

    const dog = await this.getDogById(newId);
    return dog;
  },
  async removeDog(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    const dogCollection = await dogs();
    const deletionInfo = await dogCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!deletionInfo) {
      throw `Could not delete dog with id of ${id}`;
    }
    return `${deletionInfo.name} has been deleted.`;
  },
  async updateDog(id, name, breeds) {
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

    const updatedDog = {
      name: name,
      breeds: breeds,
    };
    const dogCollection = await dogs();
    const updatedInfo = await dogCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedDog },
      { returnDocument: "after" }
    );
    if (!updatedInfo) {
      throw "could not update dog successfully";
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
  },
};

export default exportedMethods;
