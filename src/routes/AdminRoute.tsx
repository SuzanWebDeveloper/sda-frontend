import { Outlet } from "react-router-dom"

import { Login } from "@/pages"
import useUsersState from "@/hook/useUsersState"

const AdminRoute = () => {
  const { isLoggedIn, userData } = useUsersState()
  return isLoggedIn && userData?.role == "admin" ? <Outlet /> : <Login />
}

export default AdminRoute
