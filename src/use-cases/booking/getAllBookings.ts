/* import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { BookingResponseDTO } from "../../types/bookingTypes";

export const getAllBookings = async (
  bookingRepo: BookingRepository
): Promise<BookingResponseDTO[]> => {
  const bookings = await bookingRepo.findAll();

  //console.log("Todas las reservas obtenidas:", bookings);

  return bookings && bookings.map((booking) => ({
    //id: booking._id.toString(),
    id: booking._id?.toString() || "ID no disponible",
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
  }));
}; */


//Este funciona pero manada las fechas en otro formato
/* import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { BookingResponseDTO } from "../../types/bookingTypes";

export const getAllBookings = async (
  bookingRepo: BookingRepository
): Promise<BookingResponseDTO[]> => {
  const bookings = await bookingRepo.findAll();

  return bookings.map((booking, index) => {
  const id = booking._id?.toString();
  const cabinId = booking.cabinId?.toString();
  const userId = booking.userId?.toString();

  if (!id || !cabinId || !userId) {
    console.log("Reserva incompleta en el índice", index);
    console.log("booking:", JSON.stringify(booking, null, 2));
    throw new Error("Datos incompletos en la reserva: faltan _id, cabinId o userId.");
  }

  return {
    id,
    clientName: booking.clientName,
    clientEmail: booking.clientEmail,
    clientPhone: booking.clientPhone,
    cabinId,
    cabinName: booking.cabinSnapshot?.name || "Nombre no disponible",
    userId,
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
});

}; */



import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { BookingResponseDTO } from "../../types/bookingTypes";

export const getAllBookings = async (
  bookingRepo: BookingRepository
): Promise<BookingResponseDTO[]> => {
  const bookings = await bookingRepo.findAll();

  return bookings.map((booking, index) => {
    const id = booking._id?.toString();
    const cabinId = booking.cabinId?.toString();
    const userId = booking.userId?.toString();

    if (!id || !cabinId || !userId) {
      console.log("Reserva incompleta en el índice", index);
      console.log("booking:", JSON.stringify(booking, null, 2));
      throw new Error("Datos incompletos en la reserva: faltan _id, cabinId o userId.");
    }

    // ✅ Formateamos fechas como YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    return {
      id,
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      cabinId,
      cabinName: booking.cabinSnapshot?.name || "Nombre no disponible",
      userId,
      startDate: formatDate(booking.startDate),
      endDate: formatDate(booking.endDate),
      reservedNights: booking.reservedNights || 0,
      numberOfGuests: booking.numberOfGuests,
      message: booking.message,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      totalPrice: booking.totalPrice,
      confirmationCode: booking.confirmationCode,
      createdAt: formatDate(booking.createdAt),
      updatedAt: formatDate(booking.updatedAt),
    };
  });
};
