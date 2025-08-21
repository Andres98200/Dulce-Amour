import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { fetchData, deleteProduct, addProduct, EditProduct } from "../services/api";
import type { Product, ProductInput, ProductListResponse } from "../types/Product";

export default function EditPage() {
  const { t } = useTranslation();

  // États globaux
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [Products, setProducts] = useState<Product[]>([]);
  const [EditingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    price: 0,
    description: "",
    images: [],
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const productsPerPage = 8;

  // Chargement des produits
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ProductListResponse = await fetchData(currentPage, productsPerPage);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  // Pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // Formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (EditingProduct) {
        await EditProduct(EditingProduct.id.toString(), formData, files ?? undefined);
      } else {
        await addProduct(formData, files ?? undefined);
      }
      setFormData({ title: "", description: "", price: 0, images: [] });
      setFiles(null);
      setEditingProduct(null);
      await loadProducts();
    } catch (error) {
      console.error("Error submitting product", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      images: [],
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id.toString());
      await loadProducts();
    } catch (error) {
      console.error("Error while deleting the product", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{EditingProduct ? t("Edit Product") : t("Add Product")}</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{EditingProduct ? t("Update") : t("Add")}</button>
      </form>

      {/* Liste des produits */}
      <h2 className="text-xl font-bold mb-2">{t("Products List")}</h2>
      {loading ? (
        <p>{t("Loading...")}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {Products.map(p => (
            <li key={p.id} className="mb-2 border p-2 rounded flex justify-between items-center">
              <div>
                <b>{p.title}</b> - {p.price}€
              </div>
              <div className="relative">
                <button onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}>⚙️</button>
                {openMenuId === p.id && (
                  <div className="absolute right-0 mt-2 bg-white border shadow p-2 rounded flex flex-col gap-1">
                    <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                    <label className="cursor-pointer">
                      📤 Add Images
                      <input type="file" multiple onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50">{t("Previous")}</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded ${page === currentPage ? "bg-roseCustom text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>{page}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-30">{t("Next")}</button>
      </div>
    </div>
  );
}
