import { ICabin } from "../domain/Cabin";

export interface CabinFilters {
    startDate?: string;
    endDate?: string;
    guests?: string;
    rooms?: string;
  }
  
// Datos necesarios para crear una cabaña
export type CreateCabinData = Omit<
  ICabin,
  "_id" | "createdAt" | "updatedAt"
>; // dejamos bookedRanges incluido

export interface IBookedRange {
  from: Date;
  to: Date;
  reservedBy?: string; // Puede ser ObjectId en string
}

// También puedes exportar el tipo del ID si quieres
export type CabinId = string;
