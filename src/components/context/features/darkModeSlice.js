import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: JSON.parse(localStorage.getItem('darkMode')) || false
}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toogleDarkMode: (state) => {
            state.mode = !state.mode;
            localStorage.setItem('darkMode', JSON.stringify(state.mode))
        }
    }
})

export const { toogleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer