# Proyecto Biblioteca - Backend y Frontend

Este proyecto es una aplicación simple de gestión de biblioteca, que incluye un backend con Node.js, Express y MySQL, y un frontend básico en HTML/JS para login y búsqueda de libros.

## Tecnologías usadas

- Backend:
  - Node.js
  - Express
  - MySQL (mysql2)
  - bcryptjs (para hashear contraseñas)
  - dotenv (para variables de entorno)
  - cors (para habilitar CORS)
  - csv-parser (para cargar datos desde CSV)
- Frontend:
  - HTML, CSS y JavaScript vanilla

## Estructura del proyecto

- /biblioteca-backend  
  Código del servidor con rutas para usuarios, libros, préstamos, autenticación, etc.  
  Contiene conexión a base de datos, modelos y controladores.

- /biblioteca-frontend  
  Archivos estáticos del cliente: login.html, dashboard.html, scripts JS.

- /src/data  
  Archivo CSV para carga inicial de usuarios (usuarios.csv).

## Base de datos

- Nombre: biblioteca  
- Incluye tablas: libros, usuarios, prestamos, entre otras.  
- Se debe importar el esquema y los datos de prueba en MySQL antes de iniciar la app.  

Ejemplo para importar desde terminal (asumiendo archivo biblioteca.sql):

mysql -u tu_usuario -p biblioteca < ruta/a/biblioteca.sql

- el unico usuario con contraseña hasheada para probar el login es: email: 'juan.perez@example.com' pass: 'secreta123'

## Extras
- Se adjunta el archivo biblioteca.sql
- Se adjunta .txt con todas los comandos de creacion de la bd y las practicas de consultas realizadas

## Instalación y ejecución

1. Clonar el repositorio.

2. Backend:  
   - Ubicarse en /biblioteca-backend  
   - Ejecutar npm install para instalar dependencias  
   - Crear archivo .env con las variables:  
     DB_HOST=localhost  
     DB_USER=tu_usuario  
     DB_PASSWORD=tu_contraseña  
     DB_NAME=biblioteca  
   - Importar la base de datos biblioteca en MySQL (ver sección Base de datos).  
   - Ejecutar el servidor con node src/server.js o con nodemon.

3. Frontend:  
   - Abrir biblioteca-frontend/login.html en el navegador (se recomienda usar Live Server o un servidor estático).

## Uso

- El usuario puede iniciar sesión con su email y contraseña.  
- Luego puede buscar libros por título o listar todos los libros disponibles.  
- Los resultados se muestran en formato tabla con datos como id, título, autor, género, año y disponibilidad.

## Notas

- Las contraseñas se guardan hasheadas usando bcrypt.  
- El backend provee endpoints REST para CRUD de libros, usuarios, préstamos y autenticación.  
- CORS está configurado para aceptar peticiones solo desde el frontend local.  
- Hay un script para cargar usuarios desde un archivo CSV con contraseñas hasheadas.  

## Autor

Pablo Campos  
Contacto: [tu email o linkedin]

## Licencia

Este proyecto es para fines educativos.

coders@p4m5-0534:~/Documentos/CursoHtmlOpenBootcamp/baseDeDatos/pruebaDesempeñoMod4$ node server.js
node:internal/modules/cjs/loader:1404
  throw err;
  ^

Error: Cannot find module '/home/coders/Documentos/CursoHtmlOpenBootcamp/baseDeDatos/pruebaDesempeñoMod4/server.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
    at Function._load (node:internal/modules/cjs/loader:1211:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
1ï¸âƒ£ Preparar el entorno

Primero asegÃºrate de tener instalado Node.js en tu PC.
En la terminal:

node -v

Si no estÃ¡ instalado, lo descargas de https://nodejs.org.

Luego, crea una carpeta para tu proyecto:

mkdir cargar_csv_mysql
cd cargar_csv_mysql


---

2ï¸âƒ£ Instalar dependencias

Vas a necesitar:

mysql2 â†’ para conectarte a MySQL

csv-parser â†’ para leer el CSV


En la carpeta del proyecto:

npm init -y
npm install mysql2 csv-parser


---

3ï¸âƒ£ Crear el script cargar.js

Crea un archivo llamado cargar.js y pon este cÃ³digo:

const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// ðŸ”¹ Cambia estos datos por los tuyos:
const dbConfig = {
  host: 'localhost',     // Servidor de MySQL
  user: 'root',          // Usuario de MySQL
  password: 'TU_PASSWORD', // ContraseÃ±a de MySQL
  database: 'NOMBRE_DE_TU_BASE', // Base de datos
};

// ðŸ”¹ Cambia esta ruta por la ubicaciÃ³n de tu CSV
const csvFilePath = 'C:/Users/TuUsuario/Documents/datos.csv';

// ðŸ”¹ Cambia por el nombre de tu tabla
const tableName = 'nombre_de_tu_tabla';

// Crear conexiÃ³n a MySQL
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('âŒ Error al conectar a MySQL:', err);
    return;
  }
  console.log('âœ… Conectado a MySQL');
  
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      console.log(`ðŸ“„ CSV leÃ­do: ${results.length} filas`);

      // Insertar datos
      results.forEach((row) => {
        // ðŸ”¹ Cambia los nombres de columna aquÃ­ segÃºn tu tabla y CSV
        const query = `
          INSERT INTO ${tableName} (columna1, columna2, columna3)
          VALUES (?, ?, ?)
        `;

        connection.query(query, [
          row.columna1,
          row.columna2,
          row.columna3
        ], (err) => {
          if (err) console.error('âŒ Error al insertar fila:', err);
        });
      });

      console.log('âœ… Datos insertados en la base de datos');
      connection.end();
    });
});


---

4ï¸âƒ£ Cambiar los datos que corresponden

En el script anterior debes modificar:

1. host â†’ si usas MySQL local normalmente es localhost.


2. user â†’ tu usuario de MySQL (por defecto root).


3. password â†’ tu contraseÃ±a de MySQL.


4. database â†’ el nombre de la base de datos que creaste en Workbench.


5. csvFilePath â†’ ruta completa de tu archivo CSV.


6. tableName â†’ el nombre de la tabla donde vas a insertar.


7. Columnas en el INSERT INTO y en row.columnaX â†’ deben coincidir con las columnas de tu tabla y los encabezados de tu CSV.




---

5ï¸âƒ£ Ejecutar el script

En la terminal, estando en la carpeta del proyecto:

node cargar.js

Si todo estÃ¡ bien, vas a ver:

âœ… Conectado a MySQL
ðŸ“„ CSV leÃ­do: X filas
âœ… Datos insertados en la base de datos
