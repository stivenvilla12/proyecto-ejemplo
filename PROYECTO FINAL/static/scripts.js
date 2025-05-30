let graficoPastel = null; // Guardará la instancia del gráfico de pastel que se muestra en la página de la red
let graficoGenero = null; // Para evitar que se superpongan los gráficos

// Removed invalid HTML and comments from JavaScript file
    let contador = 0;
    function incrementarContador() {
      contador++;
      document.getElementById("contador").innerText = contador;
    }

AOS.init({
  duration: 1000, // Duración de la animación en milisegundos
  once: true,     // Se ejecuta solo una vez
});

const cantidadDeLogos = 35; // Cambia este número para más o menos logos
const contenedor = document.body;

for (let i = 0; i < cantidadDeLogos; i++) {
  const logo = document.createElement("img");
  logo.src = "./imagenes/Un_logo_moderno_-removebg-preview.PNG"; // Cambia al path correcto
  logo.classList.add("fondo-logo");

  // Posición aleatoria
  logo.style.top = Math.random() * 100 + "%";
  logo.style.left = Math.random() * 100 + "%";

  // Tamaño aleatorio (entre 40px y 100px)
  const size = Math.floor(Math.random() * 60) + 40;
  logo.style.width = size + "px";

  // Rotación aleatoria
  const rotacion = Math.floor(Math.random() * 360);
  logo.style.transform = `rotate(${rotacion}deg)`;

  contenedor.appendChild(logo);
}

// clima
function obtenerClima() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (posicion) {
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      const apiKey = 'e8b9c05df0a94a74833234807252004'; // Reemplaza con tu clave de WeatherAPI
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const ciudad = data.location.name;
          const temperatura = Math.round(data.current.temp_c);
          const descripcion = data.current.condition.text;
          const icono = data.current.condition.icon;
          const esDia = data.current.is_day;
          const momentoDelDia = esDia ? 'Día' : 'Noche';

          const climaElement = document.getElementById('clima');
          const iconoClimaElement = document.getElementById('clima-icono');

          if (climaElement && iconoClimaElement) {
            climaElement.firstChild.textContent = `${ciudad}: ${temperatura}°C `; // Actualiza el texto antes de la imagen
            iconoClimaElement.src = `https:${icono}`; // Actualiza la fuente de la imagen existente
            iconoClimaElement.alt = descripcion; // Actualiza el texto alternativo de la imagen
            climaElement.lastChild.textContent = ` ${momentoDelDia} ${descripcion}`; // Actualiza el texto después de la imagen
          } else {
            console.error("No se encontraron los elementos con IDs 'clima' o 'clima-icono'");
          }
        })
        .catch(error => {
          const climaElement = document.getElementById('clima');
          if (climaElement) {
            climaElement.classList.add('error');
            climaElement.innerText = 'Error al obtener el clima';
          }
          console.error("Error al obtener el clima:", error);
        });
    });
  } else {
    const climaElement = document.getElementById('clima');
    if (climaElement) {
      climaElement.classList.add('error');
      climaElement.innerText = 'Geolocalización no disponible';
    }
  }
}

window.onload = obtenerClima;

const REGISTROS_KEY = 'registrosEmprendimientos'; // Clave para almacenar en localStorage

// Función para guardar los registros en localStorage
function guardarRegistros(registros) {
  localStorage.setItem(REGISTROS_KEY, JSON.stringify(registros));
}

// Función para cargar los registros desde localStorage
function cargarRegistros() {
  const registrosString = localStorage.getItem(REGISTROS_KEY);
  if (registrosString) {
    return JSON.parse(registrosString);
  }
  return []; // Si no hay registros, devuelve un array vacío
}

// Cargar los registros al cargar la página
let registrosSimulados = cargarRegistros();
mostrarRegistrosSimulados(); // Mostrar los registros cargados (si hay)
actualizarContador();

