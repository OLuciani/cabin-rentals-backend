/* import Booking from "../../domain/Booking";

// Función para obtener una reserva por ID
export const getBookingById = async (id: string) => {
  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      throw new Error("Reserva no encontrada");
    }

    return booking;
  } catch (error) {
    throw new Error("Error al obtener la reserva");
  }
}; */


import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { BookingResponseDTO } from "../../types/bookingTypes";

export const getBookingById = async (
  id: string,
  bookingRepo: BookingRepository
): Promise<BookingResponseDTO> => {
  const booking = await bookingRepo.findById(id);
  if (!booking) {
    throw new Error("Reserva no encontrada");
  }

  return {
    id: booking._id.toString(),
    clientName: booking.clientName,
    clientEmail: booking.clientEmail,
    clientPhone: booking.clientPhone,
    cabinId: booking.cabinId.toString(),
    cabinName: booking.cabinSnapshot?.name || "Nombre no disponible",
    userId: booking.userId.toString(),
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    reservedNights: booking.reservedNights || 0,
    numberOfGuests: booking.numberOfGuests,
    message: booking.message,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    totalPrice: booking.totalPrice,
    confirmationCode: booking.confirmationCode,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
};

