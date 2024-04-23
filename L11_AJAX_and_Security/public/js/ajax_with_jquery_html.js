(function ($) {
  // Let's start writing AJAX calls!

  //Let's get references to our form elements and the div where the todo's will go
  let myNewTaskForm = $('#new-item-form'),
    newNameInput = $('#new-task-name'),
    newDecriptionArea = $('#new-task-description'),
    todoArea = $('#todo-area');

  /*
    This function takes in an element and binds the click event to the link to mark the todo complete.
    The link element is returned in the HTML returned from the route
   */
  function bindEventsToTodoItem(todoItem) {
    todoItem.find('.finishItem').on('click', function (event) {
      event.preventDefault();
      let currentLink = $(this);
      let currentId = currentLink.data('id');

      let requestConfig = {
        method: 'POST',
        url: '/api/todo/complete/html/' + currentId
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        let newElement = $(responseMessage);
        bindEventsToTodoItem(newElement);
        todoItem.replaceWith(newElement);
      });
    });
  }

  //When the page loads, we want to bind all the events to the returned data
  todoArea.children().each(function (index, element) {
    bindEventsToTodoItem($(element));
  });

  //new todo form submission event
  myNewTaskForm.submit(function (event) {
    event.preventDefault();

    let newName = newNameInput.val();
    let newDescription = newDecriptionArea.val();

    if (newName && newDescription) {
      //set up AJAX request config
      let requestConfig = {
        method: 'POST',
        url: '/api/todo.html',
        contentType: 'application/json',
        data: JSON.stringify({
          name: newName,
          description: newDescription
        })
      };
      //AJAX Call. Gets the returned HTML data, binds the click event to the link and appends the new todo to the page
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        let newElement = $(responseMessage);
        bindEventsToTodoItem(newElement);
        todoArea.append(newElement);
        newNameInput.val('');
        newDecriptionArea.val('');
        newNameInput.focus();
      });
    }
  });
})(window.jQuery);
