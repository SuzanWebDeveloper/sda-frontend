import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Contact, Error, Home, Login } from "@/pages"
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
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default Index
