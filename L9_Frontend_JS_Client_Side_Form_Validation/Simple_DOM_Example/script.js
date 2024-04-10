let myForm = document.getElementById("myForm"); // get a reference to the form ...
let textInput = document.getElementById("text_input"); // input
let errorDiv = document.getElementById("error"); // div
let myUl = document.getElementById("list"); // ul
let frmLabel = document.getElementById("formLabel"); // label

if (myForm) {
  // sometimes (event) is typed as (e)
  // 2 parameters:
  // 1) the event we're listening for ("submit" event for the button)
  // 2) function (event or e)
  myForm.addEventListener("submit", (event) => {
    console.log("Form submission fired");
    event.preventDefault(); // prevent the default behavior of form submission; it wants to post somewhere, causing the page to reload
    console.log("Has a form");
    if (textInput.value.trim()) {
      textInput.classList.remove("inputClass");
      errorDiv.hidden = true; // hide the error div, as we don't wanna show a previous error when this input succeeds
      frmLabel.classList.remove("error");
      let li = document.createElement("li"); // creates a REFERENCE to an li element, doesn't show up yet

      li.innerHTML = textInput.value; // give this new element a value
      myUl.appendChild(li); // NOW it's displayed (once it is added to a parent node (ul) )
      myForm.reset(); // resets the form
      textInput.focus(); // focuses the cursor back to the text input
    } else {
      textInput.value = ""; // only if input is '       ' (remove spaces)
      errorDiv.hidden = false; // show the error div
      errorDiv.innerHTML = "You must enter a value";
      frmLabel.className = "error";
      textInput.focus();
      textInput.className = "inputClass";
    }
  });
}
