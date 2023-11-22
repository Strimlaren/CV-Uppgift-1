// AUTHOR: Mirza Mesinovic
// WHAT IS IT?: Counter that keeps track of and displays amount of allowed chars left to type in a text-field

const message_input = document.getElementById("message");
const chars_left = document.getElementById("chars-left");
const max_chars = document.getElementById("max-chars"); 
// Litsen for whenever user inputs another char into the textarea field
message_input.addEventListener("input", update_message_counter);
// Get maxlength attribute from textarea and use it to set starting values that are presented to the user in the format (CHARS LEFT / MAX ALLOWED CHARS)
chars_left.textContent = message_input.attributes.maxlength.value;
max_chars.textContent = message_input.attributes.maxlength.value;

function update_message_counter() {
  // Calculate how many more chars user is allowed to type
  const chars = Number(max_chars.textContent) - (message_input.value).length;
  chars_left.textContent = chars;
  // Visual queue the user with css when less than 10% of max allowed chars remaining
  if (chars < Number(max_chars.textContent) / 10) {
    chars_left.classList.add("warning");
    message_input.classList.add("warning-input");
  } else {
    chars_left.classList.remove("warning");
    message_input.classList.remove("warning-input");
  }
}