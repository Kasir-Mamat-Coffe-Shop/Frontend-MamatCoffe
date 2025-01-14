import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import coffe from "../assets/images/coffe.png";
import Counter from "./Counter";

const RightBar = ({
  cart = [],
  total = 0,
  paymentMethod,
  setPaymentMethod,
  cashPaid = "",
  setCashPaid,
  handleCheckout,
  handleUpdateCart,
  handleRemoveFromCart,
}) => {
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
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex min-h-[70px] p-2 m-2 bg-white rounded-md items-center gap-4 sm:flex-wrap md:flex-nowrap"
            >
              <img
                src={item.product?.image ? item.product.image : coffe}
                alt={coffe}
                className="h-[57px] w-[57px] rounded-md"
              />
              <div className="flex justify-between flex-grow text-left">
                <div className="mb-1 flex flex-col justify-between">
                  <p className="pb-2 text-md">{item.product.product_name}</p>
                  <div className="pt-1 italic font-normal text-sm">
                    Rp.{item.product.price}
                  </div>
                </div>

                <div className="flex flex-col items-end text-xs font-normal">
                  <Counter
                    id={item.id}
                    count={item.quantity}
                    onCountChange={(id, newCount) => {
                      if (newCount > 0) {
                        handleUpdateCart(id, newCount);
                      } else {
                        handleRemoveFromCart(id);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Total Card */}
        <Card variant="h-[70px]">
          <div className="text-left font-normal">
            <div className="flex justify-between text-sm mb-2">
              <p>Sub Total</p>
              <p>Rp. {total}</p>
            </div>
          </div>
        </Card>

        {/* Total Card */}
        {/* <Card variant="h-[40px]">
          <div className="flex justify-between">
            <p className="text-sm font-normal">Total</p>
            <p className="text-md">Rp. 80.000</p>
          </div>
        </Card> */}

        {/* Payment Method */}
        <div className="m-4">
          <label
            htmlFor="paymentMethod"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="CASH">Cash</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        {/* Payment Button */}
        {paymentMethod === "CASH" && (
          <div className="m-4">
            <label
              htmlFor="cashPaid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cash Paid
            </label>
            <input
              type="number"
              id="cashPaid"
              value={cashPaid}
              onChange={(e) =>
                setCashPaid(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full p- 2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        )}

        <div className="m-4">
          <button
            className="w-full bg-[#ffaa0cd0] text-white"
            onClick={handleCheckout}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

RightBar.propTypes = {
  cart: PropTypes.array,
  total: PropTypes.number,
  paymentMethod: PropTypes.string.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
  cashPaid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCashPaid: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
  handleUpdateCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default RightBar;
