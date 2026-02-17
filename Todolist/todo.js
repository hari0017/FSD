const taskField = document.getElementById("taskField");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("tasks");
const filters = document.querySelectorAll(".filter");
const taskCounter = document.getElementById("taskCounter");

let tasks = [];

addTaskBtn.addEventListener("click", addTask);
taskField.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const text = taskField.value.trim();
    if (text === "") return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    taskField.value = "";
    renderTasks();
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        span.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks(filter);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(filter);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    taskCounter.textContent = `${tasks.length} Tasks`;
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        button.classList.add("active");
        renderTasks(button.dataset.filter);
    });
});
