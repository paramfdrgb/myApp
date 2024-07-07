import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProductImages from "./productImages";
import { EvilIcons } from "@expo/vector-icons";
import ProductTitleCard from "./titleCard";
import { useLocalSearchParams } from "expo-router";
import PrimaryButton from "@/components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProduct } from "@/redux/productSlice";
import { addToCart } from "@/redux/cartSlice";
import TopLeftBack from "@/components/topLeftBack";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function Product() {
  const theme = useThemeColor();
  const ProductParam = useLocalSearchParams();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const { product, isProductLoading }: any = useAppSelector(
    (store) => store.productsFeatures
  );
  const { isAddToCartLoading }: any = useAppSelector(
    (store) => store.cartFeatures
  );

  useEffect(() => {
    if (!isProductLoading) dispatch(getProduct(ProductParam));
  }, []);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.productBg, flex: 1 }}>
        {product ? (
          <View style={{ backgroundColor: theme.primary, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                paddingBottom: 0,
                backgroundColor: theme.productBg,
              }}
            >
              <TopLeftBack />
              <Pressable
                style={{
                  backgroundColor: theme.primary,
                  borderColor: theme.secondayTextColor,
                  borderRadius: 50,
                  borderWidth: 1,
                  padding: 5,
                }}
              >
                <EvilIcons
                  name="search"
                  size={24}
                  style={{ marginTop: 2 }}
                  color={theme.PrimaryTextColor}
                />
              </Pressable>
            </View>
            <ScrollView>
              <View
                style={{
                  backgroundColor: theme.productBg,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  height: "45%",
                  overflow: "hidden",
                }}
              >
                <ProductImages
                  images={product?.productGallery?.map((item: any) => {
                    return {
                      uri: item?.image || "",
                    };
                  })}
                />
              </View>
              <ProductTitleCard
                quantity={quantity}
                setQuantity={setQuantity}
                product={{
                  label: product.product_name,
                  quantityForPrice: "1",
                  maxQauntity: product.quantity,
                  quantity: 0,
                  measureType: "Kg",
                  offerPrice: product.salePrice,
                  description: product.product_description,
                  attributes: product?.productAttributes?.length
                    ? product.productAttributes.map((item: any) => {
                        return {
                          label: item.attributeName,
                          description: item.attributeValue,
                          icon: null,
                        };
                      })
                    : [],
                }}
              />
            </ScrollView>
            <View
              style={{
                padding: 10,
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            >
              <PrimaryButton
                title={isAddToCartLoading ? "Adding..!" : "Add to cart"}
                disabled={isAddToCartLoading}
                onPress={() => {
                  dispatch(
                    addToCart({
                      productId: product.id,
                      quantity: quantity,
                    })
                  );
                }}
              />
            </View>
          </View>
        ) : (
          <>{isProductLoading ? <Text>Loading..!</Text> : <></>}</>
        )}
      </SafeAreaView>
      <SafeAreaView style={{ flex: 0, backgroundColor: theme.primary }} />
    </>
  );
}
