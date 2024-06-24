import { createSlice } from "@reduxjs/toolkit";

export const themeSlicer = createSlice({
    name: "theme",
    initialState: {value: window.localStorage.getItem('theme') || "dark"},
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        }
    }
});


export const {change} = themeSlicer.actions;
export default themeSlicer.reducer;
