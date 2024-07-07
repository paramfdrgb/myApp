import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import api from "@/hooks/api";

export const createCheckout = createAsyncThunk(
  "Checkout/createCheckout",
  async () => {
    const details = await api.post(
      `${process.env.EXPO_PUBLIC_API_URL}/createCheckout`
    );
    return details;
  }
);

const initialState = {
  iscreateCheckoutLoading: false,
  checkout: null,
  error: null,
};

const checkoutFeaturesReducer = createSlice({
  name: "checkoutFeatures",
  initialState: initialState,
  reducers: {
    resetStore(state: any) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // Get checkout
    builder.addCase(createCheckout.pending, (state, action) => {
      state.iscreateCheckoutLoading = true;
      state.checkout = null;
    });
    builder.addCase(createCheckout.fulfilled, (state, action: any) => {
      state.iscreateCheckoutLoading = false;
      state.checkout = action?.payload?.data?.content;
    });
    builder.addCase(createCheckout.rejected, (state, action: any) => {
      state.iscreateCheckoutLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });
  },
});

const { reducer, actions } = checkoutFeaturesReducer;

export const { resetStore } = actions;

export default reducer;
