//* [X] Cargar Tareas de Almacenamiento Local.
//* [X] Agregar Tarea.
//* [X] Eliminar Tarea.
//* [X] Actualizar Tarea.
//* [X] Validar Tarea.
//* [X] Enviar Tarea al Almacenamiento Local.

var formulario = document.querySelector('form')
var actualizar = false
var id_tarea = 0
var tareas = (JSON.parse(localStorage.getItem("tareas")) || [])
var Calendario = new Date()


formulario.addEventListener('submit', (e) => {
    e.preventDefault()


    if (actualizar == true) {
        let tarea = {
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            fecha: document.getElementById("fecha_tarea").value
        }
        tareas[id_tarea] = tarea
        localStorage.setItem("tareas", JSON.stringify(tareas))
        actualizar = false
        document.getElementById("agregar").innerHTML = `<i class="fa-solid fa-plus"></i> Agregar Tarea`
        Cargar_Tareas()
    } else {
        let tarea = {
            id: Math.floor(Math.random() * 999),
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            fecha_creacion: Calendario.getFullYear() + "-" + Calendario.getMonth() + "-" + Calendario.getDay(),
            fecha_entrega: document.getElementById("fecha_tarea").value
        }

        if (tarea.titulo === "" || tarea.descripcion === "") {
            let advertencia = document.getElementById("advertencia")
            advertencia.innerHTML = "Faltan Espacios por Completar"
        } else {
            advertencia.innerHTML = ""
            tareas.push(tarea)
            console.log(tareas)
            localStorage.setItem("tareas", JSON.stringify(tareas))
            Cargar_Tareas()
        }
    }
})
const Cargar_Tareas = () => {
    let contenedor_tareas = document.getElementById("tareas")
    document.querySelectorAll(".tarea").forEach((tarea) => tarea.remove())
    tareas.forEach((tarea, id) => {
        let etiqueta = `
            <div class="tarea">
                <div class="tarea-titulo">
                    <p>${tarea.titulo}</p>
                </div>
                <div class="tarea-descripcion">
                    <p>${tarea.descripcion}</p>
                </div>
                <div class="tarea-opciones">
                    <button class="boton leer" onclick="Visualizar_Tarea(${id})"><i class="fa-regular fa-eye"></i> Leer</button>
                    <button class="boton actualizar" onclick="Actualizar_Tarea(${id})"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Actualizar</button>
                    <button class="boton eliminar" onclick="Eliminar_Tarea(${tarea.id})"><i class="fa-solid fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `
        contenedor_tareas.insertAdjacentHTML("beforeend", etiqueta)
    })
}
const Eliminar_Tarea = (id) => {
    tareas = tareas.filter((tarea) => tarea.id != id)
    localStorage.setItem("tareas", JSON.stringify(tareas))
    Cargar_Tareas()
}
const Actualizar_Tarea = (id) => {
    let tarea = tareas[id]
    document.getElementById("titulo").value = tarea.titulo
    document.getElementById("descripcion").value = tarea.descripcion
    document.getElementById("fecha_tarea").value = tarea.fecha
    document.getElementById("agregar").innerHTML = `<i class="fa-sharp fa-solid fa-pen-to-square"></i> Actualizar Tarea`
    actualizar = true
    id_tarea = id
}
const Visualizar_Tarea = (id) => {
    let tarea = tareas[id]
    document.getElementById("titulo-modal").innerHTML = tarea.titulo
    document.getElementById("descripcion-modal").innerHTML = tarea.descripcion
    document.getElementById("fecha-modal").innerHTML = "Fecha de Creacion: " + tarea.fecha_creacion
    document.getElementById("fecha-entrega-modal").innerHTML = "Fecha de Entrega: " + tarea.fecha_entrega
    document.getElementById("modal").classList.remove("cerrado")
    document.getElementById("modal").classList.add("abierto")
}
document.getElementById("boton-salir-modal").addEventListener('click', () => {
    document.getElementById("modal").classList.remove("abierto")
    document.getElementById("modal").classList.add("cerrado")
})
Cargar_Tareas()