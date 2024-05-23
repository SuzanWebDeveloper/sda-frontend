import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"

const data = getLocalStorage("loginData", {
  token: null,
  userData: null,
  isLoggedIn: false
})

const initialState: UserState = {
  users: [],
  totalPages: 1,
  error: null,
  isLoading: false,
  token: data.token,
  userData: data.userData,
  isLoggedIn: data.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post("/users", newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post("/users/login", userData)
  return response.data
})
//
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateProfileFormData; userId: string }) => {
    const token = getToken()
    const response = await api.put(`/users/${userId}`, updateUserData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
)

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({
    pageNumber,
    pageSize
  }: //searchTerm,
  // sortBy
  {
    pageNumber: number
    pageSize: number
    // searchTerm: string
    // sortBy: string
  }) => {
    const response = await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)
//-----------
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string | undefined) => {
    await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return userId
  }
)

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
      state.userData = null
      state.isLoading = false
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        userData: state.userData
      })
    }
  },

  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.data.token
      state.userData = action.payload.data.user
      state.isLoading = false
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        userData: state.userData
      })
    })

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (state.userData) {
        state.userData.name = action.payload.data.name
        state.userData.address = action.payload.data.address
        state.isLoading = false
      }
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        userData: state.userData
      })
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.$values
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.userId !== action.payload)
      state.isLoading = false
      // add toast success message
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
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
