import express from 'express';
const app = express();
import session from 'express-session';
import configRoutes from './routes/index.js';

app.use(express.json());

// making a session called 'AwesomeWebApp', which we will save things into
app.use(
  session({
    name: 'AwesomeWebApp',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60000}
  })
);

// middleware function for the private route
app.use('/private', (req, res, next) => {
  console.log(req.session.id);
  // check if there is a user or not 
  if (!req.session.user) {
    // normally, you would render a handlebar template (or a static html) to the log-in page,
    return res.redirect('/'); // but we redirect to the root directory here
  } else {
    next();
  }
});

// middleware function for the login route
// i.e. we don't want them to see a login page if they're already logged in
app.use('/login', (req, res, next) => {
  if (req.session.user) {
    // if there is a user, redirect them to the private route
    return res.redirect('/private');
  } else {
    //here I'm just manually setting the req.method to post since it's usually coming from a form
    req.method = 'POST';
    next(); // recall since there's no further middlewares, it proceeds to the /login route
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
