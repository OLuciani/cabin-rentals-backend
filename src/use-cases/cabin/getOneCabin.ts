import Cabin from "../../domain/Cabin";

const getOneCabin = async (_id: string) => {
  try {
    const cabins = await Cabin.findById(_id);
    return cabins;
  } catch (error) {
    throw new Error("Error al obtener las cabañas");
  }
};

export default getOneCabin;