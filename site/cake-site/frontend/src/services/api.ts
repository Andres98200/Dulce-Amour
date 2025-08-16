import type { Product, ProductListResponse, ProductResponse } from "../types/Product";
const API_URL = import.meta.env.VITE_API_URL;
// get all products
export async function fetchData(page = 1, limit = 8): Promise<ProductListResponse> {
  const response = await fetch(`${API_URL}/All-Products?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Error while fetching products");
  const data = (await response.json()) as ProductListResponse;
  console.log(`Products for page ${page} successfully fetched`, data.products);
  return data;
}


// get a product by id

export async function getProductbyId(productId:string): Promise<Product> {
    const response = await fetch(`${API_URL}/${productId}`);
    if (!response.ok) throw new Error("Error while fetching the product you request");
    const data = (await response.json()) as ProductResponse;
    console.log("Product successfully fetched", data.product)
    return data.product;
}

// login
 export async function logIn(email: string, password: string){
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email,
      password 
  })
  });
  if (!response.ok) throw new Error("Error while logging in");
  const data = await response.json();
  console.log("User successfully logged in", data);
  return data;
}