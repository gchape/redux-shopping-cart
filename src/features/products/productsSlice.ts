import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export default productsSlice.reducer;
