// assets/js/app.js

// Inicializamos el arreglo de tareas
let tareas = [
    { id: 1, descripcion: "Tarea inicial 1", completada: false },
    { id: 2, descripcion: "Tarea inicial 2", completada: false },
    { id: 3, descripcion: "Tarea inicial 3", completada: true }
];

// Referencias a elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Función para renderizar las tareas en la página
function renderTareas() {
    // Limpiar el contenido anterior
    taskList.innerHTML = "";

    // Renderizamos cada tarea
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.className = `task-item ${tarea.completada ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${tarea.descripcion}</span>
            <div>
                <button onclick="toggleCompletada(${tarea.id})">${tarea.completada ? 'Desmarcar' : 'Completar'}</button>
                <button class="delete-btn" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Actualizamos los contadores
    actualizarResumen();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const descripcion = taskInput.value.trim();
    if (descripcion !== "") {
        const nuevaTarea = {
            id: Date.now(),
            descripcion: descripcion,
            completada: false
        };
        tareas.push(nuevaTarea);
        renderTareas();  // Actualizamos la lista de tareas
        taskInput.value = "";  // Limpiar input
    }
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderTareas();  // Actualizamos la lista de tareas
}

// Función para marcar o desmarcar una tarea como completada
function toggleCompletada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
    renderTareas();  // Actualizamos la lista de tareas
}

// Función para actualizar el resumen de tareas
function actualizarResumen() {
    totalTasks.textContent = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;
    completedTasks.textContent = tareasCompletadas;
}

// Evento para el botón de agregar tarea
addTaskBtn.addEventListener("click", agregarTarea);

// Renderizamos las tareas iniciales
renderTareas();
