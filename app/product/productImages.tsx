import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, Image, ImageBackground, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ProductImages(props: any) {
  const theme = useThemeColor();
  const width = Dimensions.get("window").width;
  return (
    <View style={{ width: width, height: width / 1.5 }}>
      <Carousel
        loop
        mode="parallax"
        width={width}
        height={width / 1.5}
        autoPlay={true}
        data={props.images}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.primary,
              overflow: "hidden",
              borderRadius: 10,
            }}
            key={index}
          >
            <ImageBackground
              source={props.images[index]}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
