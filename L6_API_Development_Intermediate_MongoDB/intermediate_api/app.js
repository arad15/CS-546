import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

// This is our only difference in app.js compared to Lecture 5
// This is using the express.json() middleware that allows us
// to read the request body in our routes. ITS CRUCIAL!!!!!!!
// The request body in the routes will come out as undefined without this,
// making us unable to POST data, or do anything else where we need to
// read the request body
app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
