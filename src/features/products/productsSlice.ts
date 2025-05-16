import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../app/api";

interface ProductsState {
  products: {
    [id: string]: Product;
  };
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    receivedProducts(state, action: PayloadAction<Product[]>) {
      action.payload.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export default productsSlice.reducer;
export const { receivedProducts } = productsSlice.actions;
