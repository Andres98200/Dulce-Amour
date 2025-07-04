import { Router } from "express";
import { createProduct } from "../controllers/ProductController";

const router = Router();

router.post('/', createProduct);
// router.get('/', getProducts);

export default router;

