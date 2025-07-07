import { createProduct, getAllProducts, getProduct, updateProduct } from "../controllers/ProductController";
import { Router } from "express";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig";

const upload = multer({ storage });

const router = Router();

router.post('/', upload.array('images', 5), createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.put('/:id', upload.array('images'), updateProduct);


export default router;


