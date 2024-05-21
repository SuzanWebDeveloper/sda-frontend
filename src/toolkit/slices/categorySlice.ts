import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { CategoryState } from "@/types"

const initialState: CategoryState = {
  categories: [],
  //totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await api.get("/categories")
  return response.data
})

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.$values
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
      // (state, action: PayloadAction<CustomError>) => {
      (state, action) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default categorySlice.reducer
