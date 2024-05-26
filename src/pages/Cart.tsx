import useCartState from "@/hook/useCartState"
import useUsersState from "@/hook/useUsersState"
import { decrementQuantity, incrementQuantity, removeAllFromCart, removeFromCart } from "@/toolkit/slices/cartSlice"
import { AppDispatch } from "@/toolkit/store"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Cart = () => {
  const { cartItems } = useCartState()
  const { userData, isLoggedIn } = useUsersState()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveAllProductsFromCart = () => {
    dispatch(removeAllFromCart())
  }

  const handleRemoveFromCart = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }

    const handleIncrementQuantity = (productId?: string) => {
      if (productId) {
        dispatch(incrementQuantity(productId))
      }
    }
  
   const handledecrementQuantity = (productId?: string) => {
     if (productId) {
       dispatch(decrementQuantity(productId))
     }
   }

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  const cartTotal = () => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.price * cartItem.orderQuantity))
    return formatPrice(total)
  }

  return (
    <div className="cart">
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-heading card">
            <h2> Shopping Cart [{cartItems.length}] items</h2>
            <button onClick={handleRemoveAllProductsFromCart}>Remove all Items</button>
            <button onClick={() => navigate("/")}>Shop more</button>
          </div>

          <div className="cart-body card flex-space-around">
            <div>
              {cartItems.map((cartItem) => (
                <div key={cartItem.productId} className=" cart-item flex-space-around">
                  <div className="cart-item__left">
                    <img className="cart-img" src={cartItem.image} alt={cartItem.name} />
                  </div>
                  <div className="cart-item__center">
                    <p>{cartItem.name}</p>
                    <p>Price: {formatPrice(cartItem.price)}</p>
                    <p>In stock: {cartItem.stock}</p>
                  </div>
                  <div className="cart-item__right">
                    <div className="quantity-controls">
                      <button onClick={()=> {handleIncrementQuantity(cartItem.productId)}}
                      disabled={cartItem.stock == cartItem.orderQuantity}
                      >
                        +</button>
                      <span>{cartItem.orderQuantity}</span>
                      <button onClick={()=> {handledecrementQuantity(cartItem.productId)}}>-</button>
                    </div>
                    <button onClick={() => handleRemoveFromCart(cartItem.productId)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2>Cart Summary</h2>
              <h3> Total amount: {cartTotal()}</h3>

              {/* if I have time implement update address */}
              {isLoggedIn ? (
                <div>
                  {" "}
                  user info
                  <p>{userData && userData.address}</p>
                  <button>Update Delivery Address</button><br/>
                  <button>Pay here</button>
                </div>
              ) : (
                <div> login to proceed for payment</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  )
}
