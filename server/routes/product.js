import express from "express";
import {
  addAllProducts,
  addProduct,
  getAllProductsByCategory,
  getProductById,
} from "../controllers/product.js";
import { admin, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("", admin, addProduct);
router.post("/all", admin, addAllProducts);
router.get("", getAllProductsByCategory);
router.get("/:id", authorize, getProductById);

export default router;
