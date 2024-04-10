

var proyecto = {
    nombreProyecto: "",
    descripcionProyecto: "",
    lista: [],
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

var clickSI=false;

const mostrarProyectos = () => {
    const contenedorProyectos = document.getElementById("listaProyectos");
    while (contenedorProyectos.hasChildNodes()) {
        contenedorProyectos.removeChild(contenedorProyectos.firstChild);
    }
    if(listaProyectos.length > 0){
        listaProyectos.forEach(element => {
            var contenedor = document.createElement("article");
            var title = document.createElement("h3");
            title.textContent = element.nombreProyecto;
            title.setAttribute("id", `h3${element.nombreProyecto}`);
            var p = document.createElement("p");
            p.textContent = element.descripcionProyecto;
            p.setAttribute("id", `p${element.nombreProyecto}`)
            contenedor.appendChild(title);
            contenedor.appendChild(p);
            contenedor.setAttribute("id", element.nombreProyecto);
            contenedor.addEventListener("click", () => {if(clickSI===false) {console.log("es falso"); desplegarProyecto(element.nombreProyecto); clickSI = true;}else{console.log("es verdadero"); cerrarProyecto(element.nombreProyecto); clickSI = false}}); // Usar addEventListener para asignar el evento click
            contenedorProyectos.appendChild(contenedor);
        });
    }
        
}

const desplegarProyecto = (nombreProyecto) => {
    var proyecto = document.getElementById(nombreProyecto);
        var contenedor = document.createElement("div");
        var inputTarea = document.createElement("input");
        inputTarea.setAttribute("type", "text");
        inputTarea.setAttribute("id", `todo${nombreProyecto}`);
        var inputDescripcion = document.createElement("input");
        inputDescripcion.setAttribute("type", "text");
        inputDescripcion.setAttribute("id", `descripcion${nombreProyecto}`);
        var button = document.createElement("button");
        button.setAttribute("id", `mas${nombreProyecto}`);
        button.onclick = function() {
            agregarToDo(
                document.querySelector(`#todo${nombreProyecto}`).value,
                document.querySelector(`#descripcion${nombreProyecto}`).value,
                listaProyectos.find(element => element.nombreProyecto === nombreProyecto),
                nombreProyecto
            );
        };
        contenedor.appendChild(inputTarea);
        contenedor.appendChild(inputDescripcion);
        contenedor.appendChild(button);
        proyecto.appendChild(contenedor);
        var array = document.createElement("ul");
        array.setAttribute("id", `ul${nombreProyecto}`);
        proyecto.appendChild(array);
        mostrarListaTodo(listaProyectos.find(element => element.nombreProyecto === nombreProyecto));
    
}

const cerrarProyecto = (nombreProyecto) => {
    const contenedorProyecto = document.getElementById(nombreProyecto);
    var cantidad = contenedorProyecto.childElementCount;
    
    for (let i = 0; i < cantidad; i++) {
        let elementoHijo = contenedorProyecto.children[i];
        
        // Verifica si el ID del elemento hijo es diferente de `h3${nombreProyecto}` y `p${nombreProyecto}`
        if (elementoHijo.getAttribute("id") !== `h3${nombreProyecto}` && elementoHijo.getAttribute("id") !== `p${nombreProyecto}`) {
            contenedorProyecto.removeChild(elementoHijo);
            i--; // Disminuye el contador para ajustar la longitud de los hijos después de la eliminación
            cantidad--; // Disminuye la cantidad de hijos
        }
        console.log(elementoHijo.getAttribute("id"));
    }
}



const agregarToDo = (todo, descripcion, proyecto) => {
    if(todo.length > 0 && verificarLista(todo, proyecto.lista)) {
        proyecto.lista.push(Object.create(todo));
        proyecto.lista[lista.length-1].texto = todo;
        proyecto.lista[lista.length-1].horaCreacion = Date.now();
        proyecto.lista[lista.length-1].descripcion = descripcion
        proyecto.lista[lista.length-1].fechaVencimiento = Date.now() + 0.1;
        mostrarListaTodo(todo);
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

const mostrarListaTodo = (proyecto) => {
    const array = document.getElementById(`ul${proyecto.nombreProyecto}`);
    while (array.hasChildNodes()){
        array.removeChild(array.firstChild);
    }

    for (var i = 0; i < proyecto.lista.length; i++){
        var contenedor = document.createElement("div");
        var label = document.createElement("label");
        console.log(proyecto.lista)
        label.textContent = proyecto.lista[i].texto !== undefined? proyecto.lista[i].texto : '';
        label.setAttribute("id", `label${i}`);
        if (proyecto.lista[i].check) {
            label.style.textDecoration = 'line-through';
        }
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = proyecto.lista[i].check;
        var eliminar = document.createElement("button");
        eliminar.setAttribute("id", `eliminar${i}`);
        eliminar.setAttribute("onclick", "borrarToDo(" + i + ")");
        eliminar.textContent = "x";
        checkbox.addEventListener('change', (function(j) {
            return function() {
                proyecto.lista[j].check = this.checked;
                proyecto.lista[i].horaCheck = Date.now();
                if(proyecto.lista[j].check){
                    document.getElementById(j).style.textDecoration = 'line-through';
                }
                else{
                    document.getElementById(j).style.textDecoration = 'none';
                    proyecto.lista[j].horaCheck = false;
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


