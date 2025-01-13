import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../assets/style/App.css";
import Transaction from "../pages/products/Transaction";
import ManageProduct from "../pages/products/Manage";
import HistoryTransaction from "../pages/data/HistoryTransaction";
import Archive from "../pages/data/RekapArchive";
import DisplayUser from "../pages/user/ProductTransaction";
import Profile from "../pages/admin/Profile";
import Account from "../pages/admin/account";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";

function App() {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isScreenSmall) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <p className="text-lg font-bold text-red-600">
          Layar kurang besar. Silakan gunakan layar dengan lebar lebih dari
          1000px.
        </p>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/transaction" element={<Transaction />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route
          path="/admin/history-transaction"
          element={<HistoryTransaction />}
        />
        {/* <Route path="/admin/arsip-data" element={<Archive />} /> */}
        <Route path="/admin/profile" element={<Profile></Profile>}></Route>
        <Route path="/admin/account" element={<Account></Account>}></Route>
        <Route
          path="/user/display-product-transaction"
          element={<DisplayUser />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
