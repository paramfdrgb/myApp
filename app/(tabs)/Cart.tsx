import PrimaryButton from "@/components/PrimaryButton";
import ThemedText from "@/components/ThemedText";
import TopLeftBack from "@/components/topLeftBack";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getCatItems, updateCart } from "@/redux/cartSlice";
import { createCheckout } from "@/redux/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

export default function Cart() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const {
    isAddToCartLoading,
    isCartLoading,
    cartItems,
    loadingProductId,
  }: any = useAppSelector((store) => store.cartFeatures);
  const { iscreateCheckoutLoading }: any = useAppSelector(
    (store) => store.checkoutFeatures
  );

  useEffect(() => {
    dispatch(getCatItems());
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.primary, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          position: "relative",
        }}
      >
        <View style={{ position: "absolute", left: 10 }}>
          <TopLeftBack />
        </View>
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: theme.PrimaryTextColor,
            textAlign: "left",
          }}
        >
          Cart
        </ThemedText>
      </View>
      {cartItems?.length ? (
        <View style={{ padding: 10, marginTop: 10 }}>
          {cartItems.map((item: any, i: number) => (
            <View
              style={{
                borderBottomColor: theme.productBg,
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
              key={i}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.PrimaryTextColor,
                      textAlign: "left",
                    }}
                  >
                    {item.product_name}
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
                    Rs.
                    {item.salePrice}
                  </ThemedText>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <Pressable
                  onPress={() => {
                    if (item.quantity > 0) {
                      dispatch(
                        updateCart({ ...item, quantity: item.quantity - 1 })
                      );
                    }
                  }}
                  disabled={isAddToCartLoading && loadingProductId === item.id}
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
                  {item.quantity}
                </ThemedText>
                <Pressable
                  onPress={() => {
                    dispatch(
                      updateCart({ ...item, quantity: item.quantity + 1 })
                    );
                  }}
                  disabled={isAddToCartLoading && loadingProductId === item.id}
                >
                  <AntDesign
                    name="pluscircle"
                    size={34}
                    color={theme.buttonColor}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <>{isCartLoading ? <Text>Loading..!</Text> : <></>}</>
      )}
      <View
        style={{
          padding: 10,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <PrimaryButton
          title="Checkout"
          disabled={iscreateCheckoutLoading}
          onPress={() => {
            // dispatch(createCheckout({}));
          }}
        />
      </View>
    </SafeAreaView>
  );
}
