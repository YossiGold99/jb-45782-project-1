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
  console.log("Form submitted!");

  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  document.getElementById("taskBoard").innerHTML += `
    <div class="task">
      <p>${description}</p>
      <p>${date} ${time}</p>
    </div>
  `;


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