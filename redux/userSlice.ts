import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import api from "@/hooks/api";

const storeUSerDataToLocalStore = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("user-data", jsonValue);
  } catch (e) {
    // saving error
  }
};

export const sendPhoneForOTP = createAsyncThunk(
  "UserFeatures/sendPhoneForOTP",
  async (data: any) => {
    const details = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/otp/verify`,
      data
    );
    return details;
  }
);

export const verifyOTP = createAsyncThunk(
  "UserFeatures/verifyOTP",
  async (data: any) => {
    const details = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/otp/verify/${data.otpId}`,
      data
    );

    return details;
  }
);

export const createAccount = createAsyncThunk(
  "UserFeatures/createAccount",
  async (data: any) => {
    const details = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/register/${data.otpId}`,
      data.formValues
    );

    return details;
  }
);

export const getUserAccount = createAsyncThunk(
  "UserFeatures/getUserAccount",
  async (data: any) => {
    const details = await api.get(
      `${process.env.EXPO_PUBLIC_API_URL}/accounts/${data.accntId}`
    );
    return details;
  }
);

export const logOut = createAsyncThunk(
  "UserFeatures/logOut",
  async (data: any) => {
    const details = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/logout`,
      data.formValues
    );

    return details;
  }
);

const initialState = {
  isLoading: false,
  sendOtpLoader: false,
  verifyOtpLoader: false,
  otpSentSuccessfully: false,
  accountCreateLoader: false,
  logOutLoader: false,
  getUserAccountLoader: false,
  otpId: "",
  otpVerifiedSuccessfully: false,
  accountCreatedAlready: false,
  accountCreatedSuccessfully: false,
  logOutDone: false,
  userData: null,
  error: null,
};

const userFeaturesReducer = createSlice({
  name: "UserFeatures",
  initialState: initialState,
  reducers: {
    setOtpSentSuccessfullyState(state: any, action: any) {
      state.otpSentSuccessfully = action?.payload;
    },
    resetStore(state: any) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // send otp
    builder.addCase(sendPhoneForOTP.pending, (state, action) => {
      state.sendOtpLoader = true;
    });
    builder.addCase(sendPhoneForOTP.fulfilled, (state, action: any) => {
      state.sendOtpLoader = false;
      state.otpSentSuccessfully = true;
      state.otpId = action?.payload?.data?.otpId;
    });
    builder.addCase(sendPhoneForOTP.rejected, (state, action: any) => {
      console.log(action?.error?.message, "sendPhoneForOTP-error");
      state.sendOtpLoader = false;
      state.otpSentSuccessfully = false;
      Alert.alert(action?.error?.message);
    });

    // verify otp
    builder.addCase(verifyOTP.pending, (state, action) => {
      state.verifyOtpLoader = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      console.log(action.payload.data, "createAccount");
      state.verifyOtpLoader = false;
      state.otpVerifiedSuccessfully =
        action.payload.data.otpValidationStatusEnum === "SUCCESS"
          ? true
          : false;
      if (action.payload.data.accounts?.active) {
        state.accountCreatedAlready = true;
        storeUSerDataToLocalStore({
          data: { access_token: action.payload.headers?.access_token },
        });
      } else {
        state.accountCreatedAlready = false;
      }
      if (action.payload.data.otpValidationStatusEnum !== "SUCCESS") {
        Alert.alert("Invalid otp!");
      }
    });
    builder.addCase(verifyOTP.rejected, (state, action: any) => {
      console.log(action?.error?.message, "verifyOTP-error");
      state.verifyOtpLoader = false;
      state.otpVerifiedSuccessfully = false;
      state.accountCreatedAlready = false;
      Alert.alert(action?.error?.message);
    });

    // create account
    builder.addCase(createAccount.pending, (state, action) => {
      state.accountCreateLoader = true;
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.accountCreateLoader = false;
      state.accountCreatedSuccessfully = true;
      state.userData = action.payload.data;
      storeUSerDataToLocalStore({
        data: {
          access_token: action.payload.headers?.access_token,
          accntId: action.payload?.data?.id,
        },
      });
    });
    builder.addCase(createAccount.rejected, (state, action: any) => {
      console.log(action?.error?.message, "createAccount-error");
      state.accountCreateLoader = false;
      state.accountCreatedSuccessfully = false;
      Alert.alert(action?.error?.message);
    });

    // get User Account
    builder.addCase(getUserAccount.pending, (state, action) => {
      state.getUserAccountLoader = true;
    });
    builder.addCase(getUserAccount.fulfilled, (state, action) => {
      state.getUserAccountLoader = false;
      state.userData = action.payload.data;
    });
    builder.addCase(getUserAccount.rejected, (state, action: any) => {
      console.log(action?.error?.message, "getUserAccount-error");
      state.getUserAccountLoader = false;
    });

    // logout
    builder.addCase(logOut.pending, (state, action) => {
      state.logOutLoader = true;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.logOutLoader = false;
      state.logOutDone = true;
    });
    builder.addCase(logOut.rejected, (state, action: any) => {
      console.log(action?.error?.message, "logOut-error");
      state.logOutLoader = false;
      state.logOutDone = true;
    });
  },
});

const { reducer, actions } = userFeaturesReducer;

export const { setOtpSentSuccessfullyState, resetStore } = actions;

export default reducer;
