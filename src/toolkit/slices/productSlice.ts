import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { ProductState } from "@/types"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

// api call by Thunk
//arg: action to pass , async function where u want to make the call
// then it can have 3 state cases: pending/ fulfilled/ rejected to handle
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
  }) => {
    const response = await api.get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`
    )
    return response.data
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string | undefined) => {
    const response = await api.get(`/products/${slug}`)
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  //all products
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items.$values
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    //product by id
    //update the state product
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.isLoading = false
    })

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )

    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = "An error occurred" //default string
        state.isLoading = false
      }
    )
  }
})

export default productSlice.reducer
