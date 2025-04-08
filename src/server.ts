import dotenv from "dotenv";
/* import app from "./app";  */// Importamos el archivo app.ts

dotenv.config(); // Carga las variables de entorno

import './config/firebase/firebaseAdmin';

import app from "./app"; 

const PORT = process.env.PORT || 5000; // Define el puerto

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


