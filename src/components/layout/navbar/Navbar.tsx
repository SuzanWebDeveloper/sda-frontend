import { AppDispatch } from "@/toolkit/store"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { logoutUser } from "@/toolkit/slices/userSlice"
import useUsersState from "@/hook/useUsersState"
import "./navbar.css"
import logo from "../../assets/logo.svg"
import cart_icon from "../../assets/cart_icon.svg"
import CartIcon from "@/components/CartIcon"
import useCartState from "@/hook/useCartState"

const Navbar = () => {

  const dispatch: AppDispatch = useDispatch()

  const { isLoggedIn, userData } = useUsersState()
  const { cartItems } = useCartState()


  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-menu">
          <li
          
          >
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          <li
          
          >
            <Link className="nav__link" to="/products">
              Products
            </Link>
          </li>
          <li
           
          >
            <Link className="nav__link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <div className="nav-login-cart">
          {isLoggedIn && (
            <>
              <ul>
                <li
                 
                >
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
      
          <Link to="/cart">
            <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
          </Link>
      
        </div>
      </div>
    </nav>
  )
}

export default Navbar
