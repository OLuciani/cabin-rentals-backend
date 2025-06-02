import Cabin from "../../domain/Cabin";
import { CabinFilters } from "../../types/cabin.types";

const getAllCabins = async (filters: CabinFilters) => {
  try {
    const { startDate, endDate, guests, rooms } = filters;

    // Siempre se filtran cabañas activas
    const query: any = { isActive: true };

    // Filtro por capacidad mínima
    if (guests) query.maxGuests = { $gte: parseInt(guests) };  // Filtramos cabañas con capacidad suficiente de huéspedes
    if (rooms) query.rooms = { $gte: parseInt(rooms) };         // Filtramos cabañas con la cantidad de habitaciones solicitadas

    // Primero obtenemos las cabañas activas que cumplen con capacidad y habitaciones
    const cabins = await Cabin.find(query);

    // Si no hay fechas, devolvemos las que cumplen con capacidad/habitaciones
    if (!startDate || !endDate) return cabins;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Luego filtramos por disponibilidad (rango de fechas no se debe superponer con bookedRanges)
    const availableCabins = cabins.filter((cabin) => {
      const bookings = Array.isArray(cabin.bookedRanges) ? cabin.bookedRanges : [];
    
      return bookings.every((booking) => {
        const bookingStart = new Date(booking.from);
        const bookingEnd = new Date(booking.to);
    
        // Verificamos que no haya solapamiento de fechas.
        return end <= bookingStart || start >= bookingEnd;
      });
    });
    
    return availableCabins;
    
  } catch (error) {
    throw new Error("Error al obtener las cabañas");
  }
};

export default getAllCabins;