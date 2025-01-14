import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import coffe from "../../assets/images/coffe.png";

const ProductTransaction = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null); // To track payment status
  const [cashPaid, setCashPaid] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      // Check if the event data is a Blob
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result);
          handleWebSocketData(data);
        };
        reader.readAsText(event.data);
      } else {
        // If it's not a Blob, parse it directly
        const data = JSON.parse(event.data);
        handleWebSocketData(data);
      }
    };

    const handleWebSocketData = (data) => {
      if (data.action === "updateCart") {
        setCart(data.cart);
        setTotal(data.total);
        console.log(data);
      } else if (data.action === "removeFromCart") {
        // Remove the product from the cart
        setCart((prevCart) =>
          prevCart.filter((item) => item.id !== data.orderId)
        );
        setTotal(data.total);
        console.log(data);
      } else if (data.action === "checkout") {
        if (data.paymentMethod === "QRIS") {
          setQrCodeUrl(data.qrCodeUrl);
          setPaymentStatus("waiting");
        } else {
          setCashPaid(data.cashPaid);
          setChange(data.change);
          setPaymentStatus("completed");
        }
      } else if (data.action === "qr_paid") {
        setPaymentStatus("completed_qr"); // Show an alert or update the UI
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Set a timer to reload the page when payment is completed
    if (paymentStatus === "completed") {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 3000); // Set the timer for 3 seconds

      return () => clearTimeout(timer); // Clear the timer on unmount or when paymentStatus changes
    }
    if (paymentStatus === "completed_qr") {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 3000); // Set the timer for 3 seconds

      return () => clearTimeout(timer); // Clear the timer on unmount or when paymentStatus changes
    }
  }, [paymentStatus]);

  return (
    <div>
      <div className="flex w-full">
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-center my-4">
            <h2 className="text-2xl font-bold">Mamat Coffee</h2>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex justify-between overflow-y-auto gap-10 my-7 py-5 px-10 bg-white border border-gray-200 rounded-sm shadow-sm h-[83%] min-h-[600px]">
            <div className="w-2/5">
              <Card variant="h-[520px]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-h-[70px] p-2 bg-white rounded-md items-center gap-4 sm:flex-wrap md:flex-nowrap"
                  >
                    <img
                      src={item.product.image || coffe}
                      alt={item.product.product_name}
                      className="h-[57px] w-[57px] rounded-md"
                    />
                    <div className="flex justify-between flex-grow text-left">
                      <div className="mb-1 flex flex-col justify-between">
                        <p className="pb-2 text-md">
                          {item.product.product_name}
                        </p>
                        <div className="pt-1 italic font-normal text-sm">
                          Rp.{item.product.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between p-2 border-t border-gray-300">
                  <h3 className="font-bold">Total: Rp.{total}</h3>
                </div>
              </Card>
            </div>
            <div className="w-3/5">
              <Card variant="h-[520px] flex justify-center items-center">
                {paymentStatus === "waiting" ? (
                  <div>
                    <h1>QR Code</h1>
                    <img src={qrCodeUrl} alt="QR Code for payment" />
                  </div>
                ) : paymentStatus === "completed" ? (
                  <div>
                    <h1>Thank you for your payment!</h1>
                    <p>Total: Rp.{total}</p>
                    <p>Cash Paid: Rp.{cashPaid}</p>
                    <p>Change: Rp.{change}</p>
                  </div>
                ) : paymentStatus === "completed_qr" ? (
                  <div>
                    <h1>Thank you for your payment!</h1>
                  </div>
                ) : (
                  <div>
                    <h1>Iklan</h1>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTransaction;
