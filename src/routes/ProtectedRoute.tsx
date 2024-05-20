import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { RootState } from "@/toolkit/store"

import { Login } from "@/pages"

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoute
