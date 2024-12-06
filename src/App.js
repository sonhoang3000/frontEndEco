// src/App.js
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./css/App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ContactPage from "./pages/Contactpage/Contactpage";
import HomePage from "./pages/HomePage/HomePage";
import ListProduct from "./pages/ListProduct/ListProduct";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />

      </Route>
    )
  );
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
