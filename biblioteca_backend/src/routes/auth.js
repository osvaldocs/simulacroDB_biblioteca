import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

const router = Router();

// Ruta POST /login para autenticar usuario
router.post("/", async (req, res) => {
  const { email, password } = req.body; // Obtener email y password enviados desde el frontend
  try {
    // Buscar usuario por email en la base de datos
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    // Si no existe el usuario, responder con error 401 (no autorizado)
    if (rows.length === 0) return res.status(401).json({ message: "Usuario no encontrado" });

    const user = rows[0];

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    const match = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, responder con error 401
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Si todo está bien, responder con mensaje de éxito y id del usuario
    res.json({ message: "Login exitoso", userId: user.id });
  } catch (error) {
    // En caso de error en el servidor, responder con error 500 y loguear el error
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
