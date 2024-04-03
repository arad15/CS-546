
let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('list');
let frmLabel = document.getElementById('formLabel');

if (myForm) {
  // sometimes (event) is types as (e)
  myForm.addEventListener('submit', (event) => {
    console.log('Form submission fired');
    event.preventDefault(); // when the form is submitted, the data is prevented from being sent instantly
    console.log('Has a form');
    if (textInput.value.trim()) {
      textInput.classList.remove('inputClass');
      errorDiv.hidden = true;
      frmLabel.classList.remove('error');
      let li = document.createElement('li'); // creates the REFERENCE, doesn't show up yet

      li.innerHTML = textInput.value;
      myUl.appendChild(li); // NOW it's displayed 
      myForm.reset();
      textInput.focus();
    } else {
      textInput.value = ''; // only if input is '       ' (remove spaces)
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      frmLabel.className = 'error';
      textInput.focus();
      textInput.className = 'inputClass';
    }
  });
}
