import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, View } from "react-native";

export default function ProductTitleCard({
  product,
  quantity,
  setQuantity,
}: any) {
  const theme = useThemeColor();

  return (
    <View style={{ padding: 10, marginTop: 20, height: "60%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.PrimaryTextColor,
              textAlign: "left",
            }}
          >
            {product.label}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#FF324B",
              textAlign: "left",
              marginTop: 5,
            }}
          >
            {product.quantityForPrice} {product.measureType}, Rs.
            {product.offerPrice}
          </ThemedText>
        </View>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Pressable
            onPress={() => {
              if (quantity > 0) setQuantity(quantity - 1);
            }}
          >
            <AntDesign
              name="minuscircle"
              size={34}
              color={theme.secondayTextColor}
            />
          </Pressable>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: theme.PrimaryTextColor,
              textAlign: "left",
            }}
          >
            {quantity}
          </ThemedText>
          <Pressable
            onPress={() => {
              if (quantity < product.maxQauntity) setQuantity(quantity + 1);
              else {
                Alert.alert("Max limit crossed!");
              }
            }}
          >
            <AntDesign name="pluscircle" size={34} color={theme.buttonColor} />
          </Pressable>
        </View>
      </View>
      <ThemedText
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: theme.secondayTextColor,
          textAlign: "left",
          marginTop: 20,
        }}
      >
        {product.description}
      </ThemedText>
      {product.attributes?.length ? (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {product.attributes.map((item: any, i: number) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.secondayTextColor,
                padding: 10,
                borderRadius: 15,
                width: "48%",
                height: "auto",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={i}
            >
              {/* {item?.icon} */}
              <View style={{ width: "auto" }}>
                <ThemedText
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.buttonColor,
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.secondayTextColor,
                    textAlign: "left",
                  }}
                >
                  {item.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
