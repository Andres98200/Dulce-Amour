import type { Product, ProductListResponse, ProductResponse } from "../types/Product";
const API_URL = import.meta.env.VITE_API_URL;
// get all products
export async function fetchData(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/All-Products`);
    if (!response.ok) throw new Error("Error while fetching all the products");
    const data = (await response.json()) as ProductListResponse;
    console.log("All products successfully fetched", data.products)
    return data.products;
  }

// get a product by id

export async function getProductbyId(productId:string): Promise<Product> {
    const response = await fetch(`${API_URL}/${productId}`);
    if (!response.ok) throw new Error("Error while fetching the product you request");
    const data = (await response.json()) as ProductResponse;
    console.log("Product successfully fetched", data.product)
    return data.product;
}