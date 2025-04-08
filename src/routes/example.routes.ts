import { Router } from "express";

const router = Router();

// Ruta de prueba real
router.get("/ping", (req, res) => {
    res.json({ message: "¡Pong! El servidor funciona correctamente 🎉" });
});

export default router;