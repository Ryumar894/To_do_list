function getValue() { // Funcion para sacar el valor de un input al presionar un boton

	let tareaNueva = document.getElementById("add_task"); // Guardamos el input en una variable
 
	let valor = tareaNueva.value; // De la variable del input, sacamos el value
  
  if (valor.length == 0 || /^\s+$/.test(valor)) { // Validar si el input esta vacío
  
  	alert("Añada una tarea a la lista"); // Mostrar un alert y no añadir nada en blanco
    
  } else {
   		const list = document.createElement("li"); // Crea un nuevo li
  
  		let listNew = document.createTextNode(valor); // Tomamos el value del input y creamos un nodo de texto
  
  		list.appendChild(listNew); // Agregamos el nodo al elemento p
  
  		const element = document.getElementById("ul_list"); // Ahora seleccionamos el UL en donde irá
  
  		element.appendChild(list); // Hacemos un appendChild del nuevo li con al ul_list
  }
  
  
}

function clean() {
  document.getElementById('add_task').value = ''; // Toma al value del input y borra el contenido
}

const input = document.getElementById("add_task"); // Llamo al input para identificar cuando se presione el Enter

input.addEventListener("keypress", (event) => { // Verificamos si se presiono la tecla, validamos y mandamos a llamar las funciones que realiza el boton
    if (event.key === "Enter") { // Si el evento de la tecla es igual a Enter, imprimimos y limpiamos el input
        getValue();
        clean();
    }
});