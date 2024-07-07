import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/hooks/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const getCatItems = createAsyncThunk("cart/getCatItems", async () => {
  const jsonValue: any = await AsyncStorage.getItem("user-data");
  const cartId = JSON.parse(jsonValue).data.cartId;
  const details = await api.get(
    `${process.env.EXPO_PUBLIC_API_URL}/cart/${cartId}?fetchCartItems=TRUE`
  );
  return details;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data: any) => {
    const jsonValue: any = await AsyncStorage.getItem("user-data");
    const cartId = JSON.parse(jsonValue).data.cartId;
    const details = await api.post(
      `${process.env.EXPO_PUBLIC_API_URL}/cart/${cartId}/items`,
      data
    );

    return details;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data: any) => {
    const jsonValue: any = await AsyncStorage.getItem("user-data");
    const cartId = JSON.parse(jsonValue).data.cartId;
    const details = await api.put(
      `${process.env.EXPO_PUBLIC_API_URL}/cart`,
      data
    );
    return details;
  }
);

const initialState = {
  isCartLoading: false,
  isAddToCartLoading: false,
  loadingProductId: "",
  cartItems: [],
  error: null,
};

const cartFeaturesReducer = createSlice({
  name: "cartFeatures",
  initialState: initialState,
  reducers: {
    resetStore(state: any) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // Get cart
    builder.addCase(getCatItems.pending, (state, action: any) => {
      state.isCartLoading = true;
      state.cartItems = [];
      state.loadingProductId = "";
    });
    builder.addCase(getCatItems.fulfilled, (state, action: any) => {
      state.isCartLoading = false;
      state.cartItems = action?.payload?.data?.cartItems;
    });
    builder.addCase(getCatItems.rejected, (state, action: any) => {
      state.isCartLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });

    // add to cart
    builder.addCase(addToCart.pending, (state, action: any) => {
      state.isAddToCartLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action: any) => {
      state.isAddToCartLoading = false;
      state.cartItems = action?.payload?.data?.content;
      Toast.show({
        type: "success",
        text1: "Item Added Cart",
      });
    });
    builder.addCase(addToCart.rejected, (state, action: any) => {
      state.isAddToCartLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });

    // update cart
    builder.addCase(updateCart.pending, (state, action: any) => {
      state.isAddToCartLoading = true;
      state.loadingProductId = action.payload.id;
    });
    builder.addCase(updateCart.fulfilled, (state, action: any) => {
      state.isAddToCartLoading = false;
      state.cartItems = action?.payload?.data?.content;
    });
    builder.addCase(updateCart.rejected, (state, action: any) => {
      state.isAddToCartLoading = false;
      state.loadingProductId = "";
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });
  },
});

const { reducer, actions } = cartFeaturesReducer;

export const { resetStore } = actions;

export default reducer;
