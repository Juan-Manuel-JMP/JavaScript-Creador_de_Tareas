let tasks = [];  // Almacenamos las tareas en una variable en memoria

document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

  // Validación de formulario
  if (title === '' || description === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  let task = {
    title,
    description,
    completed: false
  };

  // Añadir la nueva tarea a la lista de tareas
  tasks.push(task);
  getTasks(); // Actualizar la vista

  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(title) {
  // Confirmar eliminación
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    tasks = tasks.filter(task => task.title !== title); // Eliminar tarea por título
    getTasks(); // Actualizar la vista
  }
}

function toggleCompleted(title) {
  tasks.forEach(task => {
    if (task.title === title) {
      task.completed = !task.completed; // Alternar estado de completado
    }
  });
  getTasks(); // Actualizar la vista
}

function getTasks() {
  let tasksView = document.getElementById('tasks');
  let emptyTasksMessage = document.getElementById('emptyTasksMessage');
  tasksView.innerHTML = '';
  emptyTasksMessage.innerHTML = '';  // Limpiar mensaje de vacío

  if (tasks.length === 0) {
    emptyTasksMessage.innerHTML = 'No tienes tareas pendientes.';
  } else {
    tasks.forEach(task => {
      let { title, description, completed } = task;

      tasksView.innerHTML += `
        <div class="card mb-3 task-card">
          <div class="card-body">
            <p class="${completed ? 'completed' : ''}">
              <strong>${title}</strong> - ${description}
            </p>
            <a href="#" onclick="toggleCompleted('${title}')" class="btn btn-info mr-2">Marcar como ${completed ? 'pendiente' : 'completada'}</a>
            <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger">Borrar</a>
          </div>
        </div>
      `;
    });
  }
}

// Llamar a getTasks al cargar la página para mostrar las tareas actuales
getTasks();
