import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const Manage = () => {
  const navigate = useNavigate();

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreate = () => setIsModalCreateOpen(true);
  const closeModalCreate = () => setIsModalCreateOpen(false);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const [createProductName, setCreateProductName] = useState("");
  const [createCategory, setCreateCategory] = useState("");
  const [createPrice, setCreatePrice] = useState("");
  const [createStock, setCreateStock] = useState("");
  const [createImage, setCreateImage] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateStock, setUpdateStock] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  const [error, setError] = useState("");
  const [listCategory, setListCategory] = useState(null);
  const [idProduct, setIdProduct] = useState("");
  const [listProduct, setListProduct] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const createProduct = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          product_name: createProductName,
          price: parseFloat(createPrice),
          stock: parseInt(createStock, 10),
          image: "https://example.com/matcha.jpg",
          category_id: parseInt(createCategory, 10),
        }),
      });

      if (createProduct.ok) {
        setError("");
        closeModalCreate();
      } else {
        const responseData = await createProduct.json();
        setError(responseData.message || "Create Product failed. Try again.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const updateProduct = await fetch(
        `http://localhost:3000/api/products/${idProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            product_name: updateProductName,
            price: parseFloat(updatePrice),
            stock: parseInt(updateStock, 10),
            image: "https://example.com/matcha.jpg",
            category_id: parseInt(updateCategory, 10),
          }),
        }
      );
      if (updateProduct.ok) {
        setError("");
        closeModalEdit();
      } else {
        const responseData = await updateProduct.json();
        setError(responseData.message || "Update Product failed. Try again.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleDelete = async (productId) => {
    const token = sessionStorage.getItem("token");
    try {
      const deleteProduct = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (deleteProduct.ok) {
        setError("");
        closeModalDelete();
      } else {
        const responseData = await deleteProduct.json();
        setError(responseData.message || "Delete Product failed. Try again.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getCategory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorys/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const result = await response.json();
        setListCategory(result);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, [handleSubmitUpdate, handleDelete, handleSubmitCreate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const result = await response.json();
        setListProduct(result);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
    console.log("Sini:", listProduct);
  }, [handleSubmitUpdate, handleDelete, handleSubmitCreate]);
  return (
    <div>
      <div className="flex w-full">
        <LeftBar />
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between my-4">
            <h2 className="text-2xl font-bold">Manage Product</h2>
            <SearchBar />
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
          <div className="flex flex-col overflow-y-auto gap-1 my-7 py-10 px-10 bg-white border border-gray-200 rounded-sm shadow-sm h-[83%] max-h-[600px]">
            <button
              onClick={openModalCreate}
              type="button"
              className="text-xs text-center text-white mb-2 bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span className="fas fa-plus"></span> Tambah
            </button>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listProduct ? (
                  listProduct.data.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.image}
                      </th>
                      <td className="px-6 py-4">{item.product_name}</td>
                      <td className="px-6 py-4">{item.category_id}</td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">{item.stock}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <a
                          onClick={() => {
                            openModalEdit();
                            setIdProduct(item.id);
                          }}
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            openModalDelete();
                            setIdProduct(item.id);
                          }}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Tidak ada data yang tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Create */}
        <Modal isOpen={isModalCreateOpen} onClose={closeModalCreate}>
          <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Product
            </h3>
          </div>
          <div className="p-4 md:p-5 text-left">
            <form className="space-y-2" onSubmit={handleSubmitCreate}>
              <div className="flex gap-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="product_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      id="product_name"
                      value={createProductName}
                      onChange={(e) => setCreateProductName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nama Produk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={createCategory}
                      onChange={(e) => setCreateCategory(e.target.value)}
                    >
                      <option value="">Pilih Category</option>
                      {listCategory ? (
                        listCategory.data.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.category_name}
                          </option>
                        ))
                      ) : (
                        <option value="">No Categories Available</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={createPrice}
                      onChange={(e) => setCreatePrice(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Harga"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      value={createStock}
                      onChange={(e) => setCreateStock(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Jumlah Stok"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="gambar"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setCreateImage(e.target.files[0])}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </form>
          </div>
        </Modal>

        {/* Modal Edit */}
        <Modal isOpen={isModalEditOpen} onClose={closeModalEdit}>
          <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update Product
            </h3>
          </div>
          <div className="p-4 md:p-5 text-left">
            <form className="space-y-2" onSubmit={handleSubmitUpdate}>
              <div className="flex gap-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="product_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      id="product_name"
                      value={updateProductName}
                      onChange={(e) => setUpdateProductName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nama Produk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={updateCategory}
                      onChange={(e) => setUpdateCategory(e.target.value)}
                    >
                      {listCategory ? (
                        listCategory.data.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.category_name}
                          </option>
                        ))
                      ) : (
                        <option value="">No Categories Available</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Harga"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      value={updateStock}
                      onChange={(e) => setUpdateStock(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Jumlah Stok"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="gambar"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setUpdateImage(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
          <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Product
            </h3>
          </div>
          <div className="p-4 md:p-5 text-left">
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModalDelete}
                className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(idProduct)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Manage;
