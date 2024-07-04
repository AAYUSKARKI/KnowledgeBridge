import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedperson: null
}

 const selectedpersonSlice = createSlice({
    name: "selectedperson",
    initialState,
    reducers: {
        setselectedperson: (state, action) => {
            state.selectedperson = action.payload
        }
    }
})

export const { setselectedperson } = selectedpersonSlice.actions

export default selectedpersonSlice.reducer