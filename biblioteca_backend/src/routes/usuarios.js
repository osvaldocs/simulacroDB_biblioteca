import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET /usuarios → listar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

// POST /usuarios → agregar un usuario
router.post("/", async (req, res) => {
  const { nombre, email, ciudad, fecha_registro } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, ciudad, fecha_registro) VALUES (?, ?, ?, ?)",
      [nombre, email, ciudad, fecha_registro]
    );
    res.status(201).json({ id: result.insertId, nombre, email, ciudad, fecha_registro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el usuario" });
  }
});

// PUT /usuarios/:id → actualizar un usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, ciudad, fecha_registro } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre=?, email=?, ciudad=?, fecha_registro=? WHERE id=?",
      [nombre, email, ciudad, fecha_registro, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ id, nombre, email, ciudad, fecha_registro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

// DELETE /usuarios/:id → eliminar un usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

export default router;
