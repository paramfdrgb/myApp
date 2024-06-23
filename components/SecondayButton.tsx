import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SecondaryButton(props: any) {
  const theme = useThemeColor();
  const { onPress, title, disabled, icon, customStyle } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.light,
      padding: 10,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      borderColor: theme.primary,
      borderWidth: 1,
      paddingVertical: 20,
    },
    text: {
      color: theme.primary,
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
