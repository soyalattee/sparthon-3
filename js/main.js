// 페이지 로드 시 이전 상태 복원
document.addEventListener("DOMContentLoaded", event => {
  const buckets = document.querySelectorAll(".bucket");
  buckets.forEach((bucket, index) => {
    // 로컬 스토리지에서 상태 읽기
    const isDone = localStorage.getItem("bucket" + index) === "done";
    if (isDone) {
      bucket.classList.add("done");
    }
  });
});

const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = document.querySelector("#todo-form input");
const addBtn = document.querySelector(".button-add");
const TODOS_KEY = "todos";
let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  console.log("delete");
  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
  li.remove();
}

function doneTodo(event) {
  console.log("done");
  const li = event.target.parentElement;
  console.log(li.id);
  todos = todos.map(todo => {
    console.log("todo", todo);
    if (todo.id === parseInt(li.id)) {
      todo.done = true;
    } else {
      todo.done = false;
    }
  });
  console.log(todos);
  saveTodos();
  li.remove();
}

// 버킷 리스트 클릭 이벤트
// const buckets = document.querySelectorAll(".bucket");
// buckets.forEach((bucket, index) => {
//   bucket.addEventListener("click", function () {
//     // 클래스 토글
//     bucket.classList.toggle("done");

//     doneTodo(bucket);
//   });
// });

function paintTodo(newTodoObj) {
  const li = document.createElement("li");

  li.id = newTodoObj.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  li.className = `bucket center img${(li.id % 6) + 1}`;
  button.innerText = "";
  button.className = "delete is-small";
  if (newTodoObj.done === true) {
    li.className = "done";
  }
  li.addEventListener("click", doneTodo);
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodoObj.text;
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    done: false,
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}
addBtn.addEventListener("click", handleTodoSubmit);
todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  todos.forEach(value => {
    paintTodo(value);
  });
}
