import Booking from "../../domain/Booking";

// Función para obtener todas las reservas
export const getAllBookings = async () => {
  try {
    return await Booking.find();
  } catch (error) {
    throw new Error("Error al obtener las reservas");
  }
};
