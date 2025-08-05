import type { Product } from "../types/Product";

// get all products
export async function fetchData(): Promise<Product[]> {
    const response = await fetch("http://localhost:4000/api/products/All-Products");
    if (!response.ok) throw new Error("Erreur réseau");
    const data = (await response.json()) as { message: string; products: Product[] };
    return data.products;
  }
  