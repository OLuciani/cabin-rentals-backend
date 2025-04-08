import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaz del modelo de Review
export interface IReview extends Document {
  clientId: mongoose.Types.ObjectId;
  cabinId: mongoose.Types.ObjectId;
  rating: number; // De 1 a 5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de la reseña
const reviewSchema: Schema<IReview> = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cabinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cabin',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Exportamos el modelo
const Review: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);

export default Review;