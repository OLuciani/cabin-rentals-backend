/* import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz que representa una reserva registrada en la cabaña (rango de fechas)
interface IBookedRange {
  from: Date;                                      // Fecha de inicio de la reserva
  to: Date;                                        // Fecha de fin de la reserva
  reservedBy?: mongoose.Types.ObjectId;            // ID del usuario que la reservó (opcional)
}

// Interfaz que representa las propiedades de una cabaña
export interface ICabin extends Document {
  name: string;                                    // Nombre de la cabaña
  description: string;                             // Descripción detallada de la cabaña
  mainImage: string;                               // Imagen de portada o destacada
  images: string[];                                // Otras imágenes adicionales
  maxGuests: number;                               // Capacidad máxima de personas
  rooms: number;                                   // Cantidad de habitaciones
  pricePerNight: number;                           // Precio por noche
  isActive: boolean;                               // Si está publicada o no
  createdBy: mongoose.Types.ObjectId;              // ID del usuario que creó la cabaña
  bookedRanges: IBookedRange[];                    // Rango de fechas ya reservadas
  bathrooms: number;                               // Cantidad de baños
  amenities: string[];                             // Lista de comodidades (ej: wifi, aire, etc.)
  hasGrill: boolean;                               // Si tiene asador/parrilla
  hasGarage: boolean;                              // Si tiene cochera
  hasSwimmingPool: boolean;                        // Si tiene piscina
  location: string;                                // Ciudad o zona donde está ubicada
  // rating?: number;                              // (Opcional) Promedio de puntuación de usuarios
  // numReviews?: number;                          // (Opcional) Cantidad total de reseñas
  createdAt: Date;                                 // Fecha de creación del documento
  updatedAt: Date;                                 // Fecha de la última modificación
}

// Subesquema para las fechas ocupadas (bookedRanges)
const bookedRangeSchema: Schema<IBookedRange> = new Schema(
  {
    from: { type: Date, required: true },          // Fecha de inicio de reserva
    to: { type: Date, required: true },            // Fecha de fin de reserva
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID del usuario (opcional)
  },
  { _id: false }                                   // Evita que se genere un _id para cada rango
);

// Esquema de Mongoose para la cabaña
const cabinSchema: Schema<ICabin> = new Schema(
  {
    name: { type: String, required: true },                          // Nombre de la cabaña
    description: { type: String, required: true },                   // Descripción detallada
    mainImage: { type: String, required: true },                     // Imagen principal de portada
    images: { type: [String], default: [] },                         // Galería de imágenes
    maxGuests: { type: Number, required: true },                     // Capacidad máxima de huéspedes
    rooms: { type: Number, required: true },                         // Número de habitaciones
    pricePerNight: { type: Number, required: true },                // Precio por noche
    isActive: { type: Boolean, default: true },                      // Publicada o no
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario creador
    bookedRanges: { type: [bookedRangeSchema], default: [] },       // Fechas reservadas
    bathrooms: { type: Number, required: true },                     // Cantidad de baños
    amenities: { type: [String], default: [] },                      // Lista de comodidades
    hasGrill: { type: Boolean, default: false },                     // ¿Tiene asador?
    hasGarage: { type: Boolean, default: false },                    // ¿Tiene cochera?
    hasSwimmingPool: { type: Boolean, default: false },              // ¿Tiene piscina?
    location: { type: String, required: true },                      // Zona o ciudad donde está ubicada

    // rating: { type: Number, default: 0 },                         // (Opcional) Puntuación promedio
    // numReviews: { type: Number, default: 0 },                     // (Opcional) Total de reseñas
  },
  { timestamps: true }                                               // createdAt y updatedAt automáticos
);

// Modelo de Mongoose
const Cabin: Model<ICabin> = mongoose.model<ICabin>("Cabin", cabinSchema);

export default Cabin; */

import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz que representa una reserva registrada en la cabaña (rango de fechas)
interface IBookedRange {
  from: Date; // Fecha de inicio de la reserva
  to: Date; // Fecha de fin de la reserva
  reservedBy?: mongoose.Types.ObjectId; // ID del usuario que la reservó (opcional)
}

// Interfaz que representa las propiedades de una cabaña
export interface ICabin extends Document {
  name: string; // Nombre de la cabaña
  description: string; // Descripción detallada de la cabaña
  mainImage: string; // Imagen de portada o destacada
  images: string[];
  maxGuests: number; // Capacidad máxima de personas
  rooms: number; // Cantidad de habitaciones
  pricePerNight: number; // Precio por noche
  isActive: boolean; // Si está publicada o no
  createdBy: mongoose.Types.ObjectId; // ID del usuario que creó la cabaña
  bookedRanges: IBookedRange[]; // Rango de fechas ya reservadas
  bathrooms: number; // Cantidad de baños
  amenities: string[]; // Lista de comodidades (ej: wifi, aire, etc.)
  hasGrill: boolean; // Si tiene asador/parrilla
  hasGarage: boolean; // Si tiene cochera
  hasSwimmingPool: boolean; // Si tiene piscina
  location: string; // Ciudad o zona donde está ubicada
  // rating?: number;                              // (Opcional) Promedio de puntuación de usuarios
  // numReviews?: number;                          // (Opcional) Cantidad total de reseñas
  createdAt: Date; // Fecha de creación del documento
  updatedAt: Date; // Fecha de la última modificación
}

// Subesquema para las fechas ocupadas (bookedRanges)
const bookedRangeSchema: Schema<IBookedRange> = new Schema(
  {
    from: { type: Date, required: true }, // Fecha de inicio de reserva
    to: { type: Date, required: true }, // Fecha de fin de reserva
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID del usuario (opcional)
  },
  { _id: false } // Evita que se genere un _id para cada rango
);

// Esquema de Mongoose para la cabaña
const cabinSchema: Schema<ICabin> = new Schema(
  {
    name: { type: String, required: true }, // Nombre de la cabaña
    description: { type: String, required: true }, // Descripción detallada
    mainImage: { type: String, required: true }, // Imagen principal de portada
    images: {
      type: [String],
      default: [],
    },
    maxGuests: { type: Number, required: true }, // Capacidad máxima de huéspedes
    rooms: { type: Number, required: true }, // Número de habitaciones
    pricePerNight: { type: Number, required: true }, // Precio por noche
    isActive: { type: Boolean, default: true }, // Publicada o no
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Usuario creador
    bookedRanges: { type: [bookedRangeSchema], default: [] }, // Fechas reservadas
    bathrooms: { type: Number, required: true }, // Cantidad de baños
    amenities: { type: [String], default: [] }, // Lista de comodidades
    hasGrill: { type: Boolean, default: false }, // ¿Tiene asador?
    hasGarage: { type: Boolean, default: false }, // ¿Tiene cochera?
    hasSwimmingPool: { type: Boolean, default: false }, // ¿Tiene piscina?
    location: { type: String, required: true }, // Zona o ciudad donde está ubicada

    // rating: { type: Number, default: 0 },                         // (Opcional) Puntuación promedio
    // numReviews: { type: Number, default: 0 },                     // (Opcional) Total de reseñas
  },
  { timestamps: true } // createdAt y updatedAt automáticos
);

// Modelo de Mongoose
const Cabin: Model<ICabin> = mongoose.model<ICabin>("Cabin", cabinSchema);

export default Cabin;
