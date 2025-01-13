import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
const Manage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", createProductName);
    formData.append("category_id", createCategory);
    formData.append("price", createPrice);
    formData.append("stock", createStock);
    formData.append("image", createImage);
    try {
      const createProduct = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      if (createProduct.ok) {
        setError("");
      } else {
        const responseData = await createProduct.json();
        setError(responseData.message || "createProduct gagal. Coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <div className="flex w-full">
        <LeftBar></LeftBar>
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between my-4">
            <h2 className="text-2xl font-bold">Manage Product</h2>
            <SearchBar></SearchBar>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-col overflow-y-auto gap-1 my-7 py-10 px-10 bg-white border border-gray-200 rounded-sm shadow-sm h-[83%] max-h-[600px]">
            <button
              onClick={openModalCreate}
              type="button"
              className="text-xs text-center text-white mb-2 bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span classNameName="fas fa-plus"></span> Tambah
            </button>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple Watch
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Watches</td>
                  <td className="px-6 py-4">$199</td>
                  <td className="px-6 py-4 flex gap-2">
                    <a
                      onClick={openModalEdit}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      onClick={openModalDelete}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalCreateOpen} onClose={closeModalCreate}>
          <div class="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Create Product
            </h3>
          </div>
          <div class="p-4 md:p-5 text-left">
            <form class="space-y-2" action="#" onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div className="space-y-4">
                  <div>
                    <label
                      for="product_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      id="product_name"
                      value={createProductName}
                      onChange={(e) => setCreateProductName(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nama Produk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="kategori"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      name="kategori"
                      id="kategori"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="1">Kategori</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={createPrice}
                      onChange={(e) => setCreatePrice(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Harga"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="stock"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      value={createStock}
                      onChange={(e) => setCreateStock(e.target.value)}
                      placeholder="Stok"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-left space-y-5">
                <div>
                  <label
                    for="gambar"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isModalEditOpen} onClose={closeModalEdit}>
          <div class="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Update Product
            </h3>
          </div>
          <div class="p-4 md:p-5 text-left">
            <form class="space-y-2" action="#" onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div className="space-y-4">
                  <div>
                    <label
                      for="product_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      id="product_name"
                      value={updateProductName}
                      onChange={(e) => setUpdateProductName(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nama Produk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="kategori"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kategori
                    </label>
                    <select
                      name="kategori"
                      id="kategori"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="1">Kategori</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Harga"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="stock"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      value={updateStock}
                      onChange={(e) => setUpdateStock(e.target.value)}
                      placeholder="Stok"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-left space-y-5">
                <div>
                  <label
                    for="gambar"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="gambar"
                    id="gambar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setUpdateImage(e.target.files[0])}
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                onClick={closeModalDelete}
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Manage;
