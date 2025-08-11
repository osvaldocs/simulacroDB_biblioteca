// insertUser.js ESTE SCRIPT SOLO LO HICE PARA INSERTAR UN USUARIO HASHEADO DE PRUEBA Y NO MODIFICAR TODA LA DB
import dotenv from "dotenv";
dotenv.config();

import { pool } from "./db.js";
import bcrypt from "bcryptjs";

async function insertUser() {
  try {
    const hashedPassword = await bcrypt.hash("secreta123", 10);

    const [result] = await pool.execute(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      ["Juan Pérez", "juan.perez@example.com", hashedPassword]
    );

    console.log("Usuario insertado con ID:", result.insertId);
  } catch (error) {
    console.error("Error al insertar usuario:", error);
  } finally {
    pool.end();
  }
}

insertUser();
