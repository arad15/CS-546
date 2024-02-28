import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from './validation.js';

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  async getUserById(id) {
    id = validation.checkId(id); // replaces all the repeated validation code from Lecture 4
    const userCollection = await users();
    const user = await userCollection.findOne({_id: new ObjectId(id)});
    if (!user) throw 'Error: User not found';
    return user;
  },
  async addUser(firstName, lastName) {
    firstName = validation.checkString(firstName, 'First name');
    lastName = validation.checkString(lastName, 'Last name');

    let newUser = {
      firstName: firstName,
      lastName: lastName
    };
    const userCollection = await users();
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId.toString());
  },
  async removeUser(id) {
    id = validation.checkId(id);
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });
    if (!deletionInfo) throw `Error: Could not delete user with id of ${id}`;

    return {...deletionInfo, deleted: true};
  },
  async updateUser(id, firstName, lastName) {
    id = validation.checkId(id);
    firstName = checkString(firstName, 'first name');
    lastName = checkString(lastName, 'last name');

    const userUpdateInfo = {
      firstName: firstName,
      lastName: lastName
    };
    const userCollection = await users();
    const updateInfo = await userCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: userUpdateInfo},
      {returnDocument: 'after'}
    );
    if (!updateInfo) throw 'Error: Update failed';

    return await updateInfo;
  }
};

export default exportedMethods;
