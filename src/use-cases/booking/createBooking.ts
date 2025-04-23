import Booking from "@domain/Booking";
import { IBooking } from "@domain/Booking";

// Función para crear una reserva
export const createBooking = async (bookingData: IBooking) => {
    try {
      const { cabin, user, startDate, endDate, numberOfGuests, message } = bookingData;
      
      // Calcular precio total
      const totalPrice = calculatePrice(startDate, endDate, numberOfGuests);
  
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
  
      return await newBooking.save();
    } catch (error) {
      throw new Error("Error al crear la reserva");
    }
  };
  
  // Función para calcular el precio total de la reserva (opcional)
  const calculatePrice = (startDate: Date, endDate: Date, numberOfGuests: number) => {
    const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    const pricePerDay = 100; // Suponiendo un precio fijo por día
    return pricePerDay * days * numberOfGuests;
  };
