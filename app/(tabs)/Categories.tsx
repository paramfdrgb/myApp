import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import ProductListItem from "@/components/productListItem";

export default function Tab() {
  const theme = useThemeColor();
  const [selectedCat, setSelectedCat] = useState("");

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

  const categories = [
    {
      label: "Fruits",
      icon: <FontAwesome5 name="apple-alt" size={24} color="#ffff" />,
    },
    {
      label: "vegetables",
      icon: (
        <MaterialCommunityIcons name="fruit-cherries" size={24} color="#ffff" />
      ),
    },
    {
      label: "Diary",
      icon: <FontAwesome6 name="cow" size={24} color="#ffff" />,
    },
    {
      label: "Meat",
      icon: <FontAwesome6 name="cloud-meatball" size={24} color="#ffff" />,
    },
  ];

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
    {
      label: "Lamb Meat",
      offerPrice: 220,
      orginalPrice: 250,
      imageUrl: "",
      measureType: "KG",
      quantity: 1,
    },
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
    {
      label: "Lamb Meat",
      offerPrice: 220,
      orginalPrice: 250,
      imageUrl: "",
      measureType: "KG",
      quantity: 1,
    },
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
    <View style={styles.container}>
      <View style={styles.categories}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setSelectedCat(item.label);
              }}
              key={index}
              style={{ marginBottom: 15 }}
            >
              <View style={styles.category} key={index}>
                <View
                  style={{
                    backgroundColor:
                      item.label === selectedCat
                        ? theme.buttonColor
                        : theme.productBg,
                    padding: 15,
                    borderRadius: 60,
                    overflow: "hidden",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  {item.icon}
                </View>
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.PrimaryTextColor,
                  }}
                >
                  {item.label}
                </ThemedText>
              </View>
            </Pressable>
          )}
        />
      </View>
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
    </View>
  );
}
