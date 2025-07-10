let tasks = [];

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const time = document.getElementById('taskTime').value;

  if (!title || !time) {
    alert("Please enter a task title and time.");
    return;
  }

  tasks.push({
    title,
    time,
    completed: false
  });

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskTime').value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const info = document.createElement('div');
    info.innerHTML = `<strong>${task.title}</strong><br><small>${new Date(task.time).toLocaleString()}</small>`;

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
    toggleBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    actions.append(toggleBtn, editBtn, deleteBtn);
    li.append(info, actions);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newTitle = prompt("Edit Task Title:", tasks[index].title);
  if (newTitle !== null && newTitle.trim() !== "") {
    const newTime = prompt("Edit Date & Time (YYYY-MM-DDTHH:MM):", tasks[index].time);
    if (newTime) {
      tasks[index].title = newTitle.trim();
      tasks[index].time = newTime;
      renderTasks();
    }
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
