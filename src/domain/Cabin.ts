import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaz que representa las propiedades de una cabaña
export interface ICabin extends Document {
  name: string;                     // Nombre de la cabaña
  description: string;              // Descripción detallada
  images: string[];                 // URLs de imágenes de la cabaña
  maxGuests: number;               // Capacidad máxima de personas
  pricePerNight: number;           // Precio por noche
  isActive: boolean;               // Si está publicada o no
  createdBy: mongoose.Types.ObjectId; // Referencia al usuario que la creó (admin/owner)
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose que define cómo se guarda una cabaña en la base de datos
const cabinSchema: Schema<ICabin> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    maxGuests: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

// Modelo de Mongoose
const Cabin: Model<ICabin> = mongoose.model<ICabin>('Cabin', cabinSchema);

export default Cabin;
