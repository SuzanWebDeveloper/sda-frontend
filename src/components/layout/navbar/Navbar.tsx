import { AppDispatch } from "@/toolkit/store"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { logoutUser } from "@/toolkit/slices/userSlice"
import useUsersState from "@/hook/useUsersState"
import "./navbar.css"
import logo from "../../assets/logo.svg"
import cart_icon from "../../assets/cart_icon.svg"

const Navbar = () => {
  const [menu, setMenu] = useState("")

  const dispatch: AppDispatch = useDispatch()

  const { isLoggedIn, userData } = useUsersState()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home")
          }}
        >
          <Link className="nav__link" to="/">
            Home{menu === "home" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("products")
          }}
        >
          <Link className="nav__link" to="/about">
            Products{menu === "products" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("about")
          }}
        >
          <Link className="nav__link" to="/about">
            About{menu === "about" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn && (
          <>
            <ul>
              <li
                onClick={() => {
                  setMenu("account")
                }}
              >
                <Link
                  className="nav__link"
                  to={`/dashboard/${userData && userData.role == "admin" ? "admin" : "user"}`}
                >
                  {userData && userData.role == "admin" ? "Admin Dashboard" : "My Account"}
                  {menu === "account" ? <hr /> : <></>}
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
        {/*  */}
        <img src={cart_icon} className="nav-login-cart__icon" alt="cart-icon" />
        <div className="nav-cart-count">0</div>
      </div>
    </nav>
  )
}

export default Navbar
