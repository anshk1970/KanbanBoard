let tasksData = JSON.parse(localStorage.getItem("kanbanTasks")) || {
  todo: [],
  progress: [],
  done: []
};

const todo     = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done     = document.querySelector('#done');
const columns  = [todo, progress, done];

const modal           = document.querySelector('.modal');
const modalBg         = document.querySelector('.modal .bg');
const toggleModalBtn  = document.querySelector('#toggle-modal');
const closeModalBtn   = document.querySelector('#close-modal');
const addTaskBtn      = document.querySelector('#add-new-task');
const titleInput      = document.querySelector('#task-title-input');
const descInput       = document.querySelector('#task-desc-input');

let dragElement = null;

function addDragEvent(task) {
  task.addEventListener('dragstart', () => {
    dragElement = task;
    setTimeout(() => task.style.opacity = '0.45', 0);
  });
  task.addEventListener('dragend', () => {
    task.style.opacity = '';
    dragElement = null;
  });
}

function addDragEventsOnColumn(column) {
  column.addEventListener('dragover',  (e) => e.preventDefault());

  column.addEventListener('dragenter', (e) => {
    e.preventDefault();
    column.classList.add('hover-over');
  });

  column.addEventListener('dragleave', (e) => {
    if (!column.contains(e.relatedTarget)) {
      column.classList.remove('hover-over');
    }
  });

  column.addEventListener('drop', (e) => {
    e.preventDefault();
    if (dragElement) {
      column.appendChild(dragElement);
      column.classList.remove('hover-over');
      updateData();
    }
  });
}

columns.forEach(col => addDragEventsOnColumn(col));

function updateData() {
  columns.forEach(col => {
    const tasks = col.querySelectorAll('.task');
    const badge = col.querySelector('.count-badge');

    tasksData[col.id] = Array.from(tasks).map(t => ({
      title: t.querySelector('h3').innerText,
      desc:  t.querySelector('p').innerText
    }));

    if (badge) badge.innerText = tasks.length;

    col.classList.toggle('has-tasks', tasks.length > 0);
  });

  localStorage.setItem('kanbanTasks', JSON.stringify(tasksData));
}

function createTask(title, desc, column) {
  const div = document.createElement('div');
  div.classList.add('task');
  div.setAttribute('draggable', 'true');

  div.innerHTML = `
    <h3>${escapeHTML(title)}</h3>
    ${desc.trim() ? `<p>${escapeHTML(desc)}</p>` : ''}
    <button class="delete-btn" aria-label="Delete task">Delete</button>
  `;

  addDragEvent(div);

  div.querySelector('.delete-btn').addEventListener('click', () => {
    div.remove();
    updateData();
  });

  column.appendChild(div);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function openModal() {
  modal.classList.add('active');
  titleInput.focus();
}

function closeModal() {
  modal.classList.remove('active');
  titleInput.value = '';
  descInput.value  = '';
  titleInput.style.borderColor = '';
  titleInput.style.boxShadow   = '';
}

toggleModalBtn.addEventListener('click', openModal);
closeModalBtn .addEventListener('click', closeModal);
modalBg       .addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

addTaskBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const desc  = descInput.value.trim();

  if (!title) {
    titleInput.style.borderColor = '#e84040';
    titleInput.style.boxShadow   = '0 0 0 3px rgba(232,64,64,0.2)';
    titleInput.focus();
    return;
  }

  createTask(title, desc, todo);
  updateData();
  closeModal();
});

titleInput.addEventListener('input', () => {
  titleInput.style.borderColor = '';
  titleInput.style.boxShadow   = '';
});

titleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});

function loadTasks() {
  Object.keys(tasksData).forEach(colId => {
    const col = document.getElementById(colId);
    if (!col) return;
    tasksData[colId].forEach(task => createTask(task.title, task.desc, col));
  });
  updateData();
}

loadTasks();
