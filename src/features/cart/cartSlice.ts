import {
  createSelector,
  createSlice,
  miniSerializeError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  items: {
    [productID: string]: number;
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;

    for (let id in items) {
      numItems += items[id];
    }

    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    return Object.entries(items).reduce((acc, [id, quantity]) => {
      return (acc += products[id].price * quantity);
    }, 0);
  }
);

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
