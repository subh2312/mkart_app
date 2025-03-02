import express from "express";
import {
  createAllCategories,
  createCategory,
  getCategories,
} from "../controllers/category.js";
import { admin, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("", admin, createCategory);
router.post("/all", admin, createAllCategories);
router.get("", getCategories);

export default router;
