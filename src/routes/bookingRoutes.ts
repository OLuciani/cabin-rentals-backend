import { Router } from "express";
import { 
  createBookingController, 
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController 
} from "../controllers/bookingController";
import authenticateToken from "../middlewares/authenticateToken";
import authorizeRole from "../middlewares/authorizeRole";


const router = Router();

// Ruta para crear una nueva reserva
router.post("/", authenticateToken, authorizeRole(["client", "admin"]), createBookingController);
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllBookingsController);
router.get("/:id", authenticateToken, authorizeRole(["admin"]), getBookingByIdController);
router.put("/:id", authenticateToken, authorizeRole(["admin"]), updateBookingController);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteBookingController);

export default router;
