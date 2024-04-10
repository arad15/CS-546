//  $ to reference a field in jquery, targeting an id as we would in css (with #)
// listens for the submit event
$('#myForm').submit((event) => {
  event.preventDefault(); // prevent the default behavior of form submission; it wants to post somewhere, causing the page to reload
  // NOTE: it's val(), not value
  if ($('#text_input').val().trim()) {
    $('#error').hide();
    $('#formLabel').removeClass('error');
    $('#text_input').removeClass('inputClass');
    // we can fully create this li item
    const li = `<li width=> ${$('#text_input').val()} </li>`;
    $('#list').append(li); // add li to the ul
    $('#myForm').trigger('reset'); // rest the form
    $('#text_input').focus(); // point cursor back to the text input
  } else {
    $('#error').show(); // oppose of hide
    $('#error').html('You must enter an input value'); // setting the innerHTML
    $('#formLabel').addClass('error');
    $('#text_input').addClass('inputClass');
    $('#text_input').focus();
    $('#text_input').val('');
  }
});
