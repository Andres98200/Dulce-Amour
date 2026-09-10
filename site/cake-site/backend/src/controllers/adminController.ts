import jwt  from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { error } from "console";

// login admin 
export const login = async(req:Request, res:Response) => {
    const {email, password} = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try{
        if(!email || !password){
            res.status(400).json({ message: "email and password are required"})
            return;
        }

        if(email !== adminEmail){
            res.status(401).json({message: "wrong Email, please use your admin email"})
            return;
        }
        
        //verification mail is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            res.status(400).json({ message: "Email type is not valid"})
            return;
        }

        const match = await bcrypt.compare(password, adminPassword as string);
        if(!match){
            console.log(password, adminPassword);
            res.status(401).json({ message: "wrong password, please use your admin password"})
            return;
        }

        const token = jwt.sign({ email }, process.env.JWT_TOKEN as string,{
            expiresIn:'1h',
        });
        console.log("token generated")

        res.status(200).json({ message: `Successfully Connected`, token});

    }catch(error:any){
        console.log('error login', error);
        res.status(500).json({ message: 'Server Error'});
    }
};