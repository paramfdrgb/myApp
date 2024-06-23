import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  RegisteredStyle,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

type PhoneInputProps = {
  value: string;
  disabled?: boolean;
  onChange?: any;
  customStyle?: RegisteredStyle<ViewStyle>;
};

export default function PhoneInput(props: PhoneInputProps) {
  const theme = useThemeColor();
  const { value, disabled, onChange, customStyle } = props;

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.secondayTextColor,
      borderRadius: 5,
      padding: 15,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    text: {
      color: theme.PrimaryTextColor,
      fontSize: 16,
      fontWeight: "500",
    },
    devider: {
      borderWidth: 1,
      borderColor: theme.secondayTextColor,
      height: "100%",
    },
    textInput: {
      color: theme.PrimaryTextColor,
      fontSize: 16,
      fontWeight: "500",
      flex: 1,
    },
  });

  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.text}>+91</Text>
      <View style={styles.devider} />
      <TextInput
        keyboardType="phone-pad"
        style={styles.textInput}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
