import {Request, Response } from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// create product 
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, price } = req.body;

    if (!title || !description || !imageUrl || !price) {
      res.status(400).json({ error: "All fields are required to add a new product" });
      return;
    }

    const product = await prisma.product.create({
      data: { title, description, imageUrl, price },
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error: any) {
      res.status(500).json({
      message: "Error adding the product",
      error: error.message,
    });
  }
};