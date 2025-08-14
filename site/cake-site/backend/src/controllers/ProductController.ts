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
export const getProduct = async (req: Request, res: Response) => {
  try{
    const{ id } = req.params;

    const product = await prisma.product.findUnique({
      where: {id: Number(id)},
      include: {images: true},
    });

    if(!product){
      res.status(404).json({message: "Product not found"})
      return;
    }
    res.status(200).json({
    message: "Product found",
    product,
    });
    console.log('Product found')

  }catch(error: any){
    console.error("Error trying to get the product", error);
    res.status(500).json({message: "Error on server"});
  }
};

//select all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Lecture des paramètres query (page et limit)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8; // 8 produits par page
    const skip = (page - 1) * limit;

    // Récupération des produits paginés
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      include: { images: true },
    });

    // Nombre total de produits
    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      message: "List of products",
      products,
      currentPage: page,
      totalPages,
    });
  } catch (error: any) {
    console.error("Error fetching products", error);
    res.status(500).json({ message: "Error on server" });
  }
};

//update product

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const files = req.files as Express.Multer.File[];

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // 1. Update product details
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: parseFloat(price),
      },
    });

    // 2. Update images if new files are provided
    if (files && files.length > 0) {
      await prisma.image.deleteMany({
        where: { productId: updatedProduct.id },
      });

      // update new images
      const imagePromises = files.map(file =>
        prisma.image.create({
          data: {
            url: (file as any).path, // Cloudinary URL
            productId: updatedProduct.id,
          },
        })
      );
      await Promise.all(imagePromises);
    }

    // 3. return product with new images
    const productWithImages = await prisma.product.findUnique({
      where: { id: updatedProduct.id },
      include: { images: true },
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: productWithImages,
    });

  } catch (error: any) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete product

export const deleteProduct = async (req:Request, res:Response) => {
    const { id } = req.params;

    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id:Number(id)}
      });
      if(!existingProduct){
        res.status(404).json({message: 'Product not found'})
        return;
      }
      //delete images of the product
      await prisma.image.deleteMany({
        where: { productId:Number(id) },
      });

      //delete the product
      await prisma.product.delete({
        where: {id:Number(id)}
      });
      res.status(200).json({ message: 'Product and images deleted successfully'})
      return;

    
    }catch(error: any){
      console.error('Error deleting product', error);
      res.status(500).json( {message: 'Server Error'});
    }
};