/* import Booking from "../../domain/Booking";

// Función para actualizar una reserva
export const updateBooking = async (id: string, updateData: object) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBooking) {
      throw new Error("Reserva no encontrada");
    }

    return updatedBooking;
  } catch (error) {
    throw new Error("Error al actualizar la reserva");
  }
}; */



import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { BookingResponseDTO } from "../../types/bookingTypes";

export const updateBooking = async (
  id: string,
  data: Partial<any>, // podrías tipar más fuerte si lo necesitás
  bookingRepo: BookingRepository
): Promise<BookingResponseDTO> => {
  const updated = await bookingRepo.updateById(id, data);
  if (!updated) {
    throw new Error("No se encontró la reserva para actualizar.");
  }

  return {
    id: updated._id.toString(),
    clientName: updated.clientName,
    clientEmail: updated.clientEmail,
    clientPhone: updated.clientPhone,
    cabinId: updated.cabinId.toString(),
    cabinName: updated.cabinSnapshot?.name || "Nombre no disponible",
    userId: updated.userId.toString(),
    startDate: updated.startDate.toISOString(),
    endDate: updated.endDate.toISOString(),
    reservedNights: updated.reservedNights || 0,
    numberOfGuests: updated.numberOfGuests,
    message: updated.message,
    status: updated.status,
    paymentStatus: updated.paymentStatus,
    totalPrice: updated.totalPrice,
    confirmationCode: updated.confirmationCode,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
};
