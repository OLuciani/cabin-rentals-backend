import { Router } from "express";
import { getCabinsController, cabinDetailController, createCabinController, updateCabinController } from "../controllers/cabinController";
import { upload , processCabinImages } from "../middlewares/multerSharpCabinImages";
import authenticateToken from "../middlewares/authenticateToken";
import { injectCreatedBy } from "../middlewares/injectCreatedBy";


const router = Router();


router.get("/getCabins", getCabinsController);
router.get("/cabinDetail/:_id", cabinDetailController);
router.post("/createCabin", authenticateToken, upload, processCabinImages, injectCreatedBy, createCabinController);
router.put("/updateCabin/:id", upload, processCabinImages, updateCabinController);

export default router;
