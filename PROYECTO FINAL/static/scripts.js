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
          const descripcion = data.current.condition.text; // Estado del clima
          const icono = data.current.condition.icon; // Viene con prefijo //cdn...
          const esDia = data.current.is_day; // 1 = día, 0 = noche
          const momentoDelDia = esDia ? 'Día' : 'Noche';

          document.getElementById('clima').innerHTML = `
            <span>${ciudad}: ${temperatura}°C</span>
            <img src="https:${icono}" alt="${descripcion}" class="icono-clima">
            <span>${momentoDelDia} ${descripcion}</span>
          `;
        })
        .catch(error => {
          document.getElementById('clima').classList.add('error');
          document.getElementById('clima').innerText = 'Error al obtener el clima';
        });
    });
  } else {
    document.getElementById('clima').classList.add('error');
    document.getElementById('clima').innerText = 'Geolocalización no disponible';
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

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
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
  mensajeRegistro.textContent = `Registro exitoso para: ${nombre} (${email})`;
  mensajeRegistro.style.display = 'block';

  console.log("Registros Simulados (localStorage):", registrosSimulados); // Para verificar en la consola

  // Opcional: Limpiar el formulario después del envío simulado
  document.getElementById('registroForm').reset();

  // Opcional: Actualizar la lista de registros mostrada
  mostrarRegistrosSimulados();
});

// Función para mostrar los registros simulados en la página
function mostrarRegistrosSimulados() {
  const listaRegistros = document.getElementById('listaDeRegistros');
  if (listaRegistros) {
    listaRegistros.innerHTML = '';
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
    console.log("localStorage de registros limpiado.");
  });
}