document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita la recarga de la página

  const emprendedor = document.getElementById('emprendedor').value;
  const genero = document.getElementById('genero').value;
  const emprendimiento = document.getElementById('emprendimiento').value;
  const fecha = document.getElementById('fecha').value;
  const departamento = document.getElementById('departamento').value;
  const movil = document.getElementById('movil').value;
  const mail = document.getElementById('mail').value;
  const sitioWeb = document.getElementById('sitioWeb').value;
  // Recolecta los otros datos del formulario

  const nuevoRegistro = {
    nombre: nombre,
    email: email,
    // Otros datos recolectados
    fechaRegistro: new Date().toLocaleString()
  };

  registrosSimulados.push(nuevoRegistro);
  guardarRegistros(registrosSimulados); // Guardar en localStorage

  // Simula una respuesta exitosa mostrando un mensaje
  const mensajeRegistro = document.getElementById('mensajeRegistro');
  mensajeRegistro.textContent = `Registro exitoso para: ${emprendedor} (${emprendimiento})`;
  mensajeRegistro.style.display = 'block';

  console.log("Registros Simulados (localStorage):", registrosSimulados); // Para verificar en la consola

  // Opcional: Limpiar el formulario después del envío simulado
  document.getElementById('registroForm').reset();

  // Opcional: Actualizar la lista de registros mostrada
  mostrarRegistrosSimulados();
  actualizarContador();
});

// Función para mostrar los registros simulados en la página
function mostrarRegistrosSimulados() {
  const cuerpoTabla = document.getElementById('cuerpoTablaDeRegistros');
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = ''; // Limpia antes de volver a mostrar
    registrosSimulados.forEach(registro => {
      const listItem = document.createElement('li');
      listItem.textContent = `Nombre: ${registro.nombre}, Email: ${registro.email}, Registrado el: ${registro.fechaRegistro}`;
      listaRegistros.appendChild(listItem);
    });
  }

}



// Opcional: Botón para limpiar los registros de localStorage (para pruebas)
const limpiarRegistrosBtn = document.getElementById('limpiarRegistros');
if (limpiarRegistrosBtn) {
  limpiarRegistrosBtn.addEventListener('click', function() {
    localStorage.removeItem(REGISTROS_KEY);
    registrosSimulados = [];
    mostrarRegistrosSimulados();
    actualizarContador();
    console.log("localStorage de registros limpiado.");
  });
<<<<<<< HEAD
}
=======
}

function mostrarGraficaPastel() {
  const canvas = document.getElementById('graficaPastel');
  if (!canvas) return;

  const conteo = {};
  registrosSimulados.forEach(r => {
    conteo[r.departamento] = (conteo[r.departamento] || 0) + 1;
  });

  const labels = Object.keys(conteo);
  const datos = Object.values(conteo);

  if (graficoPastel) graficoPastel.destroy();

  graficoPastel = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: datos,
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      }
    }
  });
}

function mostrarGraficaGenero() {
  const canvas = document.getElementById('graficaGenero');
  if (!canvas) return;

  const conteoGenero = {};

  registrosSimulados.forEach(r => {
    const genero = r.genero || 'No especificado';
    conteoGenero[genero] = (conteoGenero[genero] || 0) + 1;
  });

  const labels = Object.keys(conteoGenero);
  const datos = Object.values(conteoGenero);

  if (graficoGenero) graficoGenero.destroy();

  graficoGenero = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Registros por género',
        data: datos,
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        borderColor: ['#2b7fc2', '#cc4c6b', '#d4ae3c', '#379e9e'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
          title: {
            display: true,
            text: 'Cantidad de registros'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Género'
          }
        }
      }
    }
  });
}

// Configuración de los botones tipo collapse de bootstrap para que se oculte el anterior
document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los botones que abren colapsables
  const botones = document.querySelectorAll('[data-bs-toggle="collapse"]');

  botones.forEach(boton => {
    boton.addEventListener('click', function () {
      const targetId = boton.getAttribute('data-bs-target');

      // Oculta todos los colapsables excepto el que fue clickeado
      document.querySelectorAll('.collapse').forEach(colapso => {
        if (colapso.id !== targetId.replace('#', '')) {
          const instancia = bootstrap.Collapse.getInstance(colapso);
          if (instancia) {
            instancia.hide();
          } else {
            new bootstrap.Collapse(colapso, { toggle: false }).hide();
          }
        }
      });
    });
  });
});

function actualizarContador() {
  const contador = document.getElementById('contadorValor');
  if (contador) {
    contador.textContent = registrosSimulados.length;
  }
}

>>>>>>> de835a3 (Contador actualizado)
