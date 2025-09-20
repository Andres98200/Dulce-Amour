import express from "express";
import productRoutes from './routes/Product.route';
import authRoutes from './routes/auth.route';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import {Request, Response } from "express";
import { Router } from "express";
import cors from 'cors';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'https://dulceamour-git-dev-andres98200s-projects.vercel.app/'
}));

//Routes
app.get('/', (req:Request, res:Response) => {
  res.send("Backend is running and listening !")
})
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

//check DB connection
async function main() {
    try{
        await prisma.$connect();
        console.log("Connected to the DataBase");

        } catch (error) {
          console.error('Failed to connect to the database:', error);
          process.exit(1);
        }
      }
main();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});