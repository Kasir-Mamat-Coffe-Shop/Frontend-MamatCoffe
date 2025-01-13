import { content } from "flowbite-react/tailwind";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import coffe from "../assets/images/coffe.png";
import Pagination from "./Pagination";
import Counter from "./Counter";

const RightBar = (props) => {
  const { content } = props;
  const [counters, setCounters] = useState([]);

  const products = [
    { id: 1, name: "Kursi", price: 100 },
    { id: 2, name: "Meja", price: 200 },
  ];
  useEffect(() => {
    setCounters(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        count: 1,
        price: product.price,
      }))
    );
  }, []);
  const handleCountChange = (id, newCount) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: newCount } : counter
      )
    );
  };
  return (
    <div className="top-0 right-0 w-[100vh]">
      <div className="h-full max-h-screen px-6 py-6 overflow-y-auto bg-white dark:bg-gray-800 text-left font-semibold">
        {/* Header Section */}
        <div className="flex p-2 gap-3 items-center text-xl">
          <span className="fas fa-money-bill"></span>
          <span>Transaction</span>
        </div>

        {/* Transaction Card */}
        <Card variant="h-[400px] p-0">
          {counters.map((counter) => (
            <div className="flex min-h-[70px] p-2 m-2 bg-white rounded-md items-center gap-4 sm:flex-wrap md:flex-nowrap">
              <img
                src={coffe}
                alt="apaweh"
                className="h-[57px] w-[57px] rounded-md"
              />
              <div className="flex justify-between flex-grow text-left">
                <div className="mb-1 flex flex-col justify-between">
                  <p className="pb-2 text-md ">Coffee Late</p>
                  <div className="pt-1 italic font-normal text-sm ">
                    Rp.50.000/Porsi
                  </div>
                </div>

                <div className="flex flex-col items-end text-xs font-normal">
                  <div className="flex-grow mb-2 pb-2 sm:mb-0">
                    <button className="right-0 fas fa-trash text-white bg-gray-400 flex items-center justify-center h-6 w-6 rounded-md text-xs font-bold hover:bg-red-600 border-0 focus:ring-0"></button>
                  </div>
                  <Counter
                    id={counter.id}
                    count={counter.count}
                    onCountChange={handleCountChange}
                  ></Counter>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Sub Total Card */}
        <Card variant="h-[70px]">
          <div className="text-left font-normal">
            <div className="flex justify-between text-sm mb-2">
              <p>Sub Total</p>
              <p>Rp. 80.000</p>
            </div>
            <div className="flex justify-between text-sm">
              <div>Pajak</div>
              <div>Rp. 5000</div>
            </div>
          </div>
        </Card>

        {/* Total Card */}
        <Card variant="h-[40px]">
          <div className="flex justify-between">
            <p className="text-sm font-normal">Total</p>
            <p className="text-md">Rp. 80.000</p>
          </div>
        </Card>

        {/* Payment Method */}
        <div className="m-4">
          <label
            htmlFor="pembayaran"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Payment Method
          </label>
          <select
            name="pembayaran"
            id="pembayaran"
            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="cash">Cash</option>
            <option value="qris">Qris</option>
          </select>
        </div>

        {/* Payment Button */}
        <div className="m-4">
          <button className="w-full bg-[#ffaa0cd0] text-white">Bayar</button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
