import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: {
      email: string;
    };
  }

export const isAdmin = (req:AuthenticatedRequest, res:Response, next:NextFunction) =>{
    if(!req.user ||req.user.email !== process.env.ADMIN_EMAIL){
        res.status(403).json({message: "You can't access unless you are an Admin"})
    }
    next();
};