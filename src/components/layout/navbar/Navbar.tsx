import { AppDispatch, RootState } from "@/toolkit/store"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { useMediaQuery, useTheme } from "@mui/material"

import { logoutUser } from "@/toolkit/slices/userSlice"
import useUsersState from "@/hook/useUsersState"
import "./navbar.css"
import logo from "../../assets/logo.svg"
import CartIcon from "@/components/CartIcon"
import useCartState from "@/hook/useCartState"
import DrawerNav from "../DrawerNav"

const Navbar = () => {
  const location = useLocation()
  const { pathname } = location
  console.log(pathname)

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down("md"))

  const dispatch: AppDispatch = useDispatch()

  const { isLoggedIn, userData } = useUsersState()
  const { cartItems } = useCartState()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const { open } = useSelector((state: RootState) => state.miniDrawerR)
  console.log(open)

  return (
    <nav className="navbar">
      <div
        className={
          open && (pathname == "/dashboard/user" || pathname == "/dashboard/user/profile")
            ? "navbar-container-dashboard"
            : "navbar-container"
        }
      >
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {isMatch ? (
          <>
            <div className="nav-xs-cart">
              <div className="nav-login-cart">
                {isLoggedIn && (
                  <>
                    <Link className="nav__link" to="/" onClick={handleLogout}>
                      <button>Logout</button>
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <Link className="nav__link" to="/login">
                      <button>Login</button>
                    </Link>
                  </>
                )}

                <Link to="/cart">
                  <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
                </Link>
              </div>

              <DrawerNav />
            </div>
          </>
        ) : (
          <>
            <ul className="nav-menu">
              <li>
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div className="nav-login-cart">
              {isLoggedIn && (
                <>
                  <ul>
                    <li>
                      <Link
                        className="nav__link"
                        to={`/dashboard/${userData && userData.role == "admin" ? "admin" : "user"}`}
                      >
                        {userData && userData.role == "admin" ? "Admin Dashboard" : "My Account"}
                      </Link>
                    </li>
                  </ul>
                  <Link className="nav__link" to="/" onClick={handleLogout}>
                    <button>Logout</button>
                  </Link>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Link className="nav__link" to="/login">
                    <button>Login</button>
                  </Link>
                </>
              )}

              <Link to="/cart" className="nav-login-cart__cart">
                <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
