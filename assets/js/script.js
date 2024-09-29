// Arreglo de tareas
let tasks = [
  { id: 1, description: "Tarea 1", completed: false },
  { id: 2, description: "Tarea 2", completed: false },
  { id: 3, description: "Tarea 3", completed: true },
];

// Elementos del DOM
const taskList = document.getElementById("task-list");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");

// Función para actualizar la tabla
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskRow = document.createElement("tr");

    const taskId = document.createElement("td");
    taskId.textContent = task.id;

    const taskDescription = document.createElement("td");
    taskDescription.textContent = task.description;
    if (task.completed) {
      taskDescription.classList.add("text-decoration-line-through");
    }

    // Columna de Acciones
    const actions = document.createElement("td");
    actions.classList.add("text-end");
    // Checkbox para marcar como completada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "me-2");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    // Boton para eliminar tarea
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-sm", "btn-outline-danger", "ms-2");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    // Añadir checkbox y botón eliminar a la columna de acciones
    actions.append(checkbox, deleteBtn);

    // Añadir las celdas a la fila
    taskRow.append(taskId, taskDescription, actions);

    // Añadir la fila a la tabla
    taskList.appendChild(taskRow);
  });

  updateTaskSummary();
}

// Función para agregar una nueva tarea
function addTask() {
  const taskDescription = newTaskInput.value.trim();
  if (taskDescription) {
    const newTask = {
      id: tasks.length + 1,
      description: taskDescription,
      completed: false,
    };
    tasks.push(newTask);
    newTaskInput.value = ""; // Limpiar input
    renderTasks();
  }
}

// Función para eliminar una tarea
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Función para cambiar el estado de completado de una tarea
function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Función para actualizar el resumen
function updateTaskSummary() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
}

// Agregar eventos a los botones
addTaskBtn.addEventListener("click", addTask);

renderTasks();
