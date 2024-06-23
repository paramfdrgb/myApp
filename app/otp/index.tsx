import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import PhoneInput from "@/components/PhoneInput";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondayButton";
import Input from "@/components/Input";
import DismissKeyboard from "@/components/DismissKeyboard";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  sendPhoneForOTP,
  setOtpSentSuccessfullyState,
  verifyOTP,
} from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReduxProvidexWrapper from "@/components/ReduxProvidexWrapper";
import Logo from "@/components/logo";
import ThemedText from "@/components/ThemedText";

export default function Otp() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const {
    otpSentSuccessfully,
    sendOtpLoader,
    otpVerifiedSuccessfully,
    verifyOtpLoader,
    otpId,
    accountCreatedAlready,
  } = useAppSelector((store) => store.userFeatures);
  const [counter, setCounter] = React.useState(30);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (showOtp) counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    else {
      setCounter(30);
      setOtp("");
    }
  }, [counter, showOtp]);

  useEffect(() => {
    if (otpSentSuccessfully) {
      setShowOtp(true);
    } else {
      setShowOtp(false);
    }
  }, [otpSentSuccessfully]);

  useEffect(() => {
    if (otpVerifiedSuccessfully) {
      if (accountCreatedAlready) router.replace("/(tabs)");
      else router.replace("/createAccount");
    } else {
      // setShowOtp(false);
    }
  }, [otpVerifiedSuccessfully]);

  const payload: any = false;

  return (
    <ReduxProvidexWrapper>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary,
        }}
      >
        <DismissKeyboard>
          {showOtp ? (
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={100}
              style={{
                flex: 1,
                padding: "10%",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  gap: 40,
                }}
              >
                <Logo />
                <ThemedText
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: theme.PrimaryTextColor,
                    textAlign: "center",
                  }}
                >
                  Enter OTP
                </ThemedText>
              </View>

              <Input
                value={otp}
                onChangeText={(e: string) => setOtp(e)}
                placeholder="Enter OTP"
                type="numeric"
              />
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: theme.secondayTextColor,
                  textAlign: "center",
                }}
              >
                Entered Wrong Phone Number?{" "}
                <Pressable
                  onPress={() => {
                    dispatch(setOtpSentSuccessfullyState(payload));
                    setShowOtp(false);
                  }}
                  style={{ marginBottom: -3 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textDecorationLine: "underline",
                      color: theme.buttonColor,
                    }}
                  >
                    Move back
                  </Text>
                </Pressable>
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <SecondaryButton
                  title={counter ? `Resend OTP(${counter})` : "Resend OTP"}
                  onPress={() => {
                    dispatch(sendPhoneForOTP({ PhoneNumber: phoneNumber }));
                  }}
                  customStyle={{ width: "48%" }}
                  disabled={sendOtpLoader || !phoneNumber || counter}
                />
                <PrimaryButton
                  title="Verify OTP"
                  disabled={verifyOtpLoader || !otp}
                  onPress={() => {
                    dispatch(verifyOTP({ otp: otp, otpId: otpId }));
                  }}
                  customStyle={{ width: "48%" }}
                />
              </View>
            </KeyboardAvoidingView>
          ) : (
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={100}
              style={{
                flex: 1,
                padding: "10%",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  gap: 40,
                }}
              >
                <Logo />
                <ThemedText
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: theme.PrimaryTextColor,
                    textAlign: "center",
                  }}
                >
                  Enter your mobile number
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.secondayTextColor,
                    textAlign: "center",
                  }}
                >
                  We will send you a verification code
                </ThemedText>
              </View>
              <PhoneInput
                value={phoneNumber}
                onChange={(e: string) => {
                  setPhoneNumber(e);
                }}
              />
              <PrimaryButton
                title="Send OTP"
                disabled={sendOtpLoader || !phoneNumber}
                onPress={() => {
                  dispatch(sendPhoneForOTP({ phoneNumber: phoneNumber }));
                }}
              />
            </KeyboardAvoidingView>
          )}
        </DismissKeyboard>
      </View>
    </ReduxProvidexWrapper>
  );
}
