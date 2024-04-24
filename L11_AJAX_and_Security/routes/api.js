import {Router} from 'express';
const router = Router();
import {makeToDo, finishToDo, getAll} from '../data/index.js';
import xss from 'xss';

//homepage routes: rendering the homepage
router.route('/json').get(async (req, res) => {
  // render the home template
  res.render('home', {
    pageTitle: 'So Much ToDo!',
    h3title: 'Using Routes That Return JSON',
    // script_partial is json_script.handlebars that loads another client-side .js file
    script_partial: 'json_script'
  });
});

router.route('/html').get(async (req, res) => {
  res.render('home', {
    pageTitle: 'So Much ToDo!',
    h3title: 'Using Routes That Return HTML',
    todoItems: getAll(),
    script_partial: 'html_script'
  });
});

//JSON AJAX call routes
router
  .route('/api/todo/json')
  .get(async (req, res) => {
    // this route gets all the todos
    let todos = getAll(); // return an array of all objs
    res.json(todos);
  })
  .post(async (req, res) => {
    // this route creates a todo

    //let cleanName = req.body.name;
    //let cleanDesc = req.body.description;

    let cleanName = xss(req.body.name);
    let cleanDesc = xss(req.body.description);
    let todo = makeToDo(cleanName, cleanDesc);
    res.json({success: true, todo: todo});
  });

router.route('/api/todo/complete/json/:id').post((req, res) => {
  const updatedData = finishToDo(parseInt(req.params.id));
  res.json(updatedData);
});

//HTML AJAX API call routes
router.route('/api/todo/complete/html/:id').post((req, res) => {
  const updatedData = finishToDo(parseInt(req.params.id));
  res.render('partials/todo_item', {layout: null, ...updatedData});
});

router.route('/api/todo.html').post((req, res) => {
  let cleanName = xss(req.body.name);
  let cleanDesc = xss(req.body.description);
  const newTodo = makeToDo(cleanName, cleanDesc);
  res.render('partials/todo_item', {layout: null, ...newTodo});
});

export default router;
