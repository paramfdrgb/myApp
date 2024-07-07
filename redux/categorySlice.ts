import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import api from "@/hooks/api";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const details = await api.get(
      `${process.env.EXPO_PUBLIC_API_URL}/categories`
    );
    return details;
  }
);

const initialState = {
  isCategoriesLoading: false,
  categories: [],
  error: null,
};

const categoriesFeaturesReducer = createSlice({
  name: "categoriesFeatures",
  initialState: initialState,
  reducers: {
    resetStore(state: any) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // Get Categories
    builder.addCase(getCategories.pending, (state, action) => {
      state.isCategoriesLoading = true;
      state.categories = [];
    });
    builder.addCase(getCategories.fulfilled, (state, action: any) => {
      state.isCategoriesLoading = false;
      state.categories = action?.payload?.data?.content;
    });
    builder.addCase(getCategories.rejected, (state, action: any) => {
      state.isCategoriesLoading = false;
      Toast.show({
        type: "error",
        text1: action?.error?.message,
      });
    });
  },
});

const { reducer, actions } = categoriesFeaturesReducer;

export const { resetStore } = actions;

export default reducer;
