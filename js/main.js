/*function getValue() { // Función para obtener el valor del input y agregarlo a la lista
  const tareaNueva = document.getElementById("add_task"); // Guardamos el input en una variable
  const valor = tareaNueva.value; // Obtenemos el valor del input

  // Validamos si el input está vacío o solo tiene espacios
  if (valor.length == 0 || /^\s+$/.test(valor)) {
    alert("Añada una tarea a la lista"); // Si está vacío, mostramos un mensaje
  } else {
    const list = document.createElement("li"); // Creamos un nuevo <li> para la tarea

    // Creamos el checkbox para marcar la tarea
    const chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox"); // Establecemos el tipo de input como checkbox
    chkbox.classList.add("check"); // Le asignamos una clase para el estilo

    // Creamos el texto de la tarea dentro de un <span>
    const span = document.createElement("span");
    span.setAttribute("class", "task-text"); // Le asignamos una clase para poder estilizarlo
    span.textContent = valor; // Asignamos el valor de la tarea como texto del span

    // Creamos la imagen de eliminar tarea
    const image = document.createElement("img");
    image.setAttribute("src", "./assets/img/trash.svg"); // Ruta de la imagen de la papelera
    image.classList.add("trash"); // Le asignamos una clase para el estilo
    image.setAttribute("onclick", "remove(this.parentElement)"); // Cuando se haga clic, se eliminará el li

    // Agregamos los elementos al <li> (checkbox, texto y la imagen de eliminar)
    list.appendChild(chkbox); // Agregamos el checkbox al li
    list.appendChild(span); // Agregamos el texto al li
    list.appendChild(image); // Agregamos la papelera al li

    // Añadimos el <li> a la lista (ul) en el HTML
    document.getElementById("ul_list").appendChild(list);
  }
}*/
function getValue() {
  const tareaNueva = document.getElementById("add_task");
  const valor = tareaNueva.value;

  if (valor.length === 0 || /^\s+$/.test(valor)) {
      alert("Añada una tarea a la lista");
  } else {
      const taskElement = createTaskElement(valor);
      document.getElementById("ul_list").appendChild(taskElement);
  }

  clean();
}

function createTaskElement(valor) {
  const list = document.createElement("li");
  const chkbox = document.createElement("input");
  chkbox.classList.add("check");
  chkbox.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = valor;

  const image = document.createElement("img");
  image.classList.add("trash");
  image.src = "./assets/img/trash.svg";
  image.onclick = function() {
      remove(list); // Pasamos el 'li' a la función remove
  };

  list.appendChild(chkbox);
  list.appendChild(span);
  list.appendChild(image);

  return list;
}


function clean() {
  document.getElementById('add_task').value = ''; // Limpiamos el valor del input después de agregar la tarea
}

const input = document.getElementById("add_task"); // Seleccionamos el input
input.addEventListener("keypress", (event) => { // Añadimos un evento para escuchar cuando se presiona "Enter"
  if (event.key === "Enter") { // Si la tecla presionada es "Enter", ejecutamos getValue y limpiamos el input
    getValue();
  }
});

function remove(el) { // Función para eliminar un <li> al hacer clic en la imagen de la papelera
  el.classList.add("fade-out"); // Añadimos una clase de animación para desvanecer el li
  setTimeout(() => { // Esperamos a que termine la animación y luego eliminamos el <li>
    el.remove();
  }, 500); // Tiempo de espera antes de eliminar (500ms para que se complete la animación)
}
