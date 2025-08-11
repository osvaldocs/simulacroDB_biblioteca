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
