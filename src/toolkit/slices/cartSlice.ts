import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Product } from "@/types"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"

const data = getLocalStorage("cart", {
  cartItems: []
})

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: CartItem[]
  // error: null | string
}

const initialState: CartState = {
  cartItems: data.cartItems
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId == action.payload.productId
      )
      if (item) {
        item.orderQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", { cartItems: state.cartItems })
    },

   incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId == action.payload)
      if (item) {
        item.orderQuantity += 1
      }
      setLocalStorage("cart", { cartItems: state.cartItems })
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId == action.payload)
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1
      }
      setLocalStorage("cart", { cartItems: state.cartItems })
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.productId !== action.payload)
      setLocalStorage("cart", { cartItems: state.cartItems })
    },
    removeAllFromCart: (state) => {
      state.cartItems = []
      setLocalStorage("cart", { cartItems: state.cartItems })
    }
  }
})

export const { addToCart, removeFromCart, removeAllFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions
export default cartSlice.reducer
