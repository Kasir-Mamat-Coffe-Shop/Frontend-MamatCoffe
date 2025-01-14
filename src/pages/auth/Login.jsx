import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("*email dan Password tidak boleh kosong");
    } else {
      try {
        const login = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (login.ok) {
          const responseData = await login.json(); // Assuming token is returned
          sessionStorage.setItem("token", responseData.data.token);
          sessionStorage.setItem("email", responseData.data.email);
          setError("");
          navigate("/admin/transaction");
        } else {
          const responseData = await login.json();
          setError(responseData.message || "Login gagal. Coba lagi.");
        }
      } catch (err) {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-brown-900 mb-6">
          Kasir Mamat Coffee Shop
        </h2>

        <form onSubmit={handleSubmit}>
          {/* email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
