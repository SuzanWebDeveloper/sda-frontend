import { MiniDrawerState } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState: MiniDrawerState = {
  open: true
}

const miniDrawerSlice = createSlice({
  name: "miniDrawer",
  initialState: initialState,
  reducers: {
    toggleOpen: (state) => {
      state.open = !state.open
    }
  }
})

export const { toggleOpen } = miniDrawerSlice.actions
export default miniDrawerSlice.reducer
