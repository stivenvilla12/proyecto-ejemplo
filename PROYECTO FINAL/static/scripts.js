let graficoPastel = null; // Guardará la instancia del gráfico de pastel que se muestra en la página de la red

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
    emprendedor: emprendedor,
    genero: genero,
    emprendimiento: emprendimiento,
    fecha: fecha,
    departamento: departamento,
    movil: movil,
    mail: mail,
    sitioWeb: sitioWeb, 
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
});

// Función para mostrar los registros simulados en la página
function mostrarRegistrosSimulados() {
  const cuerpoTabla = document.getElementById('cuerpoTablaDeRegistros');
  if (cuerpoTabla) {
    cuerpoTabla.innerHTML = ''; // Limpia antes de volver a mostrar
    registrosSimulados.forEach(registro => {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${registro.emprendedor}</td>
        <td>${registro.emprendimiento}</td>
        <td>${registro.departamento}</td>
        <td>${registro.movil}</td>
        <td><a href="${registro.sitioWeb}" target="_blank">${registro.sitioWeb}</a></td>
        <td>${registro.fechaRegistro}</td>
      `;

      cuerpoTabla.appendChild(fila);
    });
  }
  try {
    mostrarGraficaPastel();
  } catch (error) {
    console.error("Error al generar la gráfica:", error);
  }
}



// Opcional: Botón para limpiar los registros de localStorage (para pruebas)
const limpiarRegistrosBtn = document.getElementById('limpiarRegistros');
if (limpiarRegistrosBtn) {
  limpiarRegistrosBtn.addEventListener('click', function() {
    localStorage.removeItem(REGISTROS_KEY);
    registrosSimulados = [];
    mostrarRegistrosSimulados();
    console.log("localStorage de registros limpiado.");
  });
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