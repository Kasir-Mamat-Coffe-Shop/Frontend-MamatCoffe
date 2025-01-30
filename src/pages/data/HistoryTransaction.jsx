import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

const HistoryTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Log data for debugging
      console.log("Fetched transactions data:", data);

      return data; // Return the fetched data
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      return null; // Return null if an error occurs
    }
  };
  const fetchDetail = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:3000/api/transactions/list/details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Log data for debugging
      console.log("Fetched transactions data:", data);

      return data; // Return the fetched data
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      return null; // Return null if an error occurs
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions();
      const detail = await fetchDetail();
      if (data) {
        setTransactions(data.data);
        setDetail(detail);
      }
    };

    loadTransactions();
  }, []);
  console.log(detail);
  return (
    <div>
      <div className="flex w-full">
        <LeftBar></LeftBar>
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between my-4">
            <h2 className="text-2xl font-bold">History Transaction</h2>
            <SearchBar></SearchBar>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-col overflow-y-auto gap-1 my-7 py-10 px-10 bg-white border border-gray-200 rounded-sm shadow-sm h-[83%] max-h-[600px]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Email Kasir
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Methode
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Code Transaction
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions ? (
                  transactions.map((trans, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{trans.email}</td>
                      <td class="px-6 py-4">{trans.transaction_method}</td>
                      <td class="px-6 py-4">{trans.transaction_code}</td>
                      <td class="px-6 py-4">{trans.date}</td>
                      <td class="px-6 py-4">{trans.status}</td>
                      <td class="px-6 py-4">
                        {detail
                          .filter((item) => item.transaction_id === trans.id) // Cocokkan berdasarkan transaction_id
                          .map((item, index) => item.product.product_name) // Ambil nama produk
                          .join(", ")}{" "}
                        {/* Gabungkan hasil jika lebih dari satu */}
                      </td>
                      <td class="px-6 py-4">
                        {detail
                          .filter((item) => item.transaction_id === trans.id) // Cocokkan berdasarkan transaction_id
                          .map((item, index) => item.quantity)
                          .reduce((acc, val) => acc + val, 0)}{" "}
                        {/* Hitung total quantity */}
                      </td>
                      <td class="px-6 py-4">
                        {detail
                          .filter((item) => item.transaction_id === trans.id)
                          .reduce((acc, item) => acc + item.sub_total, 0)}{" "}
                        {/* Hitung total sub_total */}
                      </td>

                      <td class="px-6 py-4">{trans.total}</td>
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
      </div>
    </div>
  );
};

export default HistoryTransaction;
