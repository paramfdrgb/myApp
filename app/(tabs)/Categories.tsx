import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import ProductListItem from "@/components/productListItem";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategories } from "@/redux/categorySlice";
import { getProducts } from "@/redux/productSlice";

export default function Tab() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const [selectedCat, setSelectedCat] = useState("");
  const { categories, isCategoriesLoading }: any = useAppSelector(
    (store) => store.categoriesFeatures
  );

  const { products, isProductsLoading }: any = useAppSelector(
    (store) => store.productsFeatures
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: theme.productBg,
      justifyContent: "space-between",
      gap: 5,
      paddingTop: 5,
    },
    categories: {
      width: "23%",
      backgroundColor: theme.primary,
      borderTopRightRadius: 10,
      padding: 5,
      height: "100%",
    },
    category: {
      alignItems: "center",
    },
    products: {
      width: "77%",
      backgroundColor: theme.primary,
      borderTopLeftRadius: 10,
      padding: 5,
    },
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (categories?.length) {
      setSelectedCat(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCat) {
      dispatch(getProducts(selectedCat));
    }
  }, [selectedCat]);

  const numColumns = 2;

  return (
    <View style={styles.container}>
      {categories?.length ? (
        <View style={styles.categories}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setSelectedCat(item.categoryName);
                }}
                key={index}
                style={{ marginBottom: 15 }}
              >
                <View style={styles.category} key={index}>
                  <View
                    style={{
                      backgroundColor:
                        item.categoryName === selectedCat
                          ? theme.buttonColor
                          : theme.productBg,
                      padding: 5,
                      borderRadius: 60,
                      overflow: "hidden",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.image }}
                      resizeMode="cover"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 60,
                        overflow: "hidden",
                      }}
                    />
                  </View>
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: theme.PrimaryTextColor,
                    }}
                  >
                    {item.categoryName}
                  </ThemedText>
                </View>
              </Pressable>
            )}
          />
        </View>
      ) : (
        <>{isCategoriesLoading ? <Text>Loading..!</Text> : <></>}</>
      )}
      {products?.length ? (
        <View style={styles.products}>
          <FlatList
            style={{ flex: 1, width: "100%" }}
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
      ) : (
        <>{isProductsLoading ? <Text>Loading..!</Text> : <></>}</>
      )}
    </View>
  );
}
