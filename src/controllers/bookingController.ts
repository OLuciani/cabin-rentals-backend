/* import { Request, Response } from "express";
import { 
    createBooking as createBookingUseCase,
    getAllBookings as getAllBookingsUseCase,
    getBookingById as getBookingByIdUseCase,
    updateBooking as updateBookingUseCase,
    deleteBooking as deleteBookingUseCase
  } from "../use-cases/booking";

// Crear una nueva reserva
export const createBookingController = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    const newBooking = await createBookingUseCase(bookingData);
    res.status(201).json({
      success: true,
      confirmationCode: newBooking.confirmationCode, // Devuelves solo lo necesario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Obtener todas las reservas
export const getAllBookingsController = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookingsUseCase();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Obtener una reserva por ID
export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await getBookingByIdUseCase(id);
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Actualizar una reserva (si es necesario)
export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await updateBookingUseCase(id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Eliminar una reserva (si es necesario)
export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBookingUseCase(id);
    res.status(200).json({ message: "Reserva eliminada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}; */



/* import { Request, Response } from "express";
import { createBooking } from "../use-cases/booking/createBooking";
import { MongooseBookingRepository } from "../infrastructure/repositories/MongooseBookingRepository";

const bookingRepo = new MongooseBookingRepository();

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const saved = await createBooking(req.body, bookingRepo);
    return res.status(201).json({
      success: true,
      confirmationCode: saved.confirmationCode,
    });
  } catch (error) {
    console.error("Error creando reserva:", error);
    return res.status(400).json({ message: (error as Error).message });
  }
}; */

//Este funciona perfecto hasta antes de agregar el la uatorizacion del rol
/* import { RequestHandler } from "express";
import { createBooking } from "../use-cases/booking/createBooking";
import { MongooseBookingRepository } from "../infrastructure/repositories/MongooseBookingRepository";

const bookingRepo = new MongooseBookingRepository();

export const createBookingController: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId; // aquí tomo el id del usuario autenticado

    const bookingData = {
      ...req.body,
      userId, // <-- agrego el userId al body antes de mandarlo al use-case
    };

    const saved = await createBooking(bookingData, bookingRepo);
    
    // 👇 quitá el return
    res.status(201).json({
      success: true,
      confirmationCode: saved.confirmationCode,
    });
  } catch (error) {
    console.error("Error creando reserva:", error);

    // 👇 también quitá el return aquí
    res.status(400).json({ message: (error as Error).message });
  }
}; */



// ✅ bookingController.ts
import { RequestHandler } from "express";
import { createBooking } from "../use-cases/booking/createBooking";
import { MongooseBookingRepository } from "../infrastructure/repositories/MongooseBookingRepository";
import { MongooseUserRepository } from "../infrastructure/repositories/MongooseUserRepository";
import { getAllBookings } from "../use-cases/booking/getAllBookings";
import { getBookingById } from "../use-cases/booking/getBookingById";
import { updateBooking } from "../use-cases/booking/updateBooking";
import { deleteBooking } from "../use-cases/booking/deleteBooking";

const bookingRepo = new MongooseBookingRepository();
const userRepo = new MongooseUserRepository();

export const createBookingController: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const role = req.user?.role;

    const bookingData = {
      ...req.body,
      userId,
    };

    const saved = await createBooking(bookingData, bookingRepo, userRepo, role);

    res.status(201).json({
      success: true,
      confirmationCode: saved.confirmationCode,
    });
  } catch (error) {
    console.error("Error creando reserva:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};


// Controlador para listar reservas
export const getAllBookingsController: RequestHandler = async (req, res) => {
  try {
    const bookings = await getAllBookings(bookingRepo);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error interno al obtener reservas." });
  }
};


export const getBookingByIdController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await getBookingById(id, bookingRepo);

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error obteniendo la reserva:", error);
    res.status(404).json({ success: false, message: (error as Error).message });
  }
};


export const updateBookingController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await updateBooking(id, updateData, bookingRepo);

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};


export const deleteBookingController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteBooking(id, bookingRepo);

    res.status(200).json({ success: true, message: "Reserva eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};