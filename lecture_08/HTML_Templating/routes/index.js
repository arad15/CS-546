import postRoutes from './posts.js';
import userRoutes from './users.js';
import path from 'path';
import {static as staticDir} from 'express';
const constructorMethod = (app) => {
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.get('/about', (req, res) => { // when the url is /about, we're sending the static about.html file to the browser
    res.sendFile(path.resolve('static/about.html'));
  });
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => { // any other url will redirect to the root of posts instead of a 404 (Not Found)
    res.redirect('/posts');
  });
};

export default constructorMethod;
