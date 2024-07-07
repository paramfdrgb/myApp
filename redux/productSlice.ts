import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import api from "@/hooks/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data: any) => {
    const details = await api.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products`
    );
    return details;
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (data: any) => {
    const details = await api.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/${data.id}`
    );
    return details;
  }
);

const initialState = {
  isProductsLoading: false,
  isProductLoading: false,
  products: [],
  product: null,
  error: null,
};

const productsFeaturesReducer = createSlice({
  name: "productsFeatures",
  initialState: initialState,
  reducers: {
    resetStore(state: any) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // get Products
    builder.addCase(getProducts.pending, (state: any, action) => {
      state.isProductsLoading = true;
      state.products = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.isProductsLoading = false;
      state.products = action?.payload?.data?.content;
    });
    builder.addCase(getProducts.rejected, (state, action: any) => {
      state.isProductsLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });

    // get product
    builder.addCase(getProduct.pending, (state: any, action) => {
      state.isProductLoading = true;
      state.product = null;
    });
    builder.addCase(getProduct.fulfilled, (state, action: any) => {
      state.isProductLoading = false;
      state.product = action?.payload?.data;
    });
    builder.addCase(getProduct.rejected, (state, action: any) => {
      state.isProductLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });
  },
});

const { reducer, actions } = productsFeaturesReducer;

export const { resetStore } = actions;

export default reducer;
