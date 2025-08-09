import { MongooseCabinRepository } from "../../infrastructure/repositories/MongooseCabinRepository";
import { IBookedRange, CabinId } from "../../types/cabin.types";

const cabinRepository = new MongooseCabinRepository();

export async function getBookedDatesUseCase(cabinId: CabinId): Promise<IBookedRange[]> {
  return await cabinRepository.getBookedDates(cabinId);
}

