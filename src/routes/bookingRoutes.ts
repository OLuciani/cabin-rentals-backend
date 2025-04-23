import { Router } from "express";
import { 
  createBookingController, 
  getAllBookingsController, 
  getBookingByIdController,
  updateBookingController,
  deleteBookingController 
} from "../controllers/bookingController";


const router = Router();

// Ruta para crear una nueva reserva
router.post("/", createBookingController);

// Ruta para obtener todas las reservas
router.get("/", getAllBookingsController);

// Ruta para obtener una reserva por ID
router.get("/:id", getBookingByIdController);

// Ruta para actualizar una reserva (si es necesario)
router.put("/:id", updateBookingController);

// Ruta para eliminar una reserva (si es necesario)
router.delete("/:id", deleteBookingController);

export default router;
