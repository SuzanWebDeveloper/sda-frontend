import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./slices/productSlice" //rename it as reducer
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    productR: productReducer, //key any name
    userR: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
