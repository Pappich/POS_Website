import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        menuId,
        selectedType,
        selectedSweetness,
        selectedSize,
        selectedAddOn,
        price,
        quantity,
      } = action.payload;
      const newItem = {
        menuId,
        selectedType,
        selectedSweetness,
        selectedSize,
        selectedAddOn,
        price,
        quantity,
      };

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.menuId === menuId &&
          item.selectedType.id === selectedType.id &&
          item.selectedSweetness.id === selectedSweetness.id &&
          item.selectedSize.id === selectedSize.id &&
          JSON.stringify(item.selectedAddOn) === JSON.stringify(selectedAddOn)
      );

      if (existingItemIndex !== -1) {
        // Item exists, so update quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // New item, add to the cart
        state.items.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.menuId !== action.payload.menuId ||
          item.selectedSize !== action.payload.selectedSize ||
          item.selectedSweetness !== action.payload.selectedSweetness ||
          item.selectedType !== action.payload.selectedType ||
          JSON.stringify(item.selectedAddOn) !==
            JSON.stringify(action.payload.selectedAddOn)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
