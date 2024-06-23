import { useColorScheme } from "react-native";
import React from "react";
import { Image, View } from "react-native";

export default function Logo() {
  const theme = useColorScheme();
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: theme === "light" ? "#EBF8EE" : "#1A3848",
        borderRadius: 100,
        width: 50,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 20, height: 20 }}
      />
    </View>
  );
}
