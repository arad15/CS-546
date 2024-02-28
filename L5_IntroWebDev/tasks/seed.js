import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import users from '../data/users.js';
import posts from '../data/posts.js';

const db = await dbConnection();
await db.dropDatabase();

const patrick = await users.addUser('Patrick     ', 'Hill');
const pid = patrick._id.toString();

const aiden = await users.addUser('Aiden', 'Hill');
const aid = aiden._id.toString();

const firstPost = await posts.addPost(
  'Hello, class!      ',
  'Today we are creating a blog!          ',
  pid
);

const second = await posts.addPost(
  'Using the seed',
  'We use the seed to have some initial data so we can just focus on servers this week',
  pid
);

const third = await posts.addPost(
  'Using routes',
  'The purpose of today is to simply look at some GET routes',
  aid
);

const forth = await posts.addPost(
  "Aiden's Blog Post",
  'FooBar FooBar FooBar FooBar FooBar FooBar FooBar FooBar FooBar FooBar FooBar FooBar ',
  aid
);
console.log('Done seeding database');
await closeConnection();
