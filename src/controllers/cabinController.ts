/* import { Request, Response } from "express";
import getAllCabins from "../use-cases/cabin/getAllCabins";
import getOneCabin from "../use-cases/cabin/getOneCabin";

interface CabinParams {
  _id: string;  // Define que el parámetro _id es una cadena
}

export const getCabinsController = async (req: Request, res: Response) => {
  try {
    const cabins = await getAllCabins();
    res.status(200).json(cabins);
  } catch (error: any) {
    console.error("❌ Error en getCabinsController:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const cabinDetailController = async (req: Request<CabinParams>, res: Response) => {
  const { _id } = req.params;

  try {
    const cabin = await getOneCabin(_id);

    if (!cabin) {
      return res.status(404).json({ message: "Cabaña no encontrada" });
    }

    res.status(200).json(cabin);
  } catch (error: any) {
    console.error("❌ Error en cabinDetailController:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}; */


import { Request, Response } from "express";
import getAllCabins from "../use-cases/cabin/getAllCabins";
import getOneCabin from "../use-cases/cabin/getOneCabin";
import { RequestHandler } from "express";

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

