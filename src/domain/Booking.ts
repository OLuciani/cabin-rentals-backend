import mongoose, { Document, Schema, Model } from "mongoose";
import crypto from "crypto";

export type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "partial";
export type PaymentMethod = "mercadopago" | "paypal" | "efectivo";

export interface IBooking extends Document {
   _id: mongoose.Types.ObjectId; 
  cabinId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  reservedNights?: number;  // La pongo opcional momentaneamente mientras desarrollo
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
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

const bookingSchema: Schema<IBooking> = new Schema(
  {
    clientName: {
      type: String,
    },
    clientEmail: {
      type: String,
    },
    clientPhone: {
      type: String,
    },
    cabinId: {
      type: String,
      ref: "Cabin",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
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
    reservedNights: {
      type: Number,
      required: true,
      min: 1,
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
      enum: ["pending", "confirmed", "rejected", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded", "partial"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["mercadopago", "paypal", "efectivo"],
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
bookingSchema.pre<IBooking>("save", async function (next) {
  if (this.confirmationCode) return next(); // Ya existe, no hace nada

  let codeGenerated = false;

  while (!codeGenerated) {
    // Generar código aleatorio
    const randomCode =
      "CONF-" + crypto.randomBytes(4).toString("hex").toUpperCase(); // Ej: CONF-A3F7C9B1

    // Verificar si ya existe en la base de datos
    const existing = await Booking.findOne({ confirmationCode: randomCode });

    if (!existing) {
      this.confirmationCode = randomCode;
      codeGenerated = true; // Código generado correctamente
    }
  }

  next(); // Continuar con la operación de guardado
});


// Middleware que se ejecuta antes de validar una reserva.
// Calcula automáticamente la cantidad de noches reservadas (reservedNights)
// en base a la diferencia entre la fecha de entrada (startDate) y salida (endDate).
// Este valor se usa para mostrar información precisa y para calcular el precio total.
bookingSchema.pre<IBooking>("validate", function (next) {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);

  const timeDiff = end.getTime() - start.getTime();
  const dayInMs = 1000 * 60 * 60 * 24;
  const nights = Math.floor(timeDiff / dayInMs);

  this.reservedNights = nights > 0 ? nights : 1; // Siempre al menos 1 noche

  next();
});


// Calcula automáticamente el totalPrice usando reservedNights y cabinSnapshot.pricePerNight
bookingSchema.pre<IBooking>("validate", function (next) {
  if (!this.totalPrice && this.reservedNights && this.cabinSnapshot?.pricePerNight) {
    this.totalPrice = this.reservedNights * this.cabinSnapshot.pricePerNight;
  }
  next();
});


// Modelo
const Booking: Model<IBooking> = mongoose.model<IBooking>(
  "Booking",
  bookingSchema
);

export default Booking;
