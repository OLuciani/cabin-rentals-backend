import mongoose, { Document, Schema, Model } from 'mongoose';

// Posibles estados de la reserva
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

// Interfaz que representa una reserva
export interface IBooking extends Document {
  cabin: mongoose.Types.ObjectId;     // Cabaña reservada
  user: mongoose.Types.ObjectId;      // Usuario que hace la reserva
  startDate: Date;                    // Fecha de inicio
  endDate: Date;                      // Fecha de fin
  status: BookingStatus;              // Estado de la reserva
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose
const bookingSchema: Schema<IBooking> = new Schema(
  {
    cabin: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabin', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

// Modelo
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
