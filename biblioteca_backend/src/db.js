// Importar el paquete mysql2 con soporte para promesas
import mysql from "mysql2/promise";
// Importar dotenv para cargar variables de entorno desde .env
import dotenv from "dotenv";

// Cargar las variables de entorno definidas en el archivo .env
dotenv.config();

// Crear un pool de conexiones a la base de datos MySQL usando los datos de entorno
export const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Host de la base de datos (ej: localhost)
  user: process.env.DB_USER,       // Usuario con permisos para la BD
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME    // Nombre de la base de datos
});
