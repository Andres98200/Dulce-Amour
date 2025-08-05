export interface Product  {
    id: number,
    title: string,
    price: number,
    description: string,
    images: Image[],
    imagePublicId?: string | null; 
}

export interface Image {
    id: number,
    url: string,
    productId: number;
}

export interface ProductListResponse {
    message: string,
    products: Product[];
}

export interface ProductResponse {
    message: string,
    product: Product;
}