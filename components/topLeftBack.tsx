import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

export default function TopLeftBack() {
  const theme = useThemeColor();
  return (
    <Pressable
      style={{
        backgroundColor: theme.primary,
        borderColor: theme.secondayTextColor,
        borderRadius: 50,
        borderWidth: 1,
        padding: 5,
      }}
      onPress={() => router.back()}
    >
      <Ionicons
        name="chevron-back-sharp"
        size={24}
        style={{ marginRight: 1 }}
        color={theme.PrimaryTextColor}
      />
    </Pressable>
  );
}
