import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!title || !description || !price || !files || files.length === 0) {
      res.status(400).json({ error: 'All fields including images are required' });
      return;
    }

    //Create Product, without image
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
      },
    });
    console.log("Product created", product)

    //Create entry for each image en cloudinary 
    const imagePromises = files.map(file =>
      prisma.image.create({
        data: {
          url: (file as any).path, // Cloudinary URL
          productId: product.id,
        },
      })
    );
    await Promise.all(imagePromises);

    //Sent product with image
    const productWithImages = await prisma.product.findUnique({
      where: { 
        id: product.id,
       },
      include: { images: true },
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: productWithImages,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
};
