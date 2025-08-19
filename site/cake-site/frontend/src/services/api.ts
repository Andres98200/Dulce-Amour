import type { Product, ProductListResponse, ProductResponse } from "../types/Product";
const API_URL = import.meta.env.VITE_API_URL;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
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
  const response = await fetch(`${AUTH_API_URL}/auth/login`, {
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

// edit Product
export async function EditProduct(productId: string, productData: Product, files?: FileList) {
  const formData = new FormData();
  formData.append("title", productData.title);
  formData.append("price", productData.price.toString());
  formData.append("description", productData.description);
  

  if(files) {
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });
  }
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/update-Product/${productId}`,{
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Error while updating the product");
  const data = await response.json();
  console.log("Product successfuly updated", data);
  return data;
}

//add product
export async function addProduct(productData: Product & { images?: File[]}){
  const formData = new FormData();
  formData.append("title", productData.title);
  formData.append("description", productData.description);
  formData.append("price", productData.price.toString());

  if(productData.images && productData.images.length > 0 ) {
    productData.images.forEach((img: File ) => {
      formData.append("images",img);
    });
  }
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}`,{
    method:"POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if(!response.ok) throw new Error("Error while creating a product");
  const data = await response.json();
  console.log("Product created and add successfuly", data);
  return data;
  }

  //delete Product

  export async function deleteProduct(productId: string){
    try{
      const token = sessionStorage.getItem("token");
      if(!token){
        throw new Error("Not token found, please log in");
      }
      const response = await fetch(`${API_URL}/delete-Product/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the product")
      }
      const data = await response.json();
      console.log("Product deleted successfuly", data);
      return data;
    } catch(error:any){
      console.error("Error while deleting the product", error.message || error);
    }
  }