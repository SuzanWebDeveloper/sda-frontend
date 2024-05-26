import { createSlice } from "@reduxjs/toolkit"

import { CartState, Product } from "@/types"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"

// const data = getLocalStorage("cart", {
//   cartItems: []
// })
const data =
  localStorage.getItem("cart") !== null ? JSON.stringify(String(localStorage.getItem("cart"))) : []

const initialState: CartState = {
  cartItems: []
  // error: null,
  // isLoading: false
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      state.cartItems.push(action.payload)
      // setLocalStorage("cart", state.cartItems)
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((cartItem) => (cartItem.productId = id))
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    removeAllFromCart: (state) => {
      // id of the item
      // filter the cart items with this id
      state.cartItems = []
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    }
  }
})

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions
export default cartSlice.reducer
