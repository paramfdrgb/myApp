import ThemedText from "@/components/ThemedText";
import ProductListItem from "@/components/productListItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { FlatList, View } from "react-native";

export default function BestSeller() {
  const theme = useThemeColor();
  const products = [
    {
      label: "Bell Pepper Red",
      offerPrice: 120,
      orginalPrice: 130,
      imageUrl: "",
      measureType: "KG",
      quantity: 1,
    },
    {
      label: "Lamb Meat",
      offerPrice: 220,
      orginalPrice: 250,
      imageUrl: "",
      measureType: "KG",
      quantity: 1,
    },
    {
      label: "Lamb Meat",
      offerPrice: 220,
      orginalPrice: 250,
      imageUrl: "",
      measureType: "KG",
      quantity: 1,
    },
  ];
  const numColumns = 2;
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
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
          Best selling 🔥
        </ThemedText>
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
      </View>
      <View style={{ height: "100%" }}>
        <FlatList
          style={{
            flex: 1,
            marginTop: 10,
          }}
          data={products}
          renderItem={({ item, index }) => {
            if (products.length === index + 1)
              return (
                <View style={{ width: "50%" }}>
                  <ProductListItem product={item} />
                </View>
              );
            return <ProductListItem product={item} />;
          }}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
}
