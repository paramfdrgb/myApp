import React from "react";
import { Image, View } from "react-native";
import ThemedText from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";

export default function ProductListItem({ product }: any) {
  const theme = useThemeColor();
  return (
    <View
      style={{
        backgroundColor: theme.productBg,
        margin: 5,
        flex: 1,
        borderRadius: 20,
        padding: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <View style={{ marginTop: 10, marginBottom: 40 }}>
        <ThemedText
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: theme.PrimaryTextColor,
            textAlign: "left",
          }}
        >
          {product.label}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#FF324B",
            textAlign: "left",
            marginTop: 5,
          }}
        >
          {product.quantity} {product.measureType}, Rs.{product.offerPrice}
        </ThemedText>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: 10,
        }}
      >
        <AntDesign name="pluscircle" size={34} color={theme.buttonColor} />
      </View>
    </View>
  );
}
