// ESTE CODIGO ES POR SI LAS MOSCAS, PONER LAS CONSULTAS QUE NO SEAN DE UNA TABLA PARA MANTENER LOGICA EJ. JOINS
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * 1️⃣ Libros más prestados (TOP 5)
 */
router.get("/top-libros", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT l.id, l.titulo, COUNT(p.id) AS total_prestamos
      FROM prestamos p
      JOIN libros l ON p.id_libro = l.id
      GROUP BY l.id, l.titulo
      ORDER BY total_prestamos DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la consulta de libros más prestados" });
  }
});

/**
 * 2️⃣ Usuarios con más préstamos
 */
router.get("/top-usuarios", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.nombre, COUNT(p.id) AS total_prestamos
      FROM prestamos p
      JOIN usuarios u ON p.id_usuario = u.id
      GROUP BY u.id, u.nombre
      ORDER BY total_prestamos DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la consulta de usuarios con más préstamos" });
  }
});

/**
 * 3️⃣ Libros no prestados nunca
 */
router.get("/libros-no-prestados", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT l.id, l.titulo
      FROM libros l
      LEFT JOIN prestamos p ON l.id = p.id_libro
      WHERE p.id IS NULL
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la consulta de libros no prestados" });
  }
});

export default router;
