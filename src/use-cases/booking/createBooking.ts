/* import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import Cabin from "../../domain/Cabin";
import { IBooking } from "../../domain/Booking";

export const createBooking = async (
  bookingData: IBooking,
  bookingRepo: BookingRepository
  
) => {
  const { cabinId, userId, startDate, endDate, numberOfGuests, message, clientName, clientEmail, clientPhone } = bookingData;

  const cabinDetails = await Cabin.findById(cabinId);
  if (!cabinDetails) throw new Error("Cabaña no encontrada.");

  const available = await bookingRepo.isCabinAvailable(cabinId.toString(), new Date(startDate), new Date(endDate));
  if (!available) throw new Error("La cabaña no está disponible en esas fechas.");
 
  console.log("Valor de userId en la reserva: ", userId);

  const bookingToSave: Partial<IBooking> = {
    //cabin,
    //user,
    clientName, 
    clientEmail, 
    clientPhone,
    cabinId,
    userId,
    startDate,
    endDate,
    numberOfGuests,
    message,
    status: "pending",
    paymentStatus: "unpaid",
    checkInDone: false,
    checkOutDone: false,
    cabinSnapshot: {
      name: cabinDetails.name,
      pricePerNight: cabinDetails.pricePerNight,
    },
  };

  const saved = await bookingRepo.create(bookingToSave);

  // Podés actualizar disponibilidad si querés, pero cuidado con solapamientos
  cabinDetails.bookedRanges.push({ from: startDate, to: endDate });
  await cabinDetails.save();

  return saved;
};
 */


// src/use-cases/booking/createBooking.ts
/* import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import Cabin from "../../domain/Cabin";
import { IBooking } from "../../domain/Booking";

export const createBooking = async (
  bookingData: IBooking,
  bookingRepo: BookingRepository,
  userRepo: UserRepository,
  role?: string
) => {
  const { cabinId, userId, startDate, endDate, numberOfGuests, message, clientName, clientEmail, clientPhone } = bookingData;

  const cabinDetails = await Cabin.findById(cabinId);
  if (!cabinDetails) throw new Error("Cabaña no encontrada.");

  const available = await bookingRepo.isCabinAvailable(
    cabinId.toString(),
    new Date(startDate),
    new Date(endDate)
  );
  if (!available) throw new Error("La cabaña no está disponible en esas fechas.");

  let finalClientName = clientName;
  let finalClientEmail = clientEmail;
  let finalClientPhone = clientPhone;

  // Si el rol es client, extraemos los datos desde su cuenta
  if (role === "client") {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("Usuario no encontrado.");

    finalClientName = user.fullName;
    finalClientEmail = user.email;
    finalClientPhone = user.phone;
  }

  const bookingToSave: Partial<IBooking> = {
    clientName: finalClientName,
    clientEmail: finalClientEmail,
    clientPhone: finalClientPhone,
    cabinId,
    userId,
    startDate,
    endDate,
    numberOfGuests,
    message,
    status: "pending",
    paymentStatus: "unpaid",
    checkInDone: false,
    checkOutDone: false,
    cabinSnapshot: {
      name: cabinDetails.name,
      pricePerNight: cabinDetails.pricePerNight,
    },
  };

  const saved = await bookingRepo.create(bookingToSave);

  cabinDetails.bookedRanges.push({ from: startDate, to: endDate });
  await cabinDetails.save();

  return saved;
}; */



// src/use-cases/booking/createBooking.ts
import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import Cabin from "../../domain/Cabin";
import { IBooking } from "../../domain/Booking";

export const createBooking = async (
  bookingData: IBooking,
  bookingRepo: BookingRepository,
  userRepo: UserRepository,
  role?: string
) => {
  const { cabinId, userId, startDate, endDate, numberOfGuests, message, clientName, clientEmail, clientPhone } = bookingData;

  const cabinDetails = await Cabin.findById(cabinId);
  if (!cabinDetails) throw new Error("Cabaña no encontrada.");

  const available = await bookingRepo.isCabinAvailable(
    cabinId.toString(),
    new Date(startDate),
    new Date(endDate)
  );
  if (!available) throw new Error("La cabaña no está disponible en esas fechas.");

  let finalClientName = clientName;
  let finalClientEmail = clientEmail;
  let finalClientPhone = clientPhone;

  // Si el rol es client, extraemos los datos desde su cuenta
  if (role === "client") {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("Usuario no encontrado.");

    finalClientName = `${user.name} ${user.lastName}`;
    finalClientEmail = user.email;
    finalClientPhone = user.phone;
  }

  const bookingToSave: Partial<IBooking> = {
    clientName: finalClientName,
    clientEmail: finalClientEmail,
    clientPhone: finalClientPhone,
    cabinId,
    userId,
    startDate,
    endDate,
    numberOfGuests,
    message,
    status: "pending",
    paymentStatus: "unpaid",
    checkInDone: false,
    checkOutDone: false,
    cabinSnapshot: {
      name: cabinDetails.name,
      pricePerNight: cabinDetails.pricePerNight,
    },
  };

  const saved = await bookingRepo.create(bookingToSave);

  cabinDetails.bookedRanges.push({ from: startDate, to: endDate });
  await cabinDetails.save();

  return saved;
};
