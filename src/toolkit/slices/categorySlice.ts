import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { CategoryState, CreateCategoryFormData } from "@/types"
import { getToken } from "@/utils/localStorage"

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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CreateCategoryFormData) => {
    const response = await api.post("/categories", newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    updateCategoryData,
    categoryId
  }: {
    updateCategoryData: CreateCategoryFormData
    categoryId: string
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updateCategoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.data)
    return response.data
  }
)

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.$values
      state.isLoading = false
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.categoryId !== action.payload
      )
      state.isLoading = false
      // add toast success message 
    })

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.data)
      state.isLoading = false
    })

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const foundCategory = state.categories.find(
        (category) => category.categoryId == action.payload.data.categoryId
      )
      if (foundCategory) {
        foundCategory.name = action.payload.data.name
        foundCategory.description = action.payload.data.description
      }
      // if (state.category) {
      //   state.userData.name = action.payload.data.name
      //   state.userData.address = action.payload.data.address
      //   state.isLoading = false
      // }
      // setLocalStorage("loginData", {
      //   isLoggedIn: state.isLoggedIn,
      //   token: state.token,
      //   userData: state.userData
      // })
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
