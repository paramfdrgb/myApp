import { configureStore } from "@reduxjs/toolkit";
import userFeaturesReducer from "./userSlice";
import categoriesFeaturesReducer from "./categorySlice";
import productsFeaturesReducer from "./productSlice";
import cartFeaturesReducer from "./cartSlice";
import checkoutFeaturesReducer from "./checkoutSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userFeatures: userFeaturesReducer,
    categoriesFeatures: categoriesFeaturesReducer,
    productsFeatures: productsFeaturesReducer,
    cartFeatures: cartFeaturesReducer,
    checkoutFeatures: checkoutFeaturesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
