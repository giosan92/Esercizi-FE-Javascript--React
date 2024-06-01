// scrivi qui il tuo codice

const form = document.querySelector(".to-do-form");
const error = document.querySelector(".error");
const todo = document.getElementById("to-do");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".to-do-container");
const list = document.querySelector(".to-do-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

//eventi//

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

// funzioni//

function addItem(e) {
    e.preventDefault();
    const value = todo.value;
    
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        createListItem(id, value);
        displayError("Item added", "succes");
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayError("Item edited succesfully", "succes");
        editLocalStorage(id, value);
        setBackToDefault();
    } else {
        displayError("Please enter a value", "danger")
    }
}

function displayError(text, action) {
    error.textContent = text;
    error.classList.add(`error-${action}`);
    setTimeout(() => {
        error.textContent = "";
        error.classList.remove(`error-${action}`)
    }, 1000);
}

function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("to-do-item");
    element.innerHTML = `  <p class="title">${value}</p>
            <div class="btn-container"> 
        
         <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button> 
        
        <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
            </div>`;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector('.edit-btn')
    editBtn.addEventListener('click', editItem);

    list.appendChild(element);
}

function clearItems() {
    const items = document.querySelectorAll(".to-do-item");
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item)
        });
    }
    container.classList.remove("show-container");
    displayError("Empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container")
    }
    displayError("Item removed", "danger");
    setBackToDefault();
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    todo.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}

function setBackToDefault() {
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Submit";
    todo.value = "";
}

//local storage //

function addToLocalStorage(id, value) {
    const todo = { id, value };
    let items = getLocalStorage();
    items.push(todo);
    localStorage.setItem("list", JSON.stringify(items));
};

function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list")) : [];
};

function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map((item) => {
        if (item.id === id) {
            item.value = value
        }
        return item.value
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter((item) => {
        if (item !== id) {
            return item;
        }
    })
    localStorage.setItem("list", JSON.stringify(items));
};

//setup items // 

function setupItems() {
    let items = getLocalStorage();
    
    if (items.length > 0) {
        items.forEach((item) => {
           
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container")
    }
};
