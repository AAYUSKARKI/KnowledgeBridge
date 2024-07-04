import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light'
}

 const  ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        settheme: (state, action) => {
            console.log('settheme reducer called with payload:', action.payload);
            state.theme = action.payload
        }
    }
})

export const { settheme } = ThemeSlice.actions

export default ThemeSlice.reducer