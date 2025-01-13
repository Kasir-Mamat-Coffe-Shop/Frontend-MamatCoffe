import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
const LeftBar = () => {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const openModalLogout = () => setIsModalLogoutOpen(true);
  const closeModalLogout = () => setIsModalLogoutOpen(false);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Tidak ada token dalam sesi");
        return;
      }

      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        console.log(`token: ${token}`);
        console.log("Logout berhasil");
        sessionStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Logout gagal:", await response.json());
        console.log(token);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    }
  };
  return (
    <div>
      <div className="top-0 left-0 h-screen w-[17vh] justify-center">
        <div className="h-full px-3 py-4 flex flex-col items-center justify-between bg-white dark:bg-gray-800 text-left">
          <ul className="flex flex-col gap-14 py-10 font-semibold text-sm text-center">
            <li>
              <Link
                className="flex flex-col items-center text-gray-600"
                to="/admin/profile"
              >
                <span className="fas fa-user-circle text-xl"></span>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col items-center text-gray-600"
                to="/admin/transaction"
              >
                <span className="text-xl fas fa-money-bill"></span>
                <span>Transaction</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col items-center text-gray-600"
                to="/admin/manage-product"
              >
                <div className="flex gap-2">
                  <span className="text-xl fas fa-pizza-slice"></span>
                  <span className="text-xl fas fa-coffee"></span>
                </div>
                <span>
                  Manage <br /> Food & Drink
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col items-center text-gray-600"
                to="/admin/history-transaction"
              >
                <span className="fas fa-history text-xl"></span>
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col items-center text-gray-600"
                to="/admin/account"
              >
                <span className="fas fa-user-cog text-xl"></span>
                <span>Account</span>
              </Link>
            </li>
          </ul>
          <div className="flex flex-col items-center my-7">
            <button
              onClick={openModalLogout}
              className="flex font-semibold bg-transparent outline-none border-0 text-gray-900 gap-2 focus:outline-none active:outline-none"
            >
              <span className="fas fa-sign-out-alt text-xl"></span>
              <span className="font-semibold">Log Out</span>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalLogoutOpen} onClose={closeModalLogout}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-16 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to log out?
            </h3>
            <button
              type="button"
              onClick={logOut}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={closeModalLogout}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeftBar;
