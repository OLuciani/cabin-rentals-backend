import Booking from "@domain/Booking";
import Cabin from "@domain/Cabin"; // Asegúrate de importar el modelo Cabin
import { IBooking } from "@domain/Booking";
import mongoose from "mongoose";  // Importa mongoose para usar ObjectId

// Función para crear una reserva
export const createBooking = async (bookingData: IBooking) => {
  try {
    const { cabin, user, startDate, endDate, numberOfGuests, message } = bookingData;

    // Obtener la cabaña desde la base de datos para obtener el precio por noche
    const cabinDetails = await Cabin.findById(cabin);
    if (!cabinDetails) {
      throw new Error("Cabaña no encontrada.");
    }

    const pricePerNight = cabinDetails.pricePerNight; // Obtener el precio por noche de la cabaña

    // Verificar disponibilidad de la cabaña
    const isAvailable = await checkAvailability(cabin, startDate, endDate);
    if (!isAvailable) {
      throw new Error("La cabaña no está disponible en esas fechas.");
    }

    // Calcular precio total
    const totalPrice = calculatePrice(startDate, endDate, numberOfGuests, pricePerNight);

    const newBooking = new Booking({
      cabin,
      user,
      startDate,
      endDate,
      numberOfGuests,
      message,
      totalPrice,
      status: "pending",
    });

    // Guardar la nueva reserva
    const savedBooking = await newBooking.save();

    // Actualizar la cabaña con las fechas reservadas (si necesario)
    await updateCabinAvailability(cabin, startDate, endDate);

    return savedBooking;
  } catch (error) {
    throw new Error("Error al crear la reserva: " + (error as Error).message);
  }
};

// Función para verificar si la cabaña está disponible en las fechas solicitadas
const checkAvailability = async (cabinId: mongoose.Types.ObjectId, startDate: Date, endDate: Date) => {
  const existingBookings = await Booking.find({
    cabin: cabinId,
    $or: [
      { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
    ],
  });

  return existingBookings.length === 0; // Si hay alguna reserva que se solapa, no está disponible
};

// Función para calcular el precio total de la reserva
const calculatePrice = (startDate: Date, endDate: Date, numberOfGuests: number, pricePerNight: number) => {
  const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
  console.log("Valor de startDate: ", startDate);
  console.log("Valor de endDate: ", endDate);
  console.log("Valor de pricePerNight: ", pricePerNight);
  console.log("Valor de days: ", days);
  //return pricePerNight * days * numberOfGuests;
  return pricePerNight * days;
};

// Función para actualizar la cabaña con las fechas reservadas (si necesario)
const updateCabinAvailability = async (cabinId: mongoose.Types.ObjectId, startDate: Date, endDate: Date) => {
  // Aquí puedes hacer lo que sea necesario para actualizar la disponibilidad de la cabaña
  // como añadir las fechas reservadas a un campo en el modelo de la cabaña.
  const cabin = await Cabin.findById(cabinId);
  if (cabin) {
    // Ejemplo: añadir las fechas reservadas a un array de fechas reservadas en la cabaña
    cabin.bookedRanges.push({ from: startDate, to: endDate });
    await cabin.save();
  }
};

