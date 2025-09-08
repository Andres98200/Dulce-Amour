import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TranslateText } from "../services/translateService";

const prisma = new PrismaClient();

// Helper : map query lang vers DB language
const mapLang = (lang: string): "es" | "fr" => {
  switch (lang.toLowerCase()) {
    case "fr":
      return "fr";
    default:
      return "es"; // langue par défaut
  }
};

// CREATE PRODUCT (base = espagnol)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!title || !description || !price || !files || files.length === 0) {
      res.status(400).json({ error: "All fields including images are required" });
      return;
    }

    // Traductions uniquement en français
    const [frTitle, frDesc] = await Promise.all([
      TranslateText(title, "fr"),
      TranslateText(description, "fr"),
    ]);

    const translationsData = [
      { language: "es", title, description }, // Base espagnol
      { language: "fr", title: frTitle, description: frDesc },
    ];

    const product = await prisma.product.create({
      data: {
        price: parseFloat(price),
        images: { create: files.map(f => ({ url: (f as any).path })) },
        translations: { create: translationsData },
      },
      include: { images: true, translations: true },
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error: any) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// GET PRODUCT BY ID
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const lang = typeof req.query.lang === "string" ? req.query.lang : "es";
    const targetLang = mapLang(lang);

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true, translations: true },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const translation =
      product.translations.find(t => t.language === targetLang) ||
      product.translations.find(t => t.language === "es");

    const { translations, ...rest } = product;

    res.status(200).json({
      message: "Product found",
      product: { ...rest, title: translation?.title, description: translation?.description },
    });
  } catch (error: any) {
    console.error("Error trying to get the product", error);
    res.status(500).json({ message: "Error on server" });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const skip = (page - 1) * limit;
    const targetLang = mapLang(typeof req.query.lang === "string" ? req.query.lang : "es");

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      include: { images: true, translations: true },
    });

    const productsWithTranslation = products.map(product => {
      const translation =
        product.translations.find(t => t.language === targetLang) ||
        product.translations.find(t => t.language === "es");

      const { translations, ...rest } = product;
      return { ...rest, title: translation?.title, description: translation?.description };
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      message: "List of products",
      products: productsWithTranslation,
      currentPage: page,
      totalPages,
    });
  } catch (error: any) {
    console.error("Error fetching products", error);
    res.status(500).json({ message: "Error on server" });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const files = req.files as Express.Multer.File[];

  try {
    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true, translations: true },
    });

    if (!existing) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { price: price ? parseFloat(price) : existing.price },
    });

    if (title || description) {
      const [frTitle, frDesc] = await Promise.all([
        title ? TranslateText(title, "fr") : undefined,
        description ? TranslateText(description, "fr") : undefined,
      ]);

      const translations: Record<string, { title?: string; description?: string }> = {
        es: { title, description },
        fr: { title: frTitle, description: frDesc },
      };

      for (const lang of ["es", "fr"]) {
        await prisma.productTranslation.upsert({
          where: { productId_language: { productId: updatedProduct.id, language: lang } },
          update: {
            ...(translations[lang].title && { title: translations[lang].title }),
            ...(translations[lang].description && { description: translations[lang].description }),
          },
          create: {
            productId: updatedProduct.id,
            language: lang,
            title: translations[lang].title || "",
            description: translations[lang].description || "",
          },
        });
      }
    }

    if (files && files.length > 0) {
      await prisma.image.deleteMany({ where: { productId: updatedProduct.id } });
      await prisma.image.createMany({
        data: files.map(f => ({ url: (f as any).path, productId: updatedProduct.id })),
      });
    }

    const productWithImages = await prisma.product.findUnique({
      where: { id: updatedProduct.id },
      include: { images: true, translations: true },
    });

    res.status(200).json({ message: "Product updated successfully", product: productWithImages });
  } catch (error: any) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await prisma.image.deleteMany({ where: { productId: Number(id) } });
    await prisma.productTranslation.deleteMany({ where: { productId: Number(id) } });
    await prisma.product.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: "Product and related data deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product", error);
    res.status(500).json({ message: "Server Error" });
  }
};
