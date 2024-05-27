import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  About,
  AdminDashboard,
  Cart,
  Error,
  Home,
  Login,
  UserDashboard,
  UserOrders,
  UserProfile
} from "@/pages"

import Footer from "@/components/layout/Footer"
import { ProductDetails } from "@/pages/ProductDetails"
import { Register } from "@/pages/Register"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import AdminCategories from "@/components/AdminCategories"
import AdminUserManagement from "@/components/AdminUserManagement"
import AdminProductsManagement from "@/components/AdminProductsManagement"
import Navbar from "@/components/layout/navbar/Navbar"
import AdminOrders from "@/components/AdminOrders"



const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/products" element={<AdminProductsManagement />} />
            <Route path="admin/users" element={<AdminUserManagement />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
