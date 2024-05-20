import { AppDispatch, RootState } from "@/toolkit/store"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logoutUser } from "@/toolkit/slices/userSlice"

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
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
