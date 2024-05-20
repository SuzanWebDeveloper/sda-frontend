import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  AdminDashboard,
  Contact,
  Error,
  Home,
  Login,
  UserDashboard,
  UserOrders,
  UserProfile
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
          <Route path="/dashboard/categories" element={<AdminDashboard />} />
          <Route path="/dashboard/products" element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<AdminDashboard />} />
          <Route path="/dashboard/orders" element={<AdminDashboard />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default Index
