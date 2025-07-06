import { createProduct } from "../controllers/ProductController";
import { Router } from "express";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig";

const upload = multer({ storage });

const router = Router();

router.post('/', upload.array('images', 5), createProduct);


export default router;


