import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Categories() {
  const theme = useThemeColor();
  const categories = [
    {
      label: "Fruits",
      icon: (
        <FontAwesome5
          name="apple-alt"
          size={24}
          color={theme.secondayTextColor}
        />
      ),
    },
    {
      label: "vegetables",
      icon: (
        <MaterialCommunityIcons
          name="fruit-cherries"
          size={24}
          color={theme.secondayTextColor}
        />
      ),
    },
    {
      label: "Diary",
      icon: (
        <FontAwesome6 name="cow" size={24} color={theme.secondayTextColor} />
      ),
    },
    {
      label: "Meat",
      icon: (
        <FontAwesome6
          name="cloud-meatball"
          size={24}
          color={theme.secondayTextColor}
        />
      ),
    },
  ];

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: theme.PrimaryTextColor,
          }}
        >
          Categories 😋
        </ThemedText>
        <Pressable onPress={() => router.push("/Categories")}>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: theme.buttonColor,
              marginTop: 10,
            }}
          >
            See all
          </ThemedText>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        {categories.map((cat, i) => (
          <View style={{ alignItems: "center" }} key={i}>
            <View
              style={{
                backgroundColor: theme.productBg,
                padding: 15,
                borderRadius: 60,
                overflow: "hidden",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              {cat.icon}
            </View>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: theme.PrimaryTextColor,
              }}
            >
              {cat.label}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}
