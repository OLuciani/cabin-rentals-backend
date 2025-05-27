import { Request, Response } from "express";
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
};
