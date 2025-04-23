import Booking from "@domain/Booking";

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
};
