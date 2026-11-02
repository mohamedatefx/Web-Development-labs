"use strict";
// 1. Our data: a list (array) of todos.
let todos = []; // "Todo[]" means: a list of Todo
let filter = "all";
// 2. Add a new todo
function addTodo() {
    // "as HTMLInputElement" tells TypeScript this element is an <input>
    let input = document.getElementById("todoInput");
    if (input.value === "")
        return; // do nothing if empty
    todos.push({ text: input.value, done: false });
    input.value = ""; // empty the input box
    show();
}
// 3. Tick / untick a todo
function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    show();
}
// 4. Delete one todo
function deleteTodo(index) {
    todos.splice(index, 1); // remove 1 item at this position
    show();
}
// 5. Edit a todo (double-click on it)
function editTodo(index) {
    let newText = prompt("Edit your todo:", todos[index].text);
    if (newText !== null && newText !== "") {
        todos[index].text = newText;
        show();
    }
}
// 6. Change the filter
function setFilter(newFilter) {
    filter = newFilter;
    show();
}
// 7. Remove finished todos / remove everything
function clearCompleted() {
    todos = todos.filter(function (todo) {
        return todo.done === false; // keep only unfinished ones
    });
    show();
}
function clearAll() {
    todos = [];
    show();
}
// 8. Draw everything on the page
function show() {
    let list = document.getElementById("todoList");
    list.innerHTML = ""; // clear the old list
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        // skip todos that don't match the filter
        if (filter === "active" && todo.done)
            continue;
        if (filter === "completed" && !todo.done)
            continue;
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
    let count = document.getElementById("count");
    count.innerText = left + " items left";
}
// Show the (empty) list when the page first loads
show();
