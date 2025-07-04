import express from "express";
import productRoutes from './routes/products.Routes';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.use('/api/products', productRoutes);

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