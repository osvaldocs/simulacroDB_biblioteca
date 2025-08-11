// Selección de elementos del DOM
const form = document.querySelector('#searchForm');
const inputTitulo = document.querySelector('#searchInput');
const resultadosDiv = document.querySelector('#results');
const listarBtn = document.querySelector('#listarBtn');

// Función para mostrar libros en una tabla HTML
function mostrarLibros(libros) {
  // Si no hay resultados, mostrar mensaje
  if (libros.length === 0) {
    resultadosDiv.innerHTML = '<p>No se encontraron libros.</p>';
    return;
  }

  // Construcción de la tabla con los datos recibidos
  const tablaHTML = `
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Género</th>
          <th>Año</th>
          <th>Disponible</th>
        </tr>
      </thead>
      <tbody>
        ${libros.map(libro => `
          <tr>
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.genero}</td>
            <td>${libro.anio_publicacion}</td>
            <td>${libro.disponible ? 'Sí' : 'No'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Insertar tabla en el contenedor de resultados
  resultadosDiv.innerHTML = tablaHTML;
}

// Evento submit del formulario de búsqueda
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evitar recarga de página

  const titulo = inputTitulo.value.trim(); // Obtener y limpiar texto ingresado

  // Validar que el campo no esté vacío
  if (!titulo) {
    resultadosDiv.innerHTML = '<p>Por favor ingresa un título para buscar.</p>';
    return;
  }

  try {
    // Hacer petición GET al backend para buscar libros por título
    const res = await fetch(`http://localhost:3000/libros/buscar?titulo=${encodeURIComponent(titulo)}`, {
      method: 'GET'
    });

    if (!res.ok) throw new Error('Error al buscar libros');

    const libros = await res.json(); // Parsear respuesta JSON

    mostrarLibros(libros); // Mostrar resultados en la tabla
  } catch (error) {
    resultadosDiv.innerHTML = '<p>Error al buscar libros.</p>'; // Mensaje de error visible
    console.error(error); // Loguear error para debug
  }
});

// Evento click para listar todos los libros
listarBtn.addEventListener('click', async () => {
  try {
    // Petición GET para obtener todos los libros
    const res = await fetch('http://localhost:3000/libros', { method: 'GET' });

    if (!res.ok) throw new Error('Error al listar libros');

    const libros = await res.json();

    mostrarLibros(libros); // Mostrar todos los libros
  } catch (error) {
    resultadosDiv.innerHTML = '<p>Error al listar libros.</p>';
    console.error(error);
  }
});
