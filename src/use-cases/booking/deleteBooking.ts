import Booking from "../../domain/Booking";

// Función para eliminar una reserva
export const deleteBooking = async (id: string) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      throw new Error("Reserva no encontrada");
    }

    return deletedBooking;
  } catch (error) {
    throw new Error("Error al eliminar la reserva");
  }
};
