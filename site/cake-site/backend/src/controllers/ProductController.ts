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

    //Create entry for each image on cloudinary 
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

//select a product by ID
export const selectProduct = async (req: Request, res: Response) => {
  try{
    const{ id } = req.params;

    const product = await prisma.product.findUnique({
      where: {id: Number(id)},
      include: {images: true},
    });

    if(!product){
      res.status(400).json({message: "Product not found"})
      return;
    }
    res.status(200).json({
    message: "Product found",
    product,
    });

  }catch(error: any){
    console.error("Error trying to get the product", error);
    res.status(500).json({message: "Error on server"});
  }
};
