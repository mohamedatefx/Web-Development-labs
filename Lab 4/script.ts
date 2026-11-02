// 1. Our data: a list (array) of todos.

// A "type" describes the shape of our data.
// Every todo MUST have a text (string) and a done (true/false).
type Todo = {
  text: string;
  done: boolean;
};

// The filter can only be one of these 3 words.
// If you type anything else, TypeScript shows an error.
type Filter = "all" | "active" | "completed";

let todos: Todo[] = [];          // "Todo[]" means: a list of Todo
let filter: Filter = "all";


// 2. Add a new todo
function addTodo(): void {
  // "as HTMLInputElement" tells TypeScript this element is an <input>
  let input = document.getElementById("todoInput") as HTMLInputElement;

  if (input.value === "") return;      // do nothing if empty

  todos.push({ text: input.value, done: false });
  input.value = "";                    // empty the input box
  show();
}


// 3. Tick / untick a todo
function toggleTodo(index: number): void {
  todos[index].done = !todos[index].done;
  show();
}


// 4. Delete one todo
function deleteTodo(index: number): void {
  todos.splice(index, 1);              // remove 1 item at this position
  show();
}


// 5. Edit a todo (double-click on it)
function editTodo(index: number): void {
  let newText = prompt("Edit your todo:", todos[index].text);

  if (newText !== null && newText !== "") {
    todos[index].text = newText;
    show();
  }
}


// 6. Change the filter
function setFilter(newFilter: Filter): void {
  filter = newFilter;
  show();
}


// 7. Remove finished todos / remove everything
function clearCompleted(): void {
  todos = todos.filter(function (todo) {
    return todo.done === false;        // keep only unfinished ones
  });
  show();
}

function clearAll(): void {
  todos = [];
  show();
}


// 8. Draw everything on the page
function show(): void {
  let list = document.getElementById("todoList") as HTMLUListElement;
  list.innerHTML = "";                 // clear the old list

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // skip todos that don't match the filter
    if (filter === "active" && todo.done) continue;
    if (filter === "completed" && !todo.done) continue;

    // add one <li> for this todo
    list.innerHTML += `
      <li>
        <span>
          <input type="checkbox" ${todo.done ? "checked" : ""}
                 onclick="toggleTodo(${i})">
          <span class="${todo.done ? "done" : ""}"
                ondblclick="editTodo(${i})">${todo.text}</span>
        </span>
        <button onclick="deleteTodo(${i})">🗑</button>
      </li>`;
  }

  // update the "items left" text
  let left = todos.filter(function (todo) {
    return todo.done === false;
  }).length;

  let count = document.getElementById("count") as HTMLParagraphElement;
  count.innerText = left + " items left";
}

// Show the (empty) list when the page first loads
show();
