import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const verifyToken = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({ message: "Token missing or malformed"})
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN as string);
        req.user = decoded;

        next();
    }catch(error: any){
        res.status(401).json({message: "Invalid or expirated token"});
    }
};