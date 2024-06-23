import {
  Pressable,
  RegisteredStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type PrimaryButtonProps = {
  onPress: any;
  title: string;
  disabled?: boolean;
  icon?: any;
  customStyle?: any;
};

export default function PrimaryButton(props: PrimaryButtonProps) {
  const theme = useThemeColor();
  const { onPress, title, disabled, icon, customStyle } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.buttonColor,
      padding: 10,
      borderRadius: 30,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingVertical: 20,
    },
    text: {
      color: "#ffff",
      fontSize: 16,
      fontWeight: "500",
    },
  });
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[{ width: "100%" }, customStyle]}
    >
      <View style={[styles.container]}>
        {icon ? icon : null}
        <Text style={styles.text}> {title}</Text>
      </View>
    </Pressable>
  );
}
