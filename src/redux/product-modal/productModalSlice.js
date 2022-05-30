import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null
}

export const productModalSlice = createSlice({
    name: 'productModal',
    initialState,
    reducers: {
        set: (state, action) => {
            console.log("set");
            
            state.value = action.payload
        },
        remove: (state) => {
            console.log("remove");
            
            state.value = null
        }
    }
})

export const {set, remove } = productModalSlice.actions

export default productModalSlice.reducer