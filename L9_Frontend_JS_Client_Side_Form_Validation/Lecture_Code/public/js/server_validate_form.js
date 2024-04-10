(function () {
  let num1 = document.getElementById('number1');
  let num2 = document.getElementById('number2');
  let operation = document.getElementById('operation');
  let errorDiv = document.getElementById('error_div');
  let resultDiv = document.getElementById('result_div');
  const serverForm = document.getElementById('server-form');

  let errors = [];
  const checkIsProperNumber = (val, variableName) => {
    if (typeof val !== 'number')
      errors.push(`Must provide a number for '${variableName}'`);

    if (isNaN(val)) errors.push(`Must provide a number for '${variableName}'`);
  };

  if (serverForm) {
    serverForm.addEventListener('submit', (event) => {
      errors = [];
      if (errorDiv) errorDiv.hidden = true;

      if (resultDiv) resultDiv.hidden = true;

      checkIsProperNumber(parseInt(num1.value), 'First Number');
      checkIsProperNumber(parseInt(num2.value), 'Second Number');
      if (!operation.value) {
        errors.push('Operation Must be selected');
      }
      if (errors.length > 0) {
        let myUL = document.createElement('ul');

        event.preventDefault();
        for (let i = 0; i < errors.length; i++) {
          let myLi = document.createElement('li');
          myLi.classList.add('error');
          myLi.innerHTML = errors[i];
          myUL.appendChild(myLi);
        }
        serverForm.appendChild(myUL);
      }
    });
  }
})();
