/**
 * Core DOM Elements
 * Selecting the primary input field and the list container for rendering tasks.
 */
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

/**
 * Handles the creation and addition of a new task.
 * Validates the input, dynamically generates the DOM elements (li and span),
 * appends them to the list container, and updates the local storage state.
 */
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    
    inputBox.value = "";
    saveData();
}

/**
 * Event Delegation for Task Actions
 * Listens for click events on the parent <ul> container to efficiently handle 
 * both checking/unchecking tasks (clicking <li>) and deleting tasks (clicking <span>).
 */
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

/**
 * Persists the current HTML state of the task list to the browser's Local Storage.
 */
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

/**
 * Initializes the application state by retrieving and rendering 
 * previously saved tasks from Local Storage on page load.
 */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Application Initialization
showTask();