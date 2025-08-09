import Cabin, { ICabin } from "../../domain/Cabin";
import { CabinRepository } from "../../domain/interfaces/CabinRepository";
import { CreateCabinData, IBookedRange } from "../../types/cabin.types";

export class MongooseCabinRepository implements CabinRepository {
  async createCabin(data: CreateCabinData): Promise<ICabin> {
    const newCabin = new Cabin({ ...data, bookedRanges: [] });
    return await newCabin.save();
  }

  async updateCabin(
    id: string,
    data: Partial<CreateCabinData>
  ): Promise<ICabin | null> {
    return await Cabin.findByIdAndUpdate(id, data, { new: true });
  }

  async getCabinById(id: string): Promise<ICabin | null> {
    return await Cabin.findById(id);
  }

  async getAllCabins(filters: any): Promise<ICabin[]> {
    // lógica de filtros si querés
    return await Cabin.find({});
  }

  async getBookedDates(cabinId: string): Promise<IBookedRange[]> {
    const cabin = await Cabin.findById(cabinId).select("bookedRanges");

    if (!cabin) return [];

    const plainCabin = cabin.toObject(); // ✅ Convierte todo el documento a objeto plano

    return plainCabin.bookedRanges.map((range) => ({
      ...range,
      reservedBy: range.reservedBy?.toString(),
    }));
  }

  async deleteCabinById(cabinId: string) {
    await Cabin.findByIdAndDelete(cabinId);
  }
}
