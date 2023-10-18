import { createSlice } from "@reduxjs/toolkit";

export const themeSlicer = createSlice({
    name: "theme",
    initialState: {value: 'light'},
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        }
    }
});


export default themeSlicer.reducer;
export const {change} = themeSlicer.actions;