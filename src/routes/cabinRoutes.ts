import { Router } from "express";
import { getCabinsController, cabinDetailController } from "../controllers/cabinController";


const router = Router();

router.get("/getCabins", getCabinsController);
router.get("/cabinDetail/:_id", cabinDetailController);

export default router;
