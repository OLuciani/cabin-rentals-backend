import { Request, Response } from "express";
import getAllCabins from "../use-cases/cabin/getAllCabins";
import getOneCabin from "../use-cases/cabin/getOneCabin";
import { RequestHandler } from "express";
import createCabin from "../use-cases/cabin/createCabin";
import { MongooseCabinRepository } from "../infrastructure/repositories/MongooseCabinRepository";
import updateCabin from "../use-cases/cabin/updateCabin";

export const getCabinsController = async (req: Request, res: Response) => {
  const { start, end, guests, rooms } = req.query;
  try {
    const cabins = await getAllCabins({
      startDate: start as string | undefined,
      endDate: end as string | undefined,
      guests: guests as string | undefined,
      rooms: rooms as string | undefined,
    });
    res.status(200).json(cabins);
  } catch (error: any) {
    console.error("❌ Error en getCabinsController:", error.message);
    res.status(500).json({ message: error.message });
  }
};


type CabinParams = {
  _id: string;
}

export const cabinDetailController: RequestHandler<{ _id: string }> = async (req, res) => {
  //console.log("➡️ Entrando a cabinDetailController");

  const { _id } = req.params;

  try {
    const cabin = await getOneCabin(_id);

    if (!cabin) {
      res.status(404).json({ message: "Cabaña no encontrada" });
      return;
    }

    res.status(200).json(cabin);
  } catch (error: any) {
    console.error("❌ Error en cabinDetailController:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const cabinRepo = new MongooseCabinRepository();

export const createCabinController = async (req: Request, res: Response) => {
  try {
    const cabinData = req.body;
    const useCase = createCabin(cabinRepo);
    const newCabin = await useCase(cabinData);

    res.status(201).json(newCabin);
  } catch (error: any) {
    console.error("❌ Error en createCabinController:", error.message);
    res.status(500).json({ message: "Error al crear la cabaña" });
  }
};



export const updateCabinController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cabinData = req.body;

    console.log("🧾 Datos recibidos para editar:", cabinData);
    
    console.log("🖼 Archivos recibidos:", req.files);

    const useCase = updateCabin(cabinRepo);
    const updatedCabin = await useCase(id, cabinData);

    if (!updatedCabin) {
      res.status(404).json({ message: "Cabaña no encontrada" });
      return;
    }

    res.status(200).json(updatedCabin);
  } catch (error: any) {
    console.error("❌ Error en updateCabinController:", error.message);
    res.status(500).json({ message: "Error al actualizar la cabaña" });
  }
};