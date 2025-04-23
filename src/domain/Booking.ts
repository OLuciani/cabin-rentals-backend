/* import mongoose, { Document, Schema, Model } from 'mongoose';

// Posibles estados de la reserva
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

// Interfaz de la reserva
export interface IBooking extends Document {
  cabin: mongoose.Types.ObjectId;        // Cabaña reservada
  user: mongoose.Types.ObjectId;         // Usuario que hace la reserva
  startDate: Date;                       // Fecha de inicio
  endDate: Date;                         // Fecha de fin
  numberOfGuests: number;                // Cantidad de personas en la reserva
  message?: string;                      // Nota opcional del usuario
  status: BookingStatus;                 // Estado de la reserva
  totalPrice?: number;                   // Precio total calculado (opcional si se quiere almacenar)
  createdAt: Date;
  updatedAt: Date;
}

// Esquema Mongoose
const bookingSchema: Schema<IBooking> = new Schema(
  {
    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cabin',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);

// Modelo
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
 */



import mongoose, { Document, Schema, Model } from 'mongoose';

// Posibles estados de la reserva
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial';
export type PaymentMethod = 'mercadopago' | 'paypal' | 'efectivo';

// Interfaz de la reserva
export interface IBooking extends Document {
  cabin: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  message?: string;
  status: BookingStatus;
  totalPrice?: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  checkInDone: boolean;
  checkOutDone: boolean;
  confirmationCode?: string;
  adminNote?: string;
  cabinSnapshot?: {
    name: string;
    pricePerNight: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Esquema Mongoose
const bookingSchema: Schema<IBooking> = new Schema(
  {
    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cabin',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded', 'partial'],
      default: 'unpaid',
    },
    paymentMethod: {
      type: String,
      enum: ['mercadopago', 'paypal', 'efectivo'],
    },
    checkInDone: {
      type: Boolean,
      default: false,
    },
    checkOutDone: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    adminNote: {
      type: String,
      maxlength: 1000,
    },
    cabinSnapshot: {
      name: String,
      pricePerNight: Number,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);

// Modelo
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
