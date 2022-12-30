import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from '../context/features/darkModeSlice'

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer
    }
})