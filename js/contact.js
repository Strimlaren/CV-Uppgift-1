let name_input = document.getElementById("name");
let email_input = document.getElementById("email");
let name_char_display = document.getElementById("name-counter");
let email_char_display = document.getElementById("email-counter");

name_input.addEventListener("input", update_name_counter);
email_input.addEventListener("input", update_email_counter);

function update_name_counter() {

  let chars = 30 - (name_input.value).length;
  name_char_display.textContent = chars;

  if (chars < 11) {
    name_char_display.classList.add("warning");
    name_input.classList.add("warning-input");
  } else {
    name_char_display.classList.remove("warning");
    name_input.classList.remove("warning-input");
  }
}

function update_email_counter() {
  
  let chars = 30 - (email_input.value).length;
  email_char_display.textContent = chars;

  if (chars < 11) {
    email_char_display.classList.add("warning");
    email_input.classList.add("warning-input");
  } else {
    email_char_display.classList.remove("warning");
    email_input.classList.remove("warning-input");
  }
}