import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { CreateProductFormBackEnd, CreateProductFormData, Product, ProductState } from "@/types"
import { getToken } from "@/utils/localStorage"

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
    sortBy,
    filteringTerm
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
    // filteringTerm: string[]
    filteringTerm: string
  }) => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      searchTerm,
      sortBy,
      //?
      filteringTerm
    })
    // filteringTerm.forEach((categoryName) => {
    //   params.append("filteringTerm", categoryName)
    // })
    console.log(params)
    // const response = await api.get(
    //   `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`
    // )
    const response = await api.get("/products", { params })
    console.log(response.data)
    return response.data
  }
)


// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async ({
//     pageNumber,
//     pageSize,
//     searchTerm,
//     sortBy,
//     selectedCategories
//   }: {
//     pageNumber: number
//     pageSize: number
//     searchTerm: string
//     sortBy: string
//     selectedCategories: string[]
//   }) => {
//     const params = new URLSearchParams({
//       pageNumber: pageNumber.toString(),
//       pageSize: pageSize.toString(),
//       searchTerm,
//       sortBy
//       //?
//     })
//      selectedCategories.forEach((categoryName) => {
//        params.append("selectedCategories", categoryName)
//      })
//      console.log(params)
//     // const response = await api.get(
//     //   `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`
//     // )
//     const response = await api.get("/products", { params })
//     return response.data
//   }
// )

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string | undefined) => {
    const response = await api.get(`/products/${slug}`)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string) => {
  await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return id
})

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProductFormBackEnd) => {
    const response = await api.post("/products", newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: CreateProductFormBackEnd
    productId: string
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.data)
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

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.productId !== action.payload)
      state.isLoading = false
    })

    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload.data.price)
      state.products.push(action.payload.data)
      state.isLoading = false
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const foundProduct = state.products.find(
        (product) => product.productId == action.payload.data.productId
      )
      
      if (foundProduct) {
        foundProduct.name = action.payload.data.name
        foundProduct.description = action.payload.data.description
        foundProduct.price = action.payload.data.price
        foundProduct.stock = action.payload.data.stock
        foundProduct.image = action.payload.data.image
        foundProduct.slug = action.payload.data.slug
        foundProduct.categoryId = action.payload.data.categoryId
      }
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
