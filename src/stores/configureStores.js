import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./DialogStore";
import productReducer from "./ProductStore";
import categoryReducer from "./CategoryStore";
import localeReducer from "./LocaleStore";
import { categoryApi } from "./CategoryQuery";

export const rootStore = configureStore({
  reducer: {
    dialog: dialogReducer,
    product: productReducer,
    category: categoryReducer,
    locale: localeReducer,
    [categoryApi.reducerPath]: categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware),
}, );

