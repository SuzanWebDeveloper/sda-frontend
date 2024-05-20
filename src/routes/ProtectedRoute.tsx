import { Outlet } from "react-router-dom"

import { Login } from "@/pages"
import useUsersState from "@/hook/useUsersState"

const ProtectedRoute = () => {
  const { isLoggedIn } = useUsersState()
  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoute
