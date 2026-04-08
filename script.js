let tasksData = JSON.parse(localStorage.getItem("kanbanTasks")) || {
    todo: [],
    progress: [],
    done: []
};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const columns = [todo, progress, done];

let dragElement = null;


function addDragEvent(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });
}


function updateData() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("kanbanTasks", JSON.stringify(tasksData));
}

//  Drag events for columns

function addDragEventsOnColumn(column) {

    column.addEventListener("dragover", (e) => e.preventDefault());

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        if (dragElement) {
            column.appendChild(dragElement);
            column.classList.remove("hover-over");
            updateData();
        }
    });
}

columns.forEach(col => addDragEventsOnColumn(col));

//  Modal controls

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

//  Create Task Function
function createTask(title, desc, column) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

   
    addDragEvent(div);

   
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateData();
    });

    column.appendChild(div);
}

//  Add Task Button
addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    if (!taskTitle.trim()) {
        alert("Task title required");
        return;
    }

    createTask(taskTitle, taskDesc, todo);

    updateData();

    // Reset input
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

    modal.classList.remove("active");
});

//  Load saved tasks on page load

function loadTasks() {
    Object.keys(tasksData).forEach(colId => {
        tasksData[colId].forEach(task => {
            createTask(task.title, task.desc, document.getElementById(colId));
        });
    });

    updateData();
}

loadTasks();
