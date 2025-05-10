// Función para obtener el valor del input, validar y agregar una tarea
function getValue() {
  const tareaNueva = document.getElementById("add_task"); // Seleccionamos el input de texto
  const valor = tareaNueva.value; // Obtenemos el valor que escribió el usuario

  // Validamos si el valor está vacío o si solo contiene espacios
  if (valor.length === 0 || /^\s+$/.test(valor)) {
    alert("Añada una tarea a la lista"); // Mostramos alerta si no escribió nada válido
  } else {
    const taskElement = createTaskElement(valor, "tarea-" + num); // Creamos el elemento <li> con la tarea
    document.getElementById("ul_list").appendChild(taskElement); // Agregamos el <li> a la lista <ul>
    saveElement(valor); // Guardamos en localStorage
  }

  clean(); // Limpiamos el input después de agregar la tarea
}

let id = 0; // Inicializamos id para darle un número único a cada tarea

// Función que crea y devuelve un <li> (una tarea) completo con checkbox, texto y botón eliminar
function createTaskElement(valor, clave) {
  const list = document.createElement("li"); // Creamos el elemento <li> para la tarea
  list.setAttribute("id", `task-${id}`);
  id += 1;

  const chkbox = document.createElement("input"); // Creamos el checkbox
  chkbox.classList.add("check"); // Le añadimos clase para poder estilizarlo
  chkbox.type = "checkbox"; // Definimos que sea tipo checkbox

  const span = document.createElement("span"); // Creamos el contenedor de texto
  span.classList.add("task-text"); // Le asignamos clase para estilos
  span.textContent = valor; // Insertamos el texto de la tarea

  const image = document.createElement("img"); // Creamos el botón de eliminar como imagen
  image.classList.add("trash"); // Clase para poder ocultarla y mostrarla en hover
  image.src = "./assets/img/trash.svg"; // Definimos el icono de papelera

  // Evento para eliminar la tarea
  image.addEventListener("click", function () {
    remove(list, clave);
  });

  // Evento para marcar como completado o no
  chkbox.addEventListener("change", function () {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas[clave][1] = chkbox.checked;
    localStorage.setItem("tareas", JSON.stringify(tareas));
  });

  // Añadimos todos los elementos hijos al <li> (checkbox + texto + imagen)
  list.appendChild(chkbox);
  list.appendChild(span);
  list.appendChild(image);

  return list; // Devolvemos el <li> ya armado
}

// Función para limpiar el input después de agregar una tarea
function clean() {
  document.getElementById('add_task').value = ''; // Dejamos el input vacío
}

// Seleccionamos el input de tarea
function enter() {
  const input = document.getElementById("add_task");

  // Escuchamos cuando el usuario presiona una tecla dentro del input
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Si la tecla presionada es "Enter"
      getValue(); // Agregamos la tarea
    }
  });
}
enter(); // Se ejecuta la función

// Función para eliminar una tarea de la lista
function remove(el, clave) {
  el.classList.add("fade-out"); // Agregamos una clase de animación de desaparición
  setTimeout(() => { // Esperamos 500ms para permitir que la animación se vea
    el.remove(); // Eliminamos el elemento de la lista

    // Eliminamos el elemento del localStorage
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    delete tareas[clave]; // Elimina la tarea específica
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guarda el nuevo estado
  }, 500);
}

// LocalStorage
let tareas = {};
let num = 0;

// Guardar valor de input en una variable
function saveElement(valor) {
  num = localStorage.getItem("num") ? parseInt(localStorage.getItem("num")) : 0;

  // Verificamos si ya existen tareas guardadas en el localStorage
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }

  // Creamos la tarea con el valor y un estado inicial (false)
  let tarea = [valor, false];

  // Lo agregamos al objeto tareas usando un id único "tarea-0", "tarea-1", etc.
  tareas["tarea-" + num] = tarea;
  num++;

  // Guardamos todo el objeto tareas en el localStorage
  saveInLocal();
  console.log(tareas); // Mostramos las tareas en consola para depuración
}

// Guardar todo el objeto tareas en el localStorage
function saveInLocal() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
  localStorage.setItem("num", num);
}

// Función para cargar las tareas guardadas en el localStorage y mostrarlas en el HTML
function printInIndex() {
  if (localStorage.getItem("tareas")) {
    let tareasJSON = JSON.parse(localStorage.getItem("tareas"));

    for (const clave in tareasJSON) {
      let tarea = tareasJSON[clave];  // Obtenemos el array [texto, estado]
      let texto = tarea[0];
      let estado = tarea[1];

      // Creamos el <li> con todos los elementos
      const list = document.createElement("li");

      const chkbox = document.createElement("input");
      chkbox.classList.add("check");
      chkbox.type = "checkbox";
      chkbox.checked = estado;

      chkbox.addEventListener("change", function () {
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas[clave][1] = chkbox.checked;
        localStorage.setItem("tareas", JSON.stringify(tareas));
      });

      const span = document.createElement("span");
      span.classList.add("task-text");
      span.textContent = texto;

      const image = document.createElement("img");
      image.classList.add("trash");
      image.src = "./assets/img/trash.svg";
      image.addEventListener("click", function () {
        remove(list, clave);
      });

      list.appendChild(chkbox);
      list.appendChild(span);
      list.appendChild(image);

      document.getElementById("ul_list").appendChild(list);
    }
  }
}
printInIndex();
