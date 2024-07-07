import React from "react";
import { Image, ImageBackground, Pressable, View } from "react-native";
import ThemedText from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProductListItem({ product }: any) {
  const theme = useThemeColor();
  return (
    <View
      style={{
        backgroundColor: theme.productBg,
        margin: 5,
        flex: 1,
        borderRadius: 20,
        padding: 15,
      }}
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/product/${product.id}`,
            params: product.id,
          })
        }
      >
        <View
          style={{
            backgroundColor: theme.secondayTextColor,
            overflow: "hidden",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <ImageBackground
            source={{
              uri: product.thumbnail,
            }}
            resizeMode="cover"
            style={{
              width: 100,
              height: 100,
            }}
          />
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
            {product.product_name}
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
            {/* {product.quantity} {product.measureType},  */}
            Rs.{product.salePrice}
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
      </Pressable>
    </View>
  );
}
