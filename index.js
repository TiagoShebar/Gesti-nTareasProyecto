

var proyecto = {
    nombreProyecto: "",
    descripcionProyecto: "",
    lista: [todo],
};

var todo = {
    texto: "",
    check: false,
    horaCreacion: null,
    horaCheck: false,
    descripcion: "",
    fechaVencimiento: null,
};


var listaProyectos = [];

const agregarProyecto = (nombreProyecto, descripcionProyecto) => {
    if(nombreProyecto.length > 0 && verificarLista(nombreProyecto, listaProyectos)){
        var pro = Object.create(proyecto);
        pro.nombreProyecto = nombreProyecto;
        pro.descripcionProyecto = descripcionProyecto;
        listaProyectos.push(pro);
        mostrarProyectos();
    }
}

const mostrarProyectos = () => {
    const contenedorProyectos = document.getElementById("listaProyectos");
    while (contenedorProyectos.hasChildNodes()) {
        contenedorProyectos.removeChild(contenedorProyectos.firstChild);
    }
    listaProyectos.forEach(element => {
        var contenedor = document.createElement("article");
        var title = document.createElement("title");
        title.textContent = element.nombreProyecto;
        var p = document.createElement("p");
        p.textContent = element.descripcionProyecto;
        contenedor.appendChild(title);
        contenedor.appendChild(p);
        contenedor.setAttribute("id", title);
        contenedorProyectos.appendChild(contenedor);
    });
        
}

const desplegarProyecto = (nombreProyecto) => {
    const contenedorProyecto = document.getElementById(nombreProyecto);
    var contenedor = document.createElement("div");
    var inputTarea = document.createElement("input");
    inputTarea.setAttribute("type", "text");
    inputTarea.setAttribute("id", `todo${nombreProyecto}`);
    var inputDescripcion = document.createElement("input");
    inputDescripcion.setAttribute("type", "text");
    inputDescripcion.setAttribute("id", `descripcion${nombreProyecto}`);
    var button = document.createElement("button");
    button.setAttribute("id", `mas${nombreProyecto}`);
    button.setAttribute("onclick", agregarToDo(document.querySelector(`#todo${nombreProyecto}`).value, document.querySelector(`#descripcion${nombreProyecto}`).value, listaProyectos.filter(element => nombreProyecto == element.nombreProyecto).lista));
    contenedor.appendChild(inputTarea);
    contenedor.appendChild(inputDescripcion);
    contenedor.appendChild(button);
    contenedorProyecto.appendChild(contenedor);
    var array = document.createElement("ul");
    array.setAttribute("class", "tareas");
    contenedorProyecto.appendChild(array);
    mostrarListaTodo(listaProyectos.filter(element => nombreProyecto == element.nombreProyecto));
}

const cerrarProyecto = (nombreProyecto) => {
    const contenedorProyecto = document.getElementById(nombreProyecto);
    while (contenedorProyecto.hasChildNodes()) {
        contenedorProyecto.removeChild(contenedorProyecto.firstChild);
    }
}


const agregarToDo = (todo, descripcion, lista) => {
    if(todo.length > 0 && verificarLista(todo, lista)) {
        lista.push();
        lista[lista.length-1].texto = todo;
        lista[lista.length-1].horaCreacion = Date.now();
        lista[lista.length-1].descripcion = descripcion
        lista[lista.length-1].fechaVencimiento = Date.now() + 0.1;
        mostrarLista(todo);
    }
}

const verificarLista = (elemento, lista) => {
    var i = 0;
    while(i<lista.length && lista[i] != elemento){
        i++
    }
    if(i<lista.length){
        return false;
    }
    else{
        return true;
    }
}

const mostrarListaTodo = (lista) => {
    const array = document.getElementsByClassName('tareas');
    while (array.hasChildNodes()){
        array.removeChild(array.firstChild);
    }

    for (var i = 0; i < lista.length; i++){
        var contenedor = document.createElement("div");
        var label = document.createElement("label");
        label.textContent = lista[i].texto;
        label.setAttribute("id", `label${i}`);
        if (lista[i].check) {
            label.style.textDecoration = 'line-through';
        }
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = lista[i].check;
        var eliminar = document.createElement("button");
        eliminar.setAttribute("id", `eliminar${i}`);
        eliminar.setAttribute("onclick", "borrarToDo(" + i + ")");
        eliminar.textContent = "x";
        checkbox.addEventListener('change', (function(j) {
            return function() {
                lista[j].check = this.checked;
                lista[i].horaCheck = Date.now();
                if(lista[j].check){
                    document.getElementById(j).style.textDecoration = 'line-through';
                }
                else{
                    document.getElementById(j).style.textDecoration = 'none';
                    lista[j].horaCheck = false;
                }
            }
        })(i));
        contenedor.appendChild(checkbox);
        contenedor.appendChild(label);
        contenedor.appendChild(eliminar);
        contenedor.setAttribute("class", "contenedor");
        array.appendChild(contenedor);
    }
}

const calcularTareaMasRapida = () => {
    if(arrayHoraCheck.some(elemento => elemento !== false)){
        const resultado = document.getElementById("calcular");
        var mensaje;
        var mas = Number.MAX_VALUE;
        var masTodo = "";
        for(var i = 0; i<lista.length; i++){
            if(listaCheck[i]){
                if(arrayHoraCheck[i] != false && (arrayHoraCheck[i] - arrayHora[i]) < mas){
                    mas = arrayHoraCheck[i] - arrayHora[i];
                    masTodo = lista[i];
                }
            }
        }
        mensaje = `La tarea mas rapida en ser realizada fue ${masTodo} en`
        if(mas > 1000 && mas < 60000){
            mas = (mas / 1000).toFixed(2);
            mensaje += ` ${mas} segundos`;
        }
        else if(mas > 60000){
            mas = (mas / 60000).toFixed(2);
            mensaje += ` ${mas} minutos`;
        }
        else{
            mensaje += ` ${mas.toFixed(2)} milisegundos`;
        }
        const respuesta = document.createElement("p");
        const parrafos = resultado.querySelectorAll('p');
        parrafos.forEach(parrafo => {
            parrafo.remove();
        });
        respuesta.innerHTML = mensaje;
        resultado.appendChild(respuesta);
    }
}

const borrarToDo = (i) => {
    const resultado = document.getElementById("calcular");
    resultado.querySelectorAll('p').forEach(parrafo => {
        if (lista.includes(parrafo.textContent.trim())) {
            parrafo.remove();
        }
    });
    lista.splice(i, 1);
    listaCheck.splice(i, 1);
    arrayHora.splice(i, 1);
    mostrarLista();
}


