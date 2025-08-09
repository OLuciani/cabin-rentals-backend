/* import { cabinRepository } from "../../infrastructure/repositories"; // ✅ esta es la correcta

export const deleteCabinUseCase = async (cabinId: string): Promise<void> => {
  await cabinRepository.deleteCabinById(cabinId);
}; */


// src/use-cases/cabin/deleteCabin.ts
import { CabinRepository } from "../../domain/interfaces/CabinRepository";

export const deleteCabin = async (
  cabinId: string,
  cabinRepo: CabinRepository
): Promise<void> => {
  await cabinRepo.deleteCabinById(cabinId);
};
