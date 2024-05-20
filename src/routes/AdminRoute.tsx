import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { RootState } from "@/toolkit/store"

import { Login } from "@/pages"

const AdminRoute = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.userR)
  return isLoggedIn && (userData?.role =="admin") ? <Outlet /> : <Login />
}

export default AdminRoute
