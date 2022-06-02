import { configureStore } from '@reduxjs/toolkit'
import productModalSlice from './product-modal/productModalSlice'
import searchSlice from './search/searchSlice'
import cartItemsSlice from './shopping-cart/cartItemsSlice'

export const store = configureStore({
  reducer: {
      productModal: productModalSlice,
      cartItems: cartItemsSlice,
      search: searchSlice
  },
})