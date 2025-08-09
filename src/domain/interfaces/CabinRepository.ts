import { ICabin } from "../Cabin";
import { CreateCabinData, IBookedRange } from "../../types/cabin.types";

export interface CabinRepository {
  createCabin(data: CreateCabinData): Promise<ICabin>;
  getCabinById(id: string): Promise<ICabin | null>;
  getAllCabins(filters: any): Promise<ICabin[]>; // o usás el tipo CabinFilters
  updateCabin(id: string, data: Partial<CreateCabinData>): Promise<ICabin | null>;
  getBookedDates(cabinId: string): Promise<IBookedRange[]>;
  deleteCabinById(cabinId: string): Promise<void>;
}
