import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { LoginFormData, User, UserState } from "@/types"

const data =
  localStorage.getItem("loginData") !== null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []

 console.log(data.token)

const initialState: UserState = {
  error: null,
  isLoading: false,
  token: data.token,
  userData: data.userData,
  isLoggedIn: data.isLoggedIn
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

//--------------------
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload.data.token)
      state.isLoggedIn = true
      state.token = action.payload.data.token
        console.log(state.token)
      state.userData = action.payload.data.user
      state.isLoading = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          userData: state.userData
        })
      )
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
//--------------------

export default userSlice.reducer
