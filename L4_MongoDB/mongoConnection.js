// This file sets up our connection to the database
import { MongoClient } from "mongodb"; // has everything we need for database interaction
import { mongoConfig } from "./settings.js"; // an object we made that contains 2 properties (server url + database name)

// _ to show that this is a member variable
let _connection = undefined; // connection
let _db = undefined; // database for this connection

export const dbConnection = async () => {
  // if connection is undefined
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl); // give it the server url to connect
    _db = _connection.db(mongoConfig.database); // set the database we are using (and its name)
  }

  return _db; // return the database
};

// This is only used in lecture 4 and lab 4 (have to manually close the connection until we start using servers)
export const closeConnection = async () => {
  await _connection.close(); // closes connection to the database
};
