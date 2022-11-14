var Fecha = new Date()
var campo_hora = document.getElementById("hora")

const Asignar_Fecha = () => {
    let campo_fecha = document.getElementById("fecha")
    let fecha_actual = {
        dia: Fecha.getDate(),
        mes: Fecha.getMonth() + 1,
        año: Fecha.getFullYear()
    }
    campo_fecha.innerHTML = "Fecha: " + fecha_actual.dia + "/" + fecha_actual.mes + "/" + fecha_actual.año
    setInterval(() => {
        campo_fecha.innerHTML = "Fecha: " + fecha_actual.dia + "/" + fecha_actual.mes + "/" + fecha_actual.año
        console.log("hora actualizada")
    }, 86400000);
}

const Asignar_Hora = () => {
    let hora_actual = {
        hora: Fecha.getHours(),
        minuto: Fecha.getMinutes(),
        segundos: Fecha.getSeconds()
    }
    campo_hora.innerHTML = "Hora: " + hora_actual.hora + ":" + hora_actual.minuto
    setInterval(() => {
        campo_hora.innerHTML = "Hora: " + hora_actual.hora + ":" + hora_actual.minuto
        console.log("hora actualizada")
    }, 60000);
}

Asignar_Fecha()
Asignar_Hora()