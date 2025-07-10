import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/ProductController";
import { Router } from "express";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig";
import { verifyToken}  from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

const upload = multer({ storage });

const router = Router();

router.post('/', upload.array('images', 5), verifyToken, isAdmin, createProduct);
router.get('/All-Products', getAllProducts);
router.get('/:id', getProduct);
router.put('/update-Product/:id', upload.array('images'), verifyToken, isAdmin, updateProduct);
router.delete('/delete-Product/:id', verifyToken, isAdmin, deleteProduct);


export default router;


