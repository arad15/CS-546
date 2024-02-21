import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js";

// _ to show that this is a member variable
let _connection = undefined;
let _db = undefined;

// take the serverUrl from settings.js
export const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};

// This is only used in lecture 4 and lab 4
export const closeConnection = async () => {
  await _connection.close();
};
