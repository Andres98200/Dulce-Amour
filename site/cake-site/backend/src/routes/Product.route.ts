import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/ProductController";
import { Router } from "express";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig";

const upload = multer({ storage });

const router = Router();

router.post('/', upload.array('images', 5), createProduct);
router.get('/All-Products', getAllProducts);
router.get('/:id', getProduct);
router.put('/update-Product/:id', upload.array('images'), updateProduct);
router.delete('/delete-Product/:id', deleteProduct);


export default router;


