import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import RightBar from "../../components/RightBar";
import SearchBar from "../../components/SearchBar";
import CardKategori from "../../components/CardKategori";
import CardProduct from "../../components/CardProduct";
import coffe from "../../assets/images/coffe.png";
import Counter from "../../components/Counter";

const Transaction = () => {
  const [ws, setWs] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [cashPaid, setCashPaid] = useState("");
  const [customerName, setCustomerName] = useState("user@example.com");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3000/ws");
    setWs(websocket);

    websocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);

      if (data.action === "qr_paid") {
        // Handle QR payment confirmation
        alert(data.message); // Show an alert or update the UI
        // Optionally, you can refresh the cart or perform other actions
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCart();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/categorys", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = categoryId
        ? `http://localhost:3000/api/products?category_id=${categoryId}`
        : `http://localhost:3000/api/products`;
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setProducts(data.data); // Update products state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId); // Fetch products for selected category
  };

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/orders", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      console.log("Cart Data:", data);
      setCart(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.sub_total, 0);
    setTotal(total);
    return total;
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      const data = await response.json();
      const updatedCart = [...cart, data];
      setCart(updatedCart);
      const newTotal = calculateTotal(updatedCart);
      console.log(newTotal);

      // Send updated cart and total to WebSocket
      if (ws) {
        ws.send(
          JSON.stringify({
            action: "updateCart",
            cart: updatedCart,
            total: newTotal,
          })
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateCart = async (orderId, quantity) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            quantity,
          }),
        }
      );
      const data = await response.json();
      const updatedCart = cart.map((item) =>
        item.id === orderId ? data : item
      );
      setCart(updatedCart);
      const newTotal = calculateTotal(updatedCart);

      // Send updated cart and total to WebSocket
      if (ws) {
        ws.send(
          JSON.stringify({
            action: "updateCart",
            cart: updatedCart,
            total: newTotal,
          })
        );
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveFromCart = async (orderId) => {
    try {
      const token = sessionStorage.getItem("token");
      await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      const updatedCart = cart.filter((item) => item.id !== orderId);
      setCart(updatedCart);
      const newTotal = calculateTotal(updatedCart);

      // Send delete action and updated total to WebSocket
      if (ws) {
        ws.send(
          JSON.stringify({
            action: "removeFromCart",
            orderId,
            cart: updatedCart,
            total: newTotal,
          })
        );
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            paymentMethod,
            cashPaid: paymentMethod === "CASH" ? cashPaid : undefined,
            email: customerName,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (paymentMethod === "CASH") {
        alert(data.payment.message);
        const change = cashPaid - total;
        // Send checkout info to WebSocket
        if (ws) {
          ws.send(
            JSON.stringify({
              action: "checkout",
              paymentMethod,
              cashPaid,
              total,
              change,
            })
          );
        }
      } else {
        setQrCodeUrl(data.payment.qrCodeUrl);
        alert(data.payment.message);
        // Send QR code info to WebSocket
        if (ws) {
          ws.send(
            JSON.stringify({
              action: "checkout",
              paymentMethod,
              qrCodeUrl: data.payment.qrCodeUrl,
            })
          );
        }
      }

      // Clear cart after successful checkout
      setCart([]);
      setTotal(0);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchInput(query);

    try {
      const token = sessionStorage.getItem("token");
      let url;

      if (query.trim() === "") {
        // If the search input is empty, fetch all products
        url = `http://localhost:3000/api/products`;
      } else {
        // Otherwise, fetch products based on the search query
        url = `http://localhost:3000/api/products?product_name=${query}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setProducts(data.data); // Update products with the server's response
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <div className="flex w-full">
        <LeftBar></LeftBar>
        <div className="flex-grow my-8 mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Pilih Menu</h2>
            <SearchBar value={searchInput} onChange={handleSearchInputChange} />
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex gap-1 py-4 justify-between">
            <CardKategori onClick={() => handleCategoryClick(null)}>
              <span>All</span>
            </CardKategori>
            {categories.map((category) => (
              <CardKategori
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span>{category.category_name}</span>
              </CardKategori>
            ))}
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-wrap overflow-y-auto gap-1 py-3 px-2 justify-start bg-gray-200 h-[75%] max-h-[480px]">
            {products.map((product) => (
              <CardProduct key={product.id}>
                <div className="flex gap-4 text-left">
                  <img
                    src={product.image || coffe}
                    alt={coffe}
                    className="h-[57px] w-[57px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="text-md">{product.product_name}</div>
                    <div className="font-normal italic text-sm">
                      Rp.{product.price}
                    </div>
                  </div>
                </div>
                <hr className="h-px w-full my-2 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <button
                    className="h-8 px-4 text-xs flex items-center gap-1 hover:bg-green-300"
                    onClick={() => handleAddToCart(product.id, 1)}
                  >
                    <span className="fas fa-plus"></span> Add
                  </button>
                </div>
              </CardProduct>
            ))}
          </div>
        </div>
        <RightBar
          cart={cart}
          total={total}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cashPaid={cashPaid}
          setCashPaid={setCashPaid}
          handleCheckout={handleCheckout}
          handleUpdateCart={handleUpdateCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

export default Transaction;
