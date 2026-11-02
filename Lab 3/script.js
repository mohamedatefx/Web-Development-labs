// Get the elements from the page by their ids
const title = document.getElementById("title");
const nameInput = document.getElementById("name");
const greetButton = document.getElementById("greet");
const list = document.getElementById("list");

// When the Greet button is clicked
greetButton.addEventListener("click", function () {
  // Read what the user typed (trim removes extra spaces)
  const name = nameInput.value.trim();

  // If the box is empty, do nothing
  if (name === "") {
    return;
  }

  // 1. Change the title to say hello
  title.textContent = "Hello, " + name + "!";

  // 2. Create a new list item with the name
  const item = document.createElement("li");
  item.textContent = name;

  // 3. When this name is clicked: say goodbye and remove it
  item.addEventListener("click", function () {
    title.textContent = "Goodbye, " + name + "!";
    item.remove();
  });

  // 4. Add the item to the list on the page
  list.appendChild(item);

  // 5. Clear the input box
  nameInput.value = "";
});
