import postRoutes from './posts.js';
import userRoutes from './users.js';
import adminRoutes from './admin.js';

const constructorMethod = (app) => {
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.use('/admin', adminRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
