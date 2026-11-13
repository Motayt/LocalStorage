// 1. Creamos la clase RolloAuditado
class RolloAuditado {
    constructor(id, metrosTotales, metrosDefecto, porcentaje, estado) {
        this.id = id;
        this.metrosTotales = metrosTotales;
        this.metrosDefecto = metrosDefecto;
        this.porcentaje = porcentaje;
        this.estado = estado;
    }
}

// 2. Esta es la Función para calcular el porcentaje de defecto
function calcularPorcentaje(metrosDefecto, metrosTotales) {
    return (metrosDefecto / metrosTotales) * 100;
}

// Esta es la Función para definir el estado de calidad para aprovar o rechazar
function obtenerEstadoCalidad(porcentaje) {
    if (porcentaje > 10) {
        return "Rechazado";
    } else {
        return "Aprobado";
    }
}

// Obtener los elementos del HTML mediante los id
const inputIdRollo = document.getElementById("idRollo");
const inputMtsTotales = document.getElementById("mtsTotales");
const inputMtsDefecto = document.getElementById("mtsDefecto");
const btnAuditar = document.getElementById("btnAuditar");
const tablaMermas = document.getElementById("tablaMermas");

// Cargamos los  datos de LocalStorage
let listaRollos = JSON.parse(localStorage.getItem("rollosGuardados")) || [];

// 3.Esta es la funcio para mostrar los datos en la tabla 
function mostrarTabla() {
    tablaMermas.innerHTML = "";

    for (let i = 0; i < listaRollos.length; i++) {
        let rollo = listaRollos[i];

        tablaMermas.innerHTML += `
            <tr>
                <td>${rollo.id}</td>
                <td>${rollo.metrosTotales}</td>
                <td>${rollo.porcentaje}%</td>
                <td>${rollo.estado}</td>
            </tr>
        `;
    }
}

// 4. Aqui es el Evento del botón "Guardar Auditoría"
btnAuditar.addEventListener("click", function () {
    let id = inputIdRollo.value;
    let metrosTotales = Number(inputMtsTotales.value);
    let metrosDefecto = Number(inputMtsDefecto.value);

    // Validación simple para que no guarden campos vacíos
    if (id == "" || inputMtsTotales.value == "" || inputMtsDefecto.value == "") {
        alert("Falta llenar algún campo.");
        return;
    }

    // Validacion para que la muestre un mensaje de error si los metros son menores que los metros defectuosos
    if (metrosDefecto > metrosTotales) {
        alert("Error: Los metros con defecto no pueden ser mayores a los metros totales.");
        return;
    }

    // Aqui se calcula el porcentaje  y la caldad de los metros de rollo
    let porcentaje = calcularPorcentaje(metrosDefecto, metrosTotales);
    let estado = obtenerEstadoCalidad(porcentaje);

    // Se crea el objeto 5con el json
    let nuevoRollo = new RolloAuditado(id, metrosTotales, metrosDefecto, porcentaje, estado);
    listaRollos.push(nuevoRollo);
    localStorage.setItem("rollosGuardados", JSON.stringify(listaRollos));

    // Actualizar la tabla
    mostrarTabla();

    // Limpiar los inputs
    inputIdRollo.value = "";
    inputMtsTotales.value = "";
    inputMtsDefecto.value = "";
});

// Mostrar la tabla al cargar la página
mostrarTabla();