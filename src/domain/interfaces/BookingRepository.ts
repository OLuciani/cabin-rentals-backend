import { IBooking } from "../Booking";
import mongoose from "mongoose";

export interface BookingRepository {
  create(data: Partial<IBooking>): Promise<IBooking>;
  isCabinAvailable(
    cabinId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean>;

  //findAll(): Promise<IBooking[]>;
  findAll(): Promise<(IBooking & { _id: mongoose.Types.ObjectId })[]>;

  findById(id: string): Promise<IBooking | null>;

  updateById(id: string, data: Partial<IBooking>): Promise<IBooking | null>;

  deleteById(id: string): Promise<void>;

}
