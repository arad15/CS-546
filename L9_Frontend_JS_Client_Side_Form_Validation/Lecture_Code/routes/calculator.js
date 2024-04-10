import {Router} from 'express';
const router = Router();
import calculator from '../data/calculator.js';

router.get('/static', (req, res) => {
  res.render('calculator/static', {partial: 'static_script'});
});

router.get('/server', (req, res) => {
  res.render('calculator/server', {
    partial: 'server_script'
  });
});

router.post('/server', (req, res) => {
  console.log('In server route for processing');
  let operation = (req.body.operation || 'add').toLowerCase();
  let firstNumber = parseInt(req.body.number1);
  let secondNumber = parseInt(req.body.number2);
  let result;

  try {
    switch (operation) {
      case 'add':
        result = calculator.add(firstNumber, secondNumber);
        break;
      case 'subtract':
        result = calculator.subtract(firstNumber, secondNumber);
        break;
      case 'multiply':
        result = calculator.multiply(firstNumber, secondNumber);
        break;
      case 'divide':
        result = calculator.divide(firstNumber, secondNumber);
        break;
      default:
        throw 'Operation not supported';
    }
    console.log('result', result);
  } catch (e) {
    return res.render('calculator/server', {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      operation: operation,
      error: e,
      partial: 'server_script'
    });
  }

  res.render('calculator/server', {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operation: operation,
    result: result,
    partial: 'server_script'
  });
});

export default router;
