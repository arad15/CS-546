import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import users from '../data/users.js';
import posts from '../data/posts.js';

const db = await dbConnection();
await db.dropDatabase();

const patrick = await users.addUser('Patrick', 'Hill');
const pid = patrick._id.toString();
const aiden = await users.addUser('Aiden', 'Hill');
const aid = aiden._id.toString();
await posts.addPost('Hello, class!', 'Today we are creating a blog!', pid);
await posts.addPost(
  'Using the seed',
  'We use the seed to have some initial data so we can just focus on servers this week',
  pid
);

await posts.addPost(
  'Using routes',
  'The purpose of today is to simply look at some GET routes',
  pid
);

await posts.addPost("Aiden's first post", "This is aiden's first post", aid, [
  'toys'
]);
await posts.addPost("Aiden's second post", "This is aiden's second post", aid, [
  'aiden'
]);
await posts.addPost("Aiden's third post", "This is aiden's thrid post", aid, [
  'aiden',
  'kid'
]);

console.log('Done seeding database');

await closeConnection();
