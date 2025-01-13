import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import RightBar from "../../components/RightBar";
import SearchBar from "../../components/SearchBar";
import CardKategori from "../../components/CardKategori";
import CardProduct from "../../components/CardProduct";
import coffe from "../../assets/images/coffe.png";
import Pagination from "../../components/Pagination";
import Counter from "../../components/Counter";
const Transaction = () => {
  const [counters, setCounters] = useState([]);
  const [customerName, setCustomerName] = useState(""); // Nama pelanggan

  // Data produk yang akan ditampilkan di setiap card
  const products = [
    { id: 1, name: "Kursi", price: 100 },
    { id: 2, name: "Meja", price: 200 },
    { id: 3, name: "Papan Tulis", price: 50 },
    { id: 4, name: "Papan Tulis", price: 50 },
  ];

  // Simulasi pengambilan data produk
  useEffect(() => {
    setCounters(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        count: 0,
        price: product.price,
      }))
    );
  }, []);

  // Callback untuk mengupdate nilai count di state
  const handleCountChange = (id, newCount) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: newCount } : counter
      )
    );
  };

  // Fungsi untuk menyimpan pesanan ke database
  const saveOrderToDatabase = async () => {
    const orderItems = counters
      .filter((counter) => counter.count > 0) // Hanya produk yang dipesan
      .map((counter) => ({
        product_name: counter.name,
        quantity: counter.count,
        price: counter.price,
      }));

    try {
      const response = await fetch("https://your-api-endpoint.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          items: orderItems,
        }),
      });

      const result = await response.json();
      console.log("Pesanan berhasil disimpan:", result);
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan pesanan:", error);
    }
  };

  return (
    <div>
      <div className="flex w-full">
        <LeftBar></LeftBar>
        <div className="flex-grow my-8 mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Pilih Menu</h2>
            <SearchBar></SearchBar>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex gap-1 py-4 justify-between">
            <CardKategori>
              <span className="fas fa-th-list text-3xl"></span>
              <span>All</span>
            </CardKategori>
            <CardKategori>
              <span className="text-3xl" aria-label="coffee">
                &#9749;
              </span>
              <span>Coffee</span>
            </CardKategori>
            <CardKategori>
              <span className="text-3xl" aria-label="non-coffee">
                &#x1F378;
              </span>
              <span>Non-Coffee</span>
            </CardKategori>
            <CardKategori>
              <span className="text-3xl" aria-label="heavy meal">
                &#x1F37D;
              </span>
              <span>Heavy Meal</span>
            </CardKategori>
            <CardKategori>
              <span className="text-3xl" aria-label="desert">
                &#x1F368;
              </span>
              <span>Desert</span>
            </CardKategori>
            <CardKategori>
              <span className="text-3xl" aria-label="snack">
                &#x1F37F;
              </span>
              <span>Snack</span>
            </CardKategori>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-wrap overflow-y-auto gap-1 py-3 px-2 justify-between bg-gray-200 h-[75%] max-h-[480px]">
            {counters.map((counter) => (
              <CardProduct>
                <div className="flex gap-4 text-left">
                  <img
                    src={coffe}
                    alt="kopi"
                    className="h-[57px] w-[57px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="text-md">Kopi Latte</div>
                    <div className="font-normal italic text-sm">Rp.50.000</div>
                  </div>
                </div>
                <hr className="h-px w-full my-2 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <Counter
                    id={counter.id}
                    count={counter.count}
                    onCountChange={handleCountChange}
                  />
                  <button className="h-8 px-4 text-xs flex items-center gap-1 hover:bg-green-300">
                    <span className="fas fa-plus"></span> Add
                  </button>
                </div>
              </CardProduct>
            ))}
          </div>
        </div>
        <RightBar></RightBar>
      </div>
    </div>
  );
};

export default Transaction;
