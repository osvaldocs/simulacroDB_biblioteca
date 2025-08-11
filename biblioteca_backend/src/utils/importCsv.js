import fs from 'fs';
import csv from 'csv-parser';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

const saltRounds = 10; // Número de rondas para el hash de bcrypt

// Crear un stream para leer el archivo CSV de usuarios
fs.createReadStream('src/data/usuarios.csv')
  .pipe(csv()) // Usar csv-parser para convertir cada fila en un objeto JS
  .on('data', async (row) => {
    // Nota: aquí el evento 'data' es async, podría generar problemas de rendimiento
    // para un volumen alto se debería manejar con pausa y reanudación del stream

    try {
      // Hashear la contraseña del usuario antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(row.password, saltRounds);

      // Consulta SQL para insertar el usuario con contraseña hasheada
      const sql = `
        INSERT INTO usuarios (nombre, email, ciudad, fecha_registro, password)
        VALUES (?, ?, ?, ?, ?)
      `;

      // Parámetros a insertar en la consulta
      const params = [
        row.nombre,
        row.email,
        row.ciudad,
        row.fecha_registro,
        hashedPassword
      ];

      // Ejecutar la consulta en la base de datos
      await pool.query(sql, params);

    } catch (error) {
      console.error("Error insertando usuario", error);
    }
  })
  .on('end', () => {
    console.log('Carga de datos completa.');
  });
