import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  AdminDashboard,
  Contact,
  Error,
  Home,
  Login,
  Orders,
  Products,
  UserDashboard,
  UserOrders,
  UserProfile,
  Users
} from "@/pages"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ProductDetails } from "@/pages/ProductDetails"
import { Register } from "@/pages/Register"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import AdminCategories from "@/components/AdminCategories"


const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<Orders />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
