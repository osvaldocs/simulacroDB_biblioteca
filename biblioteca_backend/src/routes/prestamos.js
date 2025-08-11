import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET /prestamos → listar todos los préstamos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prestamos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los préstamos" });
  }
});

// POST /prestamos → agregar un préstamo
router.post("/", async (req, res) => {
  const { id_libro, id_usuario, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO prestamos (id_libro, id_usuario, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)",
      [id_libro, id_usuario, fecha_prestamo, fecha_devolucion]
    );
    res.status(201).json({ id: result.insertId, id_libro, id_usuario, fecha_prestamo, fecha_devolucion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el préstamo" });
  }
});

// PUT /prestamos/:id → actualizar un préstamo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id_libro, id_usuario, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE prestamos SET id_libro=?, id_usuario=?, fecha_prestamo=?, fecha_devolucion=? WHERE id=?",
      [id_libro, id_usuario, fecha_prestamo, fecha_devolucion, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Préstamo no encontrado" });
    res.json({ id, id_libro, id_usuario, fecha_prestamo, fecha_devolucion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el préstamo" });
  }
});

// DELETE /prestamos/:id → eliminar un préstamo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM prestamos WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Préstamo no encontrado" });
    res.json({ message: "Préstamo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el préstamo" });
  }
});

export default router;
