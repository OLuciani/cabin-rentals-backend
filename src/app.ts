import express from "express";
import dotenv from "dotenv";
import connectDB from "@config/database"; // Conexión a MongoDB
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import exampleRoutes from "./routes/example.routes";
import usersRoutes from './routes/usersRoutes';


dotenv.config(); // Carga variables de entorno
connectDB(); // Conecta MongoDB

const app = express();

// Middlewares básicos
app.use(express.json());  // Middleware para JSON

// Configuración personalizada de CORS
// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:3000', // O '*' para permitir todo (no recomendado en prod)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // solo si vas a usar cookies o autenticación más adelante
  }));


//Rutas
app.get("/error-prueba", async (req, res) => {
    try {
      console.log("📥 Solicitud recibida en /error-prueba");
      throw new Error("Este es un error de prueba"); // Simulando un error
    } catch (error) {
      console.error("🔥 Error en /error-prueba:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.use("/api", exampleRoutes);
app.use('/api/users', usersRoutes);
  

// Middleware de manejo de errores (después de todas las rutas)
app.use(errorHandler);

export default app; // Exportamos app para que server.ts lo pueda importar
