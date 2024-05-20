import { AppDispatch } from "@/toolkit/store"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { logoutUser } from "@/toolkit/slices/userSlice"
import useUsersState from "@/hook/useUsersState"

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()

  const { isLoggedIn, userData } = useUsersState()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className="flex-center">
      <ul className="nav__lists flex-center">
        <li>
          <Link className="nav__link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/contact">
            Contact
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link className="nav__link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li>
              <Link
                className="nav__link"
                to={`/dashboard/${userData && userData.role == "admin" ? "admin" : "user"}`}
              >
                {userData && userData.role == "admin" ? "Admin" : "User"} Dashboard
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link className="nav__link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="nav__link" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
