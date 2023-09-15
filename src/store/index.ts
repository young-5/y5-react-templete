import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './module/user'

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
})

export default store
