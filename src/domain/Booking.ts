/* import mongoose, { Document, Schema, Model } from 'mongoose';
import crypto from 'crypto';

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

// Hook que se ejecuta antes de guardar una reserva (booking).
// Genera un código de confirmación único (confirmationCode) con el formato CONF-XXXXXXXX,
// que puede ser usado como identificador legible para el usuario o en enlaces de verificación.
// Se asegura de que no exista otro igual en la base de datos.
bookingSchema.pre<IBooking>('save', async function (next) {
  if (this.confirmationCode) return next(); // Ya existe

  let codeGenerated = false;

  while (!codeGenerated) {
    // Generar código aleatorio
    const randomCode = 'CONF-' + crypto.randomBytes(4).toString('hex').toUpperCase(); // Ej: CONF-A3F7C9B1

    // Verificar si ya existe en la base de datos
    const existing = await Booking.findOne({ confirmationCode: randomCode });

    if (!existing) {
      this.confirmationCode = randomCode;
      codeGenerated = true;
    }
  }

  next();
});



export default Booking; */



import mongoose, { Document, Schema, Model } from 'mongoose';
import crypto from 'crypto';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial';
export type PaymentMethod = 'mercadopago' | 'paypal' | 'efectivo';

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

// Hook que se ejecuta antes de guardar una reserva (booking).
// Genera un código de confirmación único (confirmationCode) con el formato CONF-XXXXXXXX
// y se asegura de que no exista otro igual en la base de datos.
bookingSchema.pre<IBooking>('save', async function (next) {
  if (this.confirmationCode) return next(); // Ya existe, no hace nada

  let codeGenerated = false;

  while (!codeGenerated) {
    // Generar código aleatorio
    const randomCode = 'CONF-' + crypto.randomBytes(4).toString('hex').toUpperCase(); // Ej: CONF-A3F7C9B1

    // Verificar si ya existe en la base de datos
    const existing = await Booking.findOne({ confirmationCode: randomCode });

    if (!existing) {
      this.confirmationCode = randomCode;
      codeGenerated = true; // Código generado correctamente
    }
  }

  next(); // Continuar con la operación de guardado
});

// Modelo
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
