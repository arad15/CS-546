import calculatorRoutes from './calculator.js';

const constructorMethod = (app) => {
  app.use('/calculator', calculatorRoutes);

  app.use('*', (req, res) => {
    res.redirect('/calculator/static'); // any other route will default to this static file 
    // (not using node js server, it's using our clientside)
  });
};

export default constructorMethod;
