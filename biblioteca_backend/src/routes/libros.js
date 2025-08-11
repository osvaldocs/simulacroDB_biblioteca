import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET /libros → obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM libros");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
});

// POST /libros → agregar un nuevo libro
router.post("/", async (req, res) => {
  const { titulo, autor, genero, anio_publicacion, disponible } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO libros (titulo, autor, genero, anio_publicacion, disponible) VALUES (?, ?, ?, ?, ?)",
      [titulo, autor, genero, anio_publicacion, disponible]
    );
    // Responder con el libro creado y su nuevo id
    res.status(201).json({ id: result.insertId, titulo, autor, genero, anio_publicacion, disponible });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el libro" });
  }
});

// PUT /libros/:id → actualizar un libro existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, genero, anio_publicacion, disponible } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE libros SET titulo=?, autor=?, genero=?, anio_publicacion=?, disponible=? WHERE id=?",
      [titulo, autor, genero, anio_publicacion, disponible, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });
    
    res.json({ id, titulo, autor, genero, anio_publicacion, disponible });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
});

// DELETE /libros/:id → eliminar un libro
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM libros WHERE id=?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });
    
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
});

// GET /libros/buscar?titulo= → buscar libros por título (parcial)
router.get('/buscar', async (req, res) => {
  const titulo = req.query.titulo || '';
  const sql = 'SELECT * FROM libros WHERE titulo LIKE ?';
  try {
    const [results] = await pool.query(sql, [`%${titulo}%`]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en consulta libros' });
  }
});

export default router;

