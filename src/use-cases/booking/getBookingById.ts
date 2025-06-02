import Booking from "../../domain/Booking";

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
};
