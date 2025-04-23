import Cabin from "@domain/Cabin";

const getAllCabins = async () => {
  try {
    const cabins = await Cabin.find({ isActive: true });
    return cabins;
  } catch (error) {
    throw new Error("Error al obtener las cabañas");
  }
};

export default getAllCabins;
