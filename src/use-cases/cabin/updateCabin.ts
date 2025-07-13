import { CabinRepository } from "../../domain/interfaces/CabinRepository";
import { CreateCabinData } from "../../types/cabin.types";
import { ICabin } from "../../domain/Cabin";

const updateCabin =
  (cabinRepository: CabinRepository) =>
  async (id: string, data: Partial<CreateCabinData>): Promise<ICabin | null> => {
    return await cabinRepository.updateCabin(id, data);
  };

export default updateCabin;
