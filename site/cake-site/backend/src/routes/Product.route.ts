import { createProduct } from "../controllers/ProductController";
import { Router } from "express";

const router = Router();

router.post('/', createProduct);


export default router;


