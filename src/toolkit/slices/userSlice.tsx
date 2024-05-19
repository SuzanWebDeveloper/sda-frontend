import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { LoginFormData, User, UserState } from "@/types"

const initialState: UserState = {
  error: null,
  isLoading: false
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  console.log(newUser)
  const response = await api.post("/users", newUser)
  // console.log(response.data)
  return response.data
})
export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  console.log(userData)
  const response = await api.post("/users/login", userData)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {}
})

export default userSlice.reducer
