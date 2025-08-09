import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import Booking, { IBooking } from "../../domain/Booking";
import mongoose from "mongoose";

export class MongooseBookingRepository implements BookingRepository {
  async isCabinAvailable(cabinId: string, startDate: Date, endDate: Date) {
    const overlapping = await Booking.findOne({
      cabin: cabinId,
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
    });
    return !overlapping;
  }

  async create(data: Partial<IBooking>): Promise<IBooking> {
    const newBooking = new Booking(data);
    return await newBooking.save();
  }

  async findAll(): Promise<(IBooking & { _id: mongoose.Types.ObjectId })[]> {
    return await Booking.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IBooking | null> {
    return await Booking.findById(id);
  }

  async updateById(
    id: string,
    data: Partial<IBooking>
  ): Promise<IBooking | null> {
    return await Booking.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<void> {
    await Booking.findByIdAndDelete(id);
  }
}
