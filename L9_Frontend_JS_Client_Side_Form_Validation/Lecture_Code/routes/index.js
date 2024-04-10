import calculatorRoutes from './calculator.js';

const constructorMethod = (app) => {
  app.use('/calculator', calculatorRoutes);

  app.use('*', (req, res) => {
    res.redirect('/calculator/static');
  });
};

export default constructorMethod;
