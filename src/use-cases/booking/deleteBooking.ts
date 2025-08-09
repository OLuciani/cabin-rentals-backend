import { BookingRepository } from "../../domain/interfaces/BookingRepository";

export const deleteBooking = async (
  id: string,
  bookingRepo: BookingRepository
): Promise<void> => {
  const booking = await bookingRepo.findById(id);
  if (!booking) {
    throw new Error("Reserva no encontrada.");
  }

  await bookingRepo.deleteById(id);
};
