import { content } from "flowbite-react/tailwind";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import coffe from "../assets/images/coffe.png";

const RightBar = (props) => {
  const { content } = props;

  return (
    <div>
      <aside
        id="right-sidebar"
        className="fixed top-0 right-0 z-40 w-full sm:w-[30%] h-screen transition-transform translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-6 py-6 overflow-y-auto bg-white dark:bg-gray-800 text-left font-semibold ">
          {/* Header Section */}
          <div className="flex p-2 gap-3 items-center text-xl">
            <span className="fas fa-money-bill"></span>
            <span>Transaction</span>
          </div>

          {/* Transaction Card */}
          <Card height="400px">
            <div className="flex h-[70px] p-2 bg-white rounded-md items-center gap-4">
              <img
                src={coffe}
                alt="apaweh"
                className="h-[57px] w-[57px] rounded-md"
              />
              <div className="flex-grow text-left">
                <div className="flex justify-between text-sm mb-2">
                  <p>Coffee Late</p>
                  <button className="fas fa-trash text-white bg-gray-400 flex items-center justify-center h-6 w-6 rounded-md text-xs font-bold hover:bg-red-600 border-0 focus:ring-0"></button>
                </div>
                <div className="text-xs font-normal flex justify-between">
                  <div>Rp.50.000/Porsi</div>
                  <div>
                    <div class="flex gap-2 items-center -space-x-px h-6 text-base">
                      <button className="flex items-center justify-center px-1 h-4  text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm">
                        <span className="fas fa-plus text-[10px]"></span>
                      </button>
                      <p className="z-10 flex items-center justify-center px-1 h-6">
                        3
                      </p>
                      <button className="flex items-center justify-center px-1 h-4 text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm">
                        <span className="fas fa-minus text-[10px]"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card height="70px">
            <div className="text-left font-normal">
              <div className="flex justify-between text-sm mb-2">
                <p>Sub Total</p>
                <p>Rp. 80.000</p>
              </div>
              <div className="flex justify-between text-sm ">
                <div>Pajak</div>
                <div>Rp. 5000</div>
              </div>
            </div>
          </Card>
          <Card height="40px">
            <div className="flex justify-between">
              <p className="text-sm font-normal">Total</p>
              <p className="text-md">Rp. 80.000</p>
            </div>
          </Card>
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
          <div className="m-4">
            <button className="w-full bg-[#ffaa0cd0] text-white">Bayar</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RightBar;
