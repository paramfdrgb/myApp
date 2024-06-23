import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type InputProps = {
  value: string;
  disabled?: boolean;
  onChangeText?: any;
  customStyle?: any;
  type?: KeyboardTypeOptions | undefined;
  placeholder?: string;
  onBlur?: any;
  error?: string;
};

export default function Input(props: InputProps) {
  const theme = useThemeColor();
  const {
    value,
    disabled,
    onChangeText,
    customStyle,
    type,
    placeholder,
    onBlur,
    error,
  } = props;

  const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: theme.secondayTextColor,
      borderRadius: 5,
      padding: 15,
      color: theme.PrimaryTextColor,
      fontSize: 16,
      fontWeight: "500",
    },
  });
  return (
    <View>
      <TextInput
        keyboardType={type}
        style={{ ...styles.textInput, ...customStyle }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.secondayTextColor}
        onBlur={onBlur}
      />
      {error ? (
        <Text style={{ color: "red", marginTop: 2 }}>{error}</Text>
      ) : null}
    </View>
  );
}
