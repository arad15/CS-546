(function ($) {
  // Let's start writing AJAX calls!

  //Let's get references to our form elements and the div where the todo's will go
  let myNewTaskForm = $("#new-item-form"),
    newNameInput = $("#new-task-name"),
    newDecriptionArea = $("#new-task-description"),
    todoArea = $("#todo-area"); // the top div in home.handlebars

  // When the page loads, we want to query the server to get the TODO data as raw JSON
  // get ALL the todo's and display them on the page
  // Set up an AJAX request config
  let requestConfig = {
    // our http method
    method: "GET",
    // which route we're submitting to on the server
    url: "/api/todo/json",
  };
  //Make AJAX Call (AJAX request, with the config above that sends a req to our server)
  $.ajax(requestConfig).then(function (responseMessage) {
    // Note: each todo from the route /api/todo/json in api.js is a raw json, so we format it here.
    //Now we are going to loop through the data, creating each element group for each todo in the data
    //Pay attention, when I'm building the html elements, I check the notDone field and display a different
    //element depending on if the todo is done or not
    console.log(responseMessage);
    responseMessage.map((todoItem) => {
      // for each todo, create this snippet of HTML with the second part being conditional
      // based on whether the todoItem is done or not
      let element = $(
        `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${
          todoItem.title
        }</h3><p>${todoItem.task}</p>${
          todoItem.notDone
            ? `<a class="finishItem" data-id="${todoItem.id}">Finish</a></div></div>`
            : "<em>This task has been completed</em></div></div>"
        }`
      ); 
      if (todoItem.notDone) {
        // bind the todo link for the click event
        // this is needed for (?)
        bindEventsToTodoItem(element);
      }
      //append the todo to the page (attach this whole div to home.handlebars (toDoItems on the top))
      todoArea.append(element);
    });
  });
  /*
    This function takes in an element and binds the click event to the link to mark the todo complete.
    The link element is created above when parsing through the JSON data
   */
  function bindEventsToTodoItem(todoItem) {
    // this handles when we click the "Finish" button under a todoItem
    todoItem.find(".finishItem").on("click", function (event) {
      //mark the todo complete when clicked
      event.preventDefault(); // because we do everything client-side
      let currentLink = $(this); // get the current todoItem
      // data-id field in the HTML above is very useful for making sure the button finishes the right task
      let currentId = currentLink.data("id");
      // setup another AJAX request to mark the todoItem complete
      let requestConfig = {
        method: "POST",
        url: "/api/todo/complete/json/" + currentId, // appends id to the url
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        // this is called after router.route('/api/todo/complete/json/:id').post returns res.json(updatedData)
        // this will replace the todoItem's data with the new format ("Finish" button turns to "This task has been completed")
        console.log(responseMessage);
        let data = responseMessage;
        let element = $(
          `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${data.title}</h3><p>${data.task}</p><em>This task has been completed</em></div></div>`
        );

        //bindEventsToTodoItem(element);
        todoItem.replaceWith(element);
      });
    });
  }

  //new todo form submission event
  myNewTaskForm.submit(function (event) {
    event.preventDefault();

    let newName = newNameInput.val();
    let newDescription = newDecriptionArea.val();

    if (newName && newDescription) {
      //set up AJAX request config
      // this one SENDs data to the server
      let requestConfig = {
        method: "POST",
        url: "/api/todo/json",
        // this is exactly what we do in postman; json data
        contentType: "application/json",
        data: JSON.stringify({
          name: newName,
          description: newDescription,
        }),
      };
      //AJAX Call. Gets the returned JSON data, creates the elements, binds the click event to the link and appends the new todo to the page
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);

        let element = $(
          `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${responseMessage.todo.title}</h3><p>${responseMessage.todo.task}</p><a class="finishItem" data-id="${responseMessage.todo.id}">Finish</a></div></div>`
        );
        bindEventsToTodoItem(element); // set up the click event
        todoArea.append(element); // append the new todo item onto the page
        newNameInput.val("");
        newDecriptionArea.val("");
        newNameInput.focus();
      });
    }
  });
})(window.jQuery);
