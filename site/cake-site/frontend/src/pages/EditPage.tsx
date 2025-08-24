import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { fetchData, deleteProduct, addProduct, EditProduct } from "../services/api";
import type { Product, ProductInput, ProductListResponse } from "../types/Product";

export default function EditPage() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [Products, setProducts] = useState<Product[]>([]);
  const [EditingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    price: "",
    description: "",
    images: [],
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const productsPerPage = 8;

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

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
      setFormData({ title: "", description: "", price: "", images: [] });
      setFiles(null);
      setEditingProduct(null);
      setShowForm(false);
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
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ title: "", description: "", price: "", images: [] });
    setShowForm(true);
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
    <div className="p-6 mt-6 max-w-6xl mx-auto flex flex-col min-h-screen">
      <h2 className="text-3xl font-bold mb-6">{showForm ? (EditingProduct ? t("Edit Product") : t("Add Product")) : t("Products List")}</h2>

      {showForm ? (
        // FORMULAIRE CARD
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">{EditingProduct ? t("Edit Product") : t("Add Product")}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input type="file" multiple onChange={handleFileChange} className="border border-gray-300 rounded-lg px-4 py-3 cursor-pointer" />
            <div className="flex gap-4 mt-4">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                {EditingProduct ? t("Update") : t("Add")}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* LISTE DES PRODUITS */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{t("Products List")}</h3>
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
              {t("Add Product")}
            </button>
          </div>

          {loading ? (
            <p>{t("Loading...")}</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Products.map(p => (
                <li
                  key={p.id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold mb-1">{p.title}</h4>
                    <p className="text-gray-600">{p.price}€</p>
                  </div>
                  <div className="flex mt-auto gap-2 flex-wrap justify-center">
                    <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                      🗑️ Delete
                    </button>
                    <label className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                      📤 Add Images
                      <input type="file" multiple onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50">{t("Previous")}</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>{page}</button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50">{t("Next")}</button>
          </div>
        </>
      )}
    </div>
  );
}
