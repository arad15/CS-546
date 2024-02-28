// just import any new data functions for modularity
import postRoutes from './posts.js';
import userRoutes from './users.js';

const constructorMethod = (app) => {
  app.use('/posts', postRoutes); // when the url is /posts, use the routes defined in posts.js
  app.use('/users', userRoutes); // when the url is /user, use the routes defined in user.js

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};

export default constructorMethod;
