const test = document.querySelector("#get-in-touch");

test.addEventListener("click", () => {
  gtag("event", "screen_view", {
    category: "button",
    screen_name: "Get In Touch",
    debug_mode: "true",
  });
});
