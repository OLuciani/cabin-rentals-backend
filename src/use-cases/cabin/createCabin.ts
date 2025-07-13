import { CabinRepository } from "../../domain/interfaces/CabinRepository";
import { CreateCabinData } from "../../types/cabin.types";
import { ICabin } from "../../domain/Cabin";

const createCabin =
  (cabinRepository: CabinRepository) =>
  async (data: CreateCabinData): Promise<ICabin> => {
    return await cabinRepository.createCabin(data);
  };

export default createCabin;

