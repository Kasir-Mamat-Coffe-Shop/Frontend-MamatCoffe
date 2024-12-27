import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../assets/style/App.css";
import Transaction from "../pages/products/Transaction";
import ManageProduct from "../pages/products/Manage";
import HistoryTransaction from "../pages/data/HistoryTransaction";
import Archive from "../pages/data/RekapArchive";
import DisplayUser from "../pages/user/ProductTransaction";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";

function App() {
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
        <Route path="/admin/arsip-data" element={<Archive />} />
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
