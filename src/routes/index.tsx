import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  AdminDashboard,
  Categories,
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

          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/user/profile" element={<UserProfile />} />
          <Route path="/dashboard/user/orders" element={<UserOrders />} />

          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/categories" element={<Categories />} />
          <Route path="/dashboard/admin/products" element={<Products />} />
          <Route path="/dashboard/admin/users" element={<Users />} />
          <Route path="/dashboard/admin/orders" element={<Orders />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
