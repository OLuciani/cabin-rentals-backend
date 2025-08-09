import { Router } from "express";
import { getCabinsController, cabinDetailController, createCabinController, updateCabinController, getBookedDates, deleteCabinController } from "../controllers/cabinController";
import { upload , processCabinImages } from "../middlewares/multerSharpCabinImages";
import authenticateToken from "../middlewares/authenticateToken";
import authorizeRole from "../middlewares/authorizeRole";
import { injectCreatedBy } from "../middlewares/injectCreatedBy";


const router = Router();


router.get("/getCabins", getCabinsController);
router.get("/cabinDetail/:_id", cabinDetailController);
router.post("/createCabin", authenticateToken, authorizeRole(["admin"]),upload, processCabinImages, injectCreatedBy, createCabinController);
router.put("/updateCabin/:id", authenticateToken, authorizeRole(["admin"]), upload, processCabinImages, updateCabinController);
router.get("/:id/bookedDates", getBookedDates);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteCabinController);

export default router;
