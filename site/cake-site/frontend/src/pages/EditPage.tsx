import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { fetchData, deleteProduct, addProduct, EditProduct } from "../services/api";
import type { Product, ProductInput, ProductListResponse } from "../types/Product";
import EditPageSkeleton from "../components/layouts/skeletons/EditPageSkeleton";
import PaginationSkeleton from "../components/layouts/skeletons/PaginationSkeleton";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      const data: ProductListResponse = await fetchData("es", currentPage, productsPerPage);
      setProducts(data.products);
      setTotalPages(data.totalPages);

      // Petite pause pour l'animation du skeleton
      setTimeout(() => {
        setLoading(false);
      }, 800);
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
        toast.info(t("Product updated"))
      } else {
        await addProduct(formData, files ?? undefined);
        toast.success(t("New product created"))
      }
      setFormData({ title: "", description: "", price: "", images: [] });
      setFiles(null);
      setEditingProduct(null);
      setShowForm(false);
      await loadProducts();
    } catch (error) {
      toast.error(t("Error, verify the form fields"))
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
      toast.warn(t("Product deleted"));
    } catch (error) {
      toast.error(t("Product not deleted"));
      console.error("Error while deleting the product", error);
    }
  };

  return (
    <div className="p-4 pt-20 max-w-6xl w-full mx-auto flex flex-col min-h-screen overflow-x-hidden">
      {showForm ? (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-lg sm:max-w-2xl mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-6 flex justify-center">
            {EditingProduct ? t("Edit Product") : t("Add Product")}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder={t("Title")}
              value={formData.title}
              onChange={handleInputChange}
              className="bg-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 text-black-500 w-full"
              required
            />
            <textarea
              name="description"
              placeholder={t("Description")}
              value={formData.description}
              onChange={handleInputChange}
              className="bg-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 text-black-500 resize-none w-full"
              required
            />
            <input
              type="number"
              name="price"
              placeholder={t("Price")}
              value={formData.price}
              onChange={handleInputChange}
              className="bg-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 text-black-500 appearance-none w-full
              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg px-4 py-3 cursor-pointer w-full"
            />
            <div className="flex gap-4 mt-4 justify-center flex-wrap">
              <button
                type="submit"
                className="bg-roseCustom text-white px-6 py-2 rounded-lg hover:bg-darkRoseCustom transition-colors duration-200 w-full sm:w-auto"
              >
                {EditingProduct ? t("Update") : t("Add")}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto"
              >
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 mt-8">
            <h2 className="text-xl font-semibold">{t("Products List")}</h2>
            <button
              onClick={handleAdd}
              className="bg-blueCustom text-white px-4 py-2 rounded-lg hover:bg-darkBlueCustom transition-colors duration-200 w-full sm:w-auto"
            >
              {t("Add Product")}
            </button>
          </div>

          {loading ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: productsPerPage }).map((_, idx) => (
                <EditPageSkeleton key={idx} />
              ))}
            </ul>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Products.map(p => (
                <li
                  key={p.id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold mb-1 flex justify-center">{p.title}</h4>
                    <p className="text-gray-600 flex justify-center text-lg font-bold">{p.price}€</p>
                  </div>
                  <div className="flex mt-auto gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 bg-sky-500 text-white rounded-lg hover:bg-sky-800 transition-colors duration-200"
                    >
                      {t("Edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors duration-200"
                    >
                      {t("Delete")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {loading ? (
            <PaginationSkeleton />
          ) : (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                {t("Previous")}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded ${
                    page === currentPage ? "bg-roseCustom text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                {t("Next")}
              </button>
            </div>
          )}
        </>
      )}
      <ToastContainer position="top-center" autoClose={3000}/>
    </div>
  );
}
