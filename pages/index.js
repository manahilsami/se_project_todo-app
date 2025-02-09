import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// console.log(initialTodos);
// console.log(validationConfig);

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues["name"];
    const dateInput = inputValues["date"];
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    // renderTodo(values);
    newToDoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.addEventListeners();

const section = new Section({
  items: [],
  renderer: () => {
    const todo = generateTodo(item); // generate todo item
    todosList.append(todo); // add it to the todo list
    // (Refer to the forEach loop in this file)
  },
  containerSelector: ".todos__list",
});
section.renderItems(); // call section instance's renderItems method

const newToDoValidator = new FormValidator(validationConfig, addTodoForm);
newToDoValidator.enableValidation();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

// const renderTodo = (item) => {
//   const todo = generateTodo(item);
//   section.addItem(todo);
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  section.addItem(todo); // todosList.append(todo); // use addItem() method instead
  // renderTodo(item);
});
