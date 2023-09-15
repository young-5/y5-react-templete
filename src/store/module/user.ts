import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    changeUserInfo(state, { payload }) {
      state.userInfo = payload
    },
  },
})
export const { changeUserInfo } = userSlice.actions
export default userSlice.reducer
