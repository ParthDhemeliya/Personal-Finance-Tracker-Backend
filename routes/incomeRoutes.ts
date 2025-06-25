import express from "express";
import {
  createIncome,
  getAllIncomes,
  deleteIncome,
  updateIncome,
} from "../controllers/incomeController";
import { protect } from "../middleware/authMiddleware";
import { validateIncome } from "../validators/incomeValidator";
import validateObjectId from "../utils/validateObjectId";

const router = express.Router();

router.use(protect);

router.post("/", validateIncome, createIncome);
router.get("/", getAllIncomes);
router.put("/:id", validateObjectId, validateIncome, updateIncome);
router.delete("/:id", validateObjectId, deleteIncome);

export default router;
