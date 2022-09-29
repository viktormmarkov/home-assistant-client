import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    listLoaded: (state, action) => {
      return {
        ...state,
        list: [...action.payload],
      };
    },
    itemSaved: (state, action) => {
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };
    },
  },
});

const categorySelector = (state) => state.category;

export const listSelector = createSelector(
  categorySelector,
  (category) => category.list
);

export const itemSelector = createSelector(listSelector, (items) => items[0]);

export default categorySlice.reducer;
