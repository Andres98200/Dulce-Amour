import { log } from "console";
import { login } from "../controllers/adminController";
import { Router } from "express";

const router = Router();

//login route
router.post('/login',login );

export default router;

