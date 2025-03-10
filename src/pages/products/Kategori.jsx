import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const Kategori = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreate = () => setIsModalCreateOpen(true);
  const closeModalCreate = () => setIsModalCreateOpen(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const openModalEdit = (id) => {
    updateCategory(id);
    setIsModalEditOpen(true);
  };
  const closeModalEdit = () => setIsModalEditOpen(false);
  const [Category, setCategory] = useState("");
  const [idCategory, setIdCategory] = useState({ id: "", category_name: "" });
  const [listCategory, setListCategory] = useState([]); // Default to empty array
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if no token
    }
  }, [navigate]);

  const updateCategory = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:3000/api/categorys/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const result = await response.json();
      setIdCategory(result); // Update idCategory for the edit form
    } catch (error) {
      console.log(error);
      setError("Failed to fetch category data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const createCategory = await fetch(
        "http://localhost:3000/api/categorys",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            category_name: Category,
          }),
        }
      );

      if (createCategory.ok) {
        closeModalCreate();
        setCategory(""); // Reset form input after submission
        setError(""); // Clear any previous errors
        const response = await createCategory.json();
        setListCategory((prevState) => {
          // Only add if the category doesn't exist already
          const categoryExists = prevState.some(
            (item) => item.category_name === response.category_name
          );
          if (!categoryExists) {
            return [...prevState, response]; // Add new category to list
          }
          return prevState; // Return previous state if category already exists
        });
      } else {
        const responseData = await createCategory.json();
        setError(responseData.message || "Create category failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const updateCategory = await fetch(
        "http://localhost:3000/api/categorys/" + idCategory.id,
        {
          method: "PUT", // Use PUT for updating category
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            category_name: Category,
          }),
        }
      );

      if (updateCategory.ok) {
        closeModalEdit();
        setCategory("");
        setError("");
        const response = await updateCategory.json();
        setListCategory((prevState) => {
          return prevState.map((item) =>
            item.id === response.id ? response : item
          );
        });
      } else {
        const responseData = await updateCategory.json();
        setError(responseData.message || "Edit category failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/categorys/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        // Filter out the deleted category from listCategory
        setListCategory((prevState) =>
          prevState.filter((category) => category.id !== id)
        );
        setError(""); // Clear error message
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Failed to delete category.");
      }
    } catch (err) {
      setError("An error occurred while deleting the category.");
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
        if (result.data) {
          setListCategory(result.data); // Set the categories if the data is valid
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch categories");
      }
    };

    getCategory();
  }, [handleSubmit, handleSubmitEdit, handleDelete]); // Empty dependency array ensures it runs only once

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
            <table className="w-full text-sm text-center items-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[80%]">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-[20%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listCategory.length ? (
                  listCategory.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.category_name}
                      </th>
                      <td className="px-6 py-4 flex items-center justify-center gap-2">
                        <a
                          onClick={() => openModalEdit(item.id)}
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => handleDelete(item.id)}
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
                    <td colSpan="7" className="text-center py-4">
                      Tidak ada data yang tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalCreateOpen} onClose={closeModalCreate}>
          <div className="flex min-w-[400px] items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Category
            </h3>
          </div>
          <div className="p-4 md:p-5 text-left">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="category_name"
                id="category_name"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Category"
                required
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Category
              </button>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isModalEditOpen} onClose={closeModalEdit}>
          <div className="flex min-w-[400px] items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Category
            </h3>
          </div>
          <div className="p-4 md:p-5 text-left">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmitEdit}>
              <input
                type="text"
                name="category_name"
                id="category_name"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Category"
                required
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Category
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Kategori;
