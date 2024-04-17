import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import configRoutes from "./routes/index.js";
// we will use app.use() to apply our own middleware functions
app.use(cookieParser());

app.use(express.json());
// Middlewares:

/* 
req is the request object, just like how we have access to the request in our routes
 res is the response object, just like how we have access to the response in our routes
 next is a callback that will call the next middleware registered, or proceed to routes if none exist.
 If we do not call next(), we need to make sure we send a response of some sort or it will poll forever!
*/

// 1. One which will count the number of requests made to your website
let totalRequests = 0;

app.use(async (req, res, next) => {
  // middlewares take two parameters
  // 1) an optional route parameter (if you don't have this, it applies to the whole app)
  // 2) the actual function (with async (req, res, next))
  totalRequests++;
  console.log(`There have been ${totalRequests} requests made to the server`);
  next(); // either 1) calls the next middleware in the stack or 2) go to the route
});

// 2. One which will count the number of requests that have been made to the current path
// key: path, value: # requests
const pathsAccessed = {};
app.use(async (req, res, next) => {
  if (!pathsAccessed[req.path]) pathsAccessed[req.path] = 0;

  pathsAccessed[req.path]++;

  console.log(
    `There have now been ${pathsAccessed[req.path]} requests made to ${
      req.path
    }`
  );
  next();
});

// 3.  We will check if the request is an odd or even request number we will then add a field to the req object
app.use(async (req, res, next) => {
  if (totalRequests % 2 === 0) {
    req.isEven = true;
  } else {
    req.isOdd = true;
  }

  next();
});

//4. We will read if the request is odd or even and set the pun field on the req depending on which it is
app.use(async (req, res, next) => {
  if (req.isEven) {
    req.pun = "Someone is looking to get even.  ";
  }

  if (req.isOdd) {
    req.pun = "This is an odd request that doesn't make me feel comfortable  ";
  }
  next();
});

// 5. Log the pun that was made
app.use(async (req, res, next) => {
  console.log(req.pun);
  next(); // WON'T apply to 6 or 7 as they aren't the same directory; goes to 8
});

// 6. One which will deny all users access to the /admin path.
app.use("/admin", async (req, res, next) => {
  console.log("I'm in the admin middleware");
  // doesn't even go to the route: it terminates the response cycle (no more middlewares continue)
  return res.status(403).json({ error: "403: Forbidden" });
  //next(); // comment the above line and uncomment this
  // we will have all the middlewares above go off (since no paths are specified)
  // as well as 8 (not 7 since it specifies a route)
  // next() will go to the /admin or /post route in middleware function #8 (middleware stack is empty)
});

// 7.  One which will change the request method for a route before it hits the route or next middleware
app.use("/posts", async (req, res, next) => {
  console.log(req);
  // modify the request before it gets sent to the route
  // entering localhost:/3000/posts goes to the GET method,
  // but the following will change it to the PUT method (check posts.js).
  // This is NECESSARY for HTML FORMS (html forms only know GET and POST),
  // so we have to "fake" it into a PUT if we want the user to update data,
  // which is only appropriate for a PUT.
  // Check lecture 9's app.js for an example using a middleware function and 
  // a hidden html form field.
  if (req.method == "GET") {
    req.method = "PUT"; // 
  }
  next();
});

// 8. One which will log the last time the user has made a request, and store it in a cookie using the cookie-parser.
app.use(async (req, res, next) => {
  console.log("The request has all the following cookies:");
  console.log(req.cookies);
  // lastAccessed will hold the time of the most recent request
  if (req.cookies.lastAccessed) {
    console.log(
      "This user last accessed the site at " + req.cookies.lastAccessed
    );
  } else {
    console.log("This user has never accessed the site before");
  }

  // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
  if (totalRequests % 5 === 0) {
    console.log("now clearing the cookie");

    const anHourAgo = new Date();
    anHourAgo.setHours(anHourAgo.getHours() - 1);

    // invalidate, then clear so that lastAccessed no longer shows up on the
    // cookie object
    // either of the two below will work
    // res.cookie("lastAccessed", "", { expires: anHourAgo });
    res.clearCookie("lastAccessed");

    next();
    return; // note that this cookie clearing only occurs every 5th request
  }

  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  // Providing a third parameter is optional, but allows you to set options for the cookies.
  // see: http://expressjs.com/en/api.html#res.cookie
  // for details on what you can do!
  // set the cookie with the following: name of cookie, the date, and the expiry time
  res.cookie("lastAccessed", now.toString(), { expires: expiresAt });
  res.cookie("patrick", "hill");
  next(); // since this is the LAST middleware function in the stack, it will now go to the route
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
