import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload === newItem
      state.cart.push(action.payload);
    },

    deleteItem: (state, action) => {
      // payload === id (itemId)
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => {
        return item.pizzaId === action.payload;
      });

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    increaseItemQuantity: (state, action) => {
      // payload === id
      const findedItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );

      findedItem.quantity++;
      findedItem.totalPrice = findedItem.quantity * findedItem.unitPrice;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Exports
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getUsername = (state) => state.user.username;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, cur) => sum + cur.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, cur) => sum + cur.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
