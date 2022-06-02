import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggle } = searchSlice.actions

export default searchSlice.reducer