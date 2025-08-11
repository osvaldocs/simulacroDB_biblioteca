import express from "express";
import cors from "cors"; 
import { pool } from "./db.js";  // Importa el pool de conexión a la BD
import librosRoutes from "./routes/libros.js";
import usuariosRoutes from "./routes/usuarios.js";
import prestamosRoutes from "./routes/prestamos.js";
import consultasRoutes from "./routes/consultas.js";
import authRouter from "./routes/auth.js";

const app = express();

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: "http://127.0.0.1:5500", // Permite solo esta URL (tu frontend local)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type"] // Headers permitidos
}));

// Definir las rutas para cada recurso usando routers importados
app.use("/libros", librosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/consultas", consultasRoutes);
app.use("/login", authRouter);

// Probar la conexión a la base de datos cuando arranca el servidor
try {
  const connection = await pool.getConnection();
  console.log("✅ Conectado a MySQL correctamente");
  connection.release(); // Liberar la conexión
} catch (error) {
  console.error("❌ Error al conectar a MySQL:", error);
}

// Iniciar el servidor en el puerto configurado (o 3000 por defecto)
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT || 3000}`);
});
