import apiRoutes from './api.js';
import {getAll} from '../data/index.js';

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
