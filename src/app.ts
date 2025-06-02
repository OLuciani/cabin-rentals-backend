import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database"; // Conexión a MongoDB
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from 'cookie-parser';

import exampleRoutes from "./routes/example.routes";
import usersRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes'
import cabinRoutes from "./routes/cabinRoutes";
import bookingRoutes from "./routes/bookingRoutes";


dotenv.config(); // Carga variables de entorno
connectDB(); // Conecta MongoDB

const app = express();

// Middlewares básicos
app.use(express.json());  // Middleware para JSON
app.use(cookieParser());  // Necesario para leer cookies

// Configuración personalizada de CORS
// Configurar CORS para permitir solicitudes desde el frontend
if (!process.env.FRONTEND_WEB_URL) {
  throw new Error("La variable FRONTEND_WEB_URL no está definida en el archivo .env");
}
const frontend_web_url: string = process.env.FRONTEND_WEB_URL ;

app.use(cors({
    //origin: 'http://localhost:3000', // O '*' para permitir todo (no recomendado en prod)
    origin: [frontend_web_url, 'http://localhost:3000'], 
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
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cabins", cabinRoutes);
app.use("/api/bookings", bookingRoutes);
  

// Middleware de manejo de errores (después de todas las rutas)
app.use(errorHandler);

export default app; // Exportamos app para que server.ts lo pueda importar
