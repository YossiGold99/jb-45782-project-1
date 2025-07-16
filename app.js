let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

for (let task of tasks) {
  document.getElementById("taskBoard").innerHTML += `
    <div class="task">
      <p>${task.description}</p>
      <p>${task.date} ${task.time}</p>
    </div>
  `;
}

const emptyState = document.getElementsByClassName("empty-state")[0];
if (emptyState && tasks.length > 0) {
  emptyState.remove();
}

function submitTask(event) {
  event.preventDefault();

  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  tasks.push({ description, date, time });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";


  const empty = document.getElementsByClassName("empty-state")[0];
  if (empty) {
    empty.remove();
  }

  tasks.push({ description, date, time });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
}

document.getElementById("clear").onclick = clearAllTasks;

function clearAllTasks() {
  localStorage.removeItem("tasks");
  tasks = [];
  document.getElementById("taskBoard").innerHTML = `
    <div class="empty-state">
    <p>No tasks. Add a new task!</p>
    </div>
  `;
}

function clearTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const board = document.getElementById("taskBoard");
  board.innerHTML = "";

  if (tasks.length === 0) {
    board.innerHTML = `
      <div class="empty-state">
        <p>No tasks. Add a new task!</p>
      </div>
    `;
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    board.innerHTML += `
      <div class="task">
        <p>${task.description}</p>
        <p>${task.date} ${task.time}</p>
        <button onclick="clearTask(${i})" class="btn btn-sm btn-danger">Delete</button>
      </div>
    `;
  }
}
