import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/authSlice'
import taskReducer from './taskSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer
  },
